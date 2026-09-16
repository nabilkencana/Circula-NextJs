"use client";

import React from "react";
import { Search } from "lucide-react";
import { KategoriHadiah } from "@/types/tukarPoin";

interface RewardFilterToolbarProps {
  selectedCategory: KategoriHadiah;
  onSelectCategory: (category: KategoriHadiah) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  totalCount: number;
}

const CATEGORY_TABS: Array<{ label: string; value: KategoriHadiah }> = [
  { label: "Semua Reward", value: "semua" },
  { label: "Voucher Belanja & Pulsa", value: "voucher" },
  { label: "Sembako Dapur", value: "sembako" },
  { label: "Eco Merchandise", value: "merchandise" },
];

export default function RewardFilterToolbar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchQueryChange,
  totalCount,
}: RewardFilterToolbarProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Left Side: Segmented Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none bg-gray-100 p-1 rounded-full border border-gray-200">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.value;
            const labelWithCount =
              tab.value === "semua" ? `${tab.label} (${totalCount})` : tab.label;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onSelectCategory(tab.value)}
                className={`px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-dark-container text-white font-bold shadow-xs"
                    : "text-text-secondary hover:text-text-primary font-semibold hover:bg-white/50"
                }`}
              >
                {labelWithCount}
              </button>
            );
          })}
        </div>

        {/* Right Side: Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Cari voucher, sembako..."
            className="w-full md:w-64 bg-inset-gray border border-gray-200 rounded-full pl-9 pr-4 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-dark-container focus:bg-white transition-all shadow-2xs"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
            <Search className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
