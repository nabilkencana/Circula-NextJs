import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Lock, Gift, AlertCircle, Sparkles } from "lucide-react";
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
  const [imgError, setImgError] = useState(false);
  const categoryLabel = item.kategori.toUpperCase();

  const isOutOfStock = item.stok <= 0;
  const isLowStock = item.stok > 0 && item.stok <= 5;
  const canRedeem = isSufficient && !isOutOfStock;

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-brand-neon hover:shadow-md transition-all group">
      {/* Top Image Container */}
      <div className="aspect-video relative overflow-hidden bg-gray-100 flex items-center justify-center">
        {!imgError && item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.namaHadiah}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-amber-50 to-emerald-50 flex flex-col items-center justify-center p-4 text-center">
            <Gift className="w-10 h-10 text-emerald-600/70 mb-1" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider line-clamp-1">
              {item.namaHadiah}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Floating Category Pill */}
        <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-dark-container/90 text-white font-extrabold text-[10px] tracking-wider uppercase border border-white/10 backdrop-blur-xs shadow-xs">
          {categoryLabel}
        </div>

        {/* Floating Stock Badge */}
        <div className="absolute top-3.5 right-3.5">
          {isOutOfStock ? (
            <span className="px-2.5 py-1 rounded-full bg-red-600 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-xs">
              Stok Habis
            </span>
          ) : isLowStock ? (
            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-xs">
              Sisa {item.stok} Unit
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-black/60 text-white/90 text-[10px] font-semibold backdrop-blur-xs">
              Stok: {item.stok}
            </span>
          )}
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
          {isOutOfStock ? (
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-bold text-xs shadow-2xs">
              Stok Tidak Tersedia
            </div>
          ) : isSufficient ? (
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-lime-100 text-emerald-800 font-bold text-xs shadow-2xs">
              Poin Anda Cukup
            </div>
          ) : (
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs shadow-2xs">
              Kurang {kekurangan} Poin
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-0">
        {canRedeem ? (
          <button
            type="button"
            onClick={() => onRedeem(item)}
            title="Klik untuk menukarkan poin dengan hadiah ini"
            className="w-full bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold h-11 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs text-xs sm:text-sm active:scale-[0.98]"
          >
            <span>Tukarkan Poin Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : isOutOfStock ? (
          <button
            type="button"
            disabled
            title="Hadiah ini saat ini habis dan sedang menunggu pasokan dari pengelola."
            className="w-full border border-gray-200 bg-gray-100 text-gray-400 font-semibold h-11 rounded-full cursor-not-allowed flex items-center justify-center gap-1.5 text-xs sm:text-sm"
          >
            <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
            <span>Stok Hadiah Habis</span>
          </button>
        ) : (
          <button
            type="button"
            disabled
            title={`Poin Anda belum cukup. Anda butuh ${item.poinDibutuhkan} poin (masih kurang ${kekurangan} poin lagi).`}
            className="w-full border border-gray-200 bg-inset-gray text-gray-400 font-semibold h-11 rounded-full cursor-not-allowed flex items-center justify-center gap-1.5 text-xs sm:text-sm"
          >
            <Lock className="w-3.5 h-3.5 text-gray-400" />
            <span>Poin Belum Cukup (Kurang {kekurangan}P)</span>
          </button>
        )}
      </div>
    </div>
  );
}
