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
  getSaldoNasabah,
} from "@/services/tukarPoinService";

export function useTukarPoin(initialItems: HadiahItem[] = []) {
  const [items, setItems] = useState<HadiahItem[]>(initialItems);
  const [saldoSummary, setSaldoSummary] = useState<SaldoNasabahSummary | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<KategoriHadiah>("semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeItemToRedeem, setActiveItemToRedeem] = useState<HadiahItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [redemptionSuccessData, setRedemptionSuccessData] = useState<
    TukarPoinResponse["data"] | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Background fetch to sync items & user point balance if API is active
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
        console.error("Failed to load rewards or saldo:", err);
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
    if (!saldoSummary) return false;
    return saldoSummary.saldoPoinAktif >= poinDibutuhkan;
  };

  const kekuranganPoin = (poinDibutuhkan: number) => {
    if (!saldoSummary) return 0;
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
        // Deduct points from local saldo snapshot
        setSaldoSummary((prev) => ({
          saldoPoinSaatIni: res.data.sisaPoin,
          saldoPoinAktif: res.data.sisaPoin,
          totalSampahDisetorKg: prev?.totalSampahDisetorKg ?? 0,
          nilaiKonversiRupiah: res.data.sisaPoin * 350,
          poinTerpakaiBulanIni: (prev?.poinTerpakaiBulanIni ?? 0) + res.data.poinTerpakai,
          totalTransaksiSelesai: (prev?.totalTransaksiSelesai ?? 0) + 1,
        }));
        // Deduct local item stock
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
