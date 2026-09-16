import React from "react";
import KatalogCard from "./KatalogCard";
import { KategoriSampah } from "@/types/kategoriSampah";
import { AlertCircle } from "lucide-react";

interface KatalogGridProps {
  items: KategoriSampah[];
  isLoading?: boolean;
  onOpenEstimator: (item: KategoriSampah) => void;
}

export default function KatalogGrid({
  items,
  isLoading = false,
  onOpenEstimator,
}: KatalogGridProps) {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 p-4 h-80 animate-pulse flex flex-col justify-between"
            >
              <div className="w-full h-44 bg-gray-200 rounded-xl" />
              <div className="space-y-2 mt-4">
                <div className="w-3/4 h-4 bg-gray-200 rounded" />
                <div className="w-1/2 h-3 bg-gray-100 rounded" />
              </div>
              <div className="w-full h-10 bg-gray-100 rounded-full mt-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 my-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-text-primary">
          Tidak Ditemukan Kategori Sampah
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto mt-1">
          Kategori sampah yang Anda cari tidak tersedia dalam filter saat ini. Silakan coba kata
          kunci lain atau pilih &quot;Semua Jenis&quot;.
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <KatalogCard
            key={item.id}
            item={item}
            onOpenEstimator={onOpenEstimator}
          />
        ))}
      </div>
    </section>
  );
}
