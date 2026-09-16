"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { SetorSampahItemInput } from "@/types/setorSampah";
import { KategoriSampah } from "@/types/kategoriSampah";
import ScheduleLogisticsSection from "./ScheduleLogisticsSection";
import MultiItemPickerSection from "./MultiItemPickerSection";

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
      {/* Error Alert if any */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-xs font-semibold animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Step 1: Logistics and Date */}
      <ScheduleLogisticsSection
        tanggal={tanggal}
        onTanggalChange={onTanggalChange}
        metodePenyerahan={metodePenyerahan}
        onMetodeChange={onMetodeChange}
        catatan={catatan}
        onCatatanChange={onCatatanChange}
      />

      {/* Step 2: Multi-Item Recyclable Picker */}
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
