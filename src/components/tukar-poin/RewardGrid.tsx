"use client";

import React from "react";
import { Inbox } from "lucide-react";
import { HadiahItem } from "@/types/tukarPoin";
import RewardCard from "./RewardCard";

interface RewardGridProps {
  items: HadiahItem[];
  isPointSufficient: (poin: number) => boolean;
  kekuranganPoin: (poin: number) => number;
  onRedeem: (item: HadiahItem) => void;
  isLoading?: boolean;
}

export default function RewardGrid({
  items,
  isPointSufficient,
  kekuranganPoin,
  onRedeem,
  isLoading = false,
}: RewardGridProps) {
  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-gray-200/80 p-5 h-95 flex flex-col justify-between overflow-hidden relative"
          >
            <div className="aspect-16/10 bg-gray-200/70 rounded-2xl animate-shimmer" />
            <div className="space-y-2.5 mt-4">
              <div className="h-4 bg-gray-200/70 rounded w-1/3 animate-shimmer" />
              <div className="h-5 bg-gray-200/80 rounded w-3/4 animate-shimmer" />
              <div className="h-3 bg-gray-100 rounded w-1/2 animate-shimmer" />
            </div>
            <div className="h-12 bg-gray-200/70 rounded-full mt-4 animate-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full bg-white rounded-3xl border border-gray-200/80 p-16 text-center shadow-xs">
        <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4 animate-float shadow-inner">
          <Inbox className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          Tidak Ada Hadiah Ditemukan
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mt-1 leading-relaxed">
          Tidak ada produk atau voucher yang cocok dengan filter atau kata kunci pencarian Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="animate-card-enter flex flex-col h-full"
          style={{ animationDelay: `${Math.min(idx * 60, 480)}ms` }}
        >
          <RewardCard
            item={item}
            isSufficient={isPointSufficient(item.poinDibutuhkan)}
            kekurangan={kekuranganPoin(item.poinDibutuhkan)}
            onRedeem={onRedeem}
          />
        </div>
      ))}
    </div>
  );
}
