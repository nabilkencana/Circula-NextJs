import React from "react";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { KategoriSampah } from "@/types/kategoriSampah";

interface KatalogCardProps {
  item: KategoriSampah;
  onOpenEstimator: (item: KategoriSampah) => void;
}

const BADGE_COLOR_MAP: Record<string, string> = {
  plastik: "bg-dark-container/90 text-brand-neon border-brand-neon/40",
  kertas: "bg-dark-container/90 text-amber-300 border-amber-300/40",
  logam: "bg-dark-container/90 text-emerald-300 border-emerald-300/40",
  kaca: "bg-dark-container/90 text-cyan-300 border-cyan-300/40",
};

export default function KatalogCard({ item, onOpenEstimator }: KatalogCardProps) {
  const badgeClass =
    BADGE_COLOR_MAP[item.jenisSampah] ||
    "bg-dark-container/90 text-white border-white/20";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Thumbnail with Category Tag */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={item.imageUrl}
          alt={item.namaKategori}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${badgeClass}`}
          >
            {item.jenisSampah}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-text-primary leading-snug group-hover:text-emerald-700 transition-colors">
            {item.namaKategori}
          </h3>
          <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">
            {item.syaratKondisi || item.deskripsi}
          </p>
        </div>

        {/* Pricing & Reward Inset Box */}
        <div className="mt-5 pt-3 border-t border-gray-200/80">
          <div className="grid grid-cols-2 gap-2 bg-inset-gray p-3 rounded-xl border border-gray-200 mb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-text-secondary block">
                Harga Beli / Kg
              </span>
              <span className="text-sm sm:text-base font-extrabold text-text-primary">
                Rp {item.hargaPerKg.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-text-secondary block">
                Nilai Reward
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-text-primary inline-flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {item.poinPerKg} Poin / kg
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onOpenEstimator(item)}
            className="w-full border border-gray-200 hover:bg-brand-neon hover:border-brand-neon hover:text-text-primary text-text-primary text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all group/btn cursor-pointer shadow-sm hover:shadow"
          >
            <span>Ajukan Setor Ini</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover/btn:text-text-primary group-hover/btn:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
}
