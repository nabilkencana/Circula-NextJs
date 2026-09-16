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

export function useAdminProfil() {
  const [unitData, setUnitData] = useState<UnitBankSampahDetail | null>(null);
  const [formData, setFormData] = useState<UpdateUnitProfilPayload>({
    namaUnit: "",
    namaPengelola: "",
    telp: "",
    alamatLengkap: "",
    jamOperasional: "",
    kapasitasGudang: "",
    logoPlang: null,
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedAppKey, setCopiedAppKey] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  // Load profile data on mount
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
        console.error("Failed to load unit profile:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

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

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      handleFieldChange(name as keyof UpdateUnitProfilPayload, value);
    },
    [handleFieldChange]
  );

  const handleLogoUpload = useCallback((file: File) => {
    setFormData((prev) => ({
      ...prev,
      logoPlang: file,
    }));
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    setIsDirty(true);
  }, []);

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

  const handleCopyAppKey = useCallback(async () => {
    if (!unitData?.appKey) return;
    try {
      await navigator.clipboard.writeText(unitData.appKey);
      setCopiedAppKey(true);
      setTimeout(() => setCopiedAppKey(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  }, [unitData]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsSaving(true);

      try {
        const res = await updateUnitProfil(formData);
        if (res.success) {
          setUnitData(res.data);
          setIsDirty(false);
          setToast({
            show: true,
            message: "Pembaruan profil unit berhasil disimpan!",
            type: "success",
          });
        }
      } catch (err) {
        console.error("Failed to update profile:", err);
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
    },
    [formData]
  );

  return {
    unitData,
    formData,
    logoPreview,
    isDirty,
    isSaving,
    isLoading,
    copiedAppKey,
    toast,
    handleFieldChange,
    handleInputChange,
    handleLogoUpload,
    handleReset,
    handleCopyAppKey,
    handleSubmit,
  };
}
