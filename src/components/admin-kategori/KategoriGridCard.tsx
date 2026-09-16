import React from "react";
import { ArrowRight, PackageOpen } from "lucide-react";
import { KategoriSampahAdminRecord } from "@/types/adminKategori";
import KategoriItemCard from "./KategoriItemCard";

interface KategoriGridCardProps {
  records: KategoriSampahAdminRecord[];
  totalCount: number;
  onEdit: (record: KategoriSampahAdminRecord) => void;
  onDelete: (record: KategoriSampahAdminRecord) => void;
  onOpenBatch: () => void;
}

export default function KategoriGridCard({
  records,
  totalCount,
  onEdit,
  onDelete,
  onOpenBatch,
}: KategoriGridCardProps) {
  return (
    <section
      className="max-w-7xl mx-auto my-4 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs"
      aria-label="Katalog Kategori Material Aktif"
    >
      {/* Grid Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-gray-100">
        <div className="flex items-center flex-wrap gap-2.5">
          <h2 className="font-extrabold text-base sm:text-lg text-text-primary tracking-tight">
            Katalog Kategori Aktif di Unit Asri Jaya
          </h2>
          <span className="bg-inset-gray border border-gray-200 text-xs text-gray-600 px-3 py-1 rounded-full font-semibold">
            {totalCount} Kategori Terkonfigurasi
          </span>
        </div>

        {/* Batch Price Adjustment Trigger */}
        <button
          type="button"
          onClick={onOpenBatch}
          className="text-xs font-bold text-gray-600 hover:text-text-primary flex items-center gap-1 group transition-colors cursor-pointer"
        >
          <span>Penyesuaian Harga Massal (Batch)</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 6-Card Grid */}
      {records.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {records.map((record) => (
            <KategoriItemCard
              key={record.id}
              record={record}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-400">
          <div className="flex flex-col items-center justify-center gap-2">
            <PackageOpen className="w-10 h-10 text-gray-300" />
            <p className="font-bold text-sm text-text-primary">
              Tidak ada kategori material yang sesuai
            </p>
            <p className="text-xs text-text-secondary">
              Ubah kata kunci pencarian atau pilih tab kategori material lainnya.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
