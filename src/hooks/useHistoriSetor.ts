"use client";

import { useState, useMemo, useEffect } from "react";
import { TransaksiPenyetoran, StatusPenyetoran } from "@/types/historiSetor";
import {
  getMySetorHistory,
  MOCK_TRANSAKSI_HISTORI,
} from "@/services/historiSetorService";

export function useHistoriSetor(initialData: TransaksiPenyetoran[] = MOCK_TRANSAKSI_HISTORI) {
  const [transactions, setTransactions] = useState<TransaksiPenyetoran[]>(initialData);
  const [filterStatus, setFilterStatus] = useState<"semua" | StatusPenyetoran>(
    "menunggu_konfirmasi"
  );
  const [filterBulan, setFilterBulan] = useState<string>("2026-08");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(initialData.length === 0);

  // Background fetch to synchronize with backend if reachable
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (transactions.length === 0) {
        setIsLoading(true);
      }
      try {
        const data = await getMySetorHistory(filterBulan);
        if (isMounted && data && data.length > 0) {
          setTransactions(data);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [filterBulan, transactions.length]);

  // Dynamic filter counters for tab badges
  const statusCounts = useMemo(() => {
    return {
      semua: transactions.length,
      menunggu_konfirmasi: transactions.filter((t) => t.status === "menunggu_konfirmasi")
        .length,
      diverifikasi: transactions.filter((t) => t.status === "diverifikasi").length,
      selesai: transactions.filter((t) => t.status === "selesai").length,
      ditolak: transactions.filter((t) => t.status === "ditolak").length,
    };
  }, [transactions]);

  // Filtered transaction list
  const filteredTransactions = useMemo(() => {
    let list = [...transactions];

    // Status filter
    if (filterStatus !== "semua") {
      list = list.filter((t) => t.status === filterStatus);
    }

    // Month filter (match YYYY-MM in ISO string)
    if (filterBulan) {
      list = list.filter((t) => t.tanggalPengajuan.startsWith(filterBulan));
    }

    // Search query filter (search by code, item names, or notes)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.kodeSetor.toLowerCase().includes(q) ||
          t.lokasiTujuan.toLowerCase().includes(q) ||
          t.items.some((it) => it.kategoriNama.toLowerCase().includes(q))
      );
    }

    return list;
  }, [transactions, filterStatus, filterBulan, searchQuery]);

  return {
    transactions,
    filteredTransactions,
    filterStatus,
    setFilterStatus,
    filterBulan,
    setFilterBulan,
    searchQuery,
    setSearchQuery,
    statusCounts,
    isLoading,
  };
}
