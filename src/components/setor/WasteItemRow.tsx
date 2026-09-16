"use client";

import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { SetorSampahItemInput } from "@/types/setorSampah";
import { KategoriSampah } from "@/types/kategoriSampah";

interface WasteItemRowProps {
  item: SetorSampahItemInput;
  categories: KategoriSampah[];
  onCategoryChange: (tempId: string, kategoriId: string) => void;
  onWeightChange: (tempId: string, deltaOrValue: number | string) => void;
  onRemove: (tempId: string) => void;
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
  // Format displayed weight e.g. "4,5" or "2,0"
  const formattedWeight = item.beratKg.toFixed(1).replace(".", ",");

  return (
    <div className="bg-inset-gray border border-gray-200 rounded-2xl p-4 transition-all hover:border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Col 1: Kategori Material Selector (MD: 5 cols) */}
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
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Col 2: Stepper Estimasi Berat (MD: 3 cols) */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1.5">
            Estimasi Berat (Kg)
          </label>
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl p-1 justify-between">
            <button
              type="button"
              onClick={() => onWeightChange(item.tempId, -0.5)}
              disabled={item.beratKg <= 0.1}
              className="w-8 h-8 rounded-lg bg-inset-gray hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-inset-gray flex items-center justify-center text-text-primary transition-colors cursor-pointer"
              aria-label="Kurangi berat 0.5 kg"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center flex-1">
              <input
                type="text"
                value={formattedWeight}
                onChange={(e) => onWeightChange(item.tempId, e.target.value)}
                className="w-14 text-center font-extrabold text-sm text-text-primary bg-transparent focus:outline-none"
                aria-label="Nilai berat dalam kilogram"
              />
            </div>

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

        {/* Col 3: Subtotal Badge (MD: 2 cols) */}
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

        {/* Col 4: Delete Button (MD: 1 col) */}
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
