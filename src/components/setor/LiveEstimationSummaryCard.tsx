"use client";

import React from "react";
import { ArrowRight, TrendingUp, Info, Loader2 } from "lucide-react";

interface LiveEstimationSummaryCardProps {
  totalItemsCount: number;
  totalEstimasiBerat: number;
  totalEstimasiPoin: number;
  totalEstimasiRupiah: number;
  saldoAkunSaatIni: number;
  proyeksiSaldoAkhir: number;
  isSubmitting: boolean;
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
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <span className="text-[11px] font-extrabold tracking-widest text-gray-400 uppercase">
          Ringkasan Estimasi
        </span>
      </div>

      {/* Hero Metric */}
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

      {/* Metric Breakdown Rows */}
      <div className="space-y-3 py-4 border-t border-b border-white/10 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Total Material Terpilih</span>
          <span className="font-bold text-white">{totalItemsCount} Kategori</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Estimasi Berat Akumulatif</span>
          <span className="font-bold text-white">{totalEstimasiBerat} Kg</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Saldo Akun Saat Ini</span>
          <span className="font-semibold text-gray-300">{saldoAkunSaatIni} Poin</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="font-bold text-white">Proyeksi Saldo Akhir</span>
          <div className="flex items-center gap-1 font-bold text-brand-neon text-sm">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{proyeksiSaldoAkhir} Poin</span>
          </div>
        </div>
      </div>

      {/* Disclaimer Inset Box */}
      <div className="my-5 p-3.5 rounded-xl bg-dark-widget border border-white/10 text-xs text-gray-300 flex items-start gap-2.5 leading-relaxed">
        <Info className="w-4 h-4 text-brand-neon shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-gray-300">
          <strong className="text-white font-semibold">Ketentuan Penimbangan:</strong> Poin
          aktual akan dihitung ulang secara otomatis saat penimbangan digital oleh petugas di
          loket unit Circula.
        </p>
      </div>

      {/* Submit Button */}
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
