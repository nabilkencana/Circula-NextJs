"use client";

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
  MOCK_HADIAH_LIST,
  MOCK_SALDO_SUMMARY,
} from "@/services/tukarPoinService";

export function useTukarPoin(initialItems: HadiahItem[] = MOCK_HADIAH_LIST) {
  const [items, setItems] = useState<HadiahItem[]>(initialItems);
  const [saldoSummary, setSaldoSummary] = useState<SaldoNasabahSummary>(MOCK_SALDO_SUMMARY);
  const [selectedCategory, setSelectedCategory] = useState<KategoriHadiah>("semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeItemToRedeem, setActiveItemToRedeem] = useState<HadiahItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [redemptionSuccessData, setRedemptionSuccessData] = useState<
    TukarPoinResponse["data"] | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Background fetch to sync items if API is active
  useEffect(() => {
    let isMounted = true;
    async function loadRewards() {
      setIsLoading(true);
      try {
        const data = await getHadiahList();
        if (isMounted && data && data.length > 0) {
          setItems(data);
        }
      } catch {
        // keep initialItems
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadRewards();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered rewards
  const filteredItems = useMemo(() => {
    let list = [...items];

    if (selectedCategory !== "semua") {
      list = list.filter((item) => item.kategori === selectedCategory);
    }

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

  const isPointSufficient = (poinDibutuhkan: number) => {
    return saldoSummary.saldoPoinAktif >= poinDibutuhkan;
  };

  const kekuranganPoin = (poinDibutuhkan: number) => {
    return Math.max(0, poinDibutuhkan - saldoSummary.saldoPoinAktif);
  };

  const handleInitiateRedeem = (item: HadiahItem) => {
    if (!isPointSufficient(item.poinDibutuhkan)) return;
    setErrorMessage(null);
    setActiveItemToRedeem(item);
  };

  const handleCancelRedeem = () => {
    setActiveItemToRedeem(null);
    setErrorMessage(null);
  };

  const handleConfirmRedeem = async () => {
    if (!activeItemToRedeem) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await tukarPoinHadiah({ hadiahId: activeItemToRedeem.id });
      if (res.success && res.data) {
        setRedemptionSuccessData(res.data);
        // Deduct points from local saldo
        setSaldoSummary((prev) => ({
          ...prev,
          saldoPoinAktif: res.data.sisaPoin,
          nilaiKonversiRupiah: res.data.sisaPoin * 350,
          poinTerpakaiBulanIni: prev.poinTerpakaiBulanIni + res.data.poinTerpakai,
          totalTransaksiSelesai: prev.totalTransaksiSelesai + 1,
        }));
      } else {
        setErrorMessage(res.message || "Gagal memproses penukaran poin.");
      }
    } catch {
      setErrorMessage("Terjadi kendala jaringan saat memproses penukaran poin.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
