"use client";

import React from "react";
import { Download, Printer } from "lucide-react";
import { TipeNota } from "@/types/nota";

interface NotaActionToolbarProps {
  activeTab: TipeNota;
  onTabChange: (tab: TipeNota) => void;
  onPrint: () => void;
  onDownloadPdf: () => void;
}

export default function NotaActionToolbar({
  activeTab,
  onTabChange,
  onPrint,
  onDownloadPdf,
}: NotaActionToolbarProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-0 pt-8 pb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 print:hidden">
      {/* Left Side: Segmented Receipt Type Switcher */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full border border-gray-200 self-start sm:self-auto">
        <button
          type="button"
          onClick={() => onTabChange("setor")}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "setor"
              ? "bg-dark-container text-white font-bold shadow-xs"
              : "text-text-secondary hover:text-text-primary font-semibold hover:bg-white/50"
          }`}
        >
          • Nota Penyetoran Sampah (STR)
        </button>

        <button
          type="button"
          onClick={() => onTabChange("tukar")}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "tukar"
              ? "bg-dark-container text-white font-bold shadow-xs"
              : "text-text-secondary hover:text-text-primary font-semibold hover:bg-white/50"
          }`}
        >
          Nota Penukaran Poin (TKR)
        </button>
      </div>

      {/* Right Side: Print & Download Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onDownloadPdf}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-gray-200 bg-white text-text-primary font-bold text-xs px-5 py-2.5 rounded-full hover:bg-inset-gray hover:border-gray-300 transition-all shadow-xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-text-secondary" />
          <span>Unduh PDF</span>
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold text-xs px-6 py-2.5 rounded-full transition-all shadow-xs cursor-pointer active:scale-[0.98]"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak Nota Transaksi</span>
        </button>
      </div>
    </div>
  );
}
