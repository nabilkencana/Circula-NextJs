/**
 * @file KategoriHero.tsx
 * @description Komponen spanduk hero pada modul Master Kategori Sampah Admin Circula.
 * Menampilkan judul operasional valuasi material, deskripsi naratif penetapan harga resmi,
 * serta 3 widget telemetri tersemat:
 * 1. Total varian material sampah aktif di unit.
 * 2. Nilai tolok ukur (benchmark) rata-rata harga beli per kilogram material.
 * 3. Status sinkronisasi langsung (live ledger) dengan server multi-tenant.
 * 
 * @module Components/AdminKategori/KategoriHero
 */

import React from "react";
import { Check } from "lucide-react";
import { KategoriTelemetryStats } from "@/types/adminKategori";

/**
 * Properti untuk komponen KategoriHero
 * 
 * @interface KategoriHeroProps
 * @property {KategoriTelemetryStats} stats - Objek data statistik telemetri kategori material.
 */
interface KategoriHeroProps {
  stats: KategoriTelemetryStats;
}

/**
 * Komponen KategoriHero
 * 
 * @component
 * @param {KategoriHeroProps} props - Data statistik kategori.
 * @returns {JSX.Element} Spanduk kontainer gelap dengan 3 widget metrik tersemat.
 */
export default function KategoriHero({ stats }: KategoriHeroProps) {
  // Pemformatan angka rata-rata harga (contoh: 3500 -> Rp 3.5K)
  const formattedAvgPrice =
    stats.benchmarkRataRata >= 1000
      ? `Rp ${(stats.benchmarkRataRata / 1000).toFixed(1)}K`
      : `Rp ${stats.benchmarkRataRata}`;

  return (
    <section
      className="max-w-7xl mx-auto rounded-3xl bg-dark-container text-white border border-white/10 relative p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden shadow-xl"
      aria-label="Hero Master Kategori Sampah"
    >
      {/* Efek visual bias cahaya ambient neon di latar belakang */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-neon/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Kolom Kiri: Judul dan Narasi Master Kategori */}
        <div className="lg:col-span-7">
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
            Master Kategori &amp; Nilai Tukar Sampah
          </h1>
          <p className="mt-3 text-xs sm:text-sm md:text-[15px] text-gray-300 max-w-xl leading-relaxed">
            Kelola parameter valuasi, konversi reward poin per kilogram, dan inventarisasi
            material daur ulang terpadu dengan standar penetapan harga resmi.
          </p>
        </div>

        {/* Kolom Kanan: 3 Widget Telemetri Teleport */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Widget 1: Total Material Terdaftar */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
              TOTAL MATERIAL
            </span>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-extrabold text-2xl text-white">
                {stats.totalMaterial}
              </span>
              <span className="text-xs font-bold text-brand-neon">Aktif</span>
            </div>
          </div>

          {/* Widget 2: Benchmark Rata-Rata Tarif */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
              BENCHMARK RATA2
            </span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-extrabold text-2xl text-brand-neon">
                {formattedAvgPrice}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">/kg</span>
            </div>
          </div>

          {/* Widget 3: Status Sinkronisasi Ledger */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
              STATUS SINKRON
            </span>
            <div className="mt-3 flex items-center gap-1 text-xs font-bold text-white">
              <Check className="w-3.5 h-3.5 text-brand-neon stroke-3" aria-hidden="true" />
              <span>Live Ledger</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
