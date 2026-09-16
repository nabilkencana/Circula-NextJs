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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-gray-200 overflow-hidden h-96 animate-pulse p-4 flex flex-col justify-between"
          >
            <div className="aspect-video bg-gray-200 rounded-2xl" />
            <div className="space-y-2 mt-4">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-full" />
            </div>
            <div className="h-16 bg-gray-100 rounded-2xl my-3" />
            <div className="h-11 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4 shadow-2xs">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-text-primary">
          Tidak Ada Hadiah Ditemukan
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary max-w-sm mx-auto mt-1 leading-relaxed">
          Tidak ada voucher atau produk hadiah yang cocok dengan filter atau kata kunci yang Anda masukkan.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <RewardCard
            key={item.id}
            item={item}
            isSufficient={isPointSufficient(item.poinDibutuhkan)}
            kekurangan={kekuranganPoin(item.poinDibutuhkan)}
            onRedeem={onRedeem}
          />
        ))}
      </div>
    </div>
  );
}
