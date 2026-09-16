import React from "react";
import { TransaksiViewType } from "@/types/adminTransaksi";
import { Recycle, Gift } from "lucide-react";

interface TransaksiTypeSwitcherProps {
  activeType: TransaksiViewType;
  onSwitch: (type: TransaksiViewType) => void;
}

export default function TransaksiTypeSwitcher({
  activeType,
  onSwitch,
}: TransaksiTypeSwitcherProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <button
        type="button"
        onClick={() => onSwitch("STR")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
          activeType === "STR"
            ? "bg-dark-container text-white shadow-sm ring-1 ring-white/10"
            : "bg-[#F1F3F0] text-gray-700 hover:bg-gray-200 hover:text-text-primary"
        }`}
      >
        <Recycle className="w-4 h-4 text-emerald-400" />
        <span>Penyetoran Sampah (STR)</span>
      </button>

      <button
        type="button"
        onClick={() => onSwitch("TKR")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
          activeType === "TKR"
            ? "bg-dark-container text-white shadow-sm ring-1 ring-white/10"
            : "bg-[#F1F3F0] text-gray-700 hover:bg-gray-200 hover:text-text-primary"
        }`}
      >
        <Gift className="w-4 h-4 text-amber-500" />
        <span>Penukaran Poin Hadiah (TKR)</span>
      </button>
    </div>
  );
}
