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
  MOCK_KATEGORI_SAMPAH,
} from "@/services/kategoriSampahService";

export function useKatalogSampah(initialItems: KategoriSampah[] = MOCK_KATEGORI_SAMPAH) {
  const [items, setItems] = useState<KategoriSampah[]>(initialItems);
  const [isLoading, setIsLoading] = useState<boolean>(initialItems.length === 0);
  const [filterState, setFilterState] = useState<KatalogFilterState>({
    searchQuery: "",
    selectedJenis: "semua",
    sortBy: "nama",
  });

  // Modal estimator state
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);
  const [activeEstimatorItem, setActiveEstimatorItem] = useState<KategoriSampah | null>(
    null
  );

  // Fetch client-side in background if needed
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (items.length === 0) {
        setIsLoading(true);
      }
      try {
        const data = await getKategoriSampah();
        if (isMounted && data && data.length > 0) {
          setItems(data);
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

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Filter by jenis
    if (filterState.selectedJenis !== "semua") {
      result = result.filter(
        (item) => item.jenisSampah === filterState.selectedJenis
      );
    }

    // Filter by search query
    if (filterState.searchQuery.trim() !== "") {
      const query = filterState.searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.namaKategori.toLowerCase().includes(query) ||
          item.deskripsi.toLowerCase().includes(query) ||
          item.syaratKondisi.toLowerCase().includes(query)
      );
    }

    // Sort
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

  const setSearchQuery = (query: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery: query }));
  };

  const setSelectedJenis = (jenis: "semua" | JenisSampah) => {
    setFilterState((prev) => ({ ...prev, selectedJenis: jenis }));
  };

  const setSortBy = (sort: "nama" | "harga-tertinggi" | "poin-tertinggi") => {
    setFilterState((prev) => ({ ...prev, sortBy: sort }));
  };

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

  const openEstimator = (item: KategoriSampah) => {
    setActiveEstimatorItem(item);
    setIsEstimatorOpen(true);
  };

  const closeEstimator = () => {
    setIsEstimatorOpen(false);
  };

  return {
    items,
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
