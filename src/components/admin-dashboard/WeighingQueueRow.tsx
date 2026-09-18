/**
 * @file WeighingQueueRow.tsx
 * @description Komponen baris individual untuk tiket antrean penyetoran sampah warga pada dashboard admin.
 * Menampilkan kode transaksi terdaftar beserta indikator animasi ping `amber` (menunggu verifikasi),
 * data diri nasabah, rincian jenis/estimasi berat sampah, estimasi perolehan poin reward,
 * serta tombol tindakan langsung "Timbang Sekarang" untuk membuka modul penimbangan tera.
 * 
 * @module Components/AdminDashboard/WeighingQueueRow
 */

"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { QueueItemRecord } from "@/types/adminDashboard";

/**
 * Properti untuk komponen WeighingQueueRow
 * 
 * @interface WeighingQueueRowProps
 * @property {QueueItemRecord} queueItem - Objek data catatan tiket antrean penyetoran.
 * @property {(ticket: QueueItemRecord) => void} onTimbang - Fungsi callback saat tombol verifikasi timbangan ditekan.
 */
interface WeighingQueueRowProps {
  queueItem: QueueItemRecord;
  onTimbang: (ticket: QueueItemRecord) => void;
}

/**
 * Komponen WeighingQueueRow
 * 
 * @component
 * @param {WeighingQueueRowProps} props - Properti data tiket antrean.
 * @returns {JSX.Element} Elemen baris kartu daftar antrean berdesain rapi dan responsif.
 */
export default function WeighingQueueRow({
  queueItem,
  onTimbang,
}: WeighingQueueRowProps) {
  return (
    <div className="bg-inset-gray border border-gray-200/80 rounded-2xl p-4 sm:p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-gray-300">
      
      {/* ===================================================================== */}
      {/* 1. KODE TRANSAKSI & WAKTU PENGAJUAN                                   */}
      {/* ===================================================================== */}
      <div className="min-w-40">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sm text-text-primary">
            {queueItem.kodeTransaksi}
          </span>
          {/* Indikator Animasi Titik Kedip (Ping) Status Menunggu */}
          <span className="relative flex h-2 w-2 shrink-0" title="Menunggu verifikasi fisik">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-1">
          {queueItem.waktuPengajuan}
        </p>
      </div>

      {/* ===================================================================== */}
      {/* 2. INFORMASI NASABAH PENYETOR                                         */}
      {/* ===================================================================== */}
      <div className="min-w-36">
        <h4 className="font-bold text-sm text-text-primary">
          {queueItem.nasabahNama}
        </h4>
        <p className="text-xs text-text-secondary mt-0.5">
          Telp: {queueItem.nasabahTelp}
        </p>
      </div>

      {/* ===================================================================== */}
      {/* 3. RINCIAN ESTIMASI JENIS SAMPAH & PERKIRAAN POIN                     */}
      {/* ===================================================================== */}
      <div className="min-w-48">
        <p className="text-xs font-semibold text-text-primary">
          {queueItem.rincianEstimasi}
        </p>
        <span className="inline-block mt-1 px-2.5 py-0.5 bg-white border border-gray-200/80 rounded-full text-[11px] font-bold text-text-primary shadow-2xs">
          Est. +{queueItem.estimasiPoin} Poin
        </span>
      </div>

      {/* ===================================================================== */}
      {/* 4. TOMBOL TINDAKAN: TIMBANG SEKARANG                                  */}
      {/* ===================================================================== */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => onTimbang(queueItem)}
          className="btn-interactive bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-bold text-xs px-4 py-2 rounded-full inline-flex items-center gap-1.5 shrink-0 shadow-2xs transition-all active:scale-95 cursor-pointer"
        >
          <span>Timbang Sekarang</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>

    </div>
  );
}
