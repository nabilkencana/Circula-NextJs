"use client";

import React from "react";
import { Calendar, Truck } from "lucide-react";

interface ScheduleLogisticsSectionProps {
  tanggal: string;
  onTanggalChange: (val: string) => void;
  metodePenyerahan: "drop-off" | "jemput";
  onMetodeChange: (val: "drop-off" | "jemput") => void;
  catatan: string;
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
      {/* Step Header */}
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

      {/* 2-Column Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Rencana Tanggal Setor */}
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

        {/* Metode Penyerahan Dropdown */}
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

      {/* Catatan Tambahan */}
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
