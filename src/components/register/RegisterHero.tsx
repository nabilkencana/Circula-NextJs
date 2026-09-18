/**
 * @file RegisterHero.tsx
 * @description Komponen hero section varian horizontal penuh untuk landing/onboarding registrasi.
 * Menampilkan tajuk ajakan nilai ekonomi sampah terpilah dan 3 kartu deck statistik:
 * 1. Jumlah nasabah aktif (12.400+ nasabah).
 * 2. Status verifikasi kemitraan resmi Dinas Lingkungan Hidup (DLH).
 * 3. Valuasi rate harga beli sampah terpilah (Hingga Rp 75.000/kg).
 * 
 * Peran dalam UKK:
 * - Menampilkan kemampuan merancang tata letak visual hero yang kaya informasi (Social Proof & Value Proposition).
 * - Menangani optimasi aset foto beresolusi tinggi menggunakan `next/image` dengan properti `priority` dan `fill`.
 * - Responsive grid layout yang rapi (1 kolom di perangkat mobile, 3 kolom di desktop).
 */

import React from "react";
import Image from "next/image"; // Komponen gambar teroptimasi dari Next.js
import { Users, ShieldCheck, TrendingUp } from "lucide-react"; // Ikon: Pengguna, Verifikasi DLH, dan Tren Nilai Rupiah

export default function RegisterHero() {
  return (
    <section className="px-4 sm:px-6 pt-4 sm:pt-6">
      {/* Kontainer Utama Hero Section: Rounded besar dengan tema gelap dan border tipis */}
      <div className="max-w-7xl mx-auto rounded-[28px] bg-dark-container overflow-hidden text-white relative border border-white/10 shadow-2xl p-6 sm:p-10 md:p-12">
        
        {/* ─── 1. Background Photography & Multilayer Gradient ─── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80"
            alt="Komunitas Daur Ulang dan Sirkular Berkelanjutan"
            fill
            priority // Gambar diutamakan untuk percepatan render halaman
            sizes="100vw"
            className="object-cover object-center opacity-20 mix-blend-luminosity scale-105"
          />
          {/* Lapisan Gradasi Horisontal: Menggelapkan area teks dari kiri ke kanan */}
          <div className="absolute inset-0 bg-linear-to-r from-dark-container via-dark-container/95 to-dark-container/80" />
          {/* Lapisan Gradasi Vertikal: Menjaga kontras bayangan bawah */}
          <div className="absolute inset-0 bg-linear-to-t from-dark-container via-transparent to-dark-container/60" />
        </div>

        {/* ─── 2. Konten Headline & Subjudul ─── */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight">
            Ubah Sampah Terpilah Menjadi Nilai Nyata
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl font-normal">
            Bergabung bersama 12.000+ nasabah aktif di Malang Raya. Buka rekening tabungan
            sampah digital Anda dalam 2 menit tanpa biaya admin.
          </p>
        </div>

        {/* ─── 3. Floating Hero Deck (3 Kartu Metrik Kepercayaan) ─── */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-6 border-t border-white/10">
          
          {/* Deck 1: Metrik Nasabah Terdaftar Aktif */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">12.400+</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-neon/20 text-brand-neon">
                  Aktif
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Nasabah terdaftar aktif di jaringan bank sampah Circula.
              </p>
            </div>
          </div>

          {/* Deck 2: Kemitraan & Akreditasi Dinas Lingkungan Hidup (DLH) */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                100% Terverifikasi DLH
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Kemitraan resmi Dinas Lingkungan Hidup standar 3R nasional.
              </p>
            </div>
          </div>

          {/* Deck 3: Valuasi Harga Tukar Sampah Transparan */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Hingga Rp 75.000/kg
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Valuasi rate harga material transparan dan update harian.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
