/**
 * ============================================================================
 * Hook: useHistoriSetor
 * Direktori: src/hooks/useHistoriSetor.ts
 *
 * Fungsi Utama:
 * Custom React Hook yang mengelola seluruh state dan logika bisnis untuk
 * halaman riwayat / status penyetoran sampah nasabah.
 *
 * Tanggung Jawab Hook:
 * 1. State Management: Menyimpan daftar transaksi, metrik ringkasan nasabah,
 *    kriteria filter aktif (status, bulan), kata kunci pencarian, dan status loading.
 * 2. Sinkronisasi Data (Data Fetching): Memanggil service `getMySetorHistory`
 *    dan `getSaldoNasabah` secara paralel saat filter bulan berubah.
 * 3. Pencegahan Memory Leak: Menggunakan flag boolean `isMounted` pada asynchronous
 *    effect cleanup agar tidak melakukan setState pada komponen yang sudah di-unmount.
 * 4. Optimasi Komputasi (useMemo):
 *    - Menghitung agregat jumlah transaksi per status (`statusCounts`) secara reaktif.
 *    - Menyaring data transaksi (`filteredTransactions`) berdasarkan 3 kombinasi filter:
 *      status kategori, string tahun-bulan ISO, dan pencarian teks bebas (kode setor,
 *      lokasi, jenis sampah).
 * ============================================================================
 */

import { useState, useMemo, useEffect } from "react";
import { TransaksiPenyetoran, StatusPenyetoran } from "@/types/historiSetor";
import { getMySetorHistory, DEFAULT_HISTORI_TRANSACTIONS } from "@/services/historiSetorService";
import { getSaldoNasabah } from "@/services/tukarPoinService";

/**
 * Interface NasabahSummaryMetrics:
 * Representasi ringkasan profil nasabah dan pencapaian tabungan bank sampah.
 */
export interface NasabahSummaryMetrics {
  /** Nama lengkap nasabah pemilik akun */
  namaNasabah: string;
  /** Akumulasi total saldo poin reward yang dapat ditukarkan */
  totalPoin: number;
  /** Akumulasi total berat fisik sampah yang telah berhasil disetorkan (kg) */
  totalBeratSampahKg: number;
  /** Total banyaknya transaksi penyetoran yang tercatat */
  totalTransaksiSetor: number;
}

/**
 * Custom Hook useHistoriSetor:
 * @param initialData Data awal opsional untuk seeding atau SSR hydration.
 */
export function useHistoriSetor(initialData: TransaksiPenyetoran[] = []) {
  // State daftar riwayat transaksi penyetoran
  const [transactions, setTransactions] = useState<TransaksiPenyetoran[]>(
    initialData.length > 0 ? initialData : DEFAULT_HISTORI_TRANSACTIONS
  );

  // State ringkasan saldo poin dan bobot total sampah
  const [summary, setSummary] = useState<NasabahSummaryMetrics>({
    namaNasabah: "Budi Santoso",
    totalPoin: 150,
    totalBeratSampahKg: 21.5,
    totalTransaksiSetor: 3,
  });

  // State parameter filter dan pencarian
  const [filterStatus, setFilterStatus] = useState<"semua" | StatusPenyetoran>("semua");
  const [filterBulan, setFilterBulan] = useState<string>("2026-08");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // =========================================================================
  // EFEK SINKRONISASI API (Background Fetch)
  // Berjalan setiap kali filter periode bulan (`filterBulan`) mengalami perubahan
  // =========================================================================
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      try {
        // Panggil endpoint histori dan saldo nasabah secara paralel dengan Promise.all
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
        console.error("Gagal memuat data histori penyetoran:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    // Fungsi pembersih (cleanup) untuk menandai unmount
    return () => {
      isMounted = false;
    };
  }, [filterBulan]);

  // =========================================================================
  // PENGHITUNG AGREGAT BADGE STATUS (useMemo)
  // Menghitung jumlah record untuk masing-masing tab status secara efisien
  // =========================================================================
  const statusCounts = useMemo(() => {
    return {
      semua: transactions.length,
      menunggu_konfirmasi: transactions.filter((t) => t.status === "menunggu_konfirmasi").length,
      diverifikasi: transactions.filter((t) => t.status === "diverifikasi").length,
      selesai: transactions.filter((t) => t.status === "selesai").length,
      ditolak: transactions.filter((t) => t.status === "ditolak").length,
    };
  }, [transactions]);

  // =========================================================================
  // FILTERING MULTI-KRITERIA (useMemo)
  // Menyaring data transaksi berdasarkan status, bulan, dan teks pencarian
  // =========================================================================
  const filteredTransactions = useMemo(() => {
    let list = [...transactions];

    // Filter 1: Klasifikasi Status Penyetoran
    if (filterStatus !== "semua") {
      list = list.filter((t) => t.status === filterStatus);
    }

    // Filter 2: Periode Bulan (Mencocokkan awalan YYYY-MM pada format tanggal ISO)
    if (filterBulan) {
      list = list.filter((t) => t.tanggalPengajuan.startsWith(filterBulan));
    }

    // Filter 3: Pencarian Kata Kunci (Kode setor, Lokasi tujuan, atau Nama kategori item)
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

  // Kembalikan seluruh state, data terfilter, dan handler ke komponen konsumen
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
