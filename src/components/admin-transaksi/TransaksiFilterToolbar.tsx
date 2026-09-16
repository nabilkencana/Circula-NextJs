"use client";

import React, { useState } from "react";
import { Search, Calendar, ChevronDown, Check } from "lucide-react";
import { TransaksiViewType } from "@/types/adminTransaksi";

interface TransaksiFilterToolbarProps {
  viewType: TransaksiViewType;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  selectedBulan: string;
  onBulanChange: (bulan: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function TransaksiFilterToolbar({
  viewType,
  statusFilter,
  onStatusFilterChange,
  selectedBulan,
  onBulanChange,
  searchQuery,
  onSearchChange,
}: TransaksiFilterToolbarProps) {
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  const months = [
    "Agustus 2026",
    "Juli 2026",
    "Juni 2026",
    "Mei 2026",
    "April 2026",
  ];

  const strStatusOptions = [
    { label: "Semua Status", value: "semua" },
    { label: "Menunggu Konfirmasi", value: "menunggu_konfirmasi" },
    { label: "Diverifikasi", value: "diverifikasi" },
    { label: "Selesai", value: "selesai" },
    { label: "Ditolak", value: "ditolak" },
  ];

  const tkrStatusOptions = [
    { label: "Semua Status", value: "semua" },
    { label: "Diproses", value: "diproses" },
    { label: "Selesai", value: "selesai" },
    { label: "Dibatalkan", value: "dibatalkan" },
  ];

  const currentOptions = viewType === "STR" ? strStatusOptions : tkrStatusOptions;

  return (
    <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 mb-6">
      {/* Left: Status Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {currentOptions.map((opt) => {
          const isActive = statusFilter === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onStatusFilterChange(opt.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-dark-container text-white shadow-xs"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Right: Month Selector Dropdown & Search Input */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
        {/* Month Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-text-primary px-3.5 py-2 rounded-full text-xs font-semibold transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span>{selectedBulan}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isMonthDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setIsMonthDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-2xl shadow-lg z-30 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                {months.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      onBulanChange(m);
                      setIsMonthDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-gray-50 transition-colors ${
                      selectedBulan === m
                        ? "font-bold text-text-primary bg-emerald-50/50"
                        : "text-gray-600"
                    }`}
                  >
                    <span>{m}</span>
                    {selectedBulan === m && (
                      <Check className="w-3.5 h-3.5 text-brand-neon-hover" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari Kode STR / TKR / Nama..."
            className="w-full h-9.5 pl-9 pr-3.5 rounded-full border border-gray-200 bg-white text-xs text-text-primary placeholder:text-gray-400 focus:outline-none focus:border-brand-neon focus:ring-2 focus:ring-brand-neon/20 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
