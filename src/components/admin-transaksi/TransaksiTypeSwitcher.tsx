/**
 * @file TransaksiTypeSwitcher.tsx
 * @description Komponen tombol sakelar tab (Type Switcher) untuk memilih jenis buku besar transaksi:
 * - Penyetoran Sampah (STR)
 * - Penukaran Poin Hadiah (TKR)
 * 
 * @module Components/AdminTransaksi/TransaksiTypeSwitcher
 */

import React from "react";
import { TransaksiViewType } from "@/types/adminTransaksi";
import { Recycle, Gift } from "lucide-react";

/**
 * Properti untuk komponen TransaksiTypeSwitcher
 * 
 * @interface TransaksiTypeSwitcherProps
 * @property {TransaksiViewType} activeType - Tab yang sedang aktif ("STR" atau "TKR").
 * @property {(type: TransaksiViewType) => void} onSwitch - Callback saat tab diklik.
 */
interface TransaksiTypeSwitcherProps {
  activeType: TransaksiViewType;
  onSwitch: (type: TransaksiViewType) => void;
}

/**
 * Komponen TransaksiTypeSwitcher
 * 
 * @component
 * @param {TransaksiTypeSwitcherProps} props - Properti status tab aktif dan handler pergantian.
 * @returns {JSX.Element} Kumpulan tombol pil pengalih tab transaksi.
 */
export default function TransaksiTypeSwitcher({
  activeType,
  onSwitch,
}: TransaksiTypeSwitcherProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4" role="tablist" aria-label="Pilihan Jenis Transaksi">
      {/* Tombol Tab Penyetoran Sampah (STR) */}
      <button
        type="button"
        role="tab"
        aria-selected={activeType === "STR"}
        onClick={() => onSwitch("STR")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
          activeType === "STR"
            ? "bg-dark-container text-white shadow-sm ring-1 ring-white/10"
            : "bg-[#F1F3F0] text-gray-700 hover:bg-gray-200 hover:text-text-primary"
        }`}
      >
        <Recycle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
        <span>Penyetoran Sampah (STR)</span>
      </button>

      {/* Tombol Tab Penukaran Poin Hadiah (TKR) */}
      <button
        type="button"
        role="tab"
        aria-selected={activeType === "TKR"}
        onClick={() => onSwitch("TKR")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
          activeType === "TKR"
            ? "bg-dark-container text-white shadow-sm ring-1 ring-white/10"
            : "bg-[#F1F3F0] text-gray-700 hover:bg-gray-200 hover:text-text-primary"
        }`}
      >
        <Gift className="w-4 h-4 text-amber-500" aria-hidden="true" />
        <span>Penukaran Poin Hadiah (TKR)</span>
      </button>
    </div>
  );
}
