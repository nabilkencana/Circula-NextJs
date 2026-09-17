"use client";

import React from "react";
import Link from "next/link";
import { Star, Scale, History, ArrowRight, PlusCircle, Sparkles, TrendingUp } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

interface SaldoPoinProminentCardProps {
  saldoPoin: number;
  totalKg: number;
  totalTransaksi: number;
  namaNasabah?: string;
  isLoading?: boolean;
}

export default function SaldoPoinProminentCard({
  saldoPoin,
  totalKg,
  totalTransaksi,
  namaNasabah,
  isLoading = false,
}: SaldoPoinProminentCardProps) {
  const animatedSaldo = useCountUp(saldoPoin, 700);
  const animatedKg = useCountUp(totalKg, 700, 1);
  const animatedTrx = useCountUp(totalTransaksi, 600);
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="bg-dark-container rounded-3xl p-6 sm:p-8 animate-pulse text-white/40 h-44 flex items-center justify-center">
          <span className="text-xs font-semibold">Memuat data saldo poin & metrik akun...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
      <div className="bg-linear-to-br from-dark-container via-[#172013] to-dark-container rounded-3xl p-6 sm:p-8 text-white border border-brand-neon/20 shadow-xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          {/* Left Column: Prominent Balance Display */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-neon/20 border border-brand-neon/30 text-brand-neon text-[11px] font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tabungan Bank Sampah Digital</span>
              </span>
              {namaNasabah && (
                <span className="text-xs text-white/60">• Nasabah: {namaNasabah}</span>
              )}
            </div>

            <div className="pt-1">
              <span className="text-xs text-white/70 block uppercase font-bold tracking-wider">
                Saldo Poin Reward Aktif
              </span>
              <div className="flex items-baseline gap-2.5 mt-0.5">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-neon tracking-tight font-mono">
                  {animatedSaldo}
                </span>
                <span className="text-lg sm:text-xl font-bold text-white/80">Poin</span>
                <span className="text-xs text-emerald-400 font-semibold ml-2 inline-flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <TrendingUp className="w-3 h-3" />
                  Siap Ditukar
                </span>
              </div>
            </div>
          </div>

          {/* Middle Column: Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 py-2 lg:py-0 border-y lg:border-y-0 lg:border-x border-white/10 lg:px-8">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                <Scale className="w-4 h-4 text-brand-neon" />
                <span className="font-semibold">Total Sampah Terkumpul</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-white font-mono">
                {animatedKg} <span className="text-xs font-normal text-white/60">kg</span>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                <History className="w-4 h-4 text-brand-neon" />
                <span className="font-semibold">Total Penyetoran</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-white font-mono">
                {animatedTrx} <span className="text-xs font-normal text-white/60">kali</span>
              </p>
            </div>
          </div>

          {/* Right Column: CTA Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 justify-center">
            <Link
              href="/tukar-poin"
              className="btn-interactive inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-neon hover:bg-brand-neon-hover active:scale-95 text-dark-container font-extrabold text-xs sm:text-sm shadow-md transition-all"
            >
              <Star className="w-4 h-4 fill-dark-container" />
              <span>Tukarkan Poin Hadiah</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/setor/ajukan"
              className="btn-interactive inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 text-white font-bold text-xs sm:text-sm border border-white/15 transition-all"
            >
              <PlusCircle className="w-4 h-4 text-brand-neon" />
              <span>Ajukan Setor Baru</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
