/**
 * @file FastActionTriggers.tsx
 * @description Komponen bilah navigasi aksi cepat (Fast-Action Triggers) pada dashboard admin bank sampah.
 * Menyediakan 4 pintasan utama untuk alur kerja operasional harian:
 * 1. Aksi Utama: "Timbang Sampah Baru" (tombol neon berikon plus).
 * 2. Aksi Sekunder: "Pendaftaran Nasabah" (navigasi ke registrasi warga).
 * 3. Aksi Sekunder: "Perbarui Harga Kategori" (navigasi ke konfigurasi tarif/poin).
 * 4. Aksi Sekunder: "Cetak Rekapitulasi PDF" (navigasi ke ekspor laporan tonase).
 * 
 * @module Components/AdminDashboard/FastActionTriggers
 */

"use client";

import React from "react";
import Link from "next/link";
import { Plus, Users, Tag, FileText } from "lucide-react";

/**
 * Properti handler callback untuk interaksi aksi cepat
 * 
 * @interface FastActionTriggersProps
 * @property {() => void} [onTimbangBaru] - Handler klik pembukaan timbangan baru.
 * @property {() => void} [onDaftarNasabah] - Handler klik modul pendaftaran nasabah.
 * @property {() => void} [onUpdateHarga] - Handler klik modul perubahan tarif kategori.
 * @property {() => void} [onCetakPdf] - Handler klik modul ekspor dokumen PDF.
 */
interface FastActionTriggersProps {
  onTimbangBaru?: () => void;
  onDaftarNasabah?: () => void;
  onUpdateHarga?: () => void;
  onCetakPdf?: () => void;
}

/**
 * Komponen FastActionTriggers
 * 
 * @component
 * @param {FastActionTriggersProps} props - Handler tindakan cepat.
 * @returns {JSX.Element} Grid 4 tombol pintasan aksi operasional.
 */
export default function FastActionTriggers({
  onTimbangBaru,
  onDaftarNasabah,
  onUpdateHarga,
  onCetakPdf,
}: FastActionTriggersProps) {
  return (
    <nav
      aria-label="Aksi Cepat Operasional Petugas"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-6 sm:my-8"
    >
      {/* ===================================================================== */}
      {/* 1. AKSI UTAMA: TIMBANG SAMPAH BARU                                    */}
      {/* ===================================================================== */}
      <Link
        href="/admin/transaksi"
        onClick={(e) => {
          if (onTimbangBaru) {
            e.preventDefault();
            onTimbangBaru();
          }
        }}
        className="btn-interactive group relative flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-bold text-xs sm:text-sm shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95"
      >
        <div className="w-5 h-5 rounded-full bg-dark-container flex items-center justify-center shrink-0">
          <Plus className="w-3.5 h-3.5 text-brand-neon stroke-3" aria-hidden="true" />
        </div>
        <span>Timbang Sampah Baru</span>
      </Link>

      {/* ===================================================================== */}
      {/* 2. AKSI SEKUNDER: PENDAFTARAN NASABAH                                 */}
      {/* ===================================================================== */}
      <Link
        href="/admin/nasabah"
        onClick={(e) => {
          if (onDaftarNasabah) {
            e.preventDefault();
            onDaftarNasabah();
          }
        }}
        className="btn-interactive flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-gray-50 text-text-primary border border-gray-200 font-bold text-xs sm:text-sm shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95"
      >
        <Users className="w-4 h-4 text-sky-600 shrink-0" aria-hidden="true" />
        <span>Pendaftaran Nasabah</span>
      </Link>

      {/* ===================================================================== */}
      {/* 3. AKSI SEKUNDER: PERBARUI HARGA KATEGORI                             */}
      {/* ===================================================================== */}
      <Link
        href="/admin/kategori-sampah"
        onClick={(e) => {
          if (onUpdateHarga) {
            e.preventDefault();
            onUpdateHarga();
          }
        }}
        className="btn-interactive flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-gray-50 text-text-primary border border-gray-200 font-bold text-xs sm:text-sm shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95"
      >
        <Tag className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
        <span>Perbarui Harga Kategori</span>
      </Link>

      {/* ===================================================================== */}
      {/* 4. AKSI SEKUNDER: CETAK REKAPITULASI PDF                              */}
      {/* ===================================================================== */}
      <Link
        href="/admin/laporan"
        onClick={(e) => {
          if (onCetakPdf) {
            e.preventDefault();
            onCetakPdf();
          }
        }}
        className="btn-interactive flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-gray-50 text-text-primary border border-gray-200 font-bold text-xs sm:text-sm shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95"
      >
        <FileText className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
        <span>Cetak Rekapitulasi PDF</span>
      </Link>
    </nav>
  );
}
