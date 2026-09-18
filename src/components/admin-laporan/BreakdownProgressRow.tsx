/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Baris Rincian & Progress Bar Material Sampah Admin
 *
 * File: src/components/admin-laporan/BreakdownProgressRow.tsx
 * Deskripsi:
 * Menampilkan baris individual kategori material sampah (Plastik, Kertas, Logam, Kaca),
 * mencakup badge label berwarna, sub-spesifikasi mutu, rasio persentase tonase,
 * nilai valuasi tunai rupiah, poin reward yang diperoleh, dan progress bar visual dinamis.
 *
 * Standar Teknis UKK RPL:
 * - Pemetaan styling tematik kategori (Biru = Plastik, Kuning/Amber = Kertas, Ungu = Logam, Hijau = Kaca).
 * - Visual progress bar dengan CSS width dinamis berbasis persentase tonase total.
 * - Format angka lokal Indonesia (`toLocaleString("id-ID")`).
 */

import React from "react";
import { Star } from "lucide-react";
import { BreakdownMaterialItem } from "@/types/adminLaporan";

/**
 * Properti komponen BreakdownProgressRow.
 */
interface BreakdownProgressRowProps {
  /** Objek data rincian satu jenis kategori sampah */
  item: BreakdownMaterialItem;
}

/**
 * Komponen baris rincian dan grafik batang persentase jenis sampah.
 */
export default function BreakdownProgressRow({ item }: BreakdownProgressRowProps) {
  // Styling spesifik per kategori sampah
  const categoryStyles: Record<
    string,
    { badgeBg: string; badgeText: string; barBg: string }
  > = {
    plastik: {
      badgeBg: "bg-[#EFF6FF]",
      badgeText: "text-[#1D4ED8]",
      barBg: "bg-blue-500",
    },
    kertas: {
      badgeBg: "bg-[#FEF3C7]",
      badgeText: "text-[#B45309]",
      barBg: "bg-amber-500",
    },
    logam: {
      badgeBg: "bg-[#F3E8FF]",
      badgeText: "text-[#7E22CE]",
      barBg: "bg-purple-500",
    },
    kaca: {
      badgeBg: "bg-[#ECFDF5]",
      badgeText: "text-[#047857]",
      barBg: "bg-emerald-500",
    },
  };

  const style = categoryStyles[item.kategoriKey] || {
    badgeBg: "bg-gray-100",
    badgeText: "text-gray-800",
    barBg: "bg-gray-500",
  };

  return (
    <div className="bg-inset-gray border border-gray-200 rounded-2xl p-5 shadow-2xs transition-all hover:border-gray-300">
      {/* Top Header: Badge, SubLabel & Percentage Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase ${style.badgeBg} ${style.badgeText}`}
          >
            {item.badgeLabel}
          </span>
          <span className="font-bold text-xs sm:text-sm text-text-primary">
            {item.subLabel}
          </span>
        </div>

        <span className={`text-xs font-bold font-mono ${style.badgeText} whitespace-nowrap`}>
          {item.persentaseTotal.toFixed(1)}% dari Total Tonase
        </span>
      </div>

      {/* Metrics Row: Tonase, Valuasi, Poin */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3.5 pt-1">
        {/* Col 1: Tonase Bersih */}
        <div>
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            TONASE BERSIH
          </span>
          <div className="font-bold text-xs sm:text-sm text-text-primary mt-0.5">
            {item.tonaseKg.toFixed(1)} kg ({item.tonaseTon.toFixed(2)} Ton)
          </div>
        </div>

        {/* Col 2: Valuasi Tunai */}
        <div>
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            VALUASI TUNAI
          </span>
          <div className="font-bold text-xs sm:text-sm text-text-primary mt-0.5">
            Rp {item.valuasiRupiah.toLocaleString("id-ID")}
          </div>
        </div>

        {/* Col 3: Reward Poin */}
        <div>
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            REWARD POIN
          </span>
          <div className="flex items-center gap-1 font-bold text-xs sm:text-sm text-text-primary mt-0.5">
            <Star className="w-3.5 h-3.5 text-brand-neon-hover fill-brand-neon" />
            <span>{item.rewardPoin.toLocaleString("id-ID")} Poin</span>
          </div>
        </div>
      </div>

      {/* Solid Progress Bar Track */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${style.barBg}`}
          style={{ width: `${Math.min(100, Math.max(2, item.persentaseTotal))}%` }}
        />
      </div>
    </div>
  );
}
