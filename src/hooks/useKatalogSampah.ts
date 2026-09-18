"use client";

import { useState, useMemo, useEffect } from "react";
import {
  KategoriSampah,
  KatalogFilterState,
  JenisSampah,
  EstimasiReward,
} from "@/types/kategoriSampah";
import {
  getKategoriSampah,
} from "@/services/kategoriSampahService";
import {
  getDashboardStats,
  DashboardStats,
} from "@/services/dashboardService";

/**
 * Custom Hook Manajemen Katalog Kategori Sampah (`useKatalogSampah`)
 *
 * Mengatur seluruh siklus hidup data katalog, pencarian, pemfilteran jenis,
 * pengurutan harga/poin, serta pembukaan popup kalkulator simulasi reward:
 * 1. Pemuatan Data: Mendukung data awal dari SSR (`initialItems`) dan pengambilan async di latar belakang.
 * 2. Pencarian & Filter Cepat (`useMemo`):
 *    - Filter jenis material ('semua', 'plastik', 'kertas', 'logam', 'kaca').
 *    - Pencarian teks pada nama kategori, deskripsi, dan syarat kondisi.
 *    - Pengurutan dinamis berdasarkan nama alfabetis, harga beli tertinggi, atau poin reward tertinggi.
 * 3. Kalkulator Simulasi Cepat (`calculateEstimatedReward`):
 *    - Menghitung instan total rupiah dan poin berdasarkan bobot masukan.
 * 4. Kontrol Modal Dialog (`isEstimatorOpen`, `activeEstimatorItem`, `openEstimator`, `closeEstimator`).
 *
 * @param initialItems Data awal kategori sampah jika dioper dari komponen server
 * @returns Objek state katalog dan fungsi-fungsi mutasi filter
 */
export function useKatalogSampah(initialItems: KategoriSampah[] = []) {
  // State daftar kategori sampah
  const [items, setItems] = useState<KategoriSampah[]>(initialItems);
  // State statistik platform real dari backend
  const [stats, setStats] = useState<DashboardStats | null>(null);
  // Indikator status pemuatan data
  const [isLoading, setIsLoading] = useState<boolean>(initialItems.length === 0);
  // State kriteria filter dan pencarian
  const [filterState, setFilterState] = useState<KatalogFilterState>({
    searchQuery: "",
    selectedJenis: "semua",
    sortBy: "nama",
  });

  // State dialog modal kalkulator simulasi
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);
  const [activeEstimatorItem, setActiveEstimatorItem] = useState<KategoriSampah | null>(
    null
  );

  // Pemuatan data kategori sampah & statistik platform dari API backend di sisi klien
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (items.length === 0) {
        setIsLoading(true);
      }
      try {
        const [data, statsData] = await Promise.all([
          getKategoriSampah(),
          getDashboardStats(),
        ]);
        if (isMounted) {
          if (data && data.length > 0) {
            setItems(data);
          }
          if (statsData) {
            setStats(statsData);
          }
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
  }, [items.length]);

  // Pemfilteran dan pengurutan ter-memoize untuk performa render tinggi
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Filter berdasarkan jenis kategori
    if (filterState.selectedJenis !== "semua") {
      result = result.filter(
        (item) => item.jenisSampah === filterState.selectedJenis
      );
    }

    // Filter berdasarkan kata kunci pencarian
    if (filterState.searchQuery.trim() !== "") {
      const query = filterState.searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.namaKategori.toLowerCase().includes(query) ||
          item.deskripsi.toLowerCase().includes(query) ||
          item.syaratKondisi.toLowerCase().includes(query)
      );
    }

    // Pengurutan daftar kategori
    result.sort((a, b) => {
      if (filterState.sortBy === "harga-tertinggi") {
        return b.hargaPerKg - a.hargaPerKg;
      }
      if (filterState.sortBy === "poin-tertinggi") {
        return b.poinPerKg - a.poinPerKg;
      }
      return a.namaKategori.localeCompare(b.namaKategori);
    });

    return result;
  }, [items, filterState]);

  /** Memperbarui kata kunci pencarian teks */
  const setSearchQuery = (query: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery: query }));
  };

  /** Memperbarui filter jenis sampah yang dipilih */
  const setSelectedJenis = (jenis: "semua" | JenisSampah) => {
    setFilterState((prev) => ({ ...prev, selectedJenis: jenis }));
  };

  /** Memperbarui kriteria pengurutan katalog */
  const setSortBy = (sort: "nama" | "harga-tertinggi" | "poin-tertinggi") => {
    setFilterState((prev) => ({ ...prev, sortBy: sort }));
  };

  /**
   * Menghitung perkiraan nilai konversi rupiah dan reward poin berdasarkan bobot timbangan
   * @param kategoriId ID kategori sampah
   * @param beratKg Bobot sampah dalam kilogram
   */
  const calculateEstimatedReward = (
    kategoriId: string,
    beratKg: number
  ): EstimasiReward => {
    const target = items.find((it) => it.id === kategoriId) || items[0];
    const safeWeight = Math.max(0, beratKg);
    return {
      beratKg: safeWeight,
      hargaPerKg: target.hargaPerKg,
      poinPerKg: target.poinPerKg,
      totalRupiah: Math.round(safeWeight * target.hargaPerKg),
      totalPoin: Math.round(safeWeight * target.poinPerKg),
    };
  };

  /** Membuka dialog modal kalkulator simulasi untuk kategori tertentu */
  const openEstimator = (item: KategoriSampah) => {
    setActiveEstimatorItem(item);
    setIsEstimatorOpen(true);
  };

  /** Menutup dialog modal kalkulator simulasi */
  const closeEstimator = () => {
    setIsEstimatorOpen(false);
  };

  return {
    items,
    stats,
    filteredItems,
    isLoading,
    filterState,
    setSearchQuery,
    setSelectedJenis,
    setSortBy,
    calculateEstimatedReward,
    // Modal states
    isEstimatorOpen,
    activeEstimatorItem,
    openEstimator,
    closeEstimator,
  };
}


