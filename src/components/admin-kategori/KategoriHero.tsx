import React from "react";
import { Check } from "lucide-react";
import { KategoriTelemetryStats } from "@/types/adminKategori";

interface KategoriHeroProps {
  stats: KategoriTelemetryStats;
}

export default function KategoriHero({ stats }: KategoriHeroProps) {
  const formattedAvgPrice =
    stats.benchmarkRataRata >= 1000
      ? `Rp ${(stats.benchmarkRataRata / 1000).toFixed(1)}K`
      : `Rp ${stats.benchmarkRataRata}`;

  return (
    <section
      className="max-w-7xl mx-auto rounded-3xl bg-dark-container text-white border border-white/10 relative p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden shadow-xl"
      aria-label="Hero Master Kategori Sampah"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-neon/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Title & Narrative */}
        <div className="lg:col-span-7">
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
            Master Kategori &amp; Nilai Tukar Sampah
          </h1>
          <p className="mt-3 text-xs sm:text-sm md:text-[15px] text-gray-300 max-w-xl leading-relaxed">
            Kelola parameter valuation, konversi reward poin per kilogram, dan inventarisasi
            material terpadu berbasis protokol isolasi multi-tenant{" "}
            <span className="font-mono text-brand-neon font-semibold">x-app-key</span>.
          </p>
        </div>

        {/* Right Column: 3 Telemetry Teleport Widgets */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Widget 1: Total Material */}
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

          {/* Widget 2: Benchmark Rata2 */}
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

          {/* Widget 3: Status Sinkron */}
          <div className="bg-dark-widget border border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
              STATUS SINKRON
            </span>
            <div className="mt-3 flex items-center gap-1 text-xs font-bold text-white">
              <Check className="w-3.5 h-3.5 text-brand-neon stroke-3" />
              <span>Live Ledger</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
