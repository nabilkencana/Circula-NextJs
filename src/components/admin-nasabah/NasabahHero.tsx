/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Hero Header & Ringkasan Telemetri Nasabah Admin
 *
 * File: src/components/admin-nasabah/NasabahHero.tsx
 * Deskripsi:
 * Menampilkan kartu banner header visual bertema dark-container yang merangkum
 * 3 indikator metrik utama nasabah: Total Nasabah Aktif terdaftar, Akumulasi Poin
 * Beredar yang siap diklaim, dan status Sinkronisasi Otomatis dengan aplikasi warga.
 *
 * Standar Teknis UKK RPL:
 * - Komponen presentasional React dengan strict typing.
 * - Desain card dark-container modern dengan aksen gradien glow subtle.
 * - Format angka lokal Indonesia (`toLocaleString("id-ID")`).
 */

import React from "react";
import { Users, Coins, UserCheck } from "lucide-react";
import { NasabahStats } from "@/types/adminNasabah";

/**
 * Properti komponen NasabahHero.
 */
interface NasabahHeroProps {
  /** Objek ringkasan metrik statistik nasabah */
  stats: NasabahStats;
}

/**
 * Komponen banner visual hero buku induk data nasabah.
 */
export default function NasabahHero({ stats }: NasabahHeroProps) {
  return (
    <section
      className="max-w-7xl mx-auto rounded-3xl bg-dark-container text-white border border-white/10 relative p-6 sm:p-8 md:p-12 overflow-hidden shadow-xl"
      aria-label="Hero Buku Induk Data Nasabah"
    >
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-neon/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Main Header Content */}
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
          Manajemen &amp; Buku Induk Data Nasabah
        </h1>
        <p className="mt-2.5 text-xs sm:text-sm md:text-[15px] text-gray-300 max-w-2xl leading-relaxed">
          Kelola direktori warga penyetor, monitor akumulasi saldo poin aktif, perbarui kontak
          domisili, dan daftarkan nasabah baru secara terpadu.
        </p>

        {/* 3 Docked Floating Hero Deck Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Deck 1: Total Nasabah Aktif */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-brand-neon" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                  TOTAL NASABAH AKTIF
                </span>
                <p className="font-bold text-xl text-white mt-0.5">
                  {stats.totalNasabah} Nasabah
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/5">
              {stats.totalNasabah > 0
                ? `${stats.totalNasabah} nasabah aktif terdaftar pada unit operasional.`
                : "Nasabah aktif terdaftar pada unit operasional."}
            </p>
          </div>

          {/* Deck 2: Akumulasi Poin Beredar */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Coins className="w-5 h-5 text-brand-neon" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                  AKUMULASI POIN BEREDAR
                </span>
                <p className="font-bold text-xl text-brand-neon mt-0.5">
                  {stats.akumulasiPoin.toLocaleString("id-ID")} Poin
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/5">
              18.450 poin terdistribusi siap dicairkan menjadi reward.
            </p>
          </div>

          {/* Deck 3: Sinkronisasi Otomatis */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5 text-brand-neon" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                  SINKRONISASI OTOMATIS
                </span>
                <p className="font-bold text-xl text-white mt-0.5">Sync Otomatis</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/5">
              Registrasi mandiri nasabah dari aplikasi warga langsung tercatat di sini.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
