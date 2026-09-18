/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Grid Katalog Hadiah & Pembungkus Etalase Admin
 *
 * File: src/components/admin-hadiah/HadiahGridCard.tsx
 * Deskripsi:
 * Menampilkan kontainer grid responsif (1 kolom di mobile, 2 kolom di tablet,
 * dan 4 kolom di desktop) yang menyusun seluruh item hadiah reward, dilengkapi
 * dengan animasi stagger entrance, header informasi unit, tombol pintas riwayat stok,
 * serta state kosong (empty state) jika tidak ada hadiah yang cocok dengan filter.
 *
 * Standar Teknis UKK RPL:
 * - Responsive CSS Grid (1/2/4 columns).
 * - Penanganan empty state informatif dengan petunjuk interaktif.
 * - Efek animasi stagger dinamis menggunakan inline style animationDelay.
 */

import React from "react";
import { ChevronRight, Gift } from "lucide-react";
import { HadiahAdminRecord } from "@/types/adminHadiah";
import HadiahItemCard from "./HadiahItemCard";

/**
 * Properti komponen HadiahGridCard.
 */
interface HadiahGridCardProps {
  /** Daftar record hadiah hasil penyaringan */
  records: HadiahAdminRecord[];
  /** Jumlah total item hadiah yang terdaftar */
  totalCount: number;
  /** Callback pemicu edit atau restok */
  onEdit: (record: HadiahAdminRecord) => void;
  /** Callback pemicu dialog konfirmasi penghapusan */
  onDelete: (record: HadiahAdminRecord) => void;
  /** Callback pemicu pembukaan modal log riwayat stok */
  onOpenRiwayat: () => void;
}

/**
 * Komponen kontainer grid etalase katalog hadiah unit operasional.
 */
export default function HadiahGridCard({
  records,
  totalCount,
  onEdit,
  onDelete,
  onOpenRiwayat,
}: HadiahGridCardProps) {
  return (
    <section
      className="max-w-7xl mx-auto my-4 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs"
      aria-label="Katalog Hadiah di Unit Operasional"
    >
      {/* Grid Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-gray-100">
        <div className="flex items-center flex-wrap gap-2.5">
          <h2 className="font-extrabold text-base sm:text-lg text-text-primary tracking-tight">
            Katalog Hadiah di Unit Asri Jaya
          </h2>
          <span className="bg-inset-gray border border-gray-200 text-xs text-gray-600 px-3 py-1 rounded-full font-semibold">
            {totalCount} Item Terdaftar
          </span>
        </div>

        {/* Stock History Trigger */}
        <button
          type="button"
          onClick={onOpenRiwayat}
          className="text-xs font-bold text-gray-600 hover:text-text-primary flex items-center gap-1 group transition-colors cursor-pointer"
        >
          <span>Riwayat Pengeluaran Stok</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 4-Card Responsive Grid */}
      {records.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {records.map((record, idx) => (
            <div
              key={record.id}
              className="animate-card-enter flex flex-col h-full"
              style={{ animationDelay: `${Math.min(idx * 60, 480)}ms` }}
            >
              <HadiahItemCard
                record={record}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-400">
          <div className="flex flex-col items-center justify-center gap-2">
            <Gift className="w-10 h-10 text-gray-300" />
            <p className="font-bold text-sm text-text-primary">
              Tidak ada item hadiah yang sesuai
            </p>
            <p className="text-xs text-text-secondary">
              Ubah kata kunci pencarian atau ganti filter status ketersediaan stok.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
