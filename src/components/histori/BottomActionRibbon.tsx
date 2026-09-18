/**
 * ============================================================================
 * Komponen: BottomActionRibbon
 * Direktori: src/components/histori/BottomActionRibbon.tsx
 *
 * Fungsi Utama:
 * Pita aksi bawah (Call to Action Ribbon) yang diletakkan di sebelum footer pada
 * halaman riwayat penyetoran. Berfungsi mengajak nasabah untuk menjadwalkan atau
 * mengajukan transaksi penyetoran sampah daur ulang baru.
 *
 * Elemen & Desain:
 * - Tema visual gelap kontras dengan aksen warna neon (#CEF241) khas identitas brand.
 * - Tombol interaktif dengan ikon panah beranimasi geser halus saat di-hover.
 * ============================================================================
 */

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BottomActionRibbon() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
      <div className="rounded-3xl bg-[#111315] p-6 sm:p-8 md:p-10 text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        {/* ========================================================================= */}
        {/* TEKS PROMOSI & AJAKAN BERTINDAK (Call to Action Copy)                    */}
        {/* ========================================================================= */}
        <div className="text-center md:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            Punya tumpukan sampah daur ulang baru di rumah?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed font-normal">
            Jadwalkan penyetoran mandiri ke unit terdekat atau pesan layanan armada jemput sekarang.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* TOMBOL NAVIGASI MENUJU FORM PENGAJUAN SETOR SAMPAH                        */}
        {/* ========================================================================= */}
        <div className="shrink-0">
          <Link
            href="/setor/ajukan"
            className="bg-[#CEF241] hover:bg-[#bde030] text-[#111315] font-extrabold px-7 py-3 rounded-full flex items-center gap-2.5 transition-all shadow-md text-xs sm:text-sm group cursor-pointer"
          >
            <span>Ajukan Penyetoran Baru</span>
            <div className="w-5 h-5 rounded-full bg-[#111315] text-[#CEF241] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3 text-[#CEF241]" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
