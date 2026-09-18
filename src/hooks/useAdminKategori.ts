/**
 * @file useAdminKategori.ts
 * @description Custom React Hook untuk mengelola state dan operasi bisnis Master Kategori Sampah Admin Circula.
 * Mengatur pemuatan data awal dari API, penyaringan real-time berdasarkan kata kunci dan kelompok jenis material,
 * siklus hidup slide-over drawer formulir input (`isDrawerOpen`, mode tambah/ubah),
 * dialog konfirmasi penghapusan kategori (`isDeleteModalOpen`), dialog penyesuaian harga massal (`isBatchModalOpen`),
 * serta kalkulasi metrik telemetri rata-rata harga dan notifikasi toast.
 * 
 * @module Hooks/UseAdminKategori
 */

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  KategoriSampahAdminRecord,
  CreateKategoriPayload,
  UpdateKategoriPayload,
  KategoriFilterState,
  JenisSampah,
  KategoriTelemetryStats,
} from "@/types/adminKategori";
import {
  getKategoriList,
  createKategori,
  updateKategori,
  deleteKategori,
  batchUpdatePricing,
} from "@/services/adminKategoriService";

/**
 * Hook useAdminKategori
 * 
 * @returns {object} Kumpulan state katalog, filter, drawer, modal, serta fungsi mutasi data.
 */
export function useAdminKategori() {
  // State daftar kategori material
  const [kategoriList, setKategoriList] = useState<KategoriSampahAdminRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // State penyaringan pencarian dan tab jenis sampah
  const [filterState, setFilterState] = useState<KategoriFilterState>({
    searchQuery: "",
    selectedJenis: "semua",
  });

  // State kendali slide-over drawer formulir
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedKategori, setSelectedKategori] = useState<KategoriSampahAdminRecord | null>(null);

  // State kendali modal dialog konfirmasi hapus dan penyesuaian harga massal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  // State status submit dan toast notifikasi
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Otomatis menghilangkan pesan toast setelah 3.5 detik
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Memuat data awal dari backend saat pertama kali dibuka
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const data = await getKategoriList();
        if (!isMounted) return;
        setKategoriList(data);
      } catch (err) {
        console.error("Kesalahan memuat daftar kategori:", err);
        if (!isMounted) return;
        setToast({
          message: "Gagal memuat katalog kategori sampah dari server.",
          type: "error",
        });
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handler input pencarian teks
  const handleSearch = useCallback((query: string) => {
    setFilterState((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  // Handler pergantian filter jenis sampah
  const handleJenisFilter = useCallback((jenis: "semua" | JenisSampah) => {
    setFilterState((prev) => ({
      ...prev,
      selectedJenis: jenis,
    }));
  }, []);

  // Memfilter daftar kategori secara reaktif
  const filteredList = useMemo(() => {
    let list = [...kategoriList];

    const q = filterState.searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.namaKategori.toLowerCase().includes(q) ||
          item.deskripsi.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
      );
    }

    if (filterState.selectedJenis !== "semua") {
      list = list.filter((item) => item.jenisSampah === filterState.selectedJenis);
    }

    return list;
  }, [kategoriList, filterState.searchQuery, filterState.selectedJenis]);

  // Perhitungan metrik statistik telemetri untuk kartu hero
  const stats: KategoriTelemetryStats = useMemo(() => {
    const total = kategoriList.length;
    if (total === 0) {
      return { totalMaterial: 0, benchmarkRataRata: 0, statusSinkron: true };
    }
    const sumPrice = kategoriList.reduce((acc, curr) => acc + curr.hargaBeliPerKg, 0);
    const avg = Math.round(sumPrice / total);
    return {
      totalMaterial: total,
      benchmarkRataRata: avg,
      statusSinkron: true,
    };
  }, [kategoriList]);

  // Handler pemicu pembukaan modal & drawer
  const handleOpenCreate = useCallback(() => {
    setSelectedKategori(null);
    setDrawerMode("create");
    setIsDrawerOpen(true);
  }, []);

  const handleOpenEdit = useCallback((record: KategoriSampahAdminRecord) => {
    setSelectedKategori(record);
    setDrawerMode("edit");
    setIsDrawerOpen(true);
  }, []);

  const handleOpenDelete = useCallback((record: KategoriSampahAdminRecord) => {
    setSelectedKategori(record);
    setIsDeleteModalOpen(true);
  }, []);

  const handleOpenBatch = useCallback(() => {
    setIsBatchModalOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const handleCloseBatchModal = useCallback(() => {
    setIsBatchModalOpen(false);
  }, []);

  // Handler penyimpanan data kategori (Tambah Baru atau Ubah)
  const handleSave = useCallback(
    async (payload: CreateKategoriPayload | UpdateKategoriPayload) => {
      try {
        setIsSubmitting(true);
        if (drawerMode === "create") {
          const created = await createKategori(payload as CreateKategoriPayload);
          setKategoriList((prev) => [...prev, created]);
          setToast({
            message: `Kategori material "${created.namaKategori}" berhasil ditambahkan!`,
            type: "success",
          });
        } else if (selectedKategori) {
          const updated = await updateKategori(
            selectedKategori.id,
            payload as UpdateKategoriPayload
          );
          setKategoriList((prev) =>
            prev.map((item) => (item.id === updated.id ? updated : item))
          );
          setToast({
            message: `Kategori material "${updated.namaKategori}" berhasil diperbarui!`,
            type: "success",
          });
        }
        setIsDrawerOpen(false);
      } catch (err) {
        console.error("Kesalahan saat menyimpan kategori:", err);
        setToast({
          message: "Terjadi kesalahan saat menyimpan master kategori.",
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [drawerMode, selectedKategori]
  );

  // Handler konfirmasi penghapusan kategori
  const handleConfirmDelete = useCallback(async () => {
    if (!selectedKategori) return;
    try {
      setIsSubmitting(true);
      await deleteKategori(selectedKategori.id);
      setKategoriList((prev) =>
        prev.filter((item) => item.id !== selectedKategori.id)
      );
      setToast({
        message: `Kategori "${selectedKategori.namaKategori}" berhasil dihapus.`,
        type: "success",
      });
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Kesalahan saat menghapus kategori:", err);
      setToast({
        message: "Gagal menghapus kategori material.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedKategori]);

  // Handler konfirmasi penyesuaian tarif massal (Batch Pricing)
  const handleConfirmBatch = useCallback(async (percentage: number) => {
    try {
      setIsSubmitting(true);
      const updated = await batchUpdatePricing(percentage);
      setKategoriList(updated);
      setToast({
        message: `Penyesuaian tarif massal ${percentage > 0 ? "+" : ""}${percentage}% berhasil diterapkan ke seluruh material.`,
        type: "success",
      });
      setIsBatchModalOpen(false);
    } catch (err) {
      console.error("Kesalahan penyesuaian harga massal:", err);
      setToast({
        message: "Gagal menerapkan penyesuaian tarif massal.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    kategoriList,
    filteredList,
    loading,
    filterState,
    stats,
    isDrawerOpen,
    drawerMode,
    selectedKategori,
    isDeleteModalOpen,
    isBatchModalOpen,
    isSubmitting,
    toast,
    handleSearch,
    handleJenisFilter,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenBatch,
    handleCloseDrawer,
    handleCloseDeleteModal,
    handleCloseBatchModal,
    handleSave,
    handleConfirmDelete,
    handleConfirmBatch,
  };
}
