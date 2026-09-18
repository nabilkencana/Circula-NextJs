/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Pita Penjamin Keamanan & Tautan Dashboard Admin Profil
 *
 * File: src/components/admin-profil/BottomAdminProfilRibbon.tsx
 * Deskripsi:
 * Menampilkan bilah informasi di bagian bawah halaman pengaturan profil unit
 * untuk menegaskan jaminan sinkronisasi JWT terenkripsi dan tautan kembali
 * ke Dashboard Utama Konsol Admin.
 *
 * Standar Teknis UKK RPL:
 * - Semantic HTML (`<section>`).
 * - Integrasi Next.js client-side link navigation (`next/link`).
 * - Tampilan visual konsisten dengan tema dark-container.
 */

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

/**
 * Komponen pita penjamin keamanan token otorisasi profil unit.
 */
export default function BottomAdminProfilRibbon() {
  return (
    <section className="px-4 sm:px-6 my-8">
      <div className="max-w-7xl mx-auto rounded-3xl bg-dark-container p-5 sm:p-6 text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Left: Security Reassurance Notice */}
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-brand-neon" />
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
            Pembaruan profil unit disinkronkan secara real-time dengan tanda tangan token otorisasi admin JWT.
          </p>
        </div>

        {/* Right: Link to Dashboard */}
        <Link
          href="/admin/dashboard"
          className="border border-white/20 text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-white/10 flex items-center gap-2 shrink-0 transition-all group"
        >
          <span>Buka Dashboard Utama Admin</span>
          <ArrowRight className="w-3.5 h-3.5 text-brand-neon group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
