/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Dialog Konfirmasi Perubahan Profil Unit Admin
 *
 * File: src/components/admin-profil/SaveProfilConfirmModal.tsx
 * Deskripsi:
 * Menampilkan jendela dialog pratinjau rangkuman perubahan data (diff check)
 * sebelum pembaruan profil resmi unit bank sampah disimpan ke database.
 *
 * Standar Teknis UKK RPL:
 * - Pratinjau perubahan transparan (nama unit, pengelola, telp, jam buka, kapasitas).
 * - Peringatan konsekuensi legalitas struk transaksi dan nota resmi.
 * - Tombol konfirmasi dengan animasi pemuatan saat `isSaving` bernilai true.
 */

"use client";

import React from "react";
import { AlertCircle, Building2, Check, X, ShieldCheck } from "lucide-react";
import { UnitBankSampahDetail, UpdateUnitProfilPayload } from "@/types/adminProfil";

/**
 * Properti komponen SaveProfilConfirmModal.
 */
interface SaveProfilConfirmModalProps {
  /** Penanda apakah modal dialog terbuka */
  isOpen: boolean;
  /** Data profil unit saat ini */
  unitData: UnitBankSampahDetail | null;
  /** Isian data formulir baru */
  formData: UpdateUnitProfilPayload;
  /** Status indikator penyimpanan asinkron */
  isSaving: boolean;
  /** Callback menutup modal */
  onClose: () => void;
  /** Callback konfirmasi eksekusi penyimpanan */
  onConfirm: () => void;
}

/**
 * Komponen modal konfirmasi penyimpanan perubahan profil unit operasional.
 */
export default function SaveProfilConfirmModal({
  isOpen,
  unitData,
  formData,
  isSaving,
  onClose,
  onConfirm,
}: SaveProfilConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-gray-200 max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-inset-gray">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-neon flex items-center justify-center shadow-xs">
              <Building2 className="w-5 h-5 text-dark-container" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-text-primary tracking-tight">
                Konfirmasi Perubahan Profil Unit
              </h3>
              <p className="text-xs text-text-secondary">
                Periksa perubahan identitas operasional bank sampah
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-text-primary transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Changes Summary Diff Box */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Data profil unit ini akan tertera pada nota penyetoran nasabah, papan nama digital, dan laporan rekapitulasi resmi.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden bg-white">
            <div className="p-3 bg-gray-50 flex items-center justify-between font-bold text-text-secondary uppercase text-[10px] tracking-wider">
              <span>Bidang Profil</span>
              <span>Nilai Baru yang Akan Disimpan</span>
            </div>

            <div className="p-3.5 flex items-center justify-between gap-4">
              <span className="text-text-secondary font-medium">Nama Unit</span>
              <span className="font-bold text-text-primary text-right">{formData.namaUnit}</span>
            </div>

            <div className="p-3.5 flex items-center justify-between gap-4">
              <span className="text-text-secondary font-medium">Nama Pengelola</span>
              <span className="font-bold text-text-primary text-right">{formData.namaPengelola}</span>
            </div>

            <div className="p-3.5 flex items-center justify-between gap-4">
              <span className="text-text-secondary font-medium">Nomor Telepon</span>
              <span className="font-bold text-text-primary text-right">{formData.telp}</span>
            </div>

            <div className="p-3.5 flex items-center justify-between gap-4">
              <span className="text-text-secondary font-medium">Jam Operasional</span>
              <span className="font-bold text-text-primary text-right">{formData.jamOperasional || "-"}</span>
            </div>

            <div className="p-3.5 flex items-center justify-between gap-4">
              <span className="text-text-secondary font-medium">Kapasitas Gudang</span>
              <span className="font-bold text-text-primary text-right">{formData.kapasitasGudang || "-"}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <span className="w-4 h-4 border-2 border-dark-container border-t-transparent rounded-full animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Ya, Simpan Perubahan Profil</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
