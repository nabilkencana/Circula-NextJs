"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  TransaksiSetorAdminRecord,
  TransaksiTkrAdminRecord,
  TransaksiViewType,
  SampahItemRincian,
  VerifySetorPayload,
} from "@/types/adminTransaksi";
import {
  getTransaksiSetorList,
  getTransaksiTkrList,
  verifyTimbanganSetor,
  finalizeTransaksiSetor,
  completeTkrPenukaran,
  calculateTelemetryStats,
} from "@/services/adminTransaksiService";

export function useAdminTransaksi() {
  const [strList, setStrList] = useState<TransaksiSetorAdminRecord[]>([]);
  const [tkrList, setTkrList] = useState<TransaksiTkrAdminRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const [viewType, setViewType] = useState<TransaksiViewType>("STR");
  const [statusFilter, setStatusFilter] = useState<string>("semua");
  const [selectedBulan, setSelectedBulan] = useState<string>("Agustus 2026");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 4;

  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [selectedRecordForVerify, setSelectedRecordForVerify] =
    useState<TransaksiSetorAdminRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Load data on mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const [loadedStr, loadedTkr] = await Promise.all([
          getTransaksiSetorList(),
          getTransaksiTkrList(),
        ]);
        if (!isMounted) return;
        setStrList(loadedStr);
        setTkrList(loadedTkr);
      } catch (err) {
        console.error("Error loading transaksi:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter STR
  const filteredStrList = useMemo(() => {
    return strList.filter((item) => {
      // Filter status
      if (statusFilter !== "semua" && item.status !== statusFilter) {
        return false;
      }
      // Filter search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchCode = item.kodeTransaksi.toLowerCase().includes(query);
        const matchName = item.nasabahNama.toLowerCase().includes(query);
        const matchPhone = item.nasabahTelp.toLowerCase().includes(query);
        if (!matchCode && !matchName && !matchPhone) return false;
      }
      return true;
    });
  }, [strList, statusFilter, searchQuery]);

  // Filter TKR
  const filteredTkrList = useMemo(() => {
    return tkrList.filter((item) => {
      if (statusFilter !== "semua" && item.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchCode = item.kodePenukaran.toLowerCase().includes(query);
        const matchName = item.nasabahNama.toLowerCase().includes(query);
        const matchItem = item.itemHadiah.toLowerCase().includes(query);
        if (!matchCode && !matchName && !matchItem) return false;
      }
      return true;
    });
  }, [tkrList, statusFilter, searchQuery]);

  // Pagination for STR
  const paginatedStrList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStrList.slice(start, start + pageSize);
  }, [filteredStrList, currentPage, pageSize]);

  // Pagination for TKR
  const paginatedTkrList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTkrList.slice(start, start + pageSize);
  }, [filteredTkrList, currentPage, pageSize]);

  const totalPages = useMemo(() => {
    const totalItems = viewType === "STR" ? filteredStrList.length : filteredTkrList.length;
    return Math.max(1, Math.ceil(totalItems / pageSize));
  }, [viewType, filteredStrList.length, filteredTkrList.length, pageSize]);

  const telemetryStats = useMemo(() => {
    return calculateTelemetryStats(strList, tkrList);
  }, [strList, tkrList]);

  // Handlers
  const handleSwitchType = useCallback((type: TransaksiViewType) => {
    setViewType(type);
    setCurrentPage(1);
    setStatusFilter("semua");
  }, []);

  const handleStatusFilterChange = useCallback((status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const handleBulanChange = useCallback((bulan: string) => {
    setSelectedBulan(bulan);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleOpenVerify = useCallback((record: TransaksiSetorAdminRecord) => {
    setSelectedRecordForVerify(record);
    setVerifyModalOpen(true);
  }, []);

  const handleCloseVerify = useCallback(() => {
    setVerifyModalOpen(false);
    setSelectedRecordForVerify(null);
  }, []);

  const handleConfirmVerify = useCallback(
    async (
      payload: VerifySetorPayload,
      updatedItems: SampahItemRincian[],
      totalBerat: number,
      totalPoin: number
    ) => {
      if (!selectedRecordForVerify) return;
      try {
        setIsSubmitting(true);
        const updated = await verifyTimbanganSetor(
          selectedRecordForVerify.id,
          payload,
          updatedItems,
          totalBerat,
          totalPoin
        );
        setStrList((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
        handleCloseVerify();

        let message = `Penyetoran ${updated.kodeTransaksi} berhasil diverifikasi (${totalBerat} kg).`;
        if (payload.status === "selesai") {
          message = `Penyetoran ${updated.kodeTransaksi} berhasil diselesaikan! Poin nasabah telah diperbarui (+${totalPoin} Poin).`;
        } else if (payload.status === "ditolak") {
          message = `Pengajuan penyetoran ${updated.kodeTransaksi} telah ditolak.`;
        }

        setToastMessage({
          type: "success",
          message,
        });
      } catch (err) {
        console.error("Error verifying transaksi:", err);
        setToastMessage({
          type: "error",
          message: "Gagal memverifikasi transaksi. Silakan coba kembali.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedRecordForVerify, handleCloseVerify]
  );

  const handleFinalize = useCallback(async (id: string) => {
    try {
      setIsSubmitting(true);
      const updated = await finalizeTransaksiSetor(id);
      setStrList((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setToastMessage({
        type: "success",
        message: `Transaksi ${updated.kodeTransaksi} berhasil difinalisasi menjadi Selesai. Poin telah masuk ke rekening nasabah.`,
      });
    } catch (err) {
      console.error("Error finalizing transaksi:", err);
      setToastMessage({
        type: "error",
        message: "Gagal memfinalisasi transaksi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleCompleteTkr = useCallback(async (id: string) => {
    try {
      setIsSubmitting(true);
      const updated = await completeTkrPenukaran(id);
      setTkrList((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setToastMessage({
        type: "success",
        message: `Voucher penukaran ${updated.kodePenukaran} berhasil diserahkan dan status diubah menjadi Selesai.`,
      });
    } catch (err) {
      console.error("Error completing TKR:", err);
      setToastMessage({
        type: "error",
        message: "Gagal menyelesaikan penukaran voucher.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleExportRekap = useCallback(() => {
    const csvRows = [
      ["KODE", "TANGGAL", "NASABAH", "RINCIAN", "TOTAL_BERAT_KG", "POIN", "STATUS"],
      ...strList.map((item) => [
        item.kodeTransaksi,
        `"${item.tanggalWaktu}"`,
        `"${item.nasabahNama}"`,
        `"${item.rincianSampah.map((s) => `${s.namaKategori} (${s.berat}kg)`).join("; ")}"`,
        item.totalBerat,
        item.totalPoin,
        item.status,
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Penyetoran_${selectedBulan.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [strList, selectedBulan]);

  return {
    strList,
    tkrList,
    loading,
    viewType,
    statusFilter,
    selectedBulan,
    searchQuery,
    currentPage,
    pageSize,
    filteredStrList,
    filteredTkrList,
    paginatedStrList,
    paginatedTkrList,
    totalPages,
    telemetryStats,
    verifyModalOpen,
    selectedRecordForVerify,
    isSubmitting,
    toastMessage,
    setToastMessage,
    handleSwitchType,
    handleStatusFilterChange,
    handleBulanChange,
    handleSearchChange,
    handlePageChange,
    handleOpenVerify,
    handleCloseVerify,
    handleConfirmVerify,
    handleFinalize,
    handleCompleteTkr,
    handleExportRekap,
  };
}
