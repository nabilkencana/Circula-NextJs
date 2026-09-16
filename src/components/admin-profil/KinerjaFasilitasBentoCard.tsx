"use client";

import React from "react";
import MultiTenantTokenCard from "./MultiTenantTokenCard";
import { UnitBankSampahDetail } from "@/types/adminProfil";

interface KinerjaFasilitasBentoCardProps {
  unitData: UnitBankSampahDetail | null;
  copiedAppKey: boolean;
  onCopyAppKey: () => void;
}

export default function KinerjaFasilitasBentoCard({
  unitData,
  copiedAppKey,
  onCopyAppKey,
}: KinerjaFasilitasBentoCardProps) {
  const totalNasabah = unitData?.totalNasabah ?? 142;
  const nasabahBaru = unitData?.nasabahBaruBulanIni ?? 12;
  const tonase = unitData?.akumulasiTonaseTon ?? 12.5;
  const transaksi = unitData?.transaksiBulanIni ?? 38;
  const poin = unitData?.rewardTerdistribusiPoin ?? 4250;
  const rupiah = unitData?.rewardTerdistribusiRupiah ?? 1487500;
  const appKey = unitData?.appKey ?? "97945213-34a7-48cf-baac-8740c1d18765";

  return (
    <div className="bg-dark-container rounded-3xl p-6 sm:p-7 md:p-8 text-white border border-white/10 shadow-lg">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold text-white mb-5 tracking-tight flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-brand-neon" />
        <span>Kinerja Fasilitas Unit</span>
      </h2>

      {/* 2x2 Metrics Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Tile 1: Total Nasabah */}
        <div className="bg-[#121611] p-4 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/15 transition-colors">
          <span className="text-xs text-gray-400 font-medium">Total Nasabah</span>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {totalNasabah}
            </span>
          </div>
          <span className="text-[11px] text-lime-400 font-semibold mt-2">
            +{nasabahBaru} baru bulan ini
          </span>
        </div>

        {/* Tile 2: Akumulasi Tonase */}
        <div className="bg-[#121611] p-4 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/15 transition-colors">
          <span className="text-xs text-gray-400 font-medium">Akumulasi Tonase</span>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-brand-neon tracking-tight">
              {tonase} Ton
            </span>
          </div>
          <span className="text-[11px] text-gray-400 mt-2">Audit 3R DLH</span>
        </div>

        {/* Tile 3: Transaksi Bulan Ini */}
        <div className="bg-[#121611] p-4 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/15 transition-colors">
          <span className="text-xs text-gray-400 font-medium">Transaksi Bulan Ini</span>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {transaksi} Tiket
            </span>
          </div>
          <span className="text-[11px] text-lime-400 font-semibold mt-2">100% Selesai</span>
        </div>

        {/* Tile 4: Reward Terdistribusi */}
        <div className="bg-[#121611] p-4 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/15 transition-colors">
          <span className="text-xs text-gray-400 font-medium">Reward Terdistribusi</span>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {poin.toLocaleString("id-ID")} P
            </span>
          </div>
          <span className="text-[11px] text-gray-400 mt-2">
            ≈ Rp {rupiah.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* Docked Token Box */}
      <MultiTenantTokenCard
        appKey={appKey}
        copied={copiedAppKey}
        onCopy={onCopyAppKey}
      />
    </div>
  );
}
