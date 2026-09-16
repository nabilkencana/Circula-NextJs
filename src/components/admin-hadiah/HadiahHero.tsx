import React from "react";
import { Gift, RefreshCw, ShieldCheck } from "lucide-react";
import { HadiahTelemetryStats } from "@/types/adminHadiah";

interface HadiahHeroProps {
  stats: HadiahTelemetryStats;
}

export default function HadiahHero({ stats }: HadiahHeroProps) {
  return (
    <section
      className="max-w-7xl mx-auto rounded-3xl bg-dark-container text-white border border-white/10 relative p-6 sm:p-8 md:p-12 overflow-hidden shadow-xl"
      aria-label="Hero Master Katalog Hadiah"
    >
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-neon/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Main Header Content */}
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
          Master Katalog Hadiah Penukaran Poin
        </h1>
        <p className="mt-2.5 text-xs sm:text-sm md:text-[15px] text-gray-300 max-w-2xl leading-relaxed">
          Kelola inventaris hadiah, ketersediaan stok voucher, dan atur biaya penukaran poin
          (Reward Pricing) yang langsung tersinkronisasi dengan aplikasi nasabah.
        </p>

        {/* 3 Docked Floating Hero Deck Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Deck 1: Total Item Aktif */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5 text-brand-neon" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                  TOTAL ITEM AKTIF
                </span>
                <p className="font-bold text-xl text-white mt-0.5">
                  {stats.totalTersedia} Item Tersedia
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/5">
              Etalase katalog aktif di Unit Asri Jaya siap ditukarkan.
            </p>
          </div>

          {/* Deck 2: Poin Beredar */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-brand-neon" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                  POIN BEREDAR
                </span>
                <p className="font-bold text-xl text-brand-neon mt-0.5">
                  {stats.poinBeredar.toLocaleString("id-ID")} Poin Aktif
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/5">
              Saldo nasabah beredar yang dapat diklaim sewaktu-waktu.
            </p>
          </div>

          {/* Deck 3: Kontrol Stok Realtime */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-brand-neon" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                  KONTROL STOK REALTIME
                </span>
                <p className="font-bold text-xl text-white mt-0.5">Validasi Otomatis</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/5">
              Mencegah penukaran poin saat stok reward habis/kosong.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
