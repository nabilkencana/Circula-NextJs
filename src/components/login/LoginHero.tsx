/**
 * @file LoginHero.tsx
 * @description Komponen hero section horizontal penuh alternatif untuk halaman masuk.
 * Menampilkan headline akses ekosistem bank sampah dan 3 kartu deck pilar:
 * 1. Enkripsi JWT 256-bit & Multi-Tenant Terisolasi.
 * 2. 140+ Unit Bank Sampah Terkoneksi Real-time.
 * 3. Sistem Keamanan Multi-Tenant Aktif.
 * 
 * Peran dalam UKK:
 * - Menampilkan kemampuan merancang layout hero yang kaya konteks keamanan dan skalabilitas.
 * - Menggunakan optimasi gambar `next/image` dengan gradasi ganda (horizontal & vertical gradient).
 */

import React from "react";
import Image from "next/image"; // Komponen gambar Next.js
import { Lock, CheckCircle2, Zap } from "lucide-react"; // Ikon: Kunci Gembok, Centang Terverifikasi, dan Kilat Performa

export default function LoginHero() {
  return (
    <section className="px-4 sm:px-6 pt-4 sm:pt-6">
      {/* Kontainer Utama Hero: Rounded besar bernuansa gelap */}
      <div className="max-w-7xl mx-auto rounded-[28px] bg-dark-container overflow-hidden text-white border border-white/10 relative p-6 sm:p-8 md:p-12 shadow-2xl">
        
        {/* ─── 1. Background Photography & Multilayer Gradient ─── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=2000&q=80"
            alt="Fasilitas Penimbangan dan Logistik Daur Ulang Modern"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-20 mix-blend-luminosity scale-105"
          />
          {/* Gradient horisontal & vertikal untuk melindungi keterbacaan teks */}
          <div className="absolute inset-0 bg-linear-to-r from-dark-container via-dark-container/95 to-dark-container/80" />
          <div className="absolute inset-0 bg-linear-to-t from-dark-container via-transparent to-dark-container/60" />
        </div>

        {/* ─── 2. Headline & Subjudul ─── */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight">
            Akses Ekosistem Bank Sampah Digital
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl font-normal">
            Masuk untuk memantau tabungan daur ulang, verifikasi penimbangan
            sampah, atau mengelola operasional unit Anda.
          </p>
        </div>

        {/* ─── 3. Floating Hero Deck (3 Kartu Jaminan Sistem) ─── */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          
          {/* Deck 1: Standar Enkripsi Token JWT */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/12 backdrop-blur-sm flex items-center gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                Enkripsi JWT 256-bit &amp; Multi-Tenant Terisolasi
              </p>
            </div>
          </div>

          {/* Deck 2: Jaringan Unit Terkoneksi */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/12 backdrop-blur-sm flex items-center gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 relative group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                140+ Unit Bank Sampah Terkoneksi Realtime
              </p>
            </div>
          </div>

          {/* Deck 3: Keamanan Multi-Tenant Engine */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/12 backdrop-blur-sm flex items-center gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                Sistem Keamanan Multi-Tenant Aktif
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
