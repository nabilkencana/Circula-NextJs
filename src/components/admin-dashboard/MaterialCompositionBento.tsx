/**
 * @file MaterialCompositionBento.tsx
 * @description Komponen kartu bento komposisi material sampah daur ulang pada dashboard admin.
 * Menampilkan rincian distribusi bobot (kg) dan persentase kontribusi per kategori material
 * (Plastik, Kardus/Kertas, Logam/Aluminium, Kaca/Beling) dengan bilah kemajuan (progress bar) animasi,
 * serta tombol tautan cepat menuju halaman rekapitulasi laporan detail.
 * 
 * @module Components/AdminDashboard/MaterialCompositionBento
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CompositionMaterialStat } from "@/types/adminDashboard";

/**
 * Properti untuk komponen MaterialCompositionBento
 * 
 * @interface MaterialCompositionBentoProps
 * @property {CompositionMaterialStat[]} materials - Daftar data statistik komposisi material sampah.
 * @property {number} totalTonaseMasukKg - Total akumulasi berat limbah masuk dalam satuan kg.
 */
interface MaterialCompositionBentoProps {
  materials: CompositionMaterialStat[];
  totalTonaseMasukKg: number;
}

/**
 * Komponen MaterialCompositionBento
 * 
 * @component
 * @param {MaterialCompositionBentoProps} props - Data komposisi material.
 * @returns {JSX.Element} Kartu bento berlatar gelap dengan diagram batang horisontal interaktif.
 */
export default function MaterialCompositionBento({
  materials,
  totalTonaseMasukKg,
}: MaterialCompositionBentoProps) {
  // State animasi pemuatan bar progres agar bergerak mulus dari 0% ke target
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-dark-container text-white rounded-3xl p-5 sm:p-6 shadow-md border border-white/10 flex flex-col justify-between h-full">
      <div>
        {/* ===================================================================== */}
        {/* HEADER KARTU BENTO KOMPOSISI                                          */}
        {/* ===================================================================== */}
        <span className="text-[10px] sm:text-[11px] font-bold text-brand-neon tracking-wider uppercase block">
          Komposisi Material (Agt 2026)
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
          Material Terkumpul
        </h3>
        <p className="text-xs text-gray-400 mt-1 mb-6 leading-relaxed">
          Distribusi berat total {totalTonaseMasukKg.toLocaleString("id-ID")} kg limbah terpilah
        </p>

        {/* ===================================================================== */}
        {/* DAFTAR BILAH KEMAJUAN (PROGRESS BARS) DISTRIBUSI MATERIAL             */}
        {/* ===================================================================== */}
        <div className="space-y-4">
          {materials.map((mat, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-200">
                  {mat.kategoriLabel}
                </span>
                <span className="font-mono text-gray-300 text-xs">
                  {mat.beratKg.toFixed(1)} kg ({mat.persentase.toFixed(1)}%)
                </span>
              </div>
              
              {/* Rel Progres Bar dengan Animasi Transisi Lebar */}
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: isLoaded ? `${Math.min(mat.persentase, 100)}%` : "0%",
                    backgroundColor: mat.barColorHex,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TOMBOL PINTASAN MENU MENUJU HALAMAN REKAPITULASI LAPORAN              */}
      {/* ===================================================================== */}
      <div className="mt-8 pt-4">
        <Link
          href="/admin/laporan"
          className="btn-interactive w-full py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 border border-white/15 text-xs font-bold text-white text-center flex items-center justify-center gap-1.5 transition-all group shadow-xs"
        >
          <span>Lihat Detail Rekapitulasi Lengkap</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
