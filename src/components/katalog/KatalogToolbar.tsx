"use client";

import React from "react";
import { Search } from "lucide-react";
import { JenisSampah } from "@/types/kategoriSampah";

/**
 * Interface properties untuk komponen bilah alat pencarian dan filter katalog (KatalogToolbar).
 */
interface KatalogToolbarProps {
  /** Nilai string query pencarian teks */
  searchQuery: string;
  /** Callback saat nilai query pencarian berubah */
  onSearchChange: (query: string) => void;
  /** Filter kategori jenis sampah yang sedang aktif */
  selectedJenis: "semua" | JenisSampah;
  /** Callback saat pengguna memilih pil filter jenis sampah */
  onSelectJenis: (jenis: "semua" | JenisSampah) => void;
  /** Jumlah total item kategori sampah yang cocok dengan filter */
  totalResults: number;
}

/**
 * Pilihan tab segment kategori sampah beserta label tampilannya
 */
const CATEGORY_TABS: Array<{ label: string; value: "semua" | JenisSampah }> = [
  { label: "Semua Jenis", value: "semua" },
  { label: "Plastik", value: "plastik" },
  { label: "Kertas", value: "kertas" },
  { label: "Logam", value: "logam" },
  { label: "Kaca", value: "kaca" },
];

/**
 * Komponen Bilah Alat Filter & Pencarian Katalog (KatalogToolbar)
 *
 * Mengelola interaksi filter katalog:
 * 1. Input Pencarian Real-time: Mencari nama material (misal: "Botol PET", "Kardus", "Tembaga").
 * 2. Segmented Pill Tabs: Pemilihan instan jenis material ('Semua', 'Plastik', 'Kertas', 'Logam', 'Kaca').
 * 3. Indikator Jumlah Hasil: Menampilkan hitungan kategori aktif yang cocok.
 *
 * @param props Properti bilah alat pencarian
 * @returns JSX Element bilah alat katalog
 */
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
        {/* ================= BILAH PENCARIAN TEKS ================= */}
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

        {/* ================= PILL FILTER KATEGORI JENIS SAMPAH ================= */}
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

      {/* ================= PENGHITUNG HASIL AKTIF ================= */}
      <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
        <span>
          Menampilkan <strong className="text-text-primary">{totalResults}</strong> jenis sampah daur ulang
        </span>
      </div>
    </div>
  );
}

