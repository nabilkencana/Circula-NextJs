import React from "react";
import { Scale, Coins, Award } from "lucide-react";
import { RekapitulasiBulananResponse } from "@/types/adminLaporan";

interface LaporanHeroProps {
  data: RekapitulasiBulananResponse;
}

export default function LaporanHero({ data }: LaporanHeroProps) {
  return (
    <section className="bg-dark-container rounded-3xl sm:rounded-[28px] p-6 sm:p-10 md:p-12 border border-white/10 shadow-xl relative overflow-hidden mb-6 text-white">
      {/* Subtle Glow Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-neon/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Headline & Description */}
      <div className="relative z-10 max-w-4xl mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Laporan Tonase &amp; Valuasi Ekonomi Sampah
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
          Rekapitulasi berkala volume limbah terpilah, konversi tonase metrik, perkiraan pembayaran
          kas, dan peredaran poin reward pada unit operasional Bank Sampah Asri Jaya.
        </p>
      </div>

      {/* 3 Telemetry Docked Bento Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {/* Deck 1: Total Tonase Masuk */}
        <div className="bg-dark-widget border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              TOTAL TONASE MASUK
            </span>
            <div className="text-lg sm:text-xl font-bold text-white mt-1">
              {data.totalVolume.totalKg.toLocaleString("id-ID")} kg ({data.totalVolume.totalTon} Ton)
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Limbah teralihkan dari TPA bulan ini.
            </p>
          </div>
        </div>

        {/* Deck 2: Estimasi Valuasi Kas */}
        <div className="bg-dark-widget border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5 text-brand-neon" />
          </div>
          <div className="min-w-0">
            <span className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              ESTIMASI VALUASI KAS
            </span>
            <div className="text-lg sm:text-xl font-bold text-brand-neon mt-1">
              Rp {data.pembayaranKas.totalRupiah.toLocaleString("id-ID")}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Perputaran nilai ekonomi sirkular warga.
            </p>
          </div>
        </div>

        {/* Deck 3: Poin Terdistribusi */}
        <div className="bg-dark-widget border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              POIN TERDISTRIBUSI
            </span>
            <div className="text-lg sm:text-xl font-bold text-white mt-1">
              {data.sirkulasiReward.totalPoinDiterbitkan.toLocaleString("id-ID")} Poin
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Diterbitkan sebagai insentif pemilahan 3R.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
