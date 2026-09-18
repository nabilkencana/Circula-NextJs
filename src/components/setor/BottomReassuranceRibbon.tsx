/**
 * ============================================================================
 * Komponen: BottomReassuranceRibbon
 * Direktori: src/components/setor/BottomReassuranceRibbon.tsx
 *
 * Fungsi Utama:
 * Pita penjamin keamanan transaksi (Security & Reassurance Ribbon) di bagian bawah halaman pengajuan.
 * Menyediakan:
 * 1. Pesan kepastian bahwa seluruh alur penimbangan terintegrasi aman dengan sistem pusat Circula.
 * 2. Tautan cepat (Quick Link) mengarahkan nasabah untuk mengecek riwayat transaksi mereka di `/histori`.
 *
 * Karakteristik Teknis:
 * - Server Component / Presentational murni.
 * ============================================================================
 */

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function BottomReassuranceRibbon() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
      <div className="rounded-3xl bg-dark-container p-6 sm:p-7 text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* ===================================================================== */}
        {/* KIRI: Pesan Jaminan Keamanan Transaksi dengan Ikon ShieldCheck        */}
        {/* ===================================================================== */}
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-10 h-10 rounded-full bg-dark-widget border border-brand-neon/30 text-brand-neon flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Seluruh alur transaksi penyetoran sampah terjamin aman dan terintegrasi langsung
            ke sistem verifikasi terpusat Circula.
          </p>
        </div>

        {/* ===================================================================== */}
        {/* KANAN: Tombol Navigasi Cepat Menuju Halaman Histori Penyetoran        */}
        {/* ===================================================================== */}
        <Link
          href="/histori"
          className="shrink-0 px-5 py-2.5 rounded-full bg-dark-widget border border-white/15 text-xs font-semibold text-white hover:border-brand-neon hover:text-brand-neon transition-all flex items-center gap-2 shadow-xs group"
        >
          <span>Lihat Histori Penyetoran Saya</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
