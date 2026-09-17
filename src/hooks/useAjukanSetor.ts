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
import { getSaldoNasabah } from "@/services/tukarPoinService";
import { getCurrentUser } from "@/services/authService";
import { useToast } from "@/components/ui/ToastProvider";

const getTodayString = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

export function useAjukanSetor(initialParams?: {
  kategoriId?: string | null;
  berat?: string | null;
}) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<KategoriSampah[]>([]);
  const [tanggal, setTanggal] = useState<string>(getTodayString);
  const [metodePenyerahan, setMetodePenyerahan] = useState<"drop-off" | "jemput">(
    "drop-off"
  );
  const [catatan, setCatatan] = useState<string>("");
  const [confirmedTerms, setConfirmedTerms] = useState<boolean>(true);
  const [saldoAkunSaatIni, setSaldoAkunSaatIni] = useState<number>(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  // Dynamic multi-item list state
  const [items, setItems] = useState<SetorSampahItemInput[]>(() => {
    // Seed rows from loaded categories (empty at mount -> empty list)
    const makeItem = (
      cat: KategoriSampah,
      i: number,
      beratKg: number
    ): SetorSampahItemInput => ({
      tempId: `item-${i + 1}`,
      kategoriSampahId: cat.id,
      namaKategori: cat.namaKategori,
      jenisSampah: cat.jenisSampah,
      beratKg,
      hargaPerKg: cat.hargaPerKg,
      poinPerKg: cat.poinPerKg,
      subtotalPoin: Math.round(beratKg * cat.poinPerKg),
      subtotalRupiah: Math.round(beratKg * cat.hargaPerKg),
    });

    if (initialParams?.kategoriId) {
      const targetCat = categories.find((c) => c.id === initialParams.kategoriId);
      if (targetCat) {
        const parsedWeight = initialParams.berat
          ? parseFloat(initialParams.berat)
          : 5;
        const safeWeight =
          isNaN(parsedWeight) || parsedWeight <= 0 ? 5 : parsedWeight;
        return [makeItem(targetCat, 0, safeWeight)];
      }
    }

    const petCat = categories.find((c) => c.namaKategori.includes("PET"));
    const kardusCat = categories.find((c) => c.namaKategori.includes("Kardus"));
    const seeds = [petCat, kardusCat].filter(
      (c): c is KategoriSampah => Boolean(c)
    );
    return seeds.map((cat, i) => makeItem(cat, i, i === 0 ? 4.5 : 2.0));
  });

  // Submission & UI feedback state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<SetorSampahSubmissionResponse["data"] | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  // Load available categories and live balance from API
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [cats, saldo] = await Promise.all([
          getKategoriSampahOptions(),
          getSaldoNasabah(),
        ]);
        if (isMounted) {
          if (cats && cats.length > 0) {
            setCategories(cats);
            setItems((prev) => {
              if (prev.length > 0) return prev;
              const firstCat = cats[0];
              return [
                {
                  tempId: `item-${Date.now()}`,
                  kategoriSampahId: firstCat.id,
                  namaKategori: firstCat.namaKategori,
                  jenisSampah: firstCat.jenisSampah,
                  beratKg: 1.0,
                  hargaPerKg: firstCat.hargaPerKg,
                  poinPerKg: firstCat.poinPerKg,
                  subtotalPoin: Math.round(1.0 * firstCat.poinPerKg),
                  subtotalRupiah: Math.round(1.0 * firstCat.hargaPerKg),
                },
              ];
            });
          }
          if (saldo && typeof saldo.saldoPoinAktif === "number") {
            setSaldoAkunSaatIni(saldo.saldoPoinAktif);
          }
        }
      } catch (err) {
        console.error("Failed to load initial categories or saldo:", err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Action: Add new item row
  const addItem = useCallback(() => {
    // Pick next category that is not yet selected if possible
    const usedIds = new Set(items.map((it) => it.kategoriSampahId));
    const defaultCat = categories.find((c) => !usedIds.has(c.id));
    const nextCat = defaultCat || categories[0];
    if (!nextCat) {
      setErrorMessage("Kategori sampah belum tersedia. Muat ulang halaman.");
      return;
    }

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

  const proyeksiSaldoAkhir = saldoAkunSaatIni + totalEstimasiPoin;

  // Pre-submit validation: open confirmation modal
  const handleInitiateSubmit = (e?: React.FormEvent) => {
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

    const invalidItem = items.find((it) => it.beratKg <= 0);
    if (invalidItem) {
      setErrorMessage("Setiap jenis sampah harus memiliki berat minimal 0.1 kg.");
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirm = () => {
    setIsConfirmModalOpen(false);
  };

  // Form Submit Handler (executed from confirm modal)
  const handleConfirmSubmit = async () => {
    setErrorMessage(null);
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
        setIsConfirmModalOpen(false);
        setIsSuccessModalOpen(true);
        toast({
          variant: "success",
          title: "Pengajuan Berhasil!",
          message: `Kode setor ${response.data.kodeSetor} sedang menunggu verifikasi petugas.`,
        });
      } else {
        const msg = response.message || "Gagal membuat pengajuan setor sampah.";
        setErrorMessage(msg);
        toast({ variant: "error", title: "Pengajuan Gagal", message: msg });
      }
    } catch (err) {
      console.error("[useAjukanSetor] Submit error:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menghubungi server. Silakan coba lagi.";
      setErrorMessage(msg);
      toast({ variant: "error", title: "Kesalahan", message: msg });
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
    isConfirmModalOpen,
    isSuccessModalOpen,
    handleInitiateSubmit,
    handleConfirmSubmit,
    handleCloseConfirm,
    handleSubmit: handleInitiateSubmit,
    closeSuccessModal,
  };
}
