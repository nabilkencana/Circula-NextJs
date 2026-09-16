"use client";

import React from "react";
import { Search, Calendar } from "lucide-react";
import { StatusPenyetoran } from "@/types/historiSetor";

interface HistoriFilterToolbarProps {
  filterStatus: "semua" | StatusPenyetoran;
  onFilterStatusChange: (status: "semua" | StatusPenyetoran) => void;
  filterBulan: string;
  onFilterBulanChange: (bulan: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  statusCounts?: {
    semua: number;
    menunggu_konfirmasi: number;
    diverifikasi: number;
    selesai: number;
    ditolak: number;
  };
}

type StatusCountKey = "semua" | "menunggu_konfirmasi" | "diverifikasi" | "selesai" | "ditolak";

const STATUS_TABS: Array<{ label: string; value: "semua" | StatusPenyetoran; key: StatusCountKey }> = [
  { label: "Semua Status", value: "semua", key: "semua" },
  { label: "Menunggu Konfirmasi", value: "menunggu_konfirmasi", key: "menunggu_konfirmasi" },
  { label: "Diverifikasi", value: "diverifikasi", key: "diverifikasi" },
  { label: "Selesai", value: "selesai", key: "selesai" },
  { label: "Ditolak", value: "ditolak", key: "ditolak" },
];

export default function HistoriFilterToolbar({
  filterStatus,
  onFilterStatusChange,
  filterBulan,
  onFilterBulanChange,
  searchQuery,
  onSearchQueryChange,
}: HistoriFilterToolbarProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: Segmented Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none bg-gray-100 p-1 rounded-full border border-gray-200">
          {STATUS_TABS.map((tab) => {
            const isActive = filterStatus === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onFilterStatusChange(tab.value)}
                className={`px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
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

        {/* Right: Month Selector & Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Month Dropdown */}
          <div className="relative">
            <select
              value={filterBulan}
              onChange={(e) => onFilterBulanChange(e.target.value)}
              className="w-full sm:w-auto bg-inset-gray border border-gray-200 rounded-full pl-9 pr-8 py-2 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:border-dark-container focus:bg-white transition-all cursor-pointer appearance-none"
              aria-label="Pilih Periode Bulan"
            >
              <option value="2026-08">Agustus 2026</option>
              <option value="2026-07">Juli 2026</option>
              <option value="2026-06">Juni 2026</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Cari Kode Setor STR-..."
              className="w-full sm:w-60 bg-inset-gray border border-gray-200 rounded-full pl-9 pr-4 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-dark-container focus:bg-white transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
              <Search className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
