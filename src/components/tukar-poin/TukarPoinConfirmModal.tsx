"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileText,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { HadiahItem, TukarPoinResponse, SaldoNasabahSummary } from "@/types/tukarPoin";

/**
 * Interface properties untuk komponen modal konfirmasi dan sukses penukaran poin.
 */
interface TukarPoinConfirmModalProps {
  /** Item hadiah yang dipilih untuk ditukar, null jika modal tidak aktif */
  item: HadiahItem | null;
  /** Objek ringkasan saldo poin nasabah saat ini */
  saldoSummary: SaldoNasabahSummary;
  /** Flag penanda modal sedang terbuka */
  isOpen: boolean;
  /** Callback untuk menutup modal atau membatalkan penukaran */
  onClose: () => void;
  /** Fungsi handler async untuk mengirim request transaksi penukaran ke backend */
  onConfirm: () => Promise<void>;
  /** Status proses transaksi (loading spinner pada tombol) */
  isSubmitting: boolean;
  /** Data respons dari backend jika penukaran sukses (kode nota, kode voucher, sisa saldo) */
  successData: TukarPoinResponse["data"] | null;
  /** Pesan kesalahan jika transaksi penukaran gagal diproses */
  errorMessage: string | null;
}

/**
 * Komponen Dialog Modal Konfirmasi & Keberhasilan Penukaran Poin (TukarPoinConfirmModal)
 *
 * Mengelola dialog interaktif penukaran poin dengan 2 mode tampilan (state):
 * 1. STATE 1 - Penukaran Berhasil:
 *    - Menampilkan lencana sukses, kode nota resmi sistem, dan kode klaim voucher merchant.
 *    - Fitur salin ke clipboard dengan notifikasi ikon centang.
 *    - Buku besar transaksi ringkas (poin terpakai dan sisa saldo).
 *    - Tautan langsung menuju lembar cetak nota digital (`/nota/[kodeNota]`).
 * 2. STATE 2 - Konfirmasi Awal Penukaran:
 *    - Rincian item hadiah (thumbnail, nama produk, kategori, harga poin).
 *    - Kalkulasi otomatis saldo awal, pemotongan poin, dan sisa saldo setelah klaim.
 *    - Checkbox persetujuan nasabah bahwa transaksi bersifat final dan memotong poin langsung.
 *    - Indikator loading spinner saat request HTTP POST dikirim.
 *
 * @param props Properti modal konfirmasi penukaran poin
 * @returns JSX Element dialog modal atau null jika tertutup
 */
export default function TukarPoinConfirmModal({
  item,
  saldoSummary,
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  successData,
  errorMessage,
}: TukarPoinConfirmModalProps) {
  // State lokal persetujuan syarat & ketentuan transaksi
  const [agreed, setAgreed] = useState(true);
  // State lokal feedback penyalinan kode nota ke clipboard
  const [copied, setCopied] = useState(false);

  // Jika modal ditutup atau data kosong, jangan render apapun
  if (!isOpen || (!item && !successData)) return null;

  const currentItem = item;
  // Hitung sisa poin setelah dipotong harga hadiah
  const sisaPoin = currentItem
    ? saldoSummary.saldoPoinAktif - currentItem.poinDibutuhkan
    : 0;

  /**
   * Menyalin kode nota atau kode voucher ke clipboard perangkat nasabah
   * @param code String kode unik yang akan disalin
   */
  const handleCopyCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="bg-white rounded-3xl border border-gray-200 w-full max-w-lg overflow-hidden shadow-2xl animate-modal-enter">
        {/* ================= STATE 1: MODAL SUKSES PENUKARAN ================= */}
        {successData ? (
          <div className="p-6 sm:p-8">
            {/* Lencana Sukses Visual */}
            <div className="w-14 h-14 rounded-full bg-lime-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
            </div>

            {/* Judul & Keterangan Sukses */}
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                Penukaran Poin Berhasil!
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
                Klaim hadiah Anda telah dicatat ke sistem bank sampah digital.
              </p>
            </div>

            {/* Kotak Kode Nota Resmi & Kode Merchant dengan Fitur Salin Cepat */}
            <div className="my-6 p-4 rounded-2xl bg-inset-gray border border-gray-200 text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-1">
                Kode Nota Penukaran Resmi
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-lg sm:text-xl font-extrabold text-dark-container tracking-wider">
                  {successData.kodeNota}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(successData.kodeNota)}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  title="Salin Kode Nota"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Tampilkan kode klaim merchant jika hadiah berbentuk voucher digital */}
              {successData.kodeKlaimMerchant && (
                <div className="mt-2 pt-2 border-t border-gray-200/80 text-xs text-text-secondary">
                  Kode Klaim Merchant:{" "}
                  <span className="font-mono font-bold text-text-primary">
                    {successData.kodeKlaimMerchant}
                  </span>
                </div>
              )}
            </div>

            {/* Rincian Buku Besar Pemotongan Poin Nasabah */}
            <div className="space-y-2 p-4 rounded-2xl bg-inset-gray border border-gray-200 text-xs mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary">Hadiah:</span>
                <span className="font-bold text-text-primary">{successData.namaHadiah}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Poin Terpakai:</span>
                <span className="font-bold text-red-600">-{successData.poinTerpakai} Poin</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-gray-200">
                <span className="text-text-secondary font-semibold">Sisa Saldo Poin:</span>
                <span className="font-extrabold text-emerald-700">
                  {successData.sisaPoin} Poin
                </span>
              </div>
            </div>

            {/* Tombol Aksi: Cetak Nota atau Tutup Dialog */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/nota/${successData.kodeNota}`}
                className="flex-1 bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold py-3 px-4 rounded-full flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>Cetak Nota Digital</span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-200 bg-white hover:bg-inset-gray text-text-primary font-bold py-3 px-4 rounded-full text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Selesai &amp; Tutup
              </button>
            </div>
          </div>
        ) : (
          /* ================= STATE 2: DIALOG KONFIRMASI AWAL ================= */
          currentItem && (
            <div>
              {/* Header Modal */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary">
                    Konfirmasi Penukaran Poin
                  </h3>
                  <span className="text-xs text-text-secondary">
                    Periksa kembali rincian saldo dan hadiah pilihan Anda
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-text-secondary transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Isi Konten Modal */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Pratinjau Kartu Hadiah yang Dipilih */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-inset-gray border border-gray-200">
                  <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 bg-gray-200">
                    <Image
                      src={currentItem.imageUrl}
                      alt={currentItem.namaHadiah}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block">
                      {currentItem.kategori}
                    </span>
                    <h4 className="text-sm font-bold text-text-primary leading-tight">
                      {currentItem.namaHadiah}
                    </h4>
                    <span className="text-xs text-text-secondary mt-0.5 block">
                      Biaya:{" "}
                      <strong className="text-text-primary font-bold">
                        {currentItem.poinDibutuhkan} Poin
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Buku Besar Simulasi Pemotongan Saldo Poin */}
                <div className="p-4 rounded-2xl bg-inset-gray border border-gray-200 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Saldo Poin Anda Saat Ini:</span>
                    <span className="font-extrabold text-text-primary">
                      {saldoSummary.saldoPoinAktif} Poin
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-red-600 font-semibold">
                    <span>Biaya Penukaran Hadiah:</span>
                    <span>-{currentItem.poinDibutuhkan} Poin</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="font-bold text-text-primary">
                      Sisa Saldo Setelah Penukaran:
                    </span>
                    <span className="font-extrabold text-sm text-emerald-700">
                      {sisaPoin} Poin
                    </span>
                  </div>
                </div>

                {/* Checkbox Persetujuan Syarat & Ketentuan */}
                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-dark-container focus:ring-brand-neon cursor-pointer"
                  />
                  <span className="text-xs text-text-secondary leading-relaxed">
                    Saya menyetujui pemotongan saldo poin secara langsung untuk penukaran hadiah ini
                    dan memahami bahwa transaksi ini tidak dapat dibatalkan.
                  </span>
                </label>

                {/* Banner Peringatan Kesalahan API (jika ada error) */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Tombol Aksi Footer Modal */}
              <div className="p-5 sm:p-6 border-t border-gray-200 bg-gray-50/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-full border border-gray-200 text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-white transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={!agreed || isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <span>Konfirmasi &amp; Tukarkan Poin</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
