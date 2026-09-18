import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Scale, TrendingUp } from "lucide-react";

/**
 * Komponen Hero Section Halaman Beranda (HeroSection)
 *
 * Komponen visual pembuka utama pada landing page Circula:
 * 1. Menampilkan latar belakang fotografi fasilitas daur ulang modern dengan dual-tone gradient protection.
 * 2. Tipografi judul menonjol (H1) yang merefleksikan nilai ekonomi pemilahan sampah sirkular.
 * 3. Dua tombol CTA interaktif:
 *    - Tombol primer: Mengarahkan pengguna baru ke registrasi akun nasabah (`/register`).
 *    - Tombol sekunder: Mengarahkan pengunjung untuk mengecek indeks harga sampah terkini (`/kategori-sampah`).
 * 4. Floating Hero Deck (3 widget kartu nilai):
 *    - Widget 1: Bukti sosial nasabah aktif (12.000+ warga & 140+ unit bank sampah) dengan rating bintang 5.0.
 *    - Widget 2: Fitur timbangan digital terkalibrasi presisi fraksi gram.
 *    - Widget 3: 4 kategori material baku nasional daur ulang.
 *
 * @returns JSX Element hero section beranda
 */
export default function HeroSection() {
  return (
    <section className="px-4 sm:px-6 pt-6 sm:pt-8 pb-8">
      <div className="max-w-7xl mx-auto rounded-[28px] bg-dark-container overflow-hidden text-white relative border border-white/10 shadow-2xl">
        {/* ================= LAPISAN FOTOGRAFI LATAR BELAKANG & GRADASI ================= */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1763315156830-07870b159121?auto=format&fit=crop&w=2000&q=85"
            alt="Fasilitas Pengolahan Limbah dan Pemilahan Daur Ulang Modern"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35 mix-blend-luminosity scale-105 transition-transform duration-1000"
          />
          {/* Lapisan gradasi ganda untuk menjaga keterbacaan teks (WCAG compliant) */}
          <div className="absolute inset-0 bg-linear-to-r from-dark-container via-dark-container/90 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-dark-container via-transparent to-dark-container/70" />
        </div>

        {/* ================= KONTEN TEKS UTAMA & TOMBOL AJAKAN (CTA) ================= */}
        <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16">
          {/* Judul Utama / Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.12] max-w-3xl">
            Ubah Sampah Terpilah Menjadi{" "}
            <span className="text-brand-neon">Tabungan Poin</span> &amp; Nilai Ekonomi Nyata
          </h1>

          {/* Subheadline Penjelas Misi Ekosistem Circula */}
          <p className="mt-5 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-normal">
            Platform digital multi-tenant pengelolaan sampah terintegrasi: timbangan digital
            akurat, indeks harga pasar transparan, dan penukaran poin reward instan untuk
            mewujudkan lingkungan bebas sampah.
          </p>

          {/* Baris Tombol Aksi (CTA Row) */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <Link
              href="/register"
              className="bg-brand-neon text-text-primary font-bold px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-3 hover:bg-brand-neon-hover transition-all transform hover:scale-[1.02] shadow-lg shadow-brand-neon/20 text-sm md:text-base group"
            >
              <span>Mulai Tabung Sampah</span>
              <span className="w-7 h-7 rounded-full bg-text-primary text-brand-neon flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              href="/kategori-sampah"
              className="border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full hover:bg-white/10 hover:border-white/40 transition-all text-sm md:text-base inline-flex items-center justify-center gap-2 group"
            >
              <span>Cek Indeks Harga Sampah</span>
              <ArrowUpRight className="w-4 h-4 text-brand-neon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* ================= FLOATING HERO DECK (3 WIDGET INFORMASI) ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
            {/* Widget 1: Bukti Sosial Nasabah & Unit Aktif */}
            <div className="bg-dark-widget rounded-2xl p-5 border border-white/12 backdrop-blur-sm flex flex-col justify-between hover:border-brand-neon/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="h-8 w-8 rounded-full ring-2 ring-dark-container bg-zinc-700 flex items-center justify-center text-[11px] font-bold text-white">
                    BU
                  </div>
                  <div className="h-8 w-8 rounded-full ring-2 ring-dark-container bg-emerald-800 flex items-center justify-center text-[11px] font-bold text-white">
                    SI
                  </div>
                  <div className="h-8 w-8 rounded-full ring-2 ring-dark-container bg-brand-neon flex items-center justify-center text-[11px] font-bold text-dark-container">
                    12k+
                  </div>
                </div>
                <div className="flex text-amber-400 text-xs tracking-wider font-semibold">
                  ★★★★★ <span className="ml-1 text-white font-bold">5.0</span>
                </div>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-medium">
                Dipercaya oleh <span className="text-brand-neon font-bold">12.000+ Nasabah</span>{" "}
                Warga &amp; 140+ Unit Bank Sampah terverifikasi.
              </p>
            </div>

            {/* Widget 2: Presisi Timbangan Digital */}
            <div className="bg-dark-widget rounded-2xl p-5 border border-white/12 backdrop-blur-sm flex flex-col justify-between hover:border-brand-neon/40 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-brand-neon/20 border border-brand-neon/40 flex items-center justify-center text-brand-neon">
                  <Scale className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-white">Timbangan Digital Terkalibrasi</h2>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Transaksi presisi hingga fraksi gram (0.1 Kg) dengan konversi rupiah dan poin
                secara otomatis.
              </p>
            </div>

            {/* Widget 3: Standar Baku 4 Kategori */}
            <div className="bg-dark-widget rounded-2xl p-5 border border-white/12 backdrop-blur-sm flex flex-col justify-between hover:border-brand-neon/40 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-brand-neon/20 border border-brand-neon/40 flex items-center justify-center text-brand-neon">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-white">4 Kategori Baku Nasional</h2>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Plastik, Kertas, Logam, dan Kaca siap tampung dengan valuasi harga real-time
                mengikuti industri daur ulang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
