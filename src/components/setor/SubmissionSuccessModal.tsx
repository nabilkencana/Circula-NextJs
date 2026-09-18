"use client";

/**
 * ============================================================================
 * Komponen: SubmissionSuccessModal
 * Direktori: src/components/setor/SubmissionSuccessModal.tsx
 *
 * Fungsi Utama:
 * Dialog modal sukses penerbitan tiket penyetoran sampah (Success Receipt Dialog).
 * Ditampilkan seketika setelah backend berhasil mencatat transaksi setor baru:
 * 1. Menampilkan ikon checklist sukses besar dengan bayangan glow neon.
 * 2. Menampilkan tiket digital berisi Kode Transaksi resmi (STR-YYYYMM-XXXX).
 * 3. Fitur Salin Kode (Copy to Clipboard) menggunakan Web API `navigator.clipboard.writeText`
 *    disertai umpan balik visual ikon berubah menjadi hijau selama 2 detik.
 * 4. Grid ringkasan total estimasi bobot sampah dan potensi perolehan poin reward.
 * 5. Tombol aksi cepat: "Lihat Status / Tiket Saya" (menuju `/histori`) dan
 *    "Tutup & Buat Pengajuan Baru" (membersihkan form untuk pengajuan berikutnya).
 *
 * Konsep Teknis & Aksesibilitas:
 * - WAI-ARIA: Menggunakan atribut `role="dialog"` dan `aria-modal="true"`.
 * - State Management: Mengelola state `copied` untuk transisi ikon tombol copy.
 * ============================================================================
 */

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Check, X, ArrowRight, Sparkles } from "lucide-react";
import { SetorSampahSubmissionResponse } from "@/types/setorSampah";

/**
 * Interface SubmissionSuccessModalProps:
 * Kontrak properti yang diterima oleh modal sukses transaksi setor.
 */
interface SubmissionSuccessModalProps {
  /** Penanda apakah dialog modal sedang ditampilkan */
  isOpen: boolean;
  /** Objek data tiket hasil respons server (id, kodeSetor, tanggal, estimasi berat, poin) */
  result: SetorSampahSubmissionResponse["data"] | null;
  /** Callback untuk menutup dialog modal */
  onClose: () => void;
}

export default function SubmissionSuccessModal({
  isOpen,
  result,
  onClose,
}: SubmissionSuccessModalProps) {
  // State lokal penanda apakah kode transaksi berhasil disalin ke clipboard
  const [copied, setCopied] = useState<boolean>(false);

  // Jangan render apa pun jika modal tertutup atau respons data belum tersedia
  if (!isOpen || !result) return null;

  /**
   * Handler untuk menyalin kode tiket transaksi ke clipboard perangkat pengguna
   */
  const handleCopy = () => {
    if (result.kodeSetor) {
      navigator.clipboard.writeText(result.kodeSetor);
      setCopied(true);
      // Kembalikan ikon salin ke kondisi awal setelah 2 detik
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-200">
      <div
        className="bg-white rounded-3xl border border-gray-200 shadow-2xl max-w-md w-full overflow-hidden relative animate-modal-enter"
        role="dialog"
        aria-modal="true"
      >
        {/* ===================================================================== */}
        {/* TOMBOL SILANG PENUTUP (Kanan Atas)                                    */}
        {/* ===================================================================== */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors z-10 cursor-pointer"
          aria-label="Tutup dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ===================================================================== */}
        {/* HEADER MODAL DENGAN IKON CHECKLIST SUKSES                             */}
        {/* ===================================================================== */}
        <div className="pt-8 pb-5 px-6 text-center">
          <div className="w-14 h-14 rounded-full bg-brand-neon text-dark-container flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-neon/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-text-primary">
            Pengajuan Setor Berhasil!
          </h3>
          <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
            Tiket resmi Circula telah diterbitkan. Tunjukkan kode transaksi ini kepada petugas
            saat penimbangan di loket unit.
          </p>
        </div>

        {/* ===================================================================== */}
        {/* KOTAK TIKET DIGITAL RESMI DENGAN FITUR SALIN KODE                     */}
        {/* ===================================================================== */}
        <div className="px-6 pb-6 space-y-4">
          <div className="p-4 rounded-2xl bg-inset-gray border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary">
                Kode Transaksi Setor
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Menunggu Konfirmasi
              </span>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
              <span className="font-mono text-lg sm:text-xl font-extrabold text-dark-container tracking-wider">
                {result.kodeSetor}
              </span>
              {/* Tombol Salin Kode */}
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-text-primary transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* GRID DUA METRIK HASIL TRANSAKSI (Total Berat & Poin Reward)           */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-inset-gray border border-gray-200">
              <span className="text-[10px] text-text-secondary uppercase font-bold block">
                Total Estimasi Berat
              </span>
              <span className="text-base font-extrabold text-text-primary mt-0.5 block">
                {result.totalEstimasiBeratKg} Kg
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-container text-white border border-white/10">
              <span className="text-[10px] text-brand-neon uppercase font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Estimasi Reward
              </span>
              <span className="text-base font-extrabold text-brand-neon mt-0.5 block">
                +{result.totalEstimasiPoin} Poin
              </span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* TOMBOL NAVIGASI & PENUTUP                                             */}
          {/* ===================================================================== */}
          <div className="pt-2 flex flex-col gap-2.5">
            {/* CTA Utama: Memantau Status di Halaman Histori */}
            <Link
              href="/histori"
              className="w-full bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold text-xs py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-neon/25"
            >
              <span>Lihat Status / Tiket Saya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* CTA Sekunder: Menutup Modal & Reset Form */}
            <button
              type="button"
              onClick={onClose}
              className="w-full text-center py-2.5 rounded-full border border-gray-200 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-all cursor-pointer"
            >
              Tutup &amp; Buat Pengajuan Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
