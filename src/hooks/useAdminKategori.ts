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

export function useAdminKategori() {
  const [kategoriList, setKategoriList] = useState<KategoriSampahAdminRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterState, setFilterState] = useState<KategoriFilterState>({
    searchQuery: "",
    selectedJenis: "semua",
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedKategori, setSelectedKategori] = useState<KategoriSampahAdminRecord | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Auto dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Load initial data
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const data = await getKategoriList();
        if (!isMounted) return;
        setKategoriList(data);
      } catch (err) {
        console.error("Error loading kategori list:", err);
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

  // Filter Handlers
  const handleSearch = useCallback((query: string) => {
    setFilterState((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  const handleJenisFilter = useCallback((jenis: "semua" | JenisSampah) => {
    setFilterState((prev) => ({
      ...prev,
      selectedJenis: jenis,
    }));
  }, []);

  // Filtered list
  const filteredList = useMemo(() => {
    let list = [...kategoriList];

    // Search query
    const q = filterState.searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.namaKategori.toLowerCase().includes(q) ||
          item.deskripsi.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
      );
    }

    // Jenis filter
    if (filterState.selectedJenis !== "semua") {
      list = list.filter((item) => item.jenisSampah === filterState.selectedJenis);
    }

    return list;
  }, [kategoriList, filterState.searchQuery, filterState.selectedJenis]);

  // Telemetry stats calculation
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

  // Modal / Drawer Triggers
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

  // Save (Create / Edit)
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
        console.error("Save kategori error:", err);
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

  // Confirm Delete
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
      console.error("Delete kategori error:", err);
      setToast({
        message: "Gagal menghapus kategori material.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedKategori]);

  // Batch pricing
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
      console.error("Batch pricing error:", err);
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
