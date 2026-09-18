"use client";

/**
 * ============================================================================
 * Komponen: RewardFilterToolbar
 * Direktori: src/components/tukar-poin/RewardFilterToolbar.tsx
 *
 * Fungsi Utama:
 * Toolbar penyaringan katalog hadiah (Filter & Search Toolbar).
 * Menyediakan:
 * 1. Segmented pill buttons untuk klasifikasi kategori barang (Semua Hadiah, Sembako & Dapur,
 *    Voucher & E-Wallet, Pulsa & Tagihan, Merchandise Eco) dilengkapi counter badge jumlah item.
 * 2. Kotak pencarian (Search Input) responsif dengan debounce input dan ikon search di kiri.
 *
 * Konsep Teknis:
 * - Real-time Count Badges: Menghitung secara dinamis banyaknya barang yang tersedia
 *   di setiap kategori melalui fungsi pembantu `matchCategory`.
 * ============================================================================
 */

import React from "react";
import { Search } from "lucide-react";
import { HadiahItem, KategoriHadiah } from "@/types/tukarPoin";

/**
 * Interface RewardFilterToolbarProps:
 * Kontrak properti yang diterima oleh toolbar filter katalog hadiah.
 */
interface RewardFilterToolbarProps {
  /** Kategori hadiah yang sedang aktif */
  selectedCategory: KategoriHadiah;
  /** Callback saat nasabah memilih kategori lain */
  onSelectCategory: (category: KategoriHadiah) => void;
  /** String kata kunci pencarian yang sedang aktif */
  searchQuery: string;
  /** Callback saat teks pencarian berubah */
  onSearchQueryChange: (query: string) => void;
  /** Seluruh array master barang hadiah untuk penghitungan badge */
  items: HadiahItem[];
}

export default function RewardFilterToolbar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchQueryChange,
  items,
}: RewardFilterToolbarProps) {
  /**
   * Helper untuk mencocokkan apakah suatu barang masuk ke dalam kategori tertentu
   */
  const matchCategory = (item: HadiahItem, cat: KategoriHadiah) => {
    const nama = item.namaHadiah.toLowerCase();
    if (cat === "sembako") return item.kategori === "sembako" || /beras|minyak|gula|sembako|telur|tepung/i.test(nama);
    if (cat === "voucher") return item.kategori === "voucher" || /voucher|wallet|gopay|ovo|dana|shopee/i.test(nama);
    if (cat === "pulsa") return item.kategori === "pulsa" || /pulsa|data|token|kuota|listrik/i.test(nama);
    if (cat === "merchandise") return item.kategori === "merchandise" || item.isDonasi || /donasi|tumbler|eco/i.test(nama);
    return true;
  };

  // Hitung jumlah record per kategori untuk ditampilkan di label tab
  const counts = {
    semua: items.length,
    sembako: items.filter((i) => matchCategory(i, "sembako")).length,
    voucher: items.filter((i) => matchCategory(i, "voucher")).length,
    pulsa: items.filter((i) => matchCategory(i, "pulsa")).length,
    merchandise: items.filter((i) => matchCategory(i, "merchandise")).length,
  };

  // Master daftar tab navigasi filter
  const tabs: Array<{ label: string; value: KategoriHadiah; count: number }> = [
    { label: "Semua Hadiah", value: "semua", count: counts.semua },
    { label: "Sembako & Dapur", value: "sembako", count: counts.sembako },
    { label: "Voucher & E-Wallet", value: "voucher", count: counts.voucher },
    { label: "Pulsa & Tagihan", value: "pulsa", count: counts.pulsa },
    { label: "Merchandise Eco", value: "merchandise", count: counts.merchandise },
  ];

  return (
    <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* ===================================================================== */}
      {/* SISI KIRI: Segmented Category Pills (Scrollable horizontal di HP)     */}
      {/* ===================================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = selectedCategory === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onSelectCategory(tab.value)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#111315] text-white shadow-xs"
                  : "bg-white border border-gray-200/90 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span>
                {tab.label} ({tab.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* SISI KANAN: Kotak Pencarian Teks (Search Input)                       */}
      {/* ===================================================================== */}
      <div className="relative min-w-70 sm:w-80">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Cari sembako, voucher pulsa, beras..."
          className="w-full bg-white border border-gray-200/90 rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-2xs"
        />
      </div>
    </div>
  );
}
