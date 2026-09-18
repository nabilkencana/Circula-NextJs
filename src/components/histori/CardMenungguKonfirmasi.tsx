/**
 * @file CardMenungguKonfirmasi.tsx
 * @description Komponen kartu transaksi untuk tiket penyetoran sampah berstatus "MENUNGGU_KONFIRMASI" atau "DIVERIFIKASI".
 * Menampilkan:
 * 1. Header status menunggu dengan aksen amber dan indikator titik animasi berkedip (`animate-ping`).
 * 2. Stepper alur proses (Tahap 1 selesai, Tahap 2 sedang berjalan/berkedip, Tahap 3 pending).
 * 3. Unified Bento Grid 3 kolom (Item estimasi yang diajukan nasabah, estimasi berat & poin, serta metode penyerahan).
 * 4. Petunjuk instruksi bagi nasabah untuk menunjukkan kode setor ke loket timbangan resmi.
 * 
 * Peran dalam UKK:
 * - Menunjukkan status transaksional aktif / pending (In-Flight Transaction State).
 * - Menerapkan micro-interaction visual (animasi denyut radar / pulsing dot) untuk menunjukkan tiket sedang aktif.
 * - Membantu penguji memahami alur bridging antara aplikasi digital dengan proses fisik di loket bank sampah.
 */

import React from "react";
import Link from "next/link"; // Komponen navigasi Next.js
import { Clock, Info, ArrowRight } from "lucide-react"; // Ikon: Jam Waktu, Informasi, dan Panah Kanan
import { TransaksiPenyetoran } from "@/types/historiSetor"; // Kontrak tipe data transaksi

/**
 * Interface props untuk CardMenungguKonfirmasi
 * @property transaksi - Data tiket penyetoran yang masih menunggu konfirmasi/penimbangan
 */
interface CardMenungguKonfirmasiProps {
  transaksi: TransaksiPenyetoran;
}

export default function CardMenungguKonfirmasi({
  transaksi,
}: CardMenungguKonfirmasiProps) {
  return (
    /* Kontainer Kartu Transaksi Pending */
    <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-gray-300 transition-all duration-300">
      
      {/* ─── 1. Header Kartu: Kode Setor & Badge Status Pending ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Ikon Jam Berwarna Amber */}
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h3 className="font-mono text-base sm:text-lg font-extrabold text-gray-900 tracking-tight leading-tight">
              {transaksi.kodeSetor}
            </h3>
            <span className="text-xs text-gray-400 block mt-0.5 font-medium">
              Diajukan: 26 Agu 2026, 10.00 WIB
            </span>
          </div>
        </div>

        {/* Badge Pill Status dengan Indikator Radar Denyut (Pulsing Dot) */}
        <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF9E6] border border-[#FDE68A] text-[#B45309] text-xs font-semibold shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span>Menunggu Konfirmasi Petugas</span>
        </div>
      </div>

      {/* ─── 2. Stepper Alur Kerja (Tahap 2 Sedang Berlangsung) ─── */}
      <div className="pt-4 pb-1">
        <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
          {/* Tahap 1 Selesai */}
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <div className="w-4.5 h-4.5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">✓</div>
            <span className="hidden sm:inline">1. Pengajuan</span>
          </div>
          <div className="h-0.5 flex-1 mx-2 sm:mx-3 bg-linear-to-r from-emerald-400 via-amber-400 to-gray-200 rounded-full" />
          
          {/* Tahap 2 Aktif Berjalan (Animasi Denyut Teks & Ikon) */}
          <div className="flex items-center gap-1.5 text-amber-600 font-extrabold">
            <div className="w-4.5 h-4.5 rounded-full bg-amber-100 flex items-center justify-center text-[10px] animate-pulse">●</div>
            <span>2. Verifikasi &amp; Timbang</span>
          </div>
          <div className="h-0.5 flex-1 mx-2 sm:mx-3 bg-gray-200 rounded-full" />
          
          {/* Tahap 3 Belum Dimulai */}
          <div className="flex items-center gap-1.5 text-gray-400">
            <div className="w-4.5 h-4.5 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">3</div>
            <span className="hidden sm:inline">3. Poin Terbit</span>
          </div>
        </div>
      </div>

      {/* ─── 3. Unified Bento Grid 3 Kolom ─── */}
      <div className="bg-[#F9FAFB] rounded-2xl border border-gray-100 p-4 sm:p-5 my-4 grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        
        {/* Kolom 1: Daftar Item Sampah yang Diajukan Nasabah */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
            ITEM SAMPAH DIAJUKAN
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
                  <span>Botol Plastik PET (Est. 4.5 Kg)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] shrink-0" />
                  <span>Kardus &amp; Karton (Est. 2.0 Kg)</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Kolom 2: Metrik Estimasi Berat & Poin Sementara */}
        <div className="space-y-2.5 md:border-l md:border-gray-200/60 md:pl-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Total Estimasi Berat:</span>
            <span className="text-sm font-bold text-gray-900">
              {transaksi.totalBeratKg || "6.5"} Kg
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Estimasi Poin:</span>
            <div className="flex items-center gap-1 text-sm font-extrabold text-gray-900">
              <span className="text-amber-500">★</span>
              <span>+{transaksi.totalPoin || "55"} Poin</span>
            </div>
          </div>
        </div>

        {/* Kolom 3: Lokasi Unit Penyerahan & Catatan Nasabah */}
        <div className="space-y-1 md:border-l md:border-gray-200/60 md:pl-5 text-xs">
          <p className="font-bold text-gray-900 leading-snug">
            Metode: {transaksi.lokasiTujuan || "Drop-off Mandiri Unit Pusat"}
          </p>
          <p className="text-gray-500 text-[11px] leading-relaxed">
            Catatan: {transaksi.catatanNasabah || "Sampah sudah dipilah rapi dalam 2 karung"}
          </p>
        </div>
      </div>

      {/* ─── 4. Footer Kartu: Instruksi Loket & Tautan Detail ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-4 h-4 rounded-full border border-amber-400/80 text-amber-600 flex items-center justify-center shrink-0 text-[10px] font-bold">
            i
          </div>
          <span>Tunjukkan kode setor ini ke loket unit penimbangan.</span>
        </div>

        {/* Tombol Lihat Rincian Pengajuan */}
        <Link
          href="/setor/ajukan"
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300/90 bg-white text-gray-800 text-xs font-semibold hover:bg-gray-50 transition-colors shadow-2xs"
        >
          <span>Lihat Rincian Pengajuan</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
        </Link>
      </div>

    </div>
  );
}
