"use client";

import React, { useState } from "react";
import { Calendar, ChevronDown, Download, Printer, Check } from "lucide-react";

interface LaporanPeriodToolbarProps {
  selectedBulan: string;
  onSelectMonth: (bulan: string) => void;
  onDownloadCsv: () => void;
  onPrintPdf: () => void;
}

export default function LaporanPeriodToolbar({
  selectedBulan,
  onSelectMonth,
  onDownloadCsv,
  onPrintPdf,
}: LaporanPeriodToolbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const monthOptions = [
    { label: "Agustus 2026 (2026-08)", value: "2026-08" },
    { label: "Juli 2026 (2026-07)", value: "2026-07" },
    { label: "Juni 2026 (2026-06)", value: "2026-06" },
  ];

  const quickPills = [
    { label: "Bulan Ini (Agu 2026)", value: "2026-08" },
    { label: "Juli 2026", value: "2026-07" },
    { label: "Juni 2026", value: "2026-06" },
  ];

  const currentLabel =
    monthOptions.find((m) => m.value === selectedBulan)?.label ||
    `Periode: ${selectedBulan}`;

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2 pb-6 print:hidden">
      {/* Left: Period Dropdown & Quick Month Pills */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Period Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-text-primary px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span>Periode: {currentLabel.replace(" (", " (")}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-lg z-30 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                {monthOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSelectMonth(opt.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between hover:bg-gray-50 transition-colors ${
                      selectedBulan === opt.value
                        ? "font-bold text-text-primary bg-emerald-50/50"
                        : "text-gray-600"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selectedBulan === opt.value && (
                      <Check className="w-3.5 h-3.5 text-brand-neon-hover" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Quick Month Pills */}
        <div className="bg-[#F4F5F4] p-1 rounded-full flex items-center gap-1 border border-gray-200/60">
          {quickPills.map((pill) => {
            const isActive = selectedBulan === pill.value;
            return (
              <button
                key={pill.value}
                type="button"
                onClick={() => onSelectMonth(pill.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  isActive
                    ? "bg-dark-container text-white font-bold shadow-xs"
                    : "text-gray-600 hover:text-text-primary font-medium hover:bg-white/60"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Export CTAs */}
      <div className="flex items-center gap-2.5 self-end md:self-auto">
        {/* CSV Export */}
        <button
          type="button"
          onClick={onDownloadCsv}
          className="flex items-center gap-1.5 border border-gray-200 bg-white text-xs font-bold text-text-primary px-4 py-2 rounded-full hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Unduh CSV / Excel</span>
        </button>

        {/* PDF Print */}
        <button
          type="button"
          onClick={onPrintPdf}
          className="flex items-center gap-1.5 bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs px-5 py-2 rounded-full transition-all shadow-2xs cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5 text-text-primary" />
          <span>Cetak Laporan PDF</span>
        </button>
      </div>
    </div>
  );
}
