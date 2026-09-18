"use client";

/**
 * ============================================================================
 * Komponen: PreFooterTukarRibbon
 * Direktori: src/components/tukar-poin/PreFooterTukarRibbon.tsx
 *
 * Fungsi Utama:
 * Pita penutup sebelum footer (Bottom Call-to-Action Ribbon) pada halaman katalog reward.
 * Menyediakan dorongan motivasi (Nudge / Incentive):
 * Jika poin nasabah belum cukup untuk menukar hadiah impian, diarahkan untuk mengumpulkan
 * dan mengajukan penyetoran sampah baru melalui tautan tombol `/setor/ajukan`.
 *
 * Desain & Visual:
 * - Latar belakang gelap elegan (#111315) dengan aksen ikon daun hijau neon.
 * - Tombol aksi interaktif dengan efek transisi ikon panah kanan.
 * ============================================================================
 */

import React from "react";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export default function PreFooterTukarRibbon() {
  return (
    <section className="w-full my-6">
      <div className="rounded-3xl bg-[#111315] p-6 sm:p-8 md:p-9 text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        {/* ===================================================================== */}
        {/* AMBIENT BACKGROUND GLOW                                               */}
        {/* ===================================================================== */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none" />

        {/* ===================================================================== */}
        {/* SISI KIRI: Ikon Daun Neon & Kalimat Ajakan Menyetor Sampah            */}
        {/* ===================================================================== */}
        <div className="flex items-center sm:items-start md:items-center gap-4 sm:gap-5">
          {/* Badge Ikon Daun Warna Neon */}
          <div className="w-13 h-13 rounded-2xl bg-brand-neon flex items-center justify-center shrink-0 shadow-md">
            <Leaf className="w-7 h-7 text-[#111315] fill-[#111315]" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              Poin masih kurang untuk hadiah impianmu?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed max-w-2xl font-normal">
              Kumpulkan lebih banyak botol plastik, karton duplex, dan kaleng aluminium dari rumah. Bawa ke pos terdekat atau pesan kurir penjemputan gratis hari ini!
            </p>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* SISI KANAN: Tombol Aksi Menuju Formulir Pengajuan Setor Baru          */}
        {/* ===================================================================== */}
        <div className="shrink-0 w-full sm:w-auto">
          <Link
            href="/setor/ajukan"
            className="w-full sm:w-auto bg-brand-neon hover:opacity-95 text-black font-black px-6 py-3.5 rounded-full flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-md text-xs sm:text-sm group"
          >
            <span>Ajukan Setor Sampah Baru</span>
            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
