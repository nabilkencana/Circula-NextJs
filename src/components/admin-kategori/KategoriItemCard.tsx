import React, { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { KategoriSampahAdminRecord, JenisSampah } from "@/types/adminKategori";

interface KategoriItemCardProps {
  record: KategoriSampahAdminRecord;
  onEdit: (record: KategoriSampahAdminRecord) => void;
  onDelete: (record: KategoriSampahAdminRecord) => void;
}

const CATEGORY_TAG_STYLES: Record<JenisSampah, { bg: string; text: string; label: string }> = {
  plastik: {
    bg: "bg-[#DCFCE7]",
    text: "text-[#15803D]",
    label: "PLASTIK",
  },
  kertas: {
    bg: "bg-[#FEF3C7]",
    text: "text-[#92400E]",
    label: "KERTAS",
  },
  logam: {
    bg: "bg-[#F3E8FF]",
    text: "text-[#7E22CE]",
    label: "LOGAM",
  },
  kaca: {
    bg: "bg-[#E0F2FE]",
    text: "text-[#0369A1]",
    label: "KACA",
  },
};

export default function KategoriItemCard({
  record,
  onEdit,
  onDelete,
}: KategoriItemCardProps) {
  const [imgError, setImgError] = useState(false);

  const tagStyle = CATEGORY_TAG_STYLES[record.jenisSampah] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: record.jenisSampah.toUpperCase(),
  };

  return (
    <article
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:border-brand-neon hover:shadow-md transition-all duration-200 group"
      aria-label={`Kategori ${record.namaKategori}`}
    >
      {/* 1. Header Image Box with Tags */}
      <div className="relative h-48 sm:h-52 w-full bg-gray-100 overflow-hidden">
        {!imgError && record.imageUrl ? (
          <Image
            src={record.imageUrl}
            alt={record.namaKategori}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-bold text-sm">
            {record.namaKategori}
          </div>
        )}

        {/* Floating Category Tag Badge (Top Left) */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-block ${tagStyle.bg} ${tagStyle.text} font-extrabold text-[10px] tracking-wider px-2.5 py-1 rounded-md shadow-xs uppercase`}
          >
            {tagStyle.label}
          </span>
        </div>

        {/* Floating Material Code Badge (Bottom Right) */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="inline-block bg-black/70 backdrop-blur-xs text-white font-mono text-[10px] px-2.5 py-0.5 rounded-md shadow-xs">
            {record.materialCode}
          </span>
        </div>
      </div>

      {/* 2. Card Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-text-primary group-hover:text-black leading-tight">
            {record.namaKategori}
          </h3>
          <p
            className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed"
            title={record.deskripsi}
          >
            {record.deskripsi}
          </p>
        </div>

        {/* Dual Rate Inset Box */}
        <div className="bg-inset-gray border border-gray-200 rounded-xl p-3 my-4 flex items-center justify-between gap-2 shadow-2xs">
          {/* Left: Cash Purchase Price */}
          <div>
            <span className="text-[10px] uppercase font-semibold text-gray-400 block tracking-wider">
              HARGA BELI TUNAI
            </span>
            <p className="font-bold text-sm text-text-primary mt-0.5">
              Rp {record.hargaBeliPerKg.toLocaleString("id-ID")}{" "}
              <span className="text-[11px] font-normal text-text-secondary">
                / {record.satuan}
              </span>
            </p>
          </div>

          {/* Right: Reward Points */}
          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold text-gray-400 block tracking-wider">
              KOMPENSASI
            </span>
            <div className="mt-0.5 inline-block bg-[#EAF3D2] border border-brand-neon/40 text-dark-widget font-bold text-xs px-2.5 py-1 rounded-full shadow-2xs">
              {record.poinRewardPerKg} Poin{" "}
              <span className="text-[10px] font-medium text-gray-600">
                / {record.satuan}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Card Footer Actions */}
      <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-white">
        {/* Edit Button */}
        <button
          type="button"
          onClick={() => onEdit(record)}
          className="border border-gray-200 hover:border-brand-neon hover:bg-brand-neon text-text-primary rounded-full px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <Pencil className="w-3.5 h-3.5" />
          <span>Edit Nilai / Foto</span>
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => onDelete(record)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          title="Hapus Kategori"
          aria-label={`Hapus kategori ${record.namaKategori}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}
