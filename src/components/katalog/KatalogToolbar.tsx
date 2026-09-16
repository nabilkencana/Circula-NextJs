"use client";

import React from "react";
import { Search } from "lucide-react";
import { JenisSampah } from "@/types/kategoriSampah";

interface KatalogToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedJenis: "semua" | JenisSampah;
  onSelectJenis: (jenis: "semua" | JenisSampah) => void;
  totalResults: number;
}

const CATEGORY_TABS: Array<{ label: string; value: "semua" | JenisSampah }> = [
  { label: "Semua Jenis", value: "semua" },
  { label: "Plastik", value: "plastik" },
  { label: "Kertas", value: "kertas" },
  { label: "Logam", value: "logam" },
  { label: "Kaca", value: "kaca" },
];

export default function KatalogToolbar({
  searchQuery,
  onSearchChange,
  selectedJenis,
  onSelectJenis,
  totalResults,
}: KatalogToolbarProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 my-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari jenis sampah, misal: Botol PET, Kardus Box, Aluminium..."
            className="w-full pl-10 pr-4 py-2.5 bg-inset-gray border border-gray-200 rounded-full text-xs sm:text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-dark-container focus:bg-white transition-all"
          />
        </div>

        {/* Segmented Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none bg-inset-gray p-1 rounded-full border border-gray-200/60">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedJenis === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => onSelectJenis(tab.value)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-dark-container text-white font-bold shadow-sm"
                    : "text-text-secondary hover:text-text-primary font-semibold hover:bg-white/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Counter (Subtle & clean) */}
      <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
        <span>
          Menampilkan <strong className="text-text-primary">{totalResults}</strong> jenis sampah daur ulang
        </span>
      </div>
    </div>
  );
}
