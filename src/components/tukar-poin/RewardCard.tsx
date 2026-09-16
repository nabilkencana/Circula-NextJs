import React from "react";
import Image from "next/image";
import { ArrowRight, Lock } from "lucide-react";
import { HadiahItem } from "@/types/tukarPoin";

interface RewardCardProps {
  item: HadiahItem;
  isSufficient: boolean;
  kekurangan: number;
  onRedeem: (item: HadiahItem) => void;
}

export default function RewardCard({
  item,
  isSufficient,
  kekurangan,
  onRedeem,
}: RewardCardProps) {
  const categoryLabel = item.kategori.toUpperCase();

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-brand-neon hover:shadow-md transition-all group">
      {/* Top Image Container */}
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        <Image
          src={item.imageUrl}
          alt={item.namaHadiah}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Floating Category Pill */}
        <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-dark-container/90 text-white font-extrabold text-[10px] tracking-wider uppercase border border-white/10 backdrop-blur-xs shadow-xs">
          {categoryLabel}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-text-primary group-hover:text-dark-container transition-colors line-clamp-1">
            {item.namaHadiah}
          </h3>
          <p className="text-xs text-text-secondary mt-1 line-clamp-2 leading-relaxed">
            {item.deskripsi}
          </p>
        </div>

        {/* Inset Metric Box */}
        <div className="bg-inset-gray border border-gray-200 rounded-2xl p-3 my-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block">
              Biaya Poin
            </span>
            <span className="font-extrabold text-lg text-text-primary">
              {item.poinDibutuhkan} Poin
            </span>
          </div>

          {/* Point Sufficiency Status Pill */}
          {isSufficient ? (
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-lime-100 text-emerald-800 font-bold text-xs shadow-2xs">
              Poin Anda Cukup
            </div>
          ) : (
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs shadow-2xs">
              Kurang {kekurangan} Poin Lagi
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-0">
        {isSufficient ? (
          <button
            type="button"
            onClick={() => onRedeem(item)}
            className="w-full bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold h-11 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs text-xs sm:text-sm active:scale-[0.98]"
          >
            <span>Tukarkan Poin Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="w-full border border-gray-200 bg-inset-gray text-gray-400 font-semibold h-11 rounded-full cursor-not-allowed flex items-center justify-center gap-1.5 text-xs sm:text-sm"
          >
            <Lock className="w-3.5 h-3.5 text-gray-400" />
            <span>Poin Belum Mencukupi</span>
          </button>
        )}
      </div>
    </div>
  );
}
