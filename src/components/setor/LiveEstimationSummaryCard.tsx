"use client";

/**
 * ============================================================================
 * Komponen: LiveEstimationSummaryCard
 * Direktori: src/components/setor/LiveEstimationSummaryCard.tsx
 *
 * Fungsi Utama:
 * Kartu ringkasan estimasi interaktif (Sticky Bento Card) di sisi kanan formulir setor.
 * Menyajikan kalkulasi langsung (real-time live feed):
 * 1. Poin Circula utama berukuran besar dengan aksen neon (#CEF241).
 * 2. Nilai konversi ekuivalen rupiah pada katalog voucher hadiah.
 * 3. Rincian metrik: Total kategori material, estimasi berat akumulatif (kg),
 *    saldo akun saat ini, dan proyeksi saldo akhir nasabah.
 * 4. Kotak disclaimer ketentuan penimbangan digital di loket resmi.
 * 5. Tombol aksi kirim pengajuan ("Kirim Pengajuan Setor") dengan status loading spinner.
 *
 * Konsep Teknis:
 * - Posisi Sticky: Menggunakan `sticky top-24` agar tetap berada di viewport pengguna saat
 *   halaman formulir di-scroll ke bawah pada layar desktop.
 * ============================================================================
 */

import React from "react";
import { ArrowRight, TrendingUp, Info, Loader2 } from "lucide-react";

/**
 * Interface LiveEstimationSummaryCardProps:
 * Kontrak properti yang dikonsumsi oleh kartu ringkasan estimasi transaksi.
 */
interface LiveEstimationSummaryCardProps {
  /** Jumlah jenis material sampah terdaftar */
  totalItemsCount: number;
  /** Akumulasi total berat fisik sampah (kg) */
  totalEstimasiBerat: number;
  /** Akumulasi estimasi perolehan poin reward */
  totalEstimasiPoin: number;
  /** Ekuivalen nilai rupiah berdasarkan tarif daur ulang */
  totalEstimasiRupiah: number;
  /** Saldo poin reward akun nasabah saat ini */
  saldoAkunSaatIni: number;
  /** Proyeksi saldo poin nasabah setelah transaksi disetujui */
  proyeksiSaldoAkhir: number;
  /** Flag penanda proses pengiriman data sedang berlangsung */
  isSubmitting: boolean;
  /** Callback saat tombol submit ditekan */
  onSubmit: () => void;
}

export default function LiveEstimationSummaryCard({
  totalItemsCount,
  totalEstimasiBerat,
  totalEstimasiPoin,
  totalEstimasiRupiah,
  saldoAkunSaatIni,
  proyeksiSaldoAkhir,
  isSubmitting,
  onSubmit,
}: LiveEstimationSummaryCardProps) {
  return (
    <div className="bg-dark-container rounded-3xl p-6 sm:p-7 md:p-8 text-white border border-white/10 shadow-2xl sticky top-24">
      {/* ========================================================================= */}
      {/* HEADER KARTU BENTO                                                        */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <span className="text-[11px] font-extrabold tracking-widest text-gray-400 uppercase">
          Ringkasan Estimasi
        </span>
      </div>

      {/* ========================================================================= */}
      {/* METRIK UTAMA: TOTAL POIN CIRCULA & EKUIVALEN RUPIAH                       */}
      {/* ========================================================================= */}
      <div className="my-5">
        <div className="text-3xl sm:text-4xl font-extrabold text-brand-neon tracking-tight leading-none">
          {totalEstimasiPoin} POIN CIRCULA
        </div>
        <p className="text-xs text-gray-300 mt-2 font-normal leading-relaxed">
          Potensi konversi setara{" "}
          <strong className="text-white font-semibold">
            Rp {totalEstimasiRupiah.toLocaleString("id-ID")}
          </strong>{" "}
          pada katalog voucher
        </p>
      </div>

      {/* ========================================================================= */}
      {/* RINCIAN TABEL METRIK TRANSAKSI                                            */}
      {/* ========================================================================= */}
      <div className="space-y-3 py-4 border-t border-b border-white/10 text-xs">
        {/* Total Material */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Total Material Terpilih</span>
          <span className="font-bold text-white">{totalItemsCount} Kategori</span>
        </div>

        {/* Berat Akumulatif */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Estimasi Berat Akumulatif</span>
          <span className="font-bold text-white">{totalEstimasiBerat} Kg</span>
        </div>

        {/* Saldo Saat Ini */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Saldo Akun Saat Ini</span>
          <span className="font-semibold text-gray-300">{saldoAkunSaatIni} Poin</span>
        </div>

        {/* Proyeksi Saldo Akhir */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="font-bold text-white">Proyeksi Saldo Akhir</span>
          <div className="flex items-center gap-1 font-bold text-brand-neon text-sm">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{proyeksiSaldoAkhir} Poin</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* KOTAK DISCLAIMER KETENTUAN PENIMBANGAN DI LOKET RESMI                      */}
      {/* ========================================================================= */}
      <div className="my-5 p-3.5 rounded-xl bg-dark-widget border border-white/10 text-xs text-gray-300 flex items-start gap-2.5 leading-relaxed">
        <Info className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-gray-300">
          <strong className="text-white font-semibold">Ketentuan Penimbangan:</strong> Poin
          aktual akan dihitung ulang secara otomatis saat penimbangan digital oleh petugas di
          loket unit Circula.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* TOMBOL AKSI UTAMA PENGIRIMAN FORMULIR                                     */}
      {/* ========================================================================= */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold h-12 sm:h-13 rounded-full flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-brand-neon/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group text-xs sm:text-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-dark-container" />
            <span>Memproses Tiket...</span>
          </>
        ) : (
          <>
            <span>Kirim Pengajuan Setor</span>
            <div className="w-6 h-6 rounded-full bg-dark-container text-brand-neon flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </>
        )}
      </button>
    </div>
  );
}
