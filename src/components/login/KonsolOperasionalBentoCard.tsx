/**
 * @file KonsolOperasionalBentoCard.tsx
 * @description Komponen kartu edukasi berformat Bento Card pada sisi login.
 * Menjelaskan hak akses dan kapabilitas operasional masing-masing peran:
 * 1. Nasabah: Penyetoran sampah, cek verifikasi timbangan real, cetak nota.
 * 2. Admin Unit: Penimbangan fisik lapangan, update status tiket, kelola katalog hadiah, rekapitulasi.
 * Serta menonjolkan fitur unggulan: Integrasi timbangan digital tera resmi & tombol Helpdesk.
 * 
 * Peran dalam UKK:
 * - Menjelaskan pemisahan wewenang (Role-Based Access Control / RBAC) kepada penguji.
 * - Menerapkan Bento UI layout dengan kontras warna gelap (dark container) dan aksen brand neon.
 */

import React from "react";
import Link from "next/link"; // Komponen tautan Next.js
import { Leaf, Building2, Scale, HelpCircle, ArrowUpRight } from "lucide-react"; // Ikon Lucide React

export default function KonsolOperasionalBentoCard() {
  return (
    /* Kontainer Utama Bento Card */
    <div className="bg-dark-container rounded-3xl p-6 sm:p-8 text-white border border-white/10 shadow-xl">
      
      {/* ─── Header: Eyebrow Tag & Judul ─── */}
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-brand-neon uppercase">
          KONSOL OPERASIONAL
        </span>
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1">
          Akses Cepat Pengelolaan Sampah
        </h3>
      </div>

      {/* ─── Komparasi Hak Akses Peran (Nasabah vs Admin) ─── */}
      <div className="space-y-3 mb-4">
        {/* Blok Deskripsi Wewenang: Nasabah */}
        <div className="bg-[#121611] rounded-2xl p-4 border border-white/5 hover:border-brand-neon/30 transition-all">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
              <Leaf className="w-3.5 h-3.5 fill-brand-neon" />
            </div>
            <h4 className="text-sm font-bold text-white">Nasabah</h4>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed pl-7">
            Penyetoran multi-item, lacak status verifikasi timbangan real, dan cetak
            nota transaksi digital.
          </p>
        </div>

        {/* Blok Deskripsi Wewenang: Admin Unit */}
        <div className="bg-[#121611] rounded-2xl p-4 border border-white/5 hover:border-brand-neon/30 transition-all">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5 text-brand-neon" />
            </div>
            <h4 className="text-sm font-bold text-white">Admin Unit</h4>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed pl-7">
            Timbang ulang sampah di lapangan, perbarui status pengajuan, update
            katalog hadiah, dan cetak rekapitulasi bulanan.
          </p>
        </div>
      </div>

      {/* ─── Fitur Unggulan: Integrasi Timbangan Digital Presisi ─── */}
      <div className="bg-dark-widget rounded-2xl p-4 border border-white/10 flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
          <Scale className="w-5 h-5 text-brand-neon" />
        </div>
        <p className="text-xs text-gray-300 leading-relaxed font-normal">
          Integrasi timbangan digital akurat per kilogram (Kg) dan konversi poin
          otomatis ke saldo.
        </p>
      </div>

      {/* ─── Kartu Bantuan / Helpdesk Tautan Cepat ─── */}
      <Link
        href="/#bantuan"
        className="mt-4 bg-white rounded-2xl p-4 flex items-center justify-between text-text-primary hover:bg-gray-50 transition-colors shadow-xs group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-dark-container text-brand-neon flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-text-primary group-hover:text-black">
              Butuh bantuan teknis saat login?
            </h5>
            <p className="text-[11px] text-text-secondary mt-0.5">
              Hubungi Helpdesk Layanan Circula
            </p>
          </div>
        </div>

        {/* Ikon panah miring ke atas kanan dengan animasi geser saat hover */}
        <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>

    </div>
  );
}
