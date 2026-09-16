"use client";

import React from "react";
import { Plus, CheckSquare, Square } from "lucide-react";
import { SetorSampahItemInput } from "@/types/setorSampah";
import { KategoriSampah } from "@/types/kategoriSampah";
import WasteItemRow from "./WasteItemRow";

interface MultiItemPickerSectionProps {
  items: SetorSampahItemInput[];
  categories: KategoriSampah[];
  onAddItem: () => void;
  onRemoveItem: (tempId: string) => void;
  onCategoryChange: (tempId: string, kategoriId: string) => void;
  onWeightChange: (tempId: string, deltaOrValue: number | string) => void;
  confirmedTerms: boolean;
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
      {/* Step Header with + Tambah Item Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-start gap-3.5">
          <div className="w-7 h-7 rounded-full bg-dark-container text-white flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
            2
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
                Daftar Sampah Terpilah
              </h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-inset-gray border border-gray-200 text-text-secondary">
                {items.length} Item Terdaftar
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Pilih varian limbah serta masukkan estimasi bobot
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddItem}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-text-primary text-text-primary text-xs font-bold hover:bg-brand-neon hover:border-brand-neon transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Item</span>
        </button>
      </div>

      {/* Dynamic Item Rows */}
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

      {/* Confirmation Checkbox Container */}
      <div
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
