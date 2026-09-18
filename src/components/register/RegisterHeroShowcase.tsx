/**
 * @file RegisterHeroShowcase.tsx
 * @description Komponen showcase visual hero di sisi kiri halaman registrasi nasabah.
 * Menampilkan citra visual daur ulang, headline ajakan bertindak (CTA),
 * badge jaminan keamanan data, serta metrik sosial (social proof nasabah & rating).
 * 
 * Peran dalam UKK:
 * - Memberikan daya tarik visual (UI/UX modern) menggunakan styling Tailwind CSS.
 * - Menggunakan teknik layering Next.js Image dengan gradient overlay untuk keterbacaan teks (legibility).
 * - Menampilkan glassmorphism effect (backdrop-blur) dan micro-interactions.
 */

"use client"; // Menandai komponen ini dieksekusi di sisi client (browser)

import React from "react";
import Image from "next/image"; // Komponen optimasi gambar otomatis dari Next.js
import { Building2, Star, Sparkles, ShieldCheck } from "lucide-react"; // Ikon vektor modern dari Lucide React

/**
 * Komponen RegisterHeroShowcase
 * Menampilkan kartu hero sisi kiri pada layout split-screen registrasi.
 */
export default function RegisterHeroShowcase() {
  return (
    /* Kontainer Utama Hero Card:
       - w-full: Memenuhi lebar kolom grid pembungkus (lg:col-span-5)
       - rounded-4xl: Sudut melengkung ekstra besar (modern UI style)
       - relative: Konteks posisi untuk elemen absolute background di dalamnya
       - bg-dark-container: Warna latar belakang gelap khas tema Circula
       - min-h-145 lg:min-h-160: Menjaga proporsi tinggi kartu agar seimbang dengan formulir di sisi kanan
    */
    <div className="w-full rounded-4xl overflow-hidden relative p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-145 lg:min-h-160 bg-dark-container shadow-2xl border border-white/10">
      
      {/* ─── 1. Background Visual & Layering Gradients ─── */}
      <div className="absolute inset-0 z-0">
        {/* Foto fasilitas daur ulang resolusi tinggi dari Unsplash */}
        <Image
          src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=2000&q=80"
          alt="Komunitas Daur Ulang dan Sirkular Ekonomi"
          fill // Mengisi seluruh area kontainer absolute
          priority // Diunduh prioritas tinggi karena merupakan elemen LCP (Largest Contentful Paint)
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
          // opacity-30 & mix-blend-luminosity: Membuat foto menyatu redup secara estetis dengan latar belakang gelap
        />

        {/* Lapisan Gradient Vertikal: Memastikan teks putih di atas foto tetap kontras dan mudah dibaca */}
        <div className="absolute inset-0 bg-linear-to-t from-dark-container via-dark-container/85 to-dark-container/50" />
        
        {/* Lapisan Gradient Horisontal: Menambah kedalaman pencahayaan dari kiri ke kanan */}
        <div className="absolute inset-0 bg-linear-to-r from-dark-container/90 via-transparent to-dark-container/90" />
      </div>

      {/* ─── 2. Headline & Subjudul Edukatif ─── */}
      <div className="relative z-10">
        {/* Judul Utama (Value Proposition): Mengajak pengguna berpartisipasi dalam sirkular ekonomi */}
        <h2 className="text-3xl sm:text-4xl xl:text-[40px] font-extrabold text-white leading-[1.15] tracking-tight">
          Mulai Menabung Sampah,<br />
          Raih Saldo Rewards &amp;<br />
          Jaga Kelestarian Bumi.
        </h2>

        {/* Deskripsi Singkat: Menjelaskan kemudahan pembuatan akun dan manfaat saldo rewards */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-300 leading-relaxed max-w-sm font-normal">
          Buka akun digital Circula dalam 2 menit. Pantau timbangan presisi, tukar poin dengan saldo e-wallet, dan dukung ekonomi sirkular.
        </p>
      </div>

      {/* ─── 3. Badge Jaminan Keamanan (Glassmorphism Effect) ─── */}
      {/* Menggunakan backdrop-blur-md dan border tipis putih transparan untuk efek kaca modern */}
      <div className="relative z-10 my-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 sm:p-5 flex items-center gap-3.5 shadow-lg">
        {/* Kontainer Ikon Keamanan dengan aksen warna brand neon */}
        <div className="w-10 h-10 rounded-xl bg-brand-neon/20 border border-brand-neon/30 flex items-center justify-center shrink-0 text-brand-neon">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
            Data Terlindungi &amp; Terverifikasi
          </h4>
          <p className="text-[11px] sm:text-xs text-gray-300 mt-0.5 leading-normal">
            Buku tabungan digital transparan terafiliasi dengan DLH setempat
          </p>
        </div>
      </div>

      {/* ─── 4. Metrik Sosial / Social Proof (Nasabah & Rating) ─── */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
        {/* Stack Avatar Nasabah & Jumlah Anggota Terdaftar */}
        <div className="flex items-center gap-3">
          {/* Tumpukan ikon avatar bulat tumpang tindih (-space-x-2.5) */}
          <div className="flex -space-x-2.5 overflow-hidden">
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-dark-container bg-emerald-700 text-[11px] font-bold text-white shadow-inner" title="Nasabah Organik">
              🌿
            </div>
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-dark-container bg-teal-600 text-[11px] font-bold text-white shadow-inner" title="Nasabah Daur Ulang">
              ♻️
            </div>
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-dark-container bg-cyan-700 text-[11px] font-bold text-white shadow-inner" title="Mitra Lingkungan">
              🌱
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-tight">
              +12.400 Nasabah
            </p>
            <p className="text-[11px] text-gray-400">
              Telah terdaftar dan aktif menabung
            </p>
          </div>
        </div>

        {/* Badge Rating Kepuasan Pengguna */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-brand-neon shrink-0">
          <Star className="w-3.5 h-3.5 fill-brand-neon text-brand-neon" />
          <span>4.9/5.0</span>
        </div>
      </div>

    </div>
  );
}
