/**
 * @file DeleteKategoriConfirmModal.tsx
 * @description Modal dialog konfirmasi penghapusan master kategori material sampah pada panel admin Circula.
 * Memberikan peringatan tegas sebelum data dinonaktifkan secara permanen dari katalog operasional unit.
 * 
 * @module Components/AdminKategori/DeleteKategoriConfirmModal
 */

import React from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { KategoriSampahAdminRecord } from "@/types/adminKategori";

/**
 * Properti untuk komponen DeleteKategoriConfirmModal
 * 
 * @interface DeleteKategoriConfirmModalProps
 * @property {boolean} isOpen - Status keterbukaan modal konfirmasi.
 * @property {KategoriSampahAdminRecord | null} record - Data kategori yang menjadi sasaran penghapusan.
 * @property {boolean} isSubmitting - Status proses komunikasi jaringan saat menghapus.
 * @property {() => void} onClose - Callback untuk membatalkan dan menutup dialog.
 * @property {() => void} onConfirm - Callback saat tombol hapus permanen diklik.
 */
interface DeleteKategoriConfirmModalProps {
  isOpen: boolean;
  record: KategoriSampahAdminRecord | null;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Komponen DeleteKategoriConfirmModal
 * 
 * @component
 * @param {DeleteKategoriConfirmModalProps} props - Data kategori dan callback konfirmasi.
 * @returns {JSX.Element | null} Modal konfirmasi berbahaya beraksen merah atau null jika tertutup.
 */
export default function DeleteKategoriConfirmModal({
  isOpen,
  record,
  isSubmitting,
  onClose,
  onConfirm,
}: DeleteKategoriConfirmModalProps) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
      {/* Lapisan Latar Belakang (Backdrop) */}
      <div
        className="fixed inset-0 bg-dark-container/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Kartu Dialog Modal Peringatan */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-200 z-10 animate-modal-enter">
        {/* Ikon Peringatan Kuning/Merah */}
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" aria-hidden="true" />
        </div>

        {/* Teks Judul & Keterangan Dampak */}
        <h3 
          id="delete-modal-title"
          className="font-extrabold text-lg text-text-primary tracking-tight"
        >
          Hapus Kategori Material?
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
          Apakah Anda yakin ingin menghapus kategori material{" "}
          <span className="font-bold text-text-primary">{record.namaKategori}</span> (
          <span className="font-mono font-semibold">{record.id}</span>)? Data tarif penimbangan
          dan riwayat valuasi terkait material ini akan dinonaktifkan dari katalog operasional.
        </p>

        {/* Kotak Peringatan Permanen */}
        <div className="mt-4 p-3 bg-red-50/60 border border-red-100 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
          <Trash2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Tindakan ini permanen dan tidak dapat dipulihkan.</span>
        </div>

        {/* Tombol Aksi Batal & Hapus */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? "Menghapus..." : "Ya, Hapus Kategori"}
          </button>
        </div>
      </div>
    </div>
  );
}
