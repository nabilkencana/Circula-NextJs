import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ReceiptCalculationDeckProps {
  totalBeratKg: number;
  estimasiNilaiRupiah: number;
  saldoSebelumTransaksi: number;
  totalPoinDiterbitkan: number;
  totalSaldoAkhir: number;
}

export default function ReceiptCalculationDeck({
  totalBeratKg,
  estimasiNilaiRupiah,
  saldoSebelumTransaksi,
  totalPoinDiterbitkan,
  totalSaldoAkhir,
}: ReceiptCalculationDeckProps) {
  return (
    <div className="bg-dark-container rounded-2xl p-6 text-white my-6 border border-white/10 shadow-lg">
      {/* Upper Metrics Rows */}
      <div className="space-y-2.5 text-xs sm:text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Total Berat Timbangan Aktual</span>
          <span className="font-mono font-bold text-white text-sm sm:text-base">
            {totalBeratKg.toFixed(1)} Kilogram
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300">Estimasi Nilai Rupiah</span>
          <span className="font-mono text-gray-300">
            Rp {estimasiNilaiRupiah.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300">Saldo Poin Sebelum Transaksi</span>
          <span className="font-mono text-gray-300">
            {saldoSebelumTransaksi} Poin
          </span>
        </div>
      </div>

      {/* Hairline Divider */}
      <div className="border-t border-white/10 my-4" />

      {/* Highlight Metric Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-gray-300 uppercase block">
            Total Poin Diterbitkan
          </span>
          <span className="text-[11px] text-gray-400 mt-0.5 block">
            Tercatat ke dompet digital pengguna
          </span>
        </div>

        <div className="text-left sm:text-right">
          <span className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-brand-neon tracking-tight block">
            +{totalPoinDiterbitkan} POIN CIRCULA
          </span>
        </div>
      </div>

      {/* Footnote Active Balance Update */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-lime-400/90 font-medium">
        <CheckCircle2 className="w-3.5 h-3.5 text-brand-neon shrink-0" />
        <span>
          Total Saldo Poin Akun Anda Sekarang:{" "}
          <strong className="font-bold text-white">{totalSaldoAkhir} Poin</strong> (Siap
          ditukarkan pada Katalog Reward).
        </span>
      </div>
    </div>
  );
}
