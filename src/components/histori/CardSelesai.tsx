/**
 * @file CardSelesai.tsx
 * @description Komponen kartu transaksi untuk tiket penyetoran sampah berstatus "SELESAI".
 * Menampilkan:
 * 1. Header status tervalidasi dengan warna hijau emerald.
 * 2. Pipeline stepper 3 tahap yang telah terselesaikan (Pengajuan -> Timbangan Selesai -> Poin Terbit).
 * 3. Unified Bento Grid 3 kolom (Hasil Timbangan Petugas, Total Metrik Riil & Poin, serta Data Verifikator).
 * 4. Tautan cetak struk/nota transaksi digital ke rute `/nota/[id]`.
 * 
 * Peran dalam UKK:
 * - Menunjukkan visualisasi bukti transaksi sukses (Receipt Card UI) yang transparan dan akuntabel.
 * - Memisahkan nilai estimasi awal nasabah dengan hasil pengukuran riil timbangan tera digital petugas.
 * - Mengintegrasikan alur pencetakan nota digital menggunakan ikon Printer.
 */

import React from "react";
import Link from "next/link"; // Komponen navigasi Next.js
import { Check, ShieldCheck, Printer, ArrowRight } from "lucide-react"; // Ikon: Centang, Perisai, Printer Cetak, dan Panah Kanan
import { TransaksiPenyetoran } from "@/types/historiSetor"; // Kontrak tipe data transaksi

/**
 * Interface props untuk CardSelesai
 * @property transaksi - Data lengkap transaksi penyetoran sampah yang telah berstatus 'selesai'
 */
interface CardSelesaiProps {
  transaksi: TransaksiPenyetoran;
}

export default function CardSelesai({ transaksi }: CardSelesaiProps) {
  return (
    /* Kontainer Kartu Putih Bersih dengan Hover Shadow Halus */
    <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-gray-300 transition-all duration-300">
      
      {/* ─── 1. Header Kartu: Kode Setor & Badge Status Selesai ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Ikon Lingkaran Hijau Centang */}
          <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-mono text-base sm:text-lg font-extrabold text-gray-900 tracking-tight leading-tight">
              {transaksi.kodeSetor}
            </h3>
            <span className="text-xs text-gray-400 block mt-0.5 font-medium">
              Selesai: 26 Agu 2026, 09.35 WIB
            </span>
          </div>
        </div>

        {/* Badge Pill Status Selesai & Poin Diterbitkan */}
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-semibold shadow-2xs">
          <div className="w-3.5 h-3.5 rounded-sm border border-[#065F46] flex items-center justify-center text-[9px] font-bold">
            ✓
          </div>
          <span>Selesai &amp; Poin Diterbitkan</span>
        </div>
      </div>

      {/* ─── 2. Pipeline Workflow Stepper (Semua Tahap Selesai) ─── */}
      <div className="pt-4 pb-1">
        <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
          {/* Step 1: Pengajuan */}
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <div className="w-4.5 h-4.5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">✓</div>
            <span className="hidden sm:inline">1. Pengajuan</span>
          </div>
          <div className="h-0.5 flex-1 mx-2 sm:mx-3 bg-emerald-400 rounded-full" />
          
          {/* Step 2: Timbangan Selesai */}
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <div className="w-4.5 h-4.5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">✓</div>
            <span>2. Timbangan Selesai</span>
          </div>
          <div className="h-0.5 flex-1 mx-2 sm:mx-3 bg-emerald-400 rounded-full" />
          
          {/* Step 3: Poin Terbit */}
          <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
            <div className="w-4.5 h-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</div>
            <span className="hidden sm:inline">3. Poin Terbit</span>
          </div>
        </div>
      </div>

      {/* ─── 3. Unified Bento Grid 3 Kolom ─── */}
      <div className="bg-[#F9FAFB] rounded-2xl border border-gray-100 p-4 sm:p-5 my-4 grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        
        {/* Kolom 1: Rincian Hasil Timbangan Petugas per Kategori */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
            HASIL TIMBANGAN PETUGAS
          </span>
          <ul className="space-y-1.5 text-xs font-medium text-gray-800">
            {transaksi.items && transaksi.items.length > 0 ? (
              transaksi.items.map((it, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] shrink-0" />
                  <span>{it.kategoriNama}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] shrink-0" />
                  <span>Botol Plastik PET: 10.0 Kg (100 Poin)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] shrink-0" />
                  <span>Kardus &amp; Karton: 5.0 Kg (25 Poin)</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Kolom 2: Metrik Total Berat Riil & Poin Rewards */}
        <div className="space-y-2.5 md:border-l md:border-gray-200/60 md:pl-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Total Timbangan Real:</span>
            <span className="text-sm font-bold text-gray-900">
              {Number(transaksi.totalBeratKg || 15).toFixed(1)} Kg
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Total Poin Diterima:</span>
            <div className="flex items-center gap-1 text-sm font-extrabold text-gray-900">
              <span className="text-amber-500">★</span>
              <span>+{transaksi.totalPoin || "150"} Poin</span>
            </div>
          </div>
        </div>

        {/* Kolom 3: Identitas Petugas Verifikator & Catatan Lapangan */}
        <div className="space-y-1 md:border-l md:border-gray-200/60 md:pl-5 text-xs">
          <p className="font-bold text-gray-900 leading-snug">
            {transaksi.petugasVerifikator && transaksi.petugasVerifikator.startsWith("Petugas:")
              ? transaksi.petugasVerifikator
              : `Petugas: ${transaksi.petugasVerifikator || "Ahmad Fauzi (Timbangan Tera Digital #04)"}`}
          </p>
          <p className="text-gray-500 text-[11px] leading-relaxed">
            Catatan: {transaksi.catatanPetugas || "Berat sampah sesuai hasil timbangan real"}
          </p>
        </div>
      </div>

      {/* ─── 4. Footer Kartu: Informasi Ledger & Tombol Cetak Nota ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
        <div className="flex items-center gap-2 text-gray-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Transaksi telah diverifikasi dan masuk ke ledger akun Anda.</span>
        </div>

        {/* Tombol Cetak Nota Digital */}
        <Link
          href={`/nota/${transaksi.id || transaksi.kodeSetor}`}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300/90 bg-white text-gray-800 text-xs font-semibold hover:bg-gray-50 transition-colors shadow-2xs"
        >
          <Printer className="w-3.5 h-3.5 text-gray-600" />
          <span>Cetak Struk / Nota Digital</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
        </Link>
      </div>

    </div>
  );
}
