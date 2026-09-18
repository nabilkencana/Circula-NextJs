/**
 * @file BottomSecurityRibbon.tsx
 * @description Komponen ribbon keamanan dan kepatuhan hukum di bagian bawah halaman registrasi.
 * Menampilkan 3 pilar kepercayaan nasabah:
 * 1. Enkripsi SSL 256-Bit (Keamanan Teknis Kredensial).
 * 2. Kepatuhan Regulasi UU Perlindungan Data Pribadi (UU PDP No. 27/2022).
 * 3. Standardisasi Buku Rekening Resmi Dinas Lingkungan Hidup (DLH).
 * 
 * Peran dalam UKK:
 * - Menunjukkan kepedulian terhadap standar regulasi privasi data dan keamanan siber nasional.
 * - Menerapkan teknik layout Tailwind responsif dengan border divider dinamis (`divide-y md:divide-y-0 md:divide-x`).
 */

import React from "react";
import { Lock, ShieldCheck, FileCheck } from "lucide-react"; // Ikon: Gembok Kunci, Perisai Verifikasi, dan Dokumen Bercentang

export default function BottomSecurityRibbon() {
  return (
    <section className="px-4 sm:px-6 pb-12 sm:pb-16">
      {/* Kontainer Utama Ribbon: Background gelap dengan border halus */}
      <div className="max-w-7xl mx-auto rounded-3xl bg-dark-container border border-white/10 p-6 sm:p-8 text-white shadow-xl">
        {/* Grid 3 Kolom:
            - Mobile: Tersusun vertikal dengan garis pembatas horizontal (divide-y)
            - Desktop (md:): 3 kolom sejajar dengan garis pembatas vertikal (md:divide-x)
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          {/* ─── Pilar 1: Enkripsi SSL Bank-Grade ─── */}
          <div className="flex items-start gap-3.5 pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Enkripsi SSL 256-Bit Bank-Grade
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                Seluruh data pendaftaran dan kredensial diamankan dengan protokol TLS 1.3 end-to-end.
              </p>
            </div>
          </div>

          {/* ─── Pilar 2: Kepatuhan UU PDP No. 27/2022 ─── */}
          <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-8">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Kepatuhan UU PDP No. 27/2022
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                Data pribadi nasabah dilindungi secara ketat dan tidak diperjualbelikan kepada pihak ketiga.
              </p>
            </div>
          </div>

          {/* ─── Pilar 3: Standardisasi Buku Rekening DLH ─── */}
          <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-8">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Buku Rekening Terdaftar Resmi
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                Nomor rekening nasabah terafiliasi dengan jaringan bank sampah binaan DLH Jawa Timur.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
