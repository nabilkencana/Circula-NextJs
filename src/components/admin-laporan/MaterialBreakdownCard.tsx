/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Kartu Rincian Komposisi Material Sampah Laporan Admin
 *
 * File: src/components/admin-laporan/MaterialBreakdownCard.tsx
 * Deskripsi:
 * Menampilkan kartu pembungkus distribusi 4 jenis material baku (plastik, kertas,
 * logam, kaca), dilengkapi dengan badge verifikasi live data timbangan real.
 *
 * Standar Teknis UKK RPL:
 * - Pembungkus bento card dengan border dan shadow lembut.
 * - Header informatif dengan format bulan otomatis (cth: "08/2026").
 * - Indikator live pulse status keaslian data timbangan terverifikasi.
 */

import React from "react";
import { RekapitulasiBulananResponse } from "@/types/adminLaporan";
import BreakdownProgressRow from "./BreakdownProgressRow";

/**
 * Properti komponen MaterialBreakdownCard.
 */
interface MaterialBreakdownCardProps {
  /** Data rekapitulasi bulanan */
  data: RekapitulasiBulananResponse;
}

/**
 * Komponen kartu rincian breakdown material sampah per kategori.
 */
export default function MaterialBreakdownCard({ data }: MaterialBreakdownCardProps) {
  // Format label bulan cth: "08/2026"
  const monthParts = data.periodeBulan.split("-");
  const monthDisplay =
    monthParts.length === 2 ? `${monthParts[1]}/${monthParts[0]}` : "08/2026";

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs mb-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-text-primary">
            Rincian Breakdown per Jenis Material (Bulan {monthDisplay})
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Distribusi tonase, nilai rupiah, dan perolehan poin per kategori baku 3R.
          </p>
        </div>

        {/* Live Verification Badge */}
        <div className="self-start sm:self-center flex items-center gap-2 bg-inset-gray border border-gray-200 rounded-full px-3.5 py-1.5 text-xs text-emerald-700 font-semibold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Data Terverifikasi dari Timbangan Real</span>
        </div>
      </div>

      {/* 4 Stacked Material Rows */}
      <div className="space-y-4 mt-6">
        {data.breakdownMaterials.map((item) => (
          <BreakdownProgressRow key={item.kategoriKey} item={item} />
        ))}
      </div>
    </div>
  );
}
