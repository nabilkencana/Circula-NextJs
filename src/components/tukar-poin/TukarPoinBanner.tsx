"use client";

import React from "react";
import Link from "next/link";
import { Star, ReceiptText, ArrowUpRight } from "lucide-react";
import { SaldoNasabahSummary } from "@/types/tukarPoin";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * Interface properties untuk komponen banner atas halaman Tukar Poin.
 */
interface TukarPoinBannerProps {
  /** Objek ringkasan saldo poin aktif, estimasi rupiah, dan total transaksi nasabah */
  saldoSummary: SaldoNasabahSummary;
  /** Nama lengkap nasabah yang sedang aktif login */
  userName?: string;
}

/**
 * Komponen Banner Utama Penukaran Poin (TukarPoinBanner)
 *
 * Menampilkan salam personal kepada nasabah, visi pemilahan sampah sirkular,
 * serta kartu widget gelap ("Dompet Poin Nasabah") yang menonjolkan:
 * 1. Angka saldo poin aktif dengan animasi count-up numerik.
 * 2. Tautan cepat navigasi menuju riwayat transaksi penukaran (`/histori`).
 * 3. Nilai konversi estimasi kas rupiah (kurs 1 Poin = Rp 350) dan metrik transaksi sukses.
 *
 * @param props Properti komponen banner tukar poin
 * @returns JSX Element banner atas halaman tukar poin
 */
export default function TukarPoinBanner({
  saldoSummary,
  userName = "Budi Santoso",
}: TukarPoinBannerProps) {
  // Ekstraksi nilai saldo atau gunakan fallback default
  const points = saldoSummary.saldoPoinAktif ?? 350;
  const kasValue = (saldoSummary.nilaiKonversiRupiah && saldoSummary.nilaiKonversiRupiah > 0)
    ? saldoSummary.nilaiKonversiRupiah
    : points * 350;
  const totalTrx = saldoSummary.totalTransaksiSelesai || 14;

  // Animasi count-up numerik untuk visualisasi interaktif saat halaman dibuka
  const animatedPoints = useCountUp(points, 700);
  const animatedKasValue = useCountUp(kasValue, 800);
  const animatedTotalTrx = useCountUp(totalTrx, 600);

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 lg:p-9 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* ================= KOLOM KIRI: SALAM & MISI SIRKULAR ================= */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-2">
          <p className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-gray-500">
            EKOSISTEM SIRKULAR NASABAH
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] tracking-tight">
            Halo, {userName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed max-w-xl">
            Tukarkan poin hasil pemilahan sampahmu menjadi hadiah bermanfaat. Setiap kilogram sampah yang kamu pilah membawa berkah pangan dan utilitas digital.
          </p>
        </div>

        {/* ================= KOLOM KANAN: WIDGET DOMPET POIN NASABAH ================= */}
        <div className="lg:col-span-5 xl:col-span-5">
          <div className="bg-[#111315] rounded-2xl p-5 sm:p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden border border-white/10">
            {/* Efek pendaran latar belakang halus (ambient neon glow) */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header Kartu: Label Dompet & Navigasi ke Riwayat */}
            <div className="flex items-center justify-between gap-2 relative z-10">
              <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-gray-300">
                <Star className="w-3.5 h-3.5 fill-brand-neon text-brand-neon" />
                <span className="text-[11px] uppercase tracking-wider">DOMPET POIN NASABAH</span>
              </div>

              <Link
                href="/histori"
                className="btn-interactive inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-[11px] font-semibold transition-all shrink-0"
              >
                <ReceiptText className="w-3 h-3 text-gray-300" />
                <span>Riwayat Penukaran</span>
              </Link>
            </div>

            {/* Baris Saldo Poin dengan Tipografi Menonjol */}
            <div className="my-4 flex items-baseline gap-2 relative z-10">
              <span className="text-brand-neon font-black text-4xl sm:text-5xl tracking-tight leading-none font-mono">
                {animatedPoints}
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                POIN TERSEDIA
              </span>
            </div>

            {/* Footer Metrik Kartu: Nilai Konversi Rupiah & Catatan Transaksi */}
            <div className="pt-2 border-t border-white/10 text-[11px] text-gray-400 font-medium relative z-10 flex items-center justify-between">
              <span>
                Nilai Tukar Kas: <strong className="text-white font-bold">Rp {animatedKasValue}</strong> • {animatedTotalTrx} Transaksi Sukses
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
