"use client";

import React from "react";
import { Search, Calendar, ChevronDown } from "lucide-react";
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

const STATUS_TABS: Array<{ label: string; value: "semua" | StatusPenyetoran }> = [
  { label: "Semua Status", value: "semua" },
  { label: "Menunggu Konfirmasi", value: "menunggu_konfirmasi" },
  { label: "Diverifikasi", value: "diverifikasi" },
  { label: "Selesai", value: "selesai" },
  { label: "Ditolak", value: "ditolak" },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: Segmented Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {STATUS_TABS.map((tab) => {
            const isActive = filterStatus === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onFilterStatusChange(tab.value)}
                className={`px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#111315] text-white font-bold shadow-xs"
                    : "bg-[#F3F4F6]/80 hover:bg-[#E5E7EB] text-gray-600 hover:text-gray-900 font-semibold border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right: Month Selector & Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Month Dropdown Pill */}
          <div className="relative">
            <select
              value={filterBulan}
              onChange={(e) => onFilterBulanChange(e.target.value)}
              className="w-full sm:w-auto bg-[#F3F4F6]/80 hover:bg-[#E5E7EB]/80 border border-gray-200/80 rounded-full pl-9 pr-8 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#111315] focus:bg-white transition-all cursor-pointer appearance-none"
              aria-label="Pilih Periode Bulan"
            >
              <option value="2026-08">Agustus 2026</option>
              <option value="2026-07">Juli 2026</option>
              <option value="2026-06">Juni 2026</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Search Input Pill */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Cari Kode Setor STR-..."
              className="w-full sm:w-64 bg-[#F3F4F6]/80 hover:bg-[#E5E7EB]/50 border border-gray-200/80 rounded-full pl-9 pr-4 py-2 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <Search className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
