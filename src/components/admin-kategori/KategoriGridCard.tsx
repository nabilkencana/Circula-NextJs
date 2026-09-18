/**
 * @file KategoriGridCard.tsx
 * @description Komponen kartu kontainer grid daftar kategori material sampah aktif pada panel admin Circula.
 * Menampilkan:
 * - Header kartu dengan judul unit operasional dan tombol pintas penyesuaian harga massal (`BatchPricingModal`).
 * - Tata letak grid responsif (1 kolom di mobile, 2 kolom di tablet, 3 kolom di desktop) untuk merender `KategoriItemCard`.
 * - Penanganan status data kosong (Empty State) dengan ikon representatif jika tidak ada material yang cocok dengan filter.
 * 
 * @module Components/AdminKategori/KategoriGridCard
 */

import React from "react";
import { ArrowRight, PackageOpen } from "lucide-react";
import { KategoriSampahAdminRecord } from "@/types/adminKategori";
import KategoriItemCard from "./KategoriItemCard";

/**
 * Properti untuk komponen KategoriGridCard
 * 
 * @interface KategoriGridCardProps
 * @property {KategoriSampahAdminRecord[]} records - Daftar catatan kategori sampah yang akan ditampilkan.
 * @property {number} totalCount - Jumlah total kategori yang terkonfigurasi.
 * @property {(record: KategoriSampahAdminRecord) => void} onEdit - Callback pengeditan kategori.
 * @property {(record: KategoriSampahAdminRecord) => void} onDelete - Callback penghapusan kategori.
 * @property {() => void} onOpenBatch - Callback membuka modal penyesuaian harga massal.
 */
interface KategoriGridCardProps {
  records: KategoriSampahAdminRecord[];
  totalCount: number;
  onEdit: (record: KategoriSampahAdminRecord) => void;
  onDelete: (record: KategoriSampahAdminRecord) => void;
  onOpenBatch: () => void;
}

/**
 * Komponen KategoriGridCard
 * 
 * @component
 * @param {KategoriGridCardProps} props - Data kategori dan callback pengendali.
 * @returns {JSX.Element} Bagian grid katalog kategori material sampah aktif.
 */
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
      {/* ===================================================================== */}
      {/* HEADER KARTU: JUDUL UNIT, TOTAL KATEGORI & TOMBOL BATCH PRICING       */}
      {/* ===================================================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-gray-100">
        <div className="flex items-center flex-wrap gap-2.5">
          <h2 className="font-extrabold text-base sm:text-lg text-text-primary tracking-tight">
            Katalog Kategori Aktif di Unit Asri Jaya
          </h2>
          <span className="bg-inset-gray border border-gray-200 text-xs text-gray-600 px-3 py-1 rounded-full font-semibold">
            {totalCount} Kategori Terkonfigurasi
          </span>
        </div>

        {/* Tombol Pemicu Modal Penyesuaian Harga Massal */}
        <button
          type="button"
          onClick={onOpenBatch}
          className="text-xs font-bold text-gray-600 hover:text-text-primary flex items-center gap-1 group transition-colors cursor-pointer"
        >
          <span>Penyesuaian Harga Massal (Batch)</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </button>
      </div>

      {/* ===================================================================== */}
      {/* GRID KARTU MATERIAL SAMPAH / TAMPILAN KOSONG                          */}
      {/* ===================================================================== */}
      {records.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {records.map((record, idx) => (
            <div
              key={record.id}
              className="animate-card-enter flex flex-col h-full"
              style={{ animationDelay: `${Math.min(idx * 60, 480)}ms` }}
            >
              <KategoriItemCard
                record={record}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Kondisi Data Tidak Ditemukan */
        <div className="py-16 text-center text-gray-400">
          <div className="flex flex-col items-center justify-center gap-2">
            <PackageOpen className="w-10 h-10 text-gray-300" aria-hidden="true" />
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
