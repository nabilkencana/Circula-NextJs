/**
 * @file DashboardKpiGrid.tsx
 * @description Grid kartu indikator performa utama (KPI) operasional pada dashboard administrator.
 * Menampilkan 4 metrik kunci operasional dengan animasi visual kenaikan angka (`useCountUp`):
 * 1. Total Nasabah Terdaftar (beserta badge penambahan nasabah baru bulan berjalan).
 * 2. Total Tonase Sampah Terkumpul (dalam Ton, beserta persentase pertumbuhan vs bulan lalu).
 * 3. Valuasi Kas Masuk (dalam Rupiah, mencerminkan perputaran ekonomi sirkular).
 * 4. Poin Aktif Beredar (cadangan poin reward yang siap dicairkan oleh nasabah).
 * 
 * @module Components/AdminDashboard/DashboardKpiGrid
 */

"use client";

import React from "react";
import { Users, Scale, Banknote, Star } from "lucide-react";
import { DashboardKpiSummary } from "@/types/adminDashboard";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * Properti untuk komponen DashboardKpiGrid
 * 
 * @interface DashboardKpiGridProps
 * @property {DashboardKpiSummary} kpi - Objek nilai metrik performa operasional.
 */
interface DashboardKpiGridProps {
  kpi: DashboardKpiSummary;
}

/**
 * Komponen DashboardKpiGrid
 * 
 * @component
 * @param {DashboardKpiGridProps} props - Data metrik KPI.
 * @returns {JSX.Element} Grid 4 kartu metrik responsif dengan animasi angka dinamis.
 */
export default function DashboardKpiGrid({ kpi }: DashboardKpiGridProps) {
  // Inisialisasi animasi transisi hitung angka (count-up)
  const animatedNasabah = useCountUp(kpi.totalNasabah, 750);
  const animatedTonase = useCountUp(kpi.tonaseBulanIniTon, 800, 2);
  const animatedValuasi = useCountUp(kpi.valuasiKasRupiah, 900);
  const animatedPoin = useCountUp(kpi.poinAktifBeredar, 850);

  return (
    <section
      aria-label="Ringkasan Metrik Kinerja Operasional"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
    >
      {/* ===================================================================== */}
      {/* KARTU 1: JUMLAH NASABAH TERDAFTAR                                     */}
      {/* ===================================================================== */}
      <div className="stagger-1 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
              Nasabah Terdaftar
            </span>
            <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight font-mono">
              {animatedNasabah} Jiwa
            </span>
          </div>
        </div>
        <div className="mt-3.5">
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100/80 rounded-full px-2.5 py-1 text-[11px] font-bold inline-flex items-center gap-1">
            +{kpi.nasabahBaruBulanIni} nasabah baru bulan ini
          </span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* KARTU 2: TONASE BULAN BERJALAN                                        */}
      {/* ===================================================================== */}
      <div className="stagger-2 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
              Tonase Bulan Ini
            </span>
            <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
              <Scale className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight font-mono">
              {animatedTonase} Ton
            </span>
          </div>
        </div>
        <div className="mt-3.5">
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100/80 rounded-full px-2.5 py-1 text-[11px] font-bold inline-flex items-center gap-1">
            +{kpi.tonaseGrowthVsBulanLalu}% vs bulan lalu
          </span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* KARTU 3: ESTIMASI VALUASI KAS PERPUTARAN EKONOMI                       */}
      {/* ===================================================================== */}
      <div className="stagger-3 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
              Valuasi Kas Masuk
            </span>
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Banknote className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight font-mono">
              Rp {animatedValuasi}
            </span>
          </div>
        </div>
        <div className="mt-3.5">
          <span className="text-xs text-text-secondary font-medium leading-relaxed block">
            Perputaran nilai ekonomi sirkular
          </span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* KARTU 4: TOTAL SALDO POIN AKTIF BEREDAR DI WARGA                      */}
      {/* ===================================================================== */}
      <div className="stagger-4 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
              Poin Aktif Beredar
            </span>
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight font-mono">
              {animatedPoin} Poin
            </span>
          </div>
        </div>
        <div className="mt-3.5">
          <span className="bg-amber-50 text-amber-800 border border-amber-200/80 rounded-full px-2.5 py-1 text-[11px] font-bold inline-flex items-center gap-1">
            Cadangan reward siap klaim
          </span>
        </div>
      </div>
    </section>
  );
}
