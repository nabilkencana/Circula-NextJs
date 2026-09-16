import React from "react";
import { ArrowDown, ArrowUp, Clock } from "lucide-react";
import { TransaksiTelemetryStats } from "@/types/adminTransaksi";

interface TransaksiHeroProps {
  stats: TransaksiTelemetryStats;
}

export default function TransaksiHero({ stats }: TransaksiHeroProps) {
  return (
    <section className="bg-dark-container rounded-3xl sm:rounded-[28px] p-6 sm:p-10 border border-white/10 shadow-xl relative overflow-hidden mb-8 text-white">
      {/* Subtle Glow Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-neon/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Data Transaksi Penyetoran &amp; Penukaran
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-3xl">
          Monitor seluruh aktivitas masuk penyetoran sampah terpilah warga serta klaim voucher
          reward poin secara real-time berdasarkan filter bulan dan status.
        </p>
      </div>

      {/* 3 Telemetry Docked Bento Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {/* Widget 1: Setoran Bulan Ini */}
        <div className="bg-[#1F2819] border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <ArrowDown className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              SETORAN BULAN INI
            </span>
            <div className="text-lg sm:text-xl font-black text-white mt-1">
              {stats.setoranBulanIniCount} Transaksi Tercatat
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Total {stats.totalKgSampahBulanIni.toLocaleString("id-ID")} kg sampah terpilah warga
            </p>
          </div>
        </div>

        {/* Widget 2: Klaim Voucher Poin */}
        <div className="bg-[#1F2819] border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <ArrowUp className="w-5 h-5 text-brand-neon" />
          </div>
          <div className="min-w-0">
            <span className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              KLAIM VOUCHER POIN
            </span>
            <div className="text-lg sm:text-xl font-black text-white mt-1">
              {stats.klaimVoucherCount} Klaim Disalurkan
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {stats.klaimPersentaseValid}% voucher tervalidasi
            </p>
          </div>
        </div>

        {/* Widget 3: Antrean Verifikasi */}
        <div className="bg-[#1F2819] border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="min-w-0">
            <span className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
              ANTREAN VERIFIKASI
            </span>
            <div className="text-lg sm:text-xl font-black text-white mt-1">
              {stats.antreanVerifikasiCount} Menunggu Konfirmasi
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Butuh timbangan aktual petugas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
