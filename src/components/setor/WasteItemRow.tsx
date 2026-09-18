"use client";

/**
 * ============================================================================
 * Komponen: WasteItemRow
 * Direktori: src/components/setor/WasteItemRow.tsx
 *
 * Fungsi Utama:
 * Merender baris item individu dalam formulir pengajuan multi-item sampah.
 * Memungkinkan nasabah untuk:
 * 1. Memilih kategori material daur ulang dari daftar dropdown.
 * 2. Mengatur estimasi berat sampah (dalam kg) menggunakan tombol stepper (- / +)
 *    maupun input teks langsung dengan validasi format koma/titik.
 * 3. Melihat kalkulasi seketika (realtime) subtotal poin reward dan nominal rupiah.
 * 4. Menghapus baris item (tombol hapus dinonaktifkan jika hanya ada 1 item tersisa).
 *
 * Konsep Teknis & Aksesibilitas:
 * - Controlled Component: Menerima nilai `item` dan memancarkan perubahan melalui callback
 *   `onCategoryChange`, `onWeightChange`, dan `onRemove`.
 * - Responsive Grid Layout: Menggunakan 12 kolom Tailwind (`grid-cols-12`) untuk proporsi
 *   kategori, stepper bobot, subtotal poin, dan tombol aksi hapus.
 * - Aksesibilitas WAI-ARIA: Menggunakan `aria-label` deskriptif pada tombol stepper dan input berat.
 * ============================================================================
 */

import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { SetorSampahItemInput } from "@/types/setorSampah";
import { KategoriSampah } from "@/types/kategoriSampah";

/**
 * Interface WasteItemRowProps:
 * Kontrak properti yang diperlukan untuk merender satu baris item sampah.
 */
interface WasteItemRowProps {
  /** Objek data item sampah (id sementara, kategori, berat, subtotal) */
  item: SetorSampahItemInput;
  /** Daftar master kategori sampah untuk opsi dropdown */
  categories: KategoriSampah[];
  /** Callback saat nasabah memilih kategori sampah baru */
  onCategoryChange: (tempId: string, kategoriId: string) => void;
  /** Callback saat nasabah mengubah berat sampah (+/- step atau ketikan langsung) */
  onWeightChange: (tempId: string, deltaOrValue: number | string) => void;
  /** Callback saat nasabah menekan tombol hapus baris */
  onRemove: (tempId: string) => void;
  /** Penanda apakah item ini merupakan satu-satunya baris yang tersisa */
  isOnlyItem: boolean;
}

export default function WasteItemRow({
  item,
  categories,
  onCategoryChange,
  onWeightChange,
  onRemove,
  isOnlyItem,
}: WasteItemRowProps) {
  // Format tampilan berat dengan pemisah desimal koma (standar Indonesia: "4,5" bukan "4.5")
  const formattedWeight = item.beratKg.toFixed(1).replace(".", ",");

  return (
    <div className="bg-inset-gray border border-gray-200 rounded-2xl p-4 transition-all hover:border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* ===================================================================== */}
        {/* KOLOM 1: Dropdown Pemilih Kategori Sampah (MD: 6 kolom)              */}
        {/* ===================================================================== */}
        <div className="md:col-span-6">
          <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1.5">
            Kategori Material
          </label>
          <div className="relative">
            <select
              value={item.kategoriSampahId}
              onChange={(e) => onCategoryChange(item.tempId, e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:border-dark-container focus:ring-1 focus:ring-dark-container cursor-pointer transition-all appearance-none pr-8"
              aria-label="Pilih Kategori Sampah"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.namaKategori} — {cat.poinPerKg} Poin/kg (Rp {cat.hargaPerKg.toLocaleString("id-ID")}/kg)
                </option>
              ))}
            </select>
            {/* Indikator Panah Dropdown Kustom */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* KOLOM 2: Stepper dan Input Estimasi Berat Sampah (MD: 3 kolom)        */}
        {/* ===================================================================== */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1.5">
            Estimasi Berat (Kg)
          </label>
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl p-1 justify-between">
            {/* Tombol Kurang (-0.5 kg) */}
            <button
              type="button"
              onClick={() => onWeightChange(item.tempId, -0.5)}
              disabled={item.beratKg <= 0.1}
              className="w-8 h-8 rounded-lg bg-inset-gray hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-inset-gray flex items-center justify-center text-text-primary transition-colors cursor-pointer"
              aria-label="Kurangi berat 0.5 kg"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            {/* Input Nilai Berat Langsung */}
            <div className="flex items-center justify-center flex-1">
              <input
                type="text"
                value={formattedWeight}
                onChange={(e) => onWeightChange(item.tempId, e.target.value)}
                className="w-14 text-center font-extrabold text-sm text-text-primary bg-transparent focus:outline-none"
                aria-label="Nilai berat dalam kilogram"
              />
            </div>

            {/* Tombol Tambah (+0.5 kg) */}
            <button
              type="button"
              onClick={() => onWeightChange(item.tempId, 0.5)}
              className="w-8 h-8 rounded-lg bg-inset-gray hover:bg-gray-200 flex items-center justify-center text-text-primary transition-colors cursor-pointer"
              aria-label="Tambah berat 0.5 kg"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* KOLOM 3: Tampilan Subtotal Poin & Rupiah Realtime (MD: 2 kolom)       */}
        {/* ===================================================================== */}
        <div className="md:col-span-2 text-left md:text-right">
          <div className="inline-block md:block">
            <div className="text-sm font-extrabold text-text-primary leading-tight">
              {item.subtotalPoin} Poin
            </div>
            <div className="text-[11px] font-semibold text-text-secondary mt-0.5">
              Rp {item.subtotalRupiah.toLocaleString("id-ID")}
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* KOLOM 4: Tombol Aksi Hapus Baris Item (MD: 1 kolom)                   */}
        {/* ===================================================================== */}
        <div className="md:col-span-1 flex justify-end">
          <button
            type="button"
            onClick={() => onRemove(item.tempId)}
            disabled={isOnlyItem}
            className={`p-2.5 rounded-xl transition-all ${
              isOnlyItem
                ? "text-gray-300 cursor-not-allowed opacity-40"
                : "text-gray-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
            }`}
            aria-label={`Hapus ${item.namaKategori}`}
            title={isOnlyItem ? "Minimal 1 jenis sampah terdaftar" : "Hapus baris"}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
