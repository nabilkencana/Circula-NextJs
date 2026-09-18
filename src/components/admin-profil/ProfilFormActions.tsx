/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Tombol Aksi Formulir Profil Unit Admin
 *
 * File: src/components/admin-profil/ProfilFormActions.tsx
 * Deskripsi:
 * Mengakomodasi tombol submit utama ("Simpan Pembaruan Profil") dengan indikator loading,
 * tombol sekunder ("Batal" untuk reset form ke kondisi awal), serta catatan waktu
 * terakhir disimpan.
 *
 * Standar Teknis UKK RPL:
 * - Disabled state protection saat proses simpan (`isSaving`) atau form belum dimodifikasi (`!isDirty`).
 * - Spinner loading animasi halus (`Loader2` dari lucide-react).
 * - Penanda waktu pembaruan terakhir yang informatif.
 */

"use client";

import React from "react";
import { Check, Loader2 } from "lucide-react";

/**
 * Properti komponen ProfilFormActions.
 */
interface ProfilFormActionsProps {
  /** Status apakah proses penyimpanan sedang berlangsung */
  isSaving: boolean;
  /** Status apakah form mengalami modifikasi dari nilai awal */
  isDirty: boolean;
  /** String keterangan waktu penyimpanan terakhir */
  terakhirDisimpan?: string;
  /** Callback untuk mereset form ke nilai inisial */
  onReset: () => void;
}

/**
 * Komponen tombol aksi formulir pembaruan profil unit.
 */
export default function ProfilFormActions({
  isSaving,
  isDirty,
  terakhirDisimpan = "Hari ini, 09:12 WIB",
  onReset,
}: ProfilFormActionsProps) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Primary Save Button */}
        <button
          type="submit"
          disabled={isSaving}
          className="h-11 px-6 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-bold text-sm flex items-center gap-2.5 transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-dark-container" />
              <span>Menyimpan Perubahan...</span>
            </>
          ) : (
            <>
              <span>Simpan Pembaruan Profil</span>
              <div className="w-6 h-6 rounded-full bg-dark-container text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            </>
          )}
        </button>

        {/* Secondary Reset Button */}
        <button
          type="button"
          onClick={onReset}
          disabled={!isDirty || isSaving}
          className="h-11 px-6 rounded-full border border-gray-200 text-gray-600 hover:text-text-primary font-semibold text-sm hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Batal
        </button>
      </div>

      {/* Last Saved Timestamp */}
      <div className="text-xs text-text-secondary italic">
        Terakhir disimpan:{" "}
        <span className="font-medium text-text-primary not-italic">
          {terakhirDisimpan}
        </span>
      </div>
    </div>
  );
}
