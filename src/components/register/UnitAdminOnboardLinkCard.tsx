/**
 * @file UnitAdminOnboardLinkCard.tsx
 * @description Komponen kartu ajakan (Call to Action Card) khusus bagi calon pengurus atau
 * petugas operasional bank sampah fisik di tingkat RT/RW/Kelurahan untuk mendaftarkan unitnya.
 * 
 * Peran dalam UKK:
 * - Menghubungkan alur pendaftaran nasabah individu dengan pendaftaran entitas unit bank sampah.
 * - Menggunakan micro-interaction `group-hover:translate-x-1` untuk efek panah maju yang interaktif.
 */

import React from "react";
import Link from "next/link"; // Komponen navigasi Next.js
import { Building2, ArrowRight } from "lucide-react"; // Ikon: Gedung Kantor Unit & Panah Kanan

export default function UnitAdminOnboardLinkCard() {
  return (
    /* Kontainer Kartu Info: Background putih bersih dengan border halus */
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-start gap-4">
      {/* Ikon Gedung Unit Bank Sampah dengan kontainer hitam dan aksen neon */}
      <div className="w-10 h-10 rounded-xl bg-dark-container text-brand-neon flex items-center justify-center shrink-0 shadow-xs">
        <Building2 className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        {/* Headline Ajakan */}
        <h4 className="text-xs sm:text-sm font-bold text-text-primary leading-tight">
          Pengelola Unit / Petugas Bank Sampah?
        </h4>
        
        {/* Deskripsi Fitur Konsol Admin */}
        <p className="text-[11px] sm:text-xs text-text-secondary mt-1 leading-relaxed">
          Akses konsol verifikasi penimbangan, monitoring inventaris gudang, dan validasi transaksi.
        </p>
        
        {/* Tautan Menuju Form Registrasi Unit Admin */}
        <Link
          href="/admin/register"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-text-primary hover:text-black mt-2.5 group"
        >
          <span>Daftarkan Unit Bank Sampah</span>
          {/* Ikon panah bergeser ke kanan saat kursor berada di atas tautan */}
          <ArrowRight className="w-3.5 h-3.5 text-dark-container group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
