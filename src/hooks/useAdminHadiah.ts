"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  HadiahAdminRecord,
  CreateHadiahPayload,
  UpdateHadiahPayload,
  HadiahFilterState,
  HadiahTelemetryStats,
  RiwayatStokRecord,
} from "@/types/adminHadiah";
import {
  getHadiahList,
  createHadiah,
  updateHadiah,
  deleteHadiah,
  getRiwayatStok,
} from "@/services/adminHadiahService";

export function useAdminHadiah() {
  const [hadiahList, setHadiahList] = useState<HadiahAdminRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterState, setFilterState] = useState<HadiahFilterState>({
    searchQuery: "",
    filterTab: "semua",
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedHadiah, setSelectedHadiah] = useState<HadiahAdminRecord | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRiwayatModalOpen, setIsRiwayatModalOpen] = useState(false);
  const [riwayatList, setRiwayatList] = useState<RiwayatStokRecord[]>([]);

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
        const [hadiahData, riwayatData] = await Promise.all([
          getHadiahList(),
          getRiwayatStok(),
        ]);
        if (!isMounted) return;
        setHadiahList(hadiahData);
        setRiwayatList(riwayatData);
      } catch (err) {
        console.error("Error loading hadiah data:", err);
        if (!isMounted) return;
        setToast({
          message: "Gagal memuat katalog hadiah dari server.",
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

  const handleFilterTab = useCallback((tab: "semua" | "tersedia" | "habis") => {
    setFilterState((prev) => ({
      ...prev,
      filterTab: tab,
    }));
  }, []);

  // Filtered list
  const filteredList = useMemo(() => {
    let list = [...hadiahList];

    // Search query
    const q = filterState.searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.namaHadiah.toLowerCase().includes(q) ||
          item.deskripsi.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
      );
    }

    // Filter tab
    if (filterState.filterTab === "tersedia") {
      list = list.filter((item) => item.stok > 0);
    } else if (filterState.filterTab === "habis") {
      list = list.filter((item) => item.stok === 0);
    }

    return list;
  }, [hadiahList, filterState.searchQuery, filterState.filterTab]);

  // Telemetry stats calculation
  const stats: HadiahTelemetryStats = useMemo(() => {
    const totalTersedia = hadiahList.filter((item) => item.stok > 0).length;
    return {
      totalTersedia,
      poinBeredar: 12450,
      kontrolStokRealtime: true,
    };
  }, [hadiahList]);

  // Modal / Drawer Triggers
  const handleOpenCreate = useCallback(() => {
    setSelectedHadiah(null);
    setDrawerMode("create");
    setIsDrawerOpen(true);
  }, []);

  const handleOpenEdit = useCallback((record: HadiahAdminRecord) => {
    setSelectedHadiah(record);
    setDrawerMode("edit");
    setIsDrawerOpen(true);
  }, []);

  const handleOpenDelete = useCallback((record: HadiahAdminRecord) => {
    setSelectedHadiah(record);
    setIsDeleteModalOpen(true);
  }, []);

  const handleOpenRiwayat = useCallback(() => {
    setIsRiwayatModalOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const handleCloseRiwayatModal = useCallback(() => {
    setIsRiwayatModalOpen(false);
  }, []);

  // Save (Create / Edit)
  const handleSave = useCallback(
    async (payload: CreateHadiahPayload | UpdateHadiahPayload) => {
      try {
        setIsSubmitting(true);
        if (drawerMode === "create") {
          const created = await createHadiah(payload as CreateHadiahPayload);
          setHadiahList((prev) => [...prev, created]);
          setToast({
            message: `Item hadiah "${created.namaHadiah}" berhasil ditambahkan!`,
            type: "success",
          });
        } else if (selectedHadiah) {
          const updated = await updateHadiah(
            selectedHadiah.id,
            payload as UpdateHadiahPayload
          );
          setHadiahList((prev) =>
            prev.map((item) => (item.id === updated.id ? updated : item))
          );
          setToast({
            message: `Data hadiah "${updated.namaHadiah}" berhasil diperbarui!`,
            type: "success",
          });
        }
        setIsDrawerOpen(false);
      } catch (err) {
        console.error("Save hadiah error:", err);
        setToast({
          message: "Terjadi kesalahan saat menyimpan master hadiah.",
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [drawerMode, selectedHadiah]
  );

  // Confirm Delete
  const handleConfirmDelete = useCallback(async () => {
    if (!selectedHadiah) return;
    try {
      setIsSubmitting(true);
      await deleteHadiah(selectedHadiah.id);
      setHadiahList((prev) =>
        prev.filter((item) => item.id !== selectedHadiah.id)
      );
      setToast({
        message: `Hadiah "${selectedHadiah.namaHadiah}" berhasil dihapus.`,
        type: "success",
      });
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Delete hadiah error:", err);
      setToast({
        message: "Gagal menghapus item hadiah.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedHadiah]);

  return {
    hadiahList,
    filteredList,
    loading,
    filterState,
    stats,
    isDrawerOpen,
    drawerMode,
    selectedHadiah,
    isDeleteModalOpen,
    isRiwayatModalOpen,
    riwayatList,
    isSubmitting,
    toast,
    handleSearch,
    handleFilterTab,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenRiwayat,
    handleCloseDrawer,
    handleCloseDeleteModal,
    handleCloseRiwayatModal,
    handleSave,
    handleConfirmDelete,
  };
}
