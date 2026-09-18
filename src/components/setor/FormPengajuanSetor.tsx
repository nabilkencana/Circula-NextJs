"use client";

/**
 * ============================================================================
 * Komponen: FormPengajuanSetor
 * Direktori: src/components/setor/FormPengajuanSetor.tsx
 *
 * Fungsi Utama:
 * Container formulir utama di sisi kiri yang merangkum 2 langkah inti:
 * 1. Menampilkan pesan peringatan kesalahan (Error Alert banner) jika validasi gagal.
 * 2. Mengintegrasikan komponen `ScheduleLogisticsSection` (Langkah 1: Tanggal & Metode).
 * 3. Mengintegrasikan komponen `MultiItemPickerSection` (Langkah 2: Daftar Sampah & Persetujuan 3R).
 *
 * Pola Arsitektur:
 * - Compound Form Container: Bertindak sebagai koordinator yang meneruskan state dan callback
 *   dari custom hook `useAjukanSetor` ke masing-masing sub-komponen langkah form.
 * ============================================================================
 */

import React from "react";
import { AlertCircle } from "lucide-react";
import { SetorSampahItemInput } from "@/types/setorSampah";
import { KategoriSampah } from "@/types/kategoriSampah";
import ScheduleLogisticsSection from "./ScheduleLogisticsSection";
import MultiItemPickerSection from "./MultiItemPickerSection";

/**
 * Interface FormPengajuanSetorProps:
 * Kontrak properti gabungan yang diterima oleh container formulir.
 */
interface FormPengajuanSetorProps {
  tanggal: string;
  onTanggalChange: (val: string) => void;
  metodePenyerahan: "drop-off" | "jemput";
  onMetodeChange: (val: "drop-off" | "jemput") => void;
  catatan: string;
  onCatatanChange: (val: string) => void;
  items: SetorSampahItemInput[];
  categories: KategoriSampah[];
  onAddItem: () => void;
  onRemoveItem: (tempId: string) => void;
  onCategoryChange: (tempId: string, kategoriId: string) => void;
  onWeightChange: (tempId: string, deltaOrValue: number | string) => void;
  confirmedTerms: boolean;
  onConfirmedTermsChange: (val: boolean) => void;
  errorMessage: string | null;
}

export default function FormPengajuanSetor({
  tanggal,
  onTanggalChange,
  metodePenyerahan,
  onMetodeChange,
  catatan,
  onCatatanChange,
  items,
  categories,
  onAddItem,
  onRemoveItem,
  onCategoryChange,
  onWeightChange,
  confirmedTerms,
  onConfirmedTermsChange,
  errorMessage,
}: FormPengajuanSetorProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 md:p-10 shadow-sm">
      {/* ========================================================================= */}
      {/* BANNER NOTIFIKASI ERROR (Tampil jika ada input yang tidak memenuhi syarat) */}
      {/* ========================================================================= */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-xs font-semibold animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LANGKAH 1: Waktu Penyerahan & Opsi Logistik Pengiriman                     */}
      {/* ========================================================================= */}
      <ScheduleLogisticsSection
        tanggal={tanggal}
        onTanggalChange={onTanggalChange}
        metodePenyerahan={metodePenyerahan}
        onMetodeChange={onMetodeChange}
        catatan={catatan}
        onCatatanChange={onCatatanChange}
      />

      {/* ========================================================================= */}
      {/* LANGKAH 2: Pemilih Multi-Item Sampah & Konfirmasi Syarat 3R                */}
      {/* ========================================================================= */}
      <MultiItemPickerSection
        items={items}
        categories={categories}
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
        onCategoryChange={onCategoryChange}
        onWeightChange={onWeightChange}
        confirmedTerms={confirmedTerms}
        onConfirmedTermsChange={onConfirmedTermsChange}
      />
    </div>
  );
}
