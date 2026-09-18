/**
 * @file WeighingQueueTableCard.tsx
 * @description Komponen kartu tabel antrean verifikasi penyetoran sampah warga pada dashboard admin.
 * Membungkus daftar tiket antrean penimbangan (`WeighingQueueRow`) dengan animasi kemunculan bertahap (stagger delay),
 * penanganan tampilan kosong (empty state) jika tidak ada antrean pending, tautan menuju halaman transaksi,
 * serta keterangan ID perangkat keras timbangan digital terkalibrasi di bagian bawah kartu.
 * 
 * @module Components/AdminDashboard/WeighingQueueTableCard
 */

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Inbox } from "lucide-react";
import { QueueItemRecord } from "@/types/adminDashboard";
import WeighingQueueRow from "./WeighingQueueRow";

/**
 * Properti untuk komponen WeighingQueueTableCard
 * 
 * @interface WeighingQueueTableCardProps
 * @property {QueueItemRecord[]} queueList - Daftar tiket antrean penyetoran yang belum diverifikasi.
 * @property {string} scaleDeviceId - Identifier sensor timbangan digital terhubung.
 * @property {(ticket: QueueItemRecord) => void} onTimbang - Fungsi callback verifikasi timbangan.
 */
interface WeighingQueueTableCardProps {
  queueList: QueueItemRecord[];
  scaleDeviceId: string;
  onTimbang: (ticket: QueueItemRecord) => void;
}

/**
 * Komponen WeighingQueueTableCard
 * 
 * @component
 * @param {WeighingQueueTableCardProps} props - Properti daftar tiket dan sensor timbangan.
 * @returns {JSX.Element} Kartu kontainer tabel antrean terstruktur rapi.
 */
export default function WeighingQueueTableCard({
  queueList,
  scaleDeviceId,
  onTimbang,
}: WeighingQueueTableCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* ===================================================================== */}
        {/* HEADER KARTU: JUDUL, BADGE TOTAL TIKET & TAUTAN TRANSAKSI             */}
        {/* ===================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-base sm:text-lg text-text-primary tracking-tight">
              Antrean Setoran Masuk Perlu Verifikasi
            </h3>
            <span className="bg-amber-100/70 text-amber-800 border border-amber-200/60 rounded-full px-2.5 py-0.5 text-xs font-bold shrink-0">
              {queueList.length} Tiket Menunggu
            </span>
          </div>

          <Link
            href="/admin/transaksi"
            className="text-xs font-bold text-text-secondary hover:text-text-primary inline-flex items-center gap-1 transition-colors self-start sm:self-auto group"
          >
            <span>Lihat Semua Antrean</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* ===================================================================== */}
        {/* DAFTAR BARIS TIKET ANTREAN ATAU TAMPILAN KOSONG                       */}
        {/* ===================================================================== */}
        <div className="mt-5 space-y-3">
          {queueList.length > 0 ? (
            /* Render baris tiket dengan animasi staggered enter */
            queueList.map((ticket, idx) => (
              <div
                key={ticket.id}
                className="animate-card-enter"
                style={{ animationDelay: `${Math.min(idx * 70, 350)}ms` }}
              >
                <WeighingQueueRow
                  queueItem={ticket}
                  onTimbang={onTimbang}
                />
              </div>
            ))
          ) : (
            /* Kondisi jika tidak ada antrean yang menunggu (Empty State) */
            <div className="p-8 text-center bg-inset-gray rounded-2xl border border-gray-200/80">
              <Inbox className="w-8 h-8 text-gray-400 mx-auto mb-2" aria-hidden="true" />
              <p className="text-sm font-bold text-text-primary">
                Tidak ada antrean pending
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Semua tiket setoran hari ini telah selesai diverifikasi.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* FOOTER KARTU: INFORMASI IDENTIFIER SENSOR TIMBANGAN DIGITAL           */}
      {/* ===================================================================== */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <span className="font-mono text-xs text-gray-400 block tracking-wide">
          Scale Device ID: {scaleDeviceId}
        </span>
      </div>
    </div>
  );
}
