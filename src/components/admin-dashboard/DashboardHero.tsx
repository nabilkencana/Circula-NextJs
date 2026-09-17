"use client";

import React from "react";
import { Clock, Scale, ShieldCheck } from "lucide-react";

interface DashboardHeroProps {
  antreanCount: number;
  totalTonaseKg: number;
  unitNama: string;
}

export default function DashboardHero({
  antreanCount,
  totalTonaseKg,
}: DashboardHeroProps) {
  return (
    <section
      className="bg-dark-container rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl relative overflow-hidden border border-white/10"
      aria-label="Dashboard Operasional Bank Sampah"
    >
      {/* Subtle Background Glow Accent */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 bg-brand-neon/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Dashboard Operasional Bank Sampah
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 mt-2.5 max-w-3xl leading-relaxed">
          Pantau antrean penimbangan sampah warga hari ini, verifikasi saldo kas & poin reward,
          dan kelola distribusi logistik material 3R secara akurat dan transparan.
        </p>

        {/* 3 Telemetry Docked Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Antrean Menunggu */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 sm:p-5 flex items-start gap-4 transition-all hover:border-white/20">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand-neon">
              <Clock className="w-5 h-5 text-brand-neon" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-snug">
                {antreanCount} Antrean Menunggu Verifikasi
              </h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Memerlukan penimbangan aktual timbangan tera di loket unit.
              </p>
            </div>
          </div>

          {/* Card 2: Total Tonase Masuk */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 sm:p-5 flex items-start gap-4 transition-all hover:border-white/20">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand-neon">
              <Scale className="w-5 h-5 text-brand-neon" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-snug">
                {totalTonaseKg.toLocaleString("id-ID")} kg Total Masuk
              </h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Rekap volume limbah terpilah bulan berjalan (Agustus 2026).
              </p>
            </div>
          </div>

          {/* Card 3: Unit Status */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 sm:p-5 flex items-start gap-4 transition-all hover:border-white/20">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand-neon">
              <ShieldCheck className="w-5 h-5 text-brand-neon" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-snug">
                Unit Status: Aktif &amp; Tersinkron
              </h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Terhubung ke server cloud multi-tenant Circula.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
