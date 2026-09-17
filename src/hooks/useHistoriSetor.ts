import { useState, useMemo, useEffect } from "react";
import { TransaksiPenyetoran, StatusPenyetoran } from "@/types/historiSetor";
import { getMySetorHistory, DEFAULT_HISTORI_TRANSACTIONS } from "@/services/historiSetorService";
import { getSaldoNasabah } from "@/services/tukarPoinService";

export interface NasabahSummaryMetrics {
  namaNasabah: string;
  totalPoin: number;
  totalBeratSampahKg: number;
  totalTransaksiSetor: number;
}

export function useHistoriSetor(initialData: TransaksiPenyetoran[] = []) {
  const [transactions, setTransactions] = useState<TransaksiPenyetoran[]>(
    initialData.length > 0 ? initialData : DEFAULT_HISTORI_TRANSACTIONS
  );
  const [summary, setSummary] = useState<NasabahSummaryMetrics>({
    namaNasabah: "Budi Santoso",
    totalPoin: 150,
    totalBeratSampahKg: 21.5,
    totalTransaksiSetor: 3,
  });
  const [filterStatus, setFilterStatus] = useState<"semua" | StatusPenyetoran>(
    "semua"
  );
  const [filterBulan, setFilterBulan] = useState<string>("2026-08");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Background fetch to synchronize with backend if reachable
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const [data, sumData] = await Promise.all([
          getMySetorHistory(filterBulan),
          getSaldoNasabah(),
        ]);
        if (isMounted) {
          if (data && Array.isArray(data)) {
            setTransactions(data);
          }
          if (sumData) {
            setSummary({
              namaNasabah: "",
              totalPoin: Number(sumData.saldoPoinAktif ?? sumData.saldoPoinSaatIni ?? 0),
              totalBeratSampahKg: Number(sumData.totalSampahDisetorKg ?? 0),
              totalTransaksiSetor: Number(sumData.totalTransaksiSelesai ?? (data?.length || 0)),
            });
          }
        }
      } catch (err) {
        console.error("Failed to load history data:", err);
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
  }, [filterBulan]);

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
    summary,
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
