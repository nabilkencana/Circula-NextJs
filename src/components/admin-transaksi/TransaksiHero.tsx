/**
 * @file TransaksiHero.tsx
 * @description Komponen hero spanduk pada modul Transaksi Admin Circula.
 * Menampilkan ringkasan telemetri 3 widget bento tersemat:
 * 1. Total Transaksi Setoran Bulan Berjalan (beserta volume total kilogram limbah masuk).
 * 2. Total Klaim Voucher Poin Disalurkan (beserta persentase validitas).
 * 3. Jumlah Antrean Verifikasi Timbangan Fisik yang Membutuhkan Konfirmasi.
 * 
 * @module Components/AdminTransaksi/TransaksiHero
 */

import React from "react";
import { ArrowDown, ArrowUp, Clock } from "lucide-react";
import { TransaksiTelemetryStats } from "@/types/adminTransaksi";

/**
 * Properti untuk komponen TransaksiHero
 * 
 * @interface TransaksiHeroProps
 * @property {TransaksiTelemetryStats} stats - Objek data statistik telemetri operasional transaksi.
 */
interface TransaksiHeroProps {
  stats: TransaksiTelemetryStats;
}

/**
 * Komponen TransaksiHero
 * 
 * @component
 * @param {TransaksiHeroProps} props - Data statistik transaksi.
 * @returns {JSX.Element} Spanduk gelap elegan dengan 3 widget telemetri tersemat.
 */
export default function TransaksiHero({ stats }: TransaksiHeroProps) {
  return (
    <section 
      aria-labelledby="transaksi-hero-title"
      className="bg-dark-container rounded-3xl sm:rounded-[28px] p-6 sm:p-10 border border-white/10 shadow-xl relative overflow-hidden mb-8 text-white"
    >
      {/* Efek visual bias cahaya neon di latar belakang */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-neon/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Judul dan Narasi Hero */}
      <div className="relative z-10 max-w-4xl mb-8">
        <h1 
          id="transaksi-hero-title"
          className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3"
        >
          Data Transaksi Penyetoran &amp; Penukaran
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-3xl">
          Monitor seluruh aktivitas masuk penyetoran sampah terpilah warga serta klaim voucher
          reward poin secara real-time berdasarkan filter bulan dan status.
        </p>
      </div>

      {/* ===================================================================== */}
      {/* 3 WIDGET BENTO TELEMETRI OPERASIONAL                                  */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        
        {/* Widget 1: Setoran Sampah Bulan Ini */}
        <div className="bg-dark-widget border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <ArrowDown className="w-5 h-5 text-emerald-400" aria-hidden="true" />
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

        {/* Widget 2: Klaim Voucher Poin Hadiah */}
        <div className="bg-dark-widget border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <ArrowUp className="w-5 h-5 text-brand-neon" aria-hidden="true" />
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

        {/* Widget 3: Antrean Verifikasi Timbangan */}
        <div className="bg-dark-widget border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-white/20">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-400" aria-hidden="true" />
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
