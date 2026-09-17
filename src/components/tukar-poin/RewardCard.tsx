"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Store,
  Zap,
  Heart,
  Smartphone,
  ShoppingBag,
  Sparkles,
  Flame,
} from "lucide-react";
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

  const isDonasi = item.isDonasi || item.kategori === "donasi" || item.namaHadiah.toLowerCase().includes("donasi");
  const isOutOfStock = item.stok <= 0;

  // Category label & icon
  const catLabel = item.categoryLabel || (
    item.kategori === "sembako" ? "Sembako" :
    item.kategori === "voucher" ? "E-Wallet" :
    item.kategori === "pulsa" ? "Pulsa & Data" :
    isDonasi ? "Donasi" : "Eco"
  );

  const rupiahText = item.nilaiRupiahText || (
    isDonasi ? "Penyaluran Terbuka" :
    item.kategori === "voucher" || item.kategori === "pulsa"
      ? `Nominal Rp ${(item.poinDibutuhkan * 300).toLocaleString("id-ID")}`
      : `Setara Rp ${(item.poinDibutuhkan * 350).toLocaleString("id-ID")}`
  );

  const locationText = item.lokasiInfo || (
    isDonasi ? "Penyaluran via Komunitas Warga (RT/RW Binaan)" :
    item.kategori === "voucher" || item.kategori === "pulsa"
      ? "Pengiriman Otomatis via WhatsApp (24 Jam)"
      : `Tersedia di Loket Unit (Sisa ${item.stok} ${item.satuan})`
  );

  return (
    <div className="bg-white border border-gray-200/80 rounded-3xl p-5 flex flex-col justify-between hover:border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div>
        {/* Top Image Container */}
        <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-[#F4F5F4] flex items-center justify-center mb-4">
          {/* Badge: Top-Left */}
          {item.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs tracking-wider ${
                  item.badge === "TERLARIS"
                    ? "bg-brand-neon text-black"
                    : item.badge === "FAVORIT"
                    ? "bg-[#E4F088] text-black"
                    : "bg-[#E0F2FE] text-[#0369A1]"
                }`}
              >
                {item.badge}
              </span>
            </div>
          )}

          {/* Category Pill: Bottom-Right */}
          <div className="absolute bottom-3 right-3 z-10">
            <span className="bg-black/75 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-xs">
              {isDonasi ? (
                <Heart className="w-3 h-3 fill-brand-neon text-brand-neon" />
              ) : item.kategori === "pulsa" ? (
                <Zap className="w-3 h-3 text-brand-neon fill-brand-neon" />
              ) : item.kategori === "voucher" ? (
                <Smartphone className="w-3 h-3 text-brand-neon" />
              ) : (
                <ShoppingBag className="w-3 h-3 text-brand-neon" />
              )}
              <span>{catLabel}</span>
            </span>
          </div>

          {/* Product Visual */}
          {isDonasi && !item.imageUrl ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-xs mb-2">
                <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-gray-500">
                Aksi Kebaikan Sosial
              </span>
            </div>
          ) : !imgError && (item.imageUrl || item.kategori) ? (
            <Image
              src={
                item.imageUrl ||
                (item.kategori === "sembako"
                  ? "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
                  : item.kategori === "pulsa" || item.kategori === "voucher"
                  ? "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80"
                  : "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80")
              }
              alt={item.namaHadiah}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <ShoppingBag className="w-10 h-10 text-gray-400 mb-2" />
              <span className="text-xs font-bold text-gray-500 line-clamp-1">
                {item.namaHadiah}
              </span>
            </div>
          )}
        </div>

        {/* Metadata Row: Points & Setara Rupiah */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-1 text-xs font-black text-[#111827]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
            <span>{item.poinDibutuhkan} Poin</span>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            {rupiahText}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-base text-[#111827] mt-1.5 line-clamp-1 leading-snug">
          {item.namaHadiah}
        </h3>

        {/* Stock / Fulfillment / Location Subtitle */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 line-clamp-1">
          {isDonasi ? (
            <Heart className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          ) : item.kategori === "voucher" || item.kategori === "pulsa" ? (
            <Zap className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          ) : (
            <Store className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          )}
          <span className="truncate">{locationText}</span>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="pt-4">
        {isDonasi ? (
          <button
            type="button"
            onClick={() => onRedeem(item)}
            className="btn-interactive w-full py-3 px-5 rounded-full bg-[#111315] hover:bg-black active:scale-[0.98] text-white font-extrabold text-sm flex items-center justify-between transition-all cursor-pointer shadow-xs group/btn"
          >
            <span className="pl-1">Donasikan Poin</span>
            <div className="w-7 h-7 rounded-full bg-brand-neon text-[#111315] flex items-center justify-center shrink-0 group-hover/btn:scale-110 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onRedeem(item)}
            disabled={isOutOfStock}
            className={`btn-interactive w-full py-3 px-5 rounded-full font-extrabold text-sm flex items-center justify-between transition-all cursor-pointer group/btn active:scale-[0.98] ${
              isOutOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-brand-neon hover:opacity-95 text-black shadow-xs hover:shadow-md"
            }`}
          >
            <span className="pl-1 text-black font-extrabold">
              {isOutOfStock ? "Stok Habis" : "Tukar Sekarang"}
            </span>
            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover/btn:scale-110 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
