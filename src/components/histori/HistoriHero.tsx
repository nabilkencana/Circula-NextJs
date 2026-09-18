/**
 * ============================================================================
 * Komponen: HistoriHero
 * Direktori: src/components/histori/HistoriHero.tsx
 *
 * Fungsi Utama:
 * Header representasional (Hero Section) untuk halaman Status & Riwayat Penyetoran.
 * Menampilkan:
 * 1. Visual latar belakang fasilitas sortir modern (Unsplash image) dengan overlay gradasi gelap.
 * 2. Judul utama dan deskripsi pemantauan verifikasi timbangan dan perolehan poin.
 * 3. Tiga pilar layanan (Hero Deck):
 *    - Verifikasi Cepat (1x24 jam kerja)
 *    - Poin Masuk Instan (real-time saat status Selesai)
 *    - Nota Digital Sah (STR-XXXX yang dapat diunduh/dicetak)
 *
 * Karakteristik Teknis:
 * - Server Component / Static Representation: Komponen ini stateless murni tanpa hook,
 *   sangat ringan dan teroptimasi untuk performa rendering awal.
 * - Next.js Image Optimization: Menggunakan properti `priority`, `fill`, dan `sizes="100vw"`
 *   untuk meminimalisir LCP (Largest Contentful Paint).
 * ============================================================================
 */

import React from "react";
import Image from "next/image";
import { Clock, CheckCircle2, FileText } from "lucide-react";

export default function HistoriHero() {
  return (
    <section className="px-4 sm:px-6 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto rounded-3xl bg-[#111315] overflow-hidden text-white relative border border-white/10 shadow-2xl p-6 sm:p-10 md:p-12">
        {/* ========================================================================= */}
        {/* LATAR BELAKANG FOTOGRAFI FASILITAS PEMILAHAN DIGITAL DENGAN GRADIENT DARK */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=2000&q=80"
            alt="Pusat Verifikasi dan Pemilahan Daur Ulang Digital"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35 scale-105"
          />
          {/* Lapisan gradasi horizontal dan vertikal agar teks di atasnya mudah dibaca */}
          <div className="absolute inset-0 bg-linear-to-r from-[#111315] via-[#111315]/85 to-[#111315]/70" />
          <div className="absolute inset-0 bg-linear-to-t from-[#111315] via-transparent to-[#111315]/50" />
        </div>

        {/* ========================================================================= */}
        {/* JUDUL DAN DESKRIPSI UTAMA HALAMAN RIWAYAT PENYETORAN                      */}
        {/* ========================================================================= */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight">
            Status &amp; Verifikasi Penyetoran Sampah
          </h1>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl font-normal">
            Pantau kemajuan pemeriksaan fisik, timbangan aktual petugas, dan konversi poin reward
            secara seketika untuk seluruh pengajuan setor Anda.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* FLOATING HERO DECK: 3 KARTU DOCK PENJELAS KEUNGGULAN PROSES               */}
        {/* ========================================================================= */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          {/* Pilar 1: Verifikasi Cepat */}
          <div className="bg-[#181B1E]/80 rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-[#CEF241]/40 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#CEF241] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4 text-[#CEF241]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-snug">
                Verifikasi Cepat
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Konfirmasi timbangan langsung selesai maksimal 1x24 jam kerja di unit.
              </p>
            </div>
          </div>

          {/* Pilar 2: Poin Masuk Instan */}
          <div className="bg-[#181B1E]/80 rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-[#CEF241]/40 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#CEF241] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4 h-4 text-[#CEF241]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-snug">
                Poin Masuk Instan
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Saldo poin otomatis bertambah tepat setelah status dinyatakan Selesai.
              </p>
            </div>
          </div>

          {/* Pilar 3: Nota Digital Sah */}
          <div className="bg-[#181B1E]/80 rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-[#CEF241]/40 transition-all group">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#CEF241] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4 text-[#CEF241]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-snug">
                Nota Digital Sah
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Bukti transaksi STR-XXXX dapat diunduh dan dicetak secara legal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
