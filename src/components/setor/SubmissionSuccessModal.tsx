"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Check, X, ArrowRight, Sparkles } from "lucide-react";
import { SetorSampahSubmissionResponse } from "@/types/setorSampah";

interface SubmissionSuccessModalProps {
  isOpen: boolean;
  result: SetorSampahSubmissionResponse["data"] | null;
  onClose: () => void;
}

export default function SubmissionSuccessModal({
  isOpen,
  result,
  onClose,
}: SubmissionSuccessModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !result) return null;

  const handleCopy = () => {
    if (result.kodeSetor) {
      navigator.clipboard.writeText(result.kodeSetor);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-3xl border border-gray-200 shadow-2xl max-w-md w-full overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors z-10 cursor-pointer"
          aria-label="Tutup dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
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

        {/* Ticket Digital Box */}
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

          {/* Details Grid */}
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

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/histori"
              className="w-full bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold text-xs py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-neon/25"
            >
              <span>Lihat Status / Tiket Saya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

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
