"use client";

/**
 * ============================================================================
 * Komponen: MultiItemPickerSection
 * Direktori: src/components/setor/MultiItemPickerSection.tsx
 *
 * Fungsi Utama:
 * Bagian formulir (Langkah 2) untuk mengelola daftar barang daur ulang yang akan disetorkan.
 * Fitur:
 * 1. Tombol "+ Tambah Item" untuk memperbanyak baris material sampah secara dinamis.
 * 2. Badge penghitung total item yang sedang didaftarkan.
 * 3. Pemetaan array baris barang ke komponen `WasteItemRow`.
 * 4. Checkbox interaktif persetujuan pemilahan 3R (Reduce, Reuse, Recycle)
 *    dengan dukungan WAI-ARIA role="checkbox" dan aria-checked.
 *
 * Konsep Teknis:
 * - List Rendering & Reconciliation: Menggunakan `key={item.tempId}` untuk kestabilan DOM
 *   saat baris item ditambah atau dihapus.
 * - Accessible Custom Checkbox: Memberikan visual modern tanpa merusak semantik aksesibilitas.
 * ============================================================================
 */

import React from "react";
import { Plus, CheckSquare, Square } from "lucide-react";
import { SetorSampahItemInput } from "@/types/setorSampah";
import { KategoriSampah } from "@/types/kategoriSampah";
import WasteItemRow from "./WasteItemRow";

/**
 * Interface MultiItemPickerSectionProps:
 * Kontrak properti untuk bagian daftar pemilih sampah multi-item.
 */
interface MultiItemPickerSectionProps {
  /** Array seluruh baris item sampah aktif */
  items: SetorSampahItemInput[];
  /** Master data kategori sampah untuk dropdown */
  categories: KategoriSampah[];
  /** Handler untuk menambah baris item baru */
  onAddItem: () => void;
  /** Handler untuk menghapus baris item tertentu berdasarkan ID sementara */
  onRemoveItem: (tempId: string) => void;
  /** Handler untuk mengubah kategori sampah suatu baris */
  onCategoryChange: (tempId: string, kategoriId: string) => void;
  /** Handler untuk mengubah estimasi berat sampah */
  onWeightChange: (tempId: string, deltaOrValue: number | string) => void;
  /** Status persetujuan standar pemilahan 3R */
  confirmedTerms: boolean;
  /** Callback untuk mengubah status persetujuan 3R */
  onConfirmedTermsChange: (val: boolean) => void;
}

export default function MultiItemPickerSection({
  items,
  categories,
  onAddItem,
  onRemoveItem,
  onCategoryChange,
  onWeightChange,
  confirmedTerms,
  onConfirmedTermsChange,
}: MultiItemPickerSectionProps) {
  return (
    <div className="pt-8">
      {/* ========================================================================= */}
      {/* HEADER LANGKAH 2 DENGAN BADGE JUMLAH ITEM & TOMBOL TAMBAH                 */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-start gap-3.5">
          {/* Badge Nomor Langkah Bulat */}
          <div className="w-7 h-7 rounded-full bg-dark-container text-white flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
            2
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
                Daftar Sampah Terpilah
              </h2>
              {/* Counter Badge */}
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-inset-gray border border-gray-200 text-text-secondary">
                {items.length} Item Terdaftar
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Pilih varian limbah serta masukkan estimasi bobot
            </p>
          </div>
        </div>

        {/* Tombol Tambah Baris Material Baru */}
        <button
          type="button"
          onClick={onAddItem}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-text-primary text-text-primary text-xs font-bold hover:bg-brand-neon hover:border-brand-neon transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Item</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* RENDER DAFTAR BARIS ITEM SAMPAH DINAMIS                                    */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        {items.map((item) => (
          <WasteItemRow
            key={item.tempId}
            item={item}
            categories={categories}
            onCategoryChange={onCategoryChange}
            onWeightChange={onWeightChange}
            onRemove={onRemoveItem}
            isOnlyItem={items.length <= 1}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* CHECKBOX KONFIRMASI STANDAR PEMILAHAN 3R                                   */}
      {/* ========================================================================= */}
      <div
        data-testid="terms-checkbox"
        role="checkbox"
        aria-checked={confirmedTerms}
        onClick={() => onConfirmedTermsChange(!confirmedTerms)}
        className="mt-6 p-4 rounded-2xl bg-inset-gray border border-gray-200 flex items-start gap-3 cursor-pointer hover:border-gray-300 transition-all select-none"
      >
        <div className="mt-0.5 text-text-primary shrink-0">
          {confirmedTerms ? (
            <CheckSquare className="w-5 h-5 text-dark-container fill-brand-neon" />
          ) : (
            <Square className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <div className="text-xs leading-relaxed text-text-primary">
          <strong className="font-bold">Konfirmasi Kesesuaian Standar Pilah 3R:</strong>{" "}
          <span className="text-text-secondary">
            Saya menyatakan bahwa seluruh barang yang diajukan sudah dikeringkan, disortir
            berdasarkan kategori material, dan tidak mengandung zat beracun B3 atau limbah rumah
            sakit berbahaya.
          </span>
        </div>
      </div>
    </div>
  );
}
