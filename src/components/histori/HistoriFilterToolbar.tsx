"use client";

/**
 * ============================================================================
 * Komponen: HistoriFilterToolbar
 * Direktori: src/components/histori/HistoriFilterToolbar.tsx
 *
 * Fungsi Utama:
 * Toolbar interaktif untuk menyaring (filter) dan mencari data riwayat penyetoran.
 * Menyediakan:
 * 1. Segmented pill tabs untuk klasifikasi status transaksi ("semua", "menunggu_konfirmasi",
 *    "diverifikasi", "selesai", "ditolak").
 * 2. Dropdown pemilihan periode bulan (format YYYY-MM).
 * 3. Kotak pencarian (search box) berbasis kata kunci (kode setor STR-..., nama kategori, dsb).
 *
 * Konsep Teknis & Arsitektur Frontend:
 * - Controlled Component: Menerima seluruh state filter dan callback handler dari parent hook/page.
 * - Horizontal Scroll Bar: Tabs filter menggunakan `overflow-x-auto` dan `whitespace-nowrap`
 *   agar ramah terhadap perangkat seluler (responsive mobile swipe).
 * - Aksesibilitas: Dilengkapi atribut `aria-label` untuk mendukung screen reader.
 * ============================================================================
 */

import React from "react";
import { Search, Calendar, ChevronDown } from "lucide-react";
import { StatusPenyetoran } from "@/types/historiSetor";

/**
 * Interface HistoriFilterToolbarProps:
 * Kontrak properti yang harus dipasok oleh komponen induk (halaman status riwayat).
 */
interface HistoriFilterToolbarProps {
  /** Status aktif yang sedang difilter atau 'semua' */
  filterStatus: "semua" | StatusPenyetoran;
  /** Callback untuk mengubah status filter */
  onFilterStatusChange: (status: "semua" | StatusPenyetoran) => void;
  /** Periode bulan terpilih (format string YYYY-MM, contoh: "2026-08") */
  filterBulan: string;
  /** Callback untuk mengubah periode bulan */
  onFilterBulanChange: (bulan: string) => void;
  /** Teks kata kunci pencarian aktif */
  searchQuery: string;
  /** Callback untuk memperbarui kata kunci pencarian */
  onSearchQueryChange: (query: string) => void;
  /** Jumlah agregat transaksi untuk masing-masing kategori status (opsional) */
  statusCounts?: {
    semua: number;
    menunggu_konfirmasi: number;
    diverifikasi: number;
    selesai: number;
    ditolak: number;
  };
}

/**
 * Master opsi tab status penyetoran yang dirender di toolbar.
 * Setiap item memetakan label deskriptif berbahasa Indonesia dengan nilai enum status sistem.
 */
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
        {/* ========================================================================= */}
        {/* BAGIAN KIRI: Segmented Status Filter Tabs (Scrollable horizontal di HP) */}
        {/* ========================================================================= */}
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

        {/* ========================================================================= */}
        {/* BAGIAN KANAN: Filter Periode Bulan & Input Pencarian Kode Transaksi     */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Dropdown Pemilihan Periode Bulan */}
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
            {/* Ikon Kalender Sisi Kiri */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            {/* Indikator Panah Dropdown Sisi Kanan */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Kotak Pencarian Teks (Search Input) */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Cari Kode Setor STR-..."
              className="w-full sm:w-64 bg-[#F3F4F6]/80 hover:bg-[#E5E7EB]/50 border border-gray-200/80 rounded-full pl-9 pr-4 py-2 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#111315] focus:bg-white transition-all"
            />
            {/* Ikon Kaca Pembesar di Kiri Input */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <Search className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
