/**
 * @file CardDitolak.tsx
 * @description Komponen kartu transaksi untuk tiket penyetoran sampah yang berstatus "DITOLAK".
 * Menampilkan:
 * 1. Header status penolakan dengan aksen warna merah rose dan ikon silang (`X`).
 * 2. Banner peringatan transparan memuat catatan spesifik inspeksi dari petugas (misal: tercampur residu/oli).
 * 3. Tautan edukatif menuju panduan pemilahan sampah 3R (`/kategori-sampah`) agar nasabah dapat mengajukan ulang.
 * 
 * Peran dalam UKK:
 * - Menangani UX pada skenario kegagalan transaksi (Negative / Error State UX).
 * - Memberikan alasan yang jelas (constructive feedback) mengapa sampah ditolak, bukan sekadar error tanpa solusi.
 * - Membimbing pengguna memperbaiki kualitas pemilahan sampah sesuai standar Dinas Lingkungan Hidup.
 */

import React from "react";
import Link from "next/link"; // Komponen tautan Next.js
import { X, ArrowRight } from "lucide-react"; // Ikon: Tanda Silang (X) dan Panah Kanan
import { TransaksiPenyetoran } from "@/types/historiSetor"; // Kontrak tipe data transaksi

/**
 * Interface props untuk CardDitolak
 * @property transaksi - Data tiket penyetoran sampah yang ditolak oleh petugas loket
 */
interface CardDitolakProps {
  transaksi: TransaksiPenyetoran;
}

export default function CardDitolak({ transaksi }: CardDitolakProps) {
  return (
    /* Kontainer Kartu Status Ditolak */
    <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:border-gray-300">
      
      {/* ─── 1. Header Kartu: Kode Setor & Badge Penolakan ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Ikon Bulat Merah Silang */}
          <div className="w-9 h-9 rounded-full bg-rose-50 border border-rose-200/60 text-rose-600 flex items-center justify-center shrink-0">
            <X className="w-4 h-4 text-rose-600 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-mono text-base sm:text-lg font-extrabold text-gray-900 tracking-tight leading-tight">
              {transaksi.kodeSetor}
            </h3>
            <span className="text-xs text-gray-400 block mt-0.5 font-medium">
              14 Agu 2026
            </span>
          </div>
        </div>

        {/* Badge Pill Status Ditolak */}
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1F2] border border-[#FECDD3] text-[#BE123C] text-xs font-semibold">
          <div className="w-3.5 h-3.5 rounded-full border border-[#BE123C] flex items-center justify-center text-[9px] font-bold">
            ✕
          </div>
          <span>Pengajuan Ditolak</span>
        </div>
      </div>

      {/* ─── 2. Banner Peringatan Catatan Petugas ─── */}
      {/* Berisi penjelasan objektif kenapa sampah belum bisa diterima di unit */}
      <div className="p-4 my-4.5 rounded-2xl bg-[#FFF1F2]/60 border border-[#FEE2E2] text-xs text-[#9F1239] leading-relaxed">
        <strong className="font-bold text-[#881337]">Catatan Petugas:</strong>{" "}
        {transaksi.catatanPetugas ||
          "Sampah botol plastik masih tercampur cairan residu oli dan tidak memenuhi standar kebersihan 3R."}
      </div>

      {/* ─── 3. Footer Kartu: Bimbingan Pemilahan Ulang ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
        <span className="text-gray-400 font-normal">
          Silakan bersihkan dan keringkan material kembali sebelum mengajukan ulang.
        </span>

        {/* Tautan ke Halaman Panduan Katalog Sampah */}
        <Link
          href="/kategori-sampah"
          className="self-start sm:self-auto inline-flex items-center gap-1.5 font-bold text-gray-900 hover:text-black transition-colors"
        >
          <span>Pelajari Panduan Pemilahan Ulang</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-700" />
        </Link>
      </div>

    </div>
  );
}
