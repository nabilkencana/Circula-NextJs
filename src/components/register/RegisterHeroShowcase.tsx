"use client";

import React from "react";
import Image from "next/image";
import { Building2, Star, Sparkles, ShieldCheck } from "lucide-react";

export default function RegisterHeroShowcase() {
  return (
    <div className="w-full rounded-4xl overflow-hidden relative p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-145 lg:min-h-160 bg-dark-container shadow-2xl border border-white/10">
      {/* Background with Dark Atmosphere & Recycling Facility Imagery */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=2000&q=80"
          alt="Komunitas Daur Ulang dan Sirkular Ekonomi"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        {/* Gradients for high legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-dark-container via-dark-container/85 to-dark-container/50" />
        <div className="absolute inset-0 bg-linear-to-r from-dark-container/90 via-transparent to-dark-container/90" />
      </div>

      {/* Top Headline & Subtitle */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-brand-neon text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-brand-neon" />
          <span>Pendaftaran Terbuka &amp; Gratis</span>
        </div>
        <h2 className="text-3xl sm:text-4xl xl:text-[40px] font-extrabold text-white leading-[1.15] tracking-tight">
          Mulai Menabung Sampah,<br />
          Raih Saldo Rewards &amp;<br />
          Jaga Kelestarian Bumi.
        </h2>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-300 leading-relaxed max-w-sm font-normal">
          Buka akun digital Circula dalam 2 menit. Pantau timbangan presisi, tukar poin dengan saldo e-wallet, dan dukung ekonomi sirkular.
        </p>
      </div>

      {/* Middle Glassmorphism Badge */}
      <div className="relative z-10 my-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 sm:p-5 flex items-center gap-3.5 shadow-lg">
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

      {/* Bottom Metrics Bar */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Overlapping circular badges */}
          <div className="flex -space-x-2.5 overflow-hidden">
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-dark-container bg-emerald-700 text-[11px] font-bold text-white shadow-inner">
              🌿
            </div>
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-dark-container bg-teal-600 text-[11px] font-bold text-white shadow-inner">
              ♻️
            </div>
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-dark-container bg-cyan-700 text-[11px] font-bold text-white shadow-inner">
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

        {/* Rating badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-brand-neon shrink-0">
          <Star className="w-3.5 h-3.5 fill-brand-neon text-brand-neon" />
          <span>4.9/5.0</span>
        </div>
      </div>
    </div>
  );
}
