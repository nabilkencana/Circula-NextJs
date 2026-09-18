/**
 * ============================================================================
 * Komponen: ActiveBalanceStrip
 * Direktori: src/components/tukar-poin/ActiveBalanceStrip.tsx
 *
 * Fungsi Utama:
 * Strip ringkasan saldo poin nasabah (Active Point Balance Banner).
 * Menyajikan:
 * 1. Nilai saldo poin aktif nasabah beserta badge konversi rupiah (kurs standar 1 poin = Rp 350).
 * 2. Informasi ringkas aktivitas bulanan: Jumlah poin terpakai bulan ini dan total transaksi selesai.
 * 3. Tautan pintas (Shortcut Link) menuju riwayat penukaran dan histori transaksi di `/histori`.
 *
 * Konsep Teknis:
 * - Controlled Component: Menerima objek agregat `saldoSummary` dari halaman atau hook.
 * - Desain Responsif: Menggunakan Flexbox wrap untuk tata letak yang proporsional di HP dan desktop.
 * ============================================================================
 */

import React from "react";
import Link from "next/link";
import { Coins, ArrowRight } from "lucide-react";
import { SaldoNasabahSummary } from "@/types/tukarPoin";

/**
 * Interface ActiveBalanceStripProps:
 * Kontrak properti yang diperlukan untuk menampilkan strip saldo nasabah.
 */
interface ActiveBalanceStripProps {
  /** Objek ringkasan saldo poin dan mutasi nasabah */
  saldoSummary: SaldoNasabahSummary;
}

export default function ActiveBalanceStrip({ saldoSummary }: ActiveBalanceStripProps) {
  // Hitung nilai konversi rupiah (fallback: 1 poin = Rp 350)
  const nilaiKonversi = saldoSummary.nilaiKonversiRupiah ?? (saldoSummary.saldoPoinAktif * 350);
  const rupiahText = `Setara Rp ${nilaiKonversi.toLocaleString("id-ID")}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
      <div className="p-5 sm:p-6 bg-white border border-gray-200 rounded-3xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 shadow-xs">
        {/* ===================================================================== */}
        {/* SISI KIRI: Saldo Poin Aktif & Badge Konversi Ekuivalen Rupiah         */}
        {/* ===================================================================== */}
        <div className="flex items-center gap-4">
          {/* Ikon Koin Beraksen Warna Neon Brand */}
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

        {/* ===================================================================== */}
        {/* SISI KANAN: Ringkasan Aktivitas Bulanan & Tautan Riwayat Penukaran    */}
        {/* ===================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
          <div className="text-xs text-text-secondary">
            Aktivitas Terkini:{" "}
            <span className="font-semibold text-text-primary">
              Terpakai bln ini: {saldoSummary.poinTerpakaiBulanIni} Poin
            </span>{" "}
            • {saldoSummary.totalTransaksiSelesai} Transaksi
          </div>

          {/* Tautan Menuju Histori Transaksi */}
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
