/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Pita Informasi Endpoint & Navigasi Admin Laporan
 *
 * File: src/components/admin-laporan/BottomAdminLaporanRibbon.tsx
 * Deskripsi:
 * Menampilkan catatan teknis mengenai asal sumber data agregasi endpoint API
 * serta tombol pintas navigasi kembali ke halaman konsol admin nasabah.
 *
 * Standar Teknis UKK RPL:
 * - Semantic HTML markup (`<aside>`).
 * - Disembunyikan saat mode cetak dokumen (`print:hidden`).
 * - Navigasi client-side Next.js via `next/link`.
 */

import React from "react";
import Link from "next/link";
import { RefreshCw, ArrowRight } from "lucide-react";

/**
 * Komponen pita informasi agregasi data dan navigasi kembali konsol admin.
 */
export default function BottomAdminLaporanRibbon() {
  return (
    <aside className="rounded-3xl bg-dark-container border border-white/10 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white shadow-lg mb-12 print:hidden">
      <div className="flex items-center gap-3.5 max-w-2xl">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          <RefreshCw className="w-5 h-5 text-brand-neon" />
        </div>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
          Laporan bulanan dihasilkan secara real-time dari agregasi endpoint{" "}
          <code className="bg-white/10 px-1.5 py-0.5 rounded text-brand-neon font-mono text-xs">
            GET /api/v1/rekapitulasi/bulanan
          </code>
          .
        </p>
      </div>

      <Link
        href="/admin/nasabah"
        className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shrink-0 group"
      >
        <span>Kembali ke Dashboard Utama Admin</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </aside>
  );
}
