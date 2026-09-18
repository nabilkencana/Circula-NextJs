import React from "react";
import Image from "next/image";
import { Gift, Coins, ShieldCheck } from "lucide-react";

/**
 * Komponen Hero Section Penukaran Poin Hadiah (TukarPoinHero)
 *
 * Menghadirkan area banner hero berlatar belakang visual logistik bank sampah
 * dengan overlay gradient gelap untuk menjaga keterbacaan tipografi (kontras WCAG AAA).
 *
 * Dilengkapi dengan 3 kartu dock status (bento deck):
 * 1. Klaim Hadiah Instan: Menjelaskan penerbitan kode voucher seketika setelah penukaran.
 * 2. Saldo Poin Terkini: Menjelaskan keunggulan poin tanpa batas masa kedaluwarsa.
 * 3. Stok Terjamin & Resmi: Validasi bahwa reward bersumber dari koperasi & merchant mitra.
 *
 * @returns JSX Element hero penukaran poin
 */
export default function TukarPoinHero() {
  return (
    <section className="px-4 sm:px-6 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto rounded-3xl bg-dark-container overflow-hidden text-white relative border border-white/10 shadow-2xl p-6 sm:p-10 md:p-12">
        {/* ================= LAPISAN LATAR BELAKANG GAMBAR & GRADIENT OVERLAY ================= */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=2000&q=80"
            alt="Pusat Logistik dan Reward Bank Sampah Circula"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 mix-blend-luminosity scale-105"
          />
          {/* Lapisan gradasi horizontal untuk keterbacaan teks */}
          <div className="absolute inset-0 bg-linear-to-r from-dark-container via-dark-container/95 to-dark-container/80" />
          {/* Lapisan gradasi vertikal untuk kedalaman visual */}
          <div className="absolute inset-0 bg-linear-to-t from-dark-container via-transparent to-dark-container/60" />
        </div>

        {/* ================= KONTEN UTAMA HERO (JUDUL & DESKRIPSI) ================= */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight">
            Tukar Poin Daur Ulang Menjadi Berkah Nyata
          </h1>

          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-3xl font-normal">
            Apresiasi atas kontribusi pemilahan sampah Anda. Gunakan akumulasi saldo poin untuk klaim
            voucher belanja, pulsa, sembako, dan merchandise ramah lingkungan secara instan.
          </p>
        </div>

        {/* ================= DECK BENTO DOK (3 KARTU NILAI KEUNGGULAN) ================= */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          {/* Kartu 1: Klaim Instan */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Klaim Hadiah Instan
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Kode voucher (TKR-XXXX) langsung diterbitkan seketika setelah penukaran dikonfirmasi.
              </p>
            </div>
          </div>

          {/* Kartu 2: Saldo Aktif */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Saldo Poin Terkini
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Total 150 Poin aktif siap digunakan tanpa batasan masa kedaluwarsa sistem bank sampah.
              </p>
            </div>
          </div>

          {/* Kartu 3: Jaminan Resmi & Stok */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Stok Terjamin &amp; Resmi
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Seluruh reward disuplai langsung oleh jaringan koperasi dan merchant rekanan Circula.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
