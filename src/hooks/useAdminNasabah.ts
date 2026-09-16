"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  NasabahRecord,
  CreateNasabahPayload,
  UpdateNasabahPayload,
  NasabahFilterState,
} from "@/types/adminNasabah";
import {
  getNasabahList,
  createNasabah,
  updateNasabah,
  deleteNasabah,
  exportNasabahCsv,
} from "@/services/adminNasabahService";

const ITEMS_PER_PAGE = 5;

export function useAdminNasabah() {
  const [nasabahList, setNasabahList] = useState<NasabahRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterState, setFilterState] = useState<NasabahFilterState>({
    searchQuery: "",
    filterTab: "semua",
    currentPage: 1,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedNasabah, setSelectedNasabah] = useState<NasabahRecord | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Auto-dismiss toast
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
        const data = await getNasabahList();
        if (!isMounted) return;
        setNasabahList(data);
      } catch (err) {
        console.error("Error loading nasabah list:", err);
        if (!isMounted) return;
        setToast({
          message: "Gagal memuat data nasabah dari server.",
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

  // Handlers for search and tabs
  const handleSearch = useCallback((query: string) => {
    setFilterState((prev) => ({
      ...prev,
      searchQuery: query,
      currentPage: 1,
    }));
  }, []);

  const handleFilterTab = useCallback((tab: "semua" | "poin_tinggi" | "baru") => {
    setFilterState((prev) => ({
      ...prev,
      filterTab: tab,
      currentPage: 1,
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilterState((prev) => ({
      ...prev,
      currentPage: page,
    }));
  }, []);

  // Filtered list
  const filteredList = useMemo(() => {
    let list = [...nasabahList];

    // Search query
    const q = filterState.searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.namaLengkap.toLowerCase().includes(q) ||
          item.username.toLowerCase().includes(q) ||
          item.telp.includes(q) ||
          item.id.toLowerCase().includes(q)
      );
    }

    // Filter tab
    if (filterState.filterTab === "poin_tinggi") {
      list = list.filter((item) => item.saldoPoin > 100);
    } else if (filterState.filterTab === "baru") {
      list = list.filter((item) => item.isNew || item.saldoPoin === 0);
    }

    return list;
  }, [nasabahList, filterState.searchQuery, filterState.filterTab]);

  // Paginated list
  const paginatedList = useMemo(() => {
    const startIndex = (filterState.currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredList, filterState.currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / ITEMS_PER_PAGE));

  // Modal / Drawer Triggers
  const handleOpenCreate = useCallback(() => {
    setSelectedNasabah(null);
    setDrawerMode("create");
    setIsDrawerOpen(true);
  }, []);

  const handleOpenEdit = useCallback((record: NasabahRecord) => {
    setSelectedNasabah(record);
    setDrawerMode("edit");
    setIsDrawerOpen(true);
  }, []);

  const handleOpenDelete = useCallback((record: NasabahRecord) => {
    setSelectedNasabah(record);
    setIsDeleteModalOpen(true);
  }, []);

  const handleOpenDetail = useCallback((record: NasabahRecord) => {
    setSelectedNasabah(record);
    setIsDetailModalOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
  }, []);

  // Save (Create or Update)
  const handleSave = useCallback(
    async (payload: CreateNasabahPayload | UpdateNasabahPayload) => {
      try {
        setIsSubmitting(true);
        if (drawerMode === "create") {
          const created = await createNasabah(payload as CreateNasabahPayload);
          setNasabahList((prev) => [created, ...prev]);
          setToast({
            message: `Nasabah baru "${created.namaLengkap}" (${created.id}) berhasil didaftarkan!`,
            type: "success",
          });
        } else if (selectedNasabah) {
          const updated = await updateNasabah(
            selectedNasabah.id,
            payload as UpdateNasabahPayload
          );
          setNasabahList((prev) =>
            prev.map((item) => (item.id === updated.id ? updated : item))
          );
          setToast({
            message: `Data nasabah "${updated.namaLengkap}" (${updated.id}) berhasil diperbarui!`,
            type: "success",
          });
        }
        setIsDrawerOpen(false);
      } catch (err) {
        console.error("Save error:", err);
        setToast({
          message: "Terjadi kesalahan saat menyimpan data nasabah.",
          type: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [drawerMode, selectedNasabah]
  );

  // Confirm Delete
  const handleConfirmDelete = useCallback(async () => {
    if (!selectedNasabah) return;
    try {
      setIsSubmitting(true);
      await deleteNasabah(selectedNasabah.id);
      setNasabahList((prev) =>
        prev.filter((item) => item.id !== selectedNasabah.id)
      );
      setToast({
        message: `Data nasabah "${selectedNasabah.namaLengkap}" (${selectedNasabah.id}) berhasil dihapus.`,
        type: "success",
      });
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Delete error:", err);
      setToast({
        message: "Gagal menghapus data nasabah.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedNasabah]);

  // Export CSV
  const handleExportCsv = useCallback(() => {
    exportNasabahCsv(nasabahList);
    setToast({
      message: "File data-nasabah-asrijaya.csv berhasil diunduh.",
      type: "success",
    });
  }, [nasabahList]);

  // Metrics for Hero display
  const stats = useMemo(() => {
    const baseTotal = 142;
    const currentTotal = baseTotal + (nasabahList.length - 3);
    const totalPoints = nasabahList.reduce((acc, curr) => acc + curr.saldoPoin, 18220);

    return {
      totalNasabah: Math.max(currentTotal, nasabahList.length),
      akumulasiPoin: totalPoints,
      sinkronisasiOtomatis: true,
    };
  }, [nasabahList]);

  return {
    nasabahList,
    filteredList,
    paginatedList,
    loading,
    filterState,
    totalPages,
    itemsPerPage: ITEMS_PER_PAGE,
    isDrawerOpen,
    drawerMode,
    selectedNasabah,
    isDeleteModalOpen,
    isDetailModalOpen,
    isSubmitting,
    toast,
    stats,
    handleSearch,
    handleFilterTab,
    handlePageChange,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenDetail,
    handleCloseDrawer,
    handleCloseDeleteModal,
    handleCloseDetailModal,
    handleSave,
    handleConfirmDelete,
    handleExportCsv,
  };
}
