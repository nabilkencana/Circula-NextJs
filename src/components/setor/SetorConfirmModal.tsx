"use client";

import React from "react";
import { AlertCircle, Check, X, Scale, Star, Calendar, Truck, FileText } from "lucide-react";
import { SetorSampahItemInput } from "@/types/setorSampah";

interface SetorConfirmModalProps {
  isOpen: boolean;
  items: SetorSampahItemInput[];
  tanggal: string;
  metodePenyerahan: "drop-off" | "jemput";
  catatan?: string;
  totalEstimasiBerat: number;
  totalEstimasiPoin: number;
  totalEstimasiRupiah: number;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SetorConfirmModal({
  isOpen,
  items,
  tanggal,
  metodePenyerahan,
  catatan,
  totalEstimasiBerat,
  totalEstimasiPoin,
  totalEstimasiRupiah,
  isSubmitting,
  onClose,
  onConfirm,
}: SetorConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="bg-white rounded-3xl border border-gray-200 max-w-lg w-full shadow-2xl overflow-hidden animate-modal-enter flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-inset-gray">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-neon flex items-center justify-center shadow-xs">
              <Scale className="w-5 h-5 text-dark-container" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-text-primary tracking-tight">
                Konfirmasi Pengajuan Penyetoran
              </h3>
              <p className="text-xs text-text-secondary">
                Periksa kembali rincian sampah sebelum mengirim ke petugas
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-text-primary transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Metadata Row: Tanggal & Metode */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center gap-2.5 text-xs">
              <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  Tanggal Setor
                </span>
                <span className="font-bold text-text-primary">{tanggal}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center gap-2.5 text-xs">
              <Truck className="w-4 h-4 text-gray-500 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  Metode
                </span>
                <span className="font-bold text-text-primary capitalize">
                  {metodePenyerahan === "drop-off" ? "Drop-off Langsung" : "Jemput Armada"}
                </span>
              </div>
            </div>
          </div>

          {/* Rincian Items Card */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-inset-gray px-4 py-2.5 border-b border-gray-200 flex items-center justify-between text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              <span>Jenis Material ({items.length})</span>
              <span>Subtotal Poin</span>
            </div>
            <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto">
              {items.map((item, idx) => (
                <div key={item.tempId || idx} className="px-4 py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-text-primary block">
                      {item.namaKategori}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {item.beratKg} kg • Rp {item.hargaPerKg.toLocaleString("id-ID")}/kg
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-emerald-700 flex items-center justify-end gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      +{item.subtotalPoin} Poin
                    </span>
                    <span className="text-[10px] text-gray-400 block">
                      Rp {item.subtotalRupiah.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Summary Box */}
          <div className="p-4 rounded-2xl bg-linear-to-br from-gray-900 to-dark-container text-white flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                Total Estimasi Penimbangan
              </span>
              <span className="text-lg font-extrabold text-brand-neon">
                {totalEstimasiBerat} kg
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                Total Potensi Reward
              </span>
              <span className="text-lg font-extrabold text-brand-neon flex items-center justify-end gap-1">
                <Star className="w-4 h-4 fill-brand-neon text-brand-neon" />
                +{totalEstimasiPoin} Poin
              </span>
            </div>
          </div>

          {/* Catatan if available */}
          {catatan && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-text-secondary flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-text-primary block">Catatan:</span>
                <span>{catatan}</span>
              </div>
            </div>
          )}

          {/* Notice */}
          <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-[11px] text-blue-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Timbangan akhir dan poin definitif akan dicatat oleh petugas pada saat material diserahkan dan diverifikasi.
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary transition-all cursor-pointer"
          >
            Periksa Kembali
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-dark-container border-t-transparent rounded-full animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Ya, Ajukan Setor Sekarang</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
