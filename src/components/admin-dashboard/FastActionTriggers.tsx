"use client";

import React from "react";
import Link from "next/link";
import { Plus, Users, Tag, FileText } from "lucide-react";

interface FastActionTriggersProps {
  onTimbangBaru?: () => void;
  onDaftarNasabah?: () => void;
  onUpdateHarga?: () => void;
  onCetakPdf?: () => void;
}

export default function FastActionTriggers({
  onTimbangBaru,
  onDaftarNasabah,
  onUpdateHarga,
  onCetakPdf,
}: FastActionTriggersProps) {
  return (
    <nav
      aria-label="Aksi Cepat Operasional"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-6 sm:my-8"
    >
      {/* 1. Primary Action: Timbang Sampah Baru */}
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
          <Plus className="w-3.5 h-3.5 text-brand-neon stroke-3" />
        </div>
        <span>Timbang Sampah Baru</span>
      </Link>

      {/* 2. Secondary Action: Pendaftaran Nasabah */}
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
        <Users className="w-4 h-4 text-sky-600 shrink-0" />
        <span>Pendaftaran Nasabah</span>
      </Link>

      {/* 3. Secondary Action: Perbarui Harga Kategori */}
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
        <Tag className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Perbarui Harga Kategori</span>
      </Link>

      {/* 4. Secondary Action: Cetak Rekapitulasi PDF */}
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
        <FileText className="w-4 h-4 text-gray-500 shrink-0" />
        <span>Cetak Rekapitulasi PDF</span>
      </Link>
    </nav>
  );
}
