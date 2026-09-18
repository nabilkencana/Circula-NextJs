/**
 * ============================================================================
 * Komponen: SetorHero
 * Direktori: src/components/setor/SetorHero.tsx
 *
 * Fungsi Utama:
 * Banner utama (Hero Section) pada halaman Pengajuan Penyetoran Sampah Terpilah.
 * Menyajikan:
 * 1. Background fotografi logistik daur ulang industri (Unsplash) berpadu gradasi gelap.
 * 2. Judul utama dan pengantar tata cara memasukkan estimasi bobot material daur ulang.
 * 3. Tiga pilar operasional (Hero Dock Cards):
 *    - Penimbangan Digital Legal (Tera metrologi terkalibrasi akurat hingga 0.01 kg)
 *    - Standar Bersih & Kering (Bebas residu cairan/minyak dan limbah B3)
 *    - Penerbitan Tiket Instan (Kode STR-YYYYMM-XXXX untuk verifikasi fisik)
 *
 * Karakteristik Teknis:
 * - Server Component / Static: Tanpa client state atau hook, teroptimasi untuk initial load.
 * - Next.js Image Optimization: Menggunakan properti `fill`, `priority`, dan `sizes="100vw"`.
 * ============================================================================
 */

import React from "react";
import Image from "next/image";
import { Scale, CheckCircle2, Zap } from "lucide-react";

export default function SetorHero() {
  return (
    <section className="px-4 sm:px-6 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto rounded-[28px] bg-dark-container overflow-hidden text-white relative border border-white/10 shadow-2xl p-6 sm:p-10 md:p-12">
        {/* ===================================================================== */}
        {/* LATAR BELAKANG FOTOGRAFI FASILITAS PENIMBANGAN DENGAN LAPISAN GELAP   */}
        {/* ===================================================================== */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=2000&q=80"
            alt="Fasilitas Penimbangan dan Logistik Daur Ulang Modern"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 mix-blend-luminosity scale-105"
          />
          {/* Lapisan gradasi horizontal dan vertikal agar teks di atasnya kontras */}
          <div className="absolute inset-0 bg-linear-to-r from-dark-container via-dark-container/95 to-dark-container/80" />
          <div className="absolute inset-0 bg-linear-to-t from-dark-container via-transparent to-dark-container/60" />
        </div>

        {/* ===================================================================== */}
        {/* JUDUL DAN DESKRIPSI UTAMA                                             */}
        {/* ===================================================================== */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight">
            Jadwalkan Penyetoran Sampah Terpilah
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl font-normal">
            Pilih jenis material sampah terpilah, masukkan estimasi bobot, dan ketahui
            perolehan poin reward secara seketika sebelum Anda serahkan ke unit penimbangan
            resmi Circula.
          </p>
        </div>

        {/* ===================================================================== */}
        {/* HERO DECK: 3 KARTU DOCK PENJELAS KEUNGGULAN PROSES OPERASIONAL        */}
        {/* ===================================================================== */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-6 border-t border-white/10">
          {/* Kartu 1: Penimbangan Digital Legal */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Penimbangan Digital Legal
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Sertifikasi metrologi tera ulang terkalibrasi akurat hingga 0.01 kg.
              </p>
            </div>
          </div>

          {/* Kartu 2: Standar Bersih & Kering */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Standar Bersih &amp; Kering
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Tanpa residu cairan, minyak, dan limbah B3.
              </p>
            </div>
          </div>

          {/* Kartu 3: Penerbitan Tiket Instan */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Penerbitan Tiket Instan
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Kode setor STR-202608-XXXX siap verifikasi di unit Circula.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
