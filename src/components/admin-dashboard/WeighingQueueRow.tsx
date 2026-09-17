"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { QueueItemRecord } from "@/types/adminDashboard";

interface WeighingQueueRowProps {
  queueItem: QueueItemRecord;
  onTimbang: (ticket: QueueItemRecord) => void;
}

export default function WeighingQueueRow({
  queueItem,
  onTimbang,
}: WeighingQueueRowProps) {
  return (
    <div className="bg-inset-gray border border-gray-200/80 rounded-2xl p-4 sm:p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-gray-300">
      {/* 1. Transaction Code & Timestamp */}
      <div className="min-w-40">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sm text-text-primary">
            {queueItem.kodeTransaksi}
          </span>
          <span
            className="w-2 h-2 rounded-full bg-amber-500 shrink-0"
            title="Menunggu verifikasi"
            aria-label="Status: Menunggu verifikasi"
          />
        </div>
        <p className="text-xs text-text-secondary mt-1">
          {queueItem.waktuPengajuan}
        </p>
      </div>

      {/* 2. Nasabah Info */}
      <div className="min-w-36">
        <h4 className="font-bold text-sm text-text-primary">
          {queueItem.nasabahNama}
        </h4>
        <p className="text-xs text-text-secondary mt-0.5">
          Telp: {queueItem.nasabahTelp}
        </p>
      </div>

      {/* 3. Waste Breakdown & Estimated Points */}
      <div className="min-w-48">
        <p className="text-xs font-semibold text-text-primary">
          {queueItem.rincianEstimasi}
        </p>
        <span className="inline-block mt-1 px-2.5 py-0.5 bg-white border border-gray-200/80 rounded-full text-[11px] font-bold text-text-primary shadow-2xs">
          Est. +{queueItem.estimasiPoin} Poin
        </span>
      </div>

      {/* 4. Action Button: Timbang Sekarang */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => onTimbang(queueItem)}
          className="bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-bold text-xs px-4 py-2 rounded-full inline-flex items-center gap-1.5 shrink-0 shadow-2xs transition-all active:scale-95 cursor-pointer"
        >
          <span>Timbang Sekarang</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
