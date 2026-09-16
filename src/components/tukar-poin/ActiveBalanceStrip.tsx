import React from "react";
import Link from "next/link";
import { Coins, ArrowRight } from "lucide-react";
import { SaldoNasabahSummary } from "@/types/tukarPoin";

interface ActiveBalanceStripProps {
  saldoSummary: SaldoNasabahSummary;
}

export default function ActiveBalanceStrip({ saldoSummary }: ActiveBalanceStripProps) {
  const rupiahText = `Setara Rp ${saldoSummary.nilaiKonversiRupiah.toLocaleString("id-ID")}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
      <div className="p-5 sm:p-6 bg-white border border-gray-200 rounded-3xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 shadow-xs">
        {/* Left Side: Active Point Balance & Conversion Badge */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-neon text-dark-container flex items-center justify-center shrink-0 shadow-sm">
            <Coins className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div>
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-text-secondary block">
              Saldo Poin Aktif Anda
            </span>
            <div className="flex flex-wrap items-center gap-2.5 mt-0.5">
              <span className="text-xl sm:text-2xl lg:text-[26px] font-bold text-text-primary tracking-tight">
                {saldoSummary.saldoPoinAktif} Poin Circula
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-lime-100 border border-brand-neon/50 text-dark-container text-xs font-bold shadow-xs">
                {rupiahText}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Ledger Summary & Ghost CTA Link */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
          <div className="text-xs text-text-secondary">
            Aktivitas Terkini:{" "}
            <span className="font-semibold text-text-primary">
              Terpakai bln ini: {saldoSummary.poinTerpakaiBulanIni} Poin
            </span>{" "}
            • {saldoSummary.totalTransaksiSelesai} Transaksi
          </div>

          <Link
            href="/histori"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-text-primary hover:bg-inset-gray hover:border-gray-300 transition-all self-start sm:self-auto"
          >
            <span>Lihat Riwayat Penukaran Saya</span>
            <ArrowRight className="w-3.5 h-3.5 text-text-secondary" />
          </Link>
        </div>
      </div>
    </div>
  );
}
