"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  SetorSampahItemInput,
  CreateSetorSampahPayload,
  SetorSampahSubmissionResponse,
} from "@/types/setorSampah";
import { KategoriSampah } from "@/types/kategoriSampah";
import {
  getKategoriSampahOptions,
  submitPengajuanSetor,
} from "@/services/setorSampahService";
import { MOCK_KATEGORI_SAMPAH } from "@/services/kategoriSampahService";

const USER_INITIAL_BALANCE = 150; // User current point balance as seen in mock design

export function useAjukanSetor(initialParams?: {
  kategoriId?: string | null;
  berat?: string | null;
}) {
  const [categories, setCategories] =
    useState<KategoriSampah[]>(MOCK_KATEGORI_SAMPAH);
  const [tanggal, setTanggal] = useState<string>("2026-08-26");
  const [metodePenyerahan, setMetodePenyerahan] = useState<"drop-off" | "jemput">(
    "drop-off"
  );
  const [catatan, setCatatan] = useState<string>("");
  const [confirmedTerms, setConfirmedTerms] = useState<boolean>(true);

  // Dynamic multi-item list state
  const [items, setItems] = useState<SetorSampahItemInput[]>(() => {
    // Initial 2 items matching blueprint visual
    const petCat =
      MOCK_KATEGORI_SAMPAH.find((c) => c.namaKategori.includes("PET")) ||
      MOCK_KATEGORI_SAMPAH[0];
    const kardusCat =
      MOCK_KATEGORI_SAMPAH.find((c) => c.namaKategori.includes("Kardus")) ||
      MOCK_KATEGORI_SAMPAH[1];

    const baseItems: SetorSampahItemInput[] = [
      {
        tempId: "item-1",
        kategoriSampahId: petCat.id,
        namaKategori: petCat.namaKategori,
        jenisSampah: petCat.jenisSampah,
        beratKg: 4.5,
        hargaPerKg: petCat.hargaPerKg,
        poinPerKg: petCat.poinPerKg,
        subtotalPoin: Math.round(4.5 * petCat.poinPerKg),
        subtotalRupiah: Math.round(4.5 * petCat.hargaPerKg),
      },
      {
        tempId: "item-2",
        kategoriSampahId: kardusCat.id,
        namaKategori: kardusCat.namaKategori,
        jenisSampah: kardusCat.jenisSampah,
        beratKg: 2.0,
        hargaPerKg: kardusCat.hargaPerKg,
        poinPerKg: kardusCat.poinPerKg,
        subtotalPoin: Math.round(2.0 * kardusCat.poinPerKg),
        subtotalRupiah: Math.round(2.0 * kardusCat.hargaPerKg),
      },
    ];

    if (initialParams?.kategoriId) {
      const targetCat = MOCK_KATEGORI_SAMPAH.find(
        (c) => c.id === initialParams.kategoriId
      );
      if (targetCat) {
        const parsedWeight = initialParams.berat
          ? parseFloat(initialParams.berat)
          : 5;
        const safeWeight =
          isNaN(parsedWeight) || parsedWeight <= 0 ? 5 : parsedWeight;

        return [
          {
            tempId: `param-${Date.now()}`,
            kategoriSampahId: targetCat.id,
            namaKategori: targetCat.namaKategori,
            jenisSampah: targetCat.jenisSampah,
            beratKg: safeWeight,
            hargaPerKg: targetCat.hargaPerKg,
            poinPerKg: targetCat.poinPerKg,
            subtotalPoin: Math.round(safeWeight * targetCat.poinPerKg),
            subtotalRupiah: Math.round(safeWeight * targetCat.hargaPerKg),
          },
          ...baseItems.filter((it) => it.kategoriSampahId !== targetCat.id),
        ];
      }
    }

    return baseItems;
  });

  // Submission & UI feedback state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<SetorSampahSubmissionResponse["data"] | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  // Load available categories from API
  useEffect(() => {
    let isMounted = true;
    async function loadCats() {
      const data = await getKategoriSampahOptions();
      if (isMounted && data && data.length > 0) {
        setCategories(data);
      }
    }
    loadCats();
    return () => {
      isMounted = false;
    };
  }, []);

  // Action: Add new item row
  const addItem = useCallback(() => {
    // Pick next category that is not yet selected if possible
    const usedIds = new Set(items.map((it) => it.kategoriSampahId));
    const nextCat =
      categories.find((c) => !usedIds.has(c.id)) || categories[0] || MOCK_KATEGORI_SAMPAH[0];

    const newItem: SetorSampahItemInput = {
      tempId: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      kategoriSampahId: nextCat.id,
      namaKategori: nextCat.namaKategori,
      jenisSampah: nextCat.jenisSampah,
      beratKg: 1.0,
      hargaPerKg: nextCat.hargaPerKg,
      poinPerKg: nextCat.poinPerKg,
      subtotalPoin: Math.round(1.0 * nextCat.poinPerKg),
      subtotalRupiah: Math.round(1.0 * nextCat.hargaPerKg),
    };

    setItems((prev) => [...prev, newItem]);
  }, [categories, items]);

  // Action: Remove item row
  const removeItem = useCallback((tempId: string) => {
    setItems((prev) => {
      if (prev.length <= 1) {
        setErrorMessage("Minimal harus menyetor 1 jenis sampah terpilah.");
        setTimeout(() => setErrorMessage(null), 3000);
        return prev;
      }
      return prev.filter((it) => it.tempId !== tempId);
    });
  }, []);

  // Action: Update category for a specific row
  const updateItemCategory = useCallback(
    (tempId: string, kategoriId: string) => {
      const selected =
        categories.find((c) => c.id === kategoriId) || categories[0];
      if (!selected) return;

      setItems((prev) =>
        prev.map((it) => {
          if (it.tempId === tempId) {
            return {
              ...it,
              kategoriSampahId: selected.id,
              namaKategori: selected.namaKategori,
              jenisSampah: selected.jenisSampah,
              hargaPerKg: selected.hargaPerKg,
              poinPerKg: selected.poinPerKg,
              subtotalPoin: Math.round(it.beratKg * selected.poinPerKg),
              subtotalRupiah: Math.round(it.beratKg * selected.hargaPerKg),
            };
          }
          return it;
        })
      );
    },
    [categories]
  );

  // Action: Update item weight (supports stepper [- / +] or direct input)
  const updateItemWeight = useCallback(
    (tempId: string, deltaOrValue: number | string) => {
      setItems((prev) =>
        prev.map((it) => {
          if (it.tempId !== tempId) return it;

          let newWeight: number;
          if (typeof deltaOrValue === "number") {
            // Delta step e.g. +0.5 or -0.5
            newWeight = Math.round((it.beratKg + deltaOrValue) * 10) / 10;
          } else {
            // Direct input string
            const cleaned = deltaOrValue.replace(",", ".");
            const parsed = parseFloat(cleaned);
            newWeight = isNaN(parsed) ? 0.1 : parsed;
          }

          // Clamp minimum weight to 0.1 kg
          newWeight = Math.max(0.1, Math.min(999, newWeight));
          newWeight = Number(newWeight.toFixed(1));

          return {
            ...it,
            beratKg: newWeight,
            subtotalPoin: Math.round(newWeight * it.poinPerKg),
            subtotalRupiah: Math.round(newWeight * it.hargaPerKg),
          };
        })
      );
    },
    []
  );

  // Calculated Selectors
  const totalEstimasiBerat = useMemo(() => {
    const sum = items.reduce((acc, curr) => acc + curr.beratKg, 0);
    return Number(sum.toFixed(1));
  }, [items]);

  const totalEstimasiPoin = useMemo(() => {
    return items.reduce((acc, curr) => acc + curr.subtotalPoin, 0);
  }, [items]);

  const totalEstimasiRupiah = useMemo(() => {
    return items.reduce((acc, curr) => acc + curr.subtotalRupiah, 0);
  }, [items]);

  const saldoAkunSaatIni = USER_INITIAL_BALANCE;
  const proyeksiSaldoAkhir = saldoAkunSaatIni + totalEstimasiPoin;

  // Form Submit Handler
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    if (!confirmedTerms) {
      setErrorMessage(
        "Silakan centang konfirmasi kesesuaian standar pemilahan 3R sebelum melanjutkan."
      );
      return;
    }

    if (items.length === 0) {
      setErrorMessage("Silakan tambahkan minimal 1 jenis sampah untuk disetor.");
      return;
    }

    setIsSubmitting(true);

    const payload: CreateSetorSampahPayload = {
      tanggal,
      metodePenyerahan,
      catatan: catatan.trim() || undefined,
      items: items.map((it) => ({
        kategoriSampahId: it.kategoriSampahId,
        beratKg: it.beratKg,
      })),
    };

    try {
      const response = await submitPengajuanSetor(payload);
      if (response.success && response.data) {
        setSubmissionResult(response.data);
        setIsSuccessModalOpen(true);
      } else {
        setErrorMessage(
          response.message || "Gagal membuat pengajuan setor sampah."
        );
      }
    } catch (err) {
      console.error("[useAjukanSetor] Submit error:", err);
      setErrorMessage(
        "Terjadi kesalahan saat menghubungi server. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return {
    categories,
    tanggal,
    setTanggal,
    metodePenyerahan,
    setMetodePenyerahan,
    catatan,
    setCatatan,
    confirmedTerms,
    setConfirmedTerms,
    items,
    addItem,
    removeItem,
    updateItemCategory,
    updateItemWeight,
    // Computed totals
    totalEstimasiBerat,
    totalEstimasiPoin,
    totalEstimasiRupiah,
    saldoAkunSaatIni,
    proyeksiSaldoAkhir,
    // Submission status & actions
    isSubmitting,
    errorMessage,
    submissionResult,
    isSuccessModalOpen,
    handleSubmit,
    closeSuccessModal,
  };
}
