"use client";

/**
 * ============================================================================
 * Hook: useTukarPoin
 * Direktori: src/hooks/useTukarPoin.ts
 *
 * Fungsi Utama:
 * Custom React Hook yang mengatur logika bisnis dan state management katalog penukaran poin:
 * 1. Pemuatan Paralel (Concurrent Fetching): Mengambil daftar katalog hadiah dan
 *    ringkasan saldo nasabah saat komponen pertama kali di-mount.
 * 2. Penyaringan & Pencarian (useMemo):
 *    - Filter kategori: "semua", "sembako", "voucher", "pulsa", "merchandise".
 *    - Pencarian teks fleksibel mencakup nama produk, deskripsi, dan mitra merchant.
 * 3. Logika Validasi Poin:
 *    - `isPointSufficient`: Mengecek apakah saldo nasabah mencukupi poin produk.
 *    - `kekuranganPoin`: Menghitung selisih poin yang kurang jika saldo belum cukup.
 * 4. Alur Transaksi Penukaran (Redemption Flow):
 *    - Inisiasi pemilihan hadiah (`handleInitiateRedeem`).
 *    - Konfirmasi dan eksekusi API penukaran (`handleConfirmRedeem`).
 *    - Pengurangan otomatis saldo lokal nasabah dan stok produk seketika setelah berhasil.
 * ============================================================================
 */

import { useState, useMemo, useEffect } from "react";
import {
  HadiahItem,
  KategoriHadiah,
  TukarPoinResponse,
  SaldoNasabahSummary,
} from "@/types/tukarPoin";
import {
  getHadiahList,
  tukarPoinHadiah,
  getSaldoNasabah,
  DEFAULT_HADIAH_ITEMS,
} from "@/services/tukarPoinService";

/**
 * State Saldo Default:
 * Digunakan sebagai nilai fallback awal sebelum data riil dari backend termuat.
 */
const DEFAULT_SALDO_STATE: SaldoNasabahSummary = {
  saldoPoinSaatIni: 0,
  saldoPoinAktif: 0,
  nilaiKonversiRupiah: 0,
  poinTerpakaiBulanIni: 0,
  totalTransaksiSelesai: 0,
};

export function useTukarPoin(initialItems: HadiahItem[] = []) {
  // State daftar barang hadiah di katalog
  const [items, setItems] = useState<HadiahItem[]>(
    initialItems.length > 0 ? initialItems : DEFAULT_HADIAH_ITEMS
  );

  // State ringkasan saldo poin nasabah
  const [saldoSummary, setSaldoSummary] = useState<SaldoNasabahSummary>(DEFAULT_SALDO_STATE);

  // State parameter filter tab dan pencarian teks
  const [selectedCategory, setSelectedCategory] = useState<KategoriHadiah>("semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State alur modal penukaran
  const [activeItemToRedeem, setActiveItemToRedeem] = useState<HadiahItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [redemptionSuccessData, setRedemptionSuccessData] = useState<
    TukarPoinResponse["data"] | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // =========================================================================
  // SINKRONISASI DATA AWAL (Background Fetch)
  // Memuat daftar hadiah dan saldo nasabah secara paralel dengan Promise.all
  // =========================================================================
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [rewards, saldo] = await Promise.all([
          getHadiahList(),
          getSaldoNasabah(),
        ]);
        if (isMounted) {
          if (rewards && rewards.length > 0) {
            setItems(rewards);
          }
          if (saldo) {
            setSaldoSummary(saldo);
          }
        }
      } catch (err) {
        console.error("Gagal memuat katalog hadiah atau saldo nasabah:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================================================================
  // PENYARINGAN KATALOG HADIAH (useMemo)
  // Memfilter barang berdasarkan kategori terpilih dan kata kunci pencarian
  // =========================================================================
  const filteredItems = useMemo(() => {
    let list = [...items];

    // Filter Kategori
    if (selectedCategory !== "semua") {
      list = list.filter((item) => {
        const nama = item.namaHadiah.toLowerCase();
        if (selectedCategory === "sembako") {
          return item.kategori === "sembako" || /beras|minyak|gula|sembako|telur|tepung/i.test(nama);
        }
        if (selectedCategory === "voucher") {
          return item.kategori === "voucher" || /voucher|wallet|gopay|ovo|dana|shopee/i.test(nama);
        }
        if (selectedCategory === "pulsa") {
          return item.kategori === "pulsa" || /pulsa|data|token|kuota|listrik/i.test(nama);
        }
        if (selectedCategory === "merchandise") {
          return item.kategori === "merchandise" || item.isDonasi || /donasi|tumbler|eco/i.test(nama);
        }
        return item.kategori === selectedCategory;
      });
    }

    // Filter Pencarian Teks Bebas
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.namaHadiah.toLowerCase().includes(q) ||
          item.deskripsi.toLowerCase().includes(q) ||
          (item.mitraMerchant && item.mitraMerchant.toLowerCase().includes(q))
      );
    }

    return list;
  }, [items, selectedCategory, searchQuery]);

  /**
   * Mengecek apakah poin nasabah cukup untuk menukar hadiah tertentu
   */
  const isPointSufficient = (poinDibutuhkan: number) => {
    if (!saldoSummary) return false;
    return saldoSummary.saldoPoinAktif >= poinDibutuhkan;
  };

  /**
   * Menghitung sisa kekurangan poin yang harus dikumpulkan nasabah
   */
  const kekuranganPoin = (poinDibutuhkan: number) => {
    if (!saldoSummary) return 0;
    return Math.max(0, poinDibutuhkan - saldoSummary.saldoPoinAktif);
  };

  /**
   * Membuka modal konfirmasi penukaran barang jika poin mencukupi
   */
  const handleInitiateRedeem = (item: HadiahItem) => {
    if (!isPointSufficient(item.poinDibutuhkan)) return;
    setErrorMessage(null);
    setActiveItemToRedeem(item);
  };

  /**
   * Membatalkan proses penukaran dan menutup modal konfirmasi
   */
  const handleCancelRedeem = () => {
    setActiveItemToRedeem(null);
    setErrorMessage(null);
  };

  /**
   * Mengonfirmasi penukaran poin: mengirim payload ke backend API
   * dan memperbarui saldo lokal serta stok barang secara otomatis
   */
  const handleConfirmRedeem = async () => {
    if (!activeItemToRedeem) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await tukarPoinHadiah({ hadiahId: activeItemToRedeem.id });
      if (res.success && res.data) {
        setRedemptionSuccessData(res.data);

        // Potong saldo poin secara lokal di state
        setSaldoSummary((prev) => ({
          saldoPoinSaatIni: res.data.sisaPoin,
          saldoPoinAktif: res.data.sisaPoin,
          totalSampahDisetorKg: prev?.totalSampahDisetorKg ?? 0,
          nilaiKonversiRupiah: res.data.sisaPoin * 350,
          poinTerpakaiBulanIni: (prev?.poinTerpakaiBulanIni ?? 0) + res.data.poinTerpakai,
          totalTransaksiSelesai: (prev?.totalTransaksiSelesai ?? 0) + 1,
        }));

        // Kurangi stok produk secara lokal
        setItems((prev) =>
          prev.map((it) =>
            it.id === activeItemToRedeem.id
              ? { ...it, stok: Math.max(0, it.stok - 1) }
              : it
          )
        );
      } else {
        setErrorMessage(res.message || "Gagal memproses penukaran poin.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memproses penukaran poin.";
      if (
        msg.toLowerCase().includes("tidak cukup") ||
        msg.toLowerCase().includes("kurang") ||
        msg.toLowerCase().includes("insufficient")
      ) {
        setErrorMessage(
          "Poin reward Anda belum mencukupi untuk menukarkan hadiah ini. Kumpulkan lebih banyak poin dengan menyetorkan sampah!"
        );
      } else {
        setErrorMessage(msg || "Terjadi kendala saat memproses penukaran poin.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Menutup modal sukses penukaran tiket
   */
  const handleCloseSuccessModal = () => {
    setRedemptionSuccessData(null);
    setActiveItemToRedeem(null);
  };

  return {
    items,
    filteredItems,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    saldoSummary,
    isLoading,
    activeItemToRedeem,
    isSubmitting,
    redemptionSuccessData,
    errorMessage,
    isPointSufficient,
    kekuranganPoin,
    handleInitiateRedeem,
    handleCancelRedeem,
    handleConfirmRedeem,
    handleCloseSuccessModal,
  };
}
