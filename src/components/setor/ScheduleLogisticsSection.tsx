"use client";

/**
 * ============================================================================
 * Komponen: ScheduleLogisticsSection
 * Direktori: src/components/setor/ScheduleLogisticsSection.tsx
 *
 * Fungsi Utama:
 * Bagian pertama formulir (Langkah 1) untuk menentukan parameter jadwal dan
 * metode logistik penyerahan sampah:
 * 1. Rencana Tanggal Penyetoran (HTML date input).
 * 2. Metode Penyerahan:
 *    - "drop-off": Penyetoran mandiri langsung ke unit bank sampah Circula (gratis).
 *    - "jemput": Penjemputan ke alamat nasabah oleh armada operasional.
 * 3. Catatan Tambahan (Textarea instruksi khusus untuk petugas/pengemudi).
 *
 * Desain & Aksesibilitas:
 * - Controlled Component: Menerima value dan callback change dari parent form/hook.
 * - Icon-decorated inputs: Dilengkapi ikon kalender dan truk logistik untuk kejelasan visual.
 * ============================================================================
 */

import React from "react";
import { Calendar, Truck } from "lucide-react";

/**
 * Interface ScheduleLogisticsSectionProps:
 * Kontrak properti untuk bagian waktu dan logistik penyerahan.
 */
interface ScheduleLogisticsSectionProps {
  /** String tanggal rencana penyetoran (format YYYY-MM-DD) */
  tanggal: string;
  /** Callback saat nilai tanggal berubah */
  onTanggalChange: (val: string) => void;
  /** Metode penyerahan terpilih ('drop-off' atau 'jemput') */
  metodePenyerahan: "drop-off" | "jemput";
  /** Callback saat metode penyerahan berubah */
  onMetodeChange: (val: "drop-off" | "jemput") => void;
  /** Teks catatan instruksi khusus dari nasabah */
  catatan: string;
  /** Callback saat teks catatan berubah */
  onCatatanChange: (val: string) => void;
}

export default function ScheduleLogisticsSection({
  tanggal,
  onTanggalChange,
  metodePenyerahan,
  onMetodeChange,
  catatan,
  onCatatanChange,
}: ScheduleLogisticsSectionProps) {
  return (
    <div className="pb-8 border-b border-gray-200">
      {/* ========================================================================= */}
      {/* HEADER LANGKAH 1                                                          */}
      {/* ========================================================================= */}
      <div className="flex items-start gap-3.5 mb-5">
        <div className="w-7 h-7 rounded-full bg-dark-container text-white flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
          1
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
            Waktu &amp; Metode Penyerahan
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Tentukan rute kedatangan dan opsi logistik Anda
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GRID 2 KOLOM: TANGGAL SETOR & METODE PENYERAHAN                           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Kolom 1: Input Tanggal Rencana Penyetoran */}
        <div>
          <label className="block text-xs font-bold text-text-primary mb-1.5">
            Rencana Tanggal Setor
          </label>
          <div className="relative">
            <input
              type="date"
              value={tanggal}
              onChange={(e) => onTanggalChange(e.target.value)}
              className="w-full bg-inset-gray border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:border-dark-container focus:bg-white transition-all cursor-pointer"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-secondary">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Kolom 2: Dropdown Pilihan Metode Logistik */}
        <div>
          <label className="block text-xs font-bold text-text-primary mb-1.5">
            Metode Penyerahan
          </label>
          <div className="relative">
            <select
              value={metodePenyerahan}
              onChange={(e) =>
                onMetodeChange(e.target.value as "drop-off" | "jemput")
              }
              className="w-full bg-inset-gray border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:border-dark-container focus:bg-white transition-all cursor-pointer appearance-none pr-9"
            >
              <option value="drop-off">
                Drop-off Mandiri ke Unit Pusat (Gratis Biaya Layanan)
              </option>
              <option value="jemput">
                Layanan Jemput Sampah Lokasi (Terkonfirmasi Admin)
              </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-secondary">
              <Truck className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CATATAN TAMBAHAN UNTUK PETUGAS PENIMBANGAN / PENGEMUDI                    */}
      {/* ========================================================================= */}
      <div className="mt-4">
        <label className="block text-xs font-bold text-text-primary mb-1.5">
          Catatan Tambahan untuk Petugas / Pengemudi
        </label>
        <textarea
          rows={2}
          value={catatan}
          onChange={(e) => onCatatanChange(e.target.value)}
          placeholder="Contoh: Botol sudah dipres pipih tanpa tutup dalam 2 karung terpisah, kardus sudah diikat rapi tali rami."
          className="w-full bg-inset-gray border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-dark-container focus:bg-white transition-all resize-none"
        />
      </div>
    </div>
  );
}
