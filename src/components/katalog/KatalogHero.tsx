import React from "react";
import Image from "next/image";
import { TrendingUp, CheckCircle2, Layers, ChevronRight } from "lucide-react";

/**
 * Komponen Banner Hero Katalog Sampah Terpilah (KatalogHero)
 *
 * Menampilkan tajuk utama edukasi nilai ekonomi sampah dan indeks harga pasar:
 * 1. Background visual fasilitas pemilahan modern dengan gradasi pelindung kontras teks.
 * 2. Tiga kartu status nilai informasi (docked hero deck):
 *    - Fluktuasi Harian: Informasi tren kenaikan rata-rata harga industri daur ulang (+3.8%).
 *    - Pedoman 3R: Standar pemilahan bebas kontaminasi & residu cairan.
 *    - 4 Kategori Terverifikasi: Plastik, Kertas, Logam, Kaca dengan 14 mitra offtaker resmi.
 *
 * @returns JSX Element hero katalog sampah
 */
export default function KatalogHero() {
  return (
    <section className="px-4 sm:px-6 pt-6 sm:pt-8 pb-6">
      <div className="max-w-7xl mx-auto rounded-[28px] bg-dark-container overflow-hidden text-white relative border border-white/10 shadow-2xl">
        {/* ================= LAPISAN FOTOGRAFI LATAR BELAKANG ================= */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1781243680823-aae6c7f1ff12?auto=format&fit=crop&w=2000&q=85"
            alt="Fasilitas Pengolahan & Pemilahan Sampah Daur Ulang Modern"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-linear-to-r from-dark-container via-dark-container/90 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-dark-container via-transparent to-dark-container/80" />
        </div>

        {/* ================= KONTEN TEKS UTAMA HERO ================= */}
        <div className="relative z-10 p-6 sm:p-10 md:p-12">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight max-w-2xl">
            Katalog &amp; Standar Harga Sampah Terpilah
          </h1>
          <p className="mt-3.5 text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
            Pantau nilai tukar rupiah dan reward poin per kilogram secara transparan sebelum
            Anda menjadwalkan penyetoran sampah.
          </p>

          {/* ================= 3 DOCKED HERO DECK WIDGETS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-6 border-t border-white/10">
            {/* Widget 1: Fluktuasi Harian */}
            <div className="bg-dark-widget rounded-2xl p-4.5 border border-white/12 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-brand-neon/20 border border-brand-neon/40 flex items-center justify-center shrink-0 text-brand-neon mt-0.5">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold text-brand-neon tracking-wider block">
                  Fluktuasi Harian
                </span>
                <h2 className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">
                  Update Pasar: Harga Plastik &amp; Tembaga Stabil
                </h2>
                <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-400">
                  +3.8% rerata industri
                </span>
              </div>
            </div>

            {/* Widget 2: Standar 3R */}
            <div className="bg-dark-widget rounded-2xl p-4.5 border border-white/12 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-brand-neon/20 border border-brand-neon/40 flex items-center justify-center shrink-0 text-brand-neon mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold text-brand-neon tracking-wider block">
                  Pedoman 3R
                </span>
                <div className="flex items-center justify-between">
                  <h2 className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">
                    Standar Pemilahan 3R
                  </h2>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-[11px] text-gray-300 block mt-1">
                  Bebas kontaminasi &amp; residu
                </span>
              </div>
            </div>

            {/* Widget 3: 4 Kategori Baku */}
            <div className="bg-dark-widget rounded-2xl p-4.5 border border-white/12 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all">
              <div className="w-9 h-9 rounded-xl bg-brand-neon/20 border border-brand-neon/40 flex items-center justify-center shrink-0 text-brand-neon mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold text-brand-neon tracking-wider block">
                  4 Kategori Terverifikasi
                </span>
                <h2 className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">
                  (Plastik, Kertas, Logam, Kaca)
                </h2>
                <span className="inline-block mt-1 text-[11px] font-semibold text-brand-neon">
                  14 Mitra Offtaker Resmi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

