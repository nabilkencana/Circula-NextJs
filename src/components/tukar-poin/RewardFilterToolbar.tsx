"use client";

import React from "react";
import { Search } from "lucide-react";
import { HadiahItem, KategoriHadiah } from "@/types/tukarPoin";

interface RewardFilterToolbarProps {
  selectedCategory: KategoriHadiah;
  onSelectCategory: (category: KategoriHadiah) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  items: HadiahItem[];
}

export default function RewardFilterToolbar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchQueryChange,
  items,
}: RewardFilterToolbarProps) {
  const matchCategory = (item: HadiahItem, cat: KategoriHadiah) => {
    const nama = item.namaHadiah.toLowerCase();
    if (cat === "sembako") return item.kategori === "sembako" || /beras|minyak|gula|sembako|telur|tepung/i.test(nama);
    if (cat === "voucher") return item.kategori === "voucher" || /voucher|wallet|gopay|ovo|dana|shopee/i.test(nama);
    if (cat === "pulsa") return item.kategori === "pulsa" || /pulsa|data|token|kuota|listrik/i.test(nama);
    if (cat === "merchandise") return item.kategori === "merchandise" || item.isDonasi || /donasi|tumbler|eco/i.test(nama);
    return true;
  };

  const counts = {
    semua: items.length,
    sembako: items.filter((i) => matchCategory(i, "sembako")).length,
    voucher: items.filter((i) => matchCategory(i, "voucher")).length,
    pulsa: items.filter((i) => matchCategory(i, "pulsa")).length,
    merchandise: items.filter((i) => matchCategory(i, "merchandise")).length,
  };

  const tabs: Array<{ label: string; value: KategoriHadiah; count: number }> = [
    { label: "Semua Hadiah", value: "semua", count: counts.semua },
    { label: "Sembako & Dapur", value: "sembako", count: counts.sembako },
    { label: "Voucher & E-Wallet", value: "voucher", count: counts.voucher },
    { label: "Pulsa & Tagihan", value: "pulsa", count: counts.pulsa },
    { label: "Merchandise Eco", value: "merchandise", count: counts.merchandise },
  ];

  return (
    <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Left: Category Segment Pills */}
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

      {/* Right: Search Input */}
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
