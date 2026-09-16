import React, { useState } from "react";
import Image from "next/image";
import { Star, Pencil, Trash2, Zap } from "lucide-react";
import { HadiahAdminRecord } from "@/types/adminHadiah";

interface HadiahItemCardProps {
  record: HadiahAdminRecord;
  onEdit: (record: HadiahAdminRecord) => void;
  onDelete: (record: HadiahAdminRecord) => void;
}

export default function HadiahItemCard({
  record,
  onEdit,
  onDelete,
}: HadiahItemCardProps) {
  const [imgError, setImgError] = useState(false);

  // Badge logic
  const isOutOfStock = record.stok === 0;
  const isLowStock = record.stok > 0 && record.stok <= 20;

  const badgeText = isOutOfStock ? "HABIS" : record.kategori.toUpperCase();
  const badgeBg = isOutOfStock ? "bg-[#4B5563]" : "bg-[#1F2819]";

  return (
    <article
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:border-brand-neon hover:shadow-md transition-all duration-200 group"
      aria-label={`Hadiah ${record.namaHadiah}`}
    >
      {/* 1. Header Image Box */}
      <div className="relative h-44 sm:h-48 w-full bg-gray-100 overflow-hidden">
        {!imgError && record.imageUrl ? (
          <Image
            src={record.imageUrl}
            alt={record.namaHadiah}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-bold text-xs p-4 text-center">
            {record.namaHadiah}
          </div>
        )}

        {/* Floating Category Tag Badge (Top Left) */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-block ${badgeBg} text-white font-extrabold text-[10px] tracking-wider px-2.5 py-1 rounded-md shadow-xs uppercase`}
          >
            {badgeText}
          </span>
        </div>
      </div>

      {/* 2. Card Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="font-bold text-[15px] text-text-primary group-hover:text-black leading-snug truncate"
            title={record.namaHadiah}
          >
            {record.namaHadiah}
          </h3>
          <p className="font-mono text-[11px] text-gray-400 mt-0.5">
            ID: {record.id}
          </p>
        </div>

        {/* Stock & Rate Inset Box */}
        <div className="bg-inset-gray border border-gray-200 rounded-xl p-3 my-4 flex items-center justify-between gap-2 shadow-2xs">
          {/* Left: Biaya Poin */}
          <div>
            <span className="text-[10px] uppercase font-semibold text-gray-400 block tracking-wider">
              BIAYA POIN
            </span>
            <div className="mt-0.5 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-brand-neon-hover fill-brand-neon" />
              <span className="font-bold text-xs text-text-primary">
                {record.poinDibutuhkan} Poin
              </span>
            </div>
          </div>

          {/* Right: Sisa Stok */}
          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold text-gray-400 block tracking-wider">
              SISA STOK
            </span>
            <p
              className={`font-bold text-xs mt-0.5 ${
                isOutOfStock
                  ? "text-[#DC2626]"
                  : isLowStock
                  ? "text-[#D97706]"
                  : "text-[#059669]"
              }`}
            >
              {record.stok} {record.satuanStok}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Card Footer Actions */}
      <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between bg-white">
        {/* Left Action Button: Edit/Restok OR Segera Restok */}
        {isOutOfStock ? (
          <button
            type="button"
            onClick={() => onEdit(record)}
            className="bg-brand-neon hover:bg-brand-neon-hover text-text-primary rounded-full px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-dark-container text-dark-container" />
            <span>Segera Restok</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onEdit(record)}
            className="border border-gray-200 hover:border-brand-neon hover:bg-brand-neon text-text-primary rounded-full px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit / Restok</span>
          </button>
        )}

        {/* Delete Action Button */}
        <button
          type="button"
          onClick={() => onDelete(record)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          title="Hapus Hadiah"
          aria-label={`Hapus hadiah ${record.namaHadiah}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}
