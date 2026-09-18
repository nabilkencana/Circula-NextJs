/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Custom Hook Pengelolaan State Profil Unit Operasional Admin
 *
 * File: src/hooks/useAdminProfil.ts
 * Deskripsi:
 * Mengatur seluruh alur interaktif pada halaman pengaturan profil unit bank sampah:
 * inisialisasi pembacaan data unit, pengelolaan form input dengan dirty-state detection,
 * penanganan berkas pratinjau foto plang, penyalinan App Key multi-tenant ke clipboard,
 * modal dialog konfirmasi penyimpanan diff perubahan, dan umpan balik notifikasi toast.
 *
 * Standar Teknis UKK RPL:
 * - State management reaktif dengan React Hooks (`useState`, `useEffect`, `useCallback`).
 * - Deteksi dirty state form untuk mencegah navigasi hilang tanpa sengaja.
 * - Integrasi Clipboard Web API (`navigator.clipboard.writeText`) dengan feedback visual.
 */

"use client";

import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from "react";
import {
  UnitBankSampahDetail,
  UpdateUnitProfilPayload,
} from "@/types/adminProfil";
import {
  getUnitProfil,
  updateUnitProfil,
} from "@/services/adminProfilService";

/**
 * Custom hook `useAdminProfil` mengelola form identitas unit dan konfigurasi operasional.
 */
export function useAdminProfil() {
  // State data profil unit terdaftar
  const [unitData, setUnitData] = useState<UnitBankSampahDetail | null>(null);
  // State nilai data isian formulir
  const [formData, setFormData] = useState<UpdateUnitProfilPayload>({
    namaUnit: "",
    namaPengelola: "",
    telp: "",
    alamatLengkap: "",
    jamOperasional: "",
    kapasitasGudang: "",
    logoPlang: null,
  });

  // Pratinjau URL foto plang/logo yang dipilih
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  // Penanda apakah ada perubahan yang belum disimpan (dirty state)
  const [isDirty, setIsDirty] = useState(false);
  // Indikator proses simpan sedang berlangsung
  const [isSaving, setIsSaving] = useState(false);
  // Indikator pemuatan inisial data
  const [isLoading, setIsLoading] = useState(true);
  // Status keberhasilan penyalinan App Key ke clipboard
  const [copiedAppKey, setCopiedAppKey] = useState(false);
  // State pesan toast
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  // Pemuatan inisial data saat komponen pertama kali di-mount
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const data = await getUnitProfil();
        if (!isMounted) return;

        setUnitData(data);
        setFormData({
          namaUnit: data.namaUnit,
          namaPengelola: data.namaPengelola,
          telp: data.telp,
          alamatLengkap: data.alamatLengkap,
          jamOperasional: data.jamOperasional,
          kapasitasGudang: data.kapasitasGudang,
          logoPlang: null,
        });
        if (data.logoPlangUrl) {
          setLogoPreview(data.logoPlangUrl);
        }
      } catch (err) {
        console.error("Gagal memuat profil unit:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Mengubah nilai field data form tertentu dan menandai form sebagai dirty.
   */
  const handleFieldChange = useCallback(
    (field: keyof UpdateUnitProfilPayload, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setIsDirty(true);
    },
    []
  );

  /**
   * Handler generik untuk event input teks atau textarea.
   */
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      handleFieldChange(name as keyof UpdateUnitProfilPayload, value);
    },
    [handleFieldChange]
  );

  /**
   * Mengunggah berkas foto plang baru dan membuat pratinjau blob lokal.
   */
  const handleLogoUpload = useCallback((file: File) => {
    setFormData((prev) => ({
      ...prev,
      logoPlang: file,
    }));
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    setIsDirty(true);
  }, []);

  /**
   * Mengembalikan isian formulir ke nilai semula sebelum diedit.
   */
  const handleReset = useCallback(() => {
    if (!unitData) return;
    setFormData({
      namaUnit: unitData.namaUnit,
      namaPengelola: unitData.namaPengelola,
      telp: unitData.telp,
      alamatLengkap: unitData.alamatLengkap,
      jamOperasional: unitData.jamOperasional,
      kapasitasGudang: unitData.kapasitasGudang,
      logoPlang: null,
    });
    setLogoPreview(unitData.logoPlangUrl || null);
    setIsDirty(false);
  }, [unitData]);

  /**
   * Menyalin token App Key multi-tenant unit ke clipboard perangkat.
   */
  const handleCopyAppKey = useCallback(async () => {
    if (!unitData?.appKey) return;
    try {
      await navigator.clipboard.writeText(unitData.appKey);
      setCopiedAppKey(true);
      setTimeout(() => setCopiedAppKey(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin token ke clipboard:", err);
    }
  }, [unitData]);

  // State keterbukaan modal konfirmasi penyimpanan
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  /**
   * Membuka modal konfirmasi diff perubahan sebelum menyimpan ke server.
   */
  const handleInitiateSave = useCallback((e?: FormEvent) => {
    if (e) e.preventDefault();
    setIsConfirmModalOpen(true);
  }, []);

  /**
   * Menutup modal konfirmasi penyimpanan.
   */
  const handleCloseConfirm = useCallback(() => {
    setIsConfirmModalOpen(false);
  }, []);

  /**
   * Menjalankan konfirmasi eksekusi penyimpanan profil unit.
   */
  const handleConfirmSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const res = await updateUnitProfil(formData);
      if (res.success) {
        setUnitData(res.data);
        setIsDirty(false);
        setIsConfirmModalOpen(false);
        setToast({
          show: true,
          message: "Pembaruan profil unit berhasil disimpan!",
          type: "success",
        });
      }
    } catch (err) {
      console.error("Gagal menyimpan profil:", err);
      setToast({
        show: true,
        message: "Gagal menyimpan profil unit. Silakan coba lagi.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3500);
    }
  }, [formData]);

  return {
    unitData,
    formData,
    logoPreview,
    isDirty,
    isSaving,
    isLoading,
    copiedAppKey,
    toast,
    isConfirmModalOpen,
    handleFieldChange,
    handleInputChange,
    handleLogoUpload,
    handleReset,
    handleCopyAppKey,
    handleInitiateSave,
    handleCloseConfirm,
    handleConfirmSave,
    handleSubmit: handleInitiateSave,
  };
}
