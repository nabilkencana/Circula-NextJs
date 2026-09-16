"use client";

import React, { useState } from "react";
import { X, Scale, Check, AlertCircle } from "lucide-react";
import { TransaksiSetorAdminRecord, SampahItemRincian } from "@/types/adminTransaksi";

interface QuickVerifyModalProps {
  isOpen: boolean;
  record: TransaksiSetorAdminRecord | null;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: (
    updatedItems: SampahItemRincian[],
    totalBerat: number,
    totalPoin: number
  ) => void;
}

export default function QuickVerifyModal({
  isOpen,
  record,
  isSubmitting,
  onClose,
  onConfirm,
}: QuickVerifyModalProps) {
  if (!isOpen || !record) return null;

  return (
    <QuickVerifyModalForm
      key={record.id}
      record={record}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

function QuickVerifyModalForm({
  record,
  isSubmitting,
  onClose,
  onConfirm,
}: {
  record: TransaksiSetorAdminRecord;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: (
    updatedItems: SampahItemRincian[],
    totalBerat: number,
    totalPoin: number
  ) => void;
}) {
  const [items, setItems] = useState<SampahItemRincian[]>(() =>
    record.rincianSampah.map((item) => ({ ...item, isReal: true }))
  );

  const handleWeightChange = (index: number, valStr: string) => {
    const val = parseFloat(valStr) || 0;
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], berat: Math.max(0, val), isReal: true };
      return next;
    });
  };

  // Calculate total weight and poin (assuming approx 10 poin per kg average or proportional to original)
  const totalBerat = parseFloat(
    items.reduce((acc, curr) => acc + curr.berat, 0).toFixed(1)
  );

  const initialRatio =
    record.totalBerat > 0 ? record.totalPoin / record.totalBerat : 10;
  const totalPoin = Math.round(totalBerat * initialRatio);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalBerat <= 0) {
      alert("Total timbangan riil tidak boleh 0 kg.");
      return;
    }
    onConfirm(items, totalBerat, totalPoin);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-inset-gray">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-neon flex items-center justify-center shadow-xs">
              <Scale className="w-4 h-4 text-text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-text-primary">
                Timbang &amp; Verifikasi Setoran
              </h3>
              <p className="text-xs text-text-secondary">
                {record.kodeTransaksi} • Nasabah: {record.nasabahNama}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Masukkan berat aktual hasil timbangan petugas di timbangan operasional bank sampah.
              Poin akan dikalkulasi ulang berdasarkan berat riil material terpilah.
            </p>
          </div>

          {/* Material Items List */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
              Rincian Material Terpilah (kg)
            </label>
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 p-3 rounded-xl border border-gray-200 bg-white"
              >
                <div className="min-w-0">
                  <div className="font-bold text-xs sm:text-sm text-text-primary truncate">
                    {item.namaKategori}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Estimasi Awal: {record.rincianSampah[idx]?.berat || 0} kg
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={item.berat}
                    onChange={(e) => handleWeightChange(idx, e.target.value)}
                    className="w-24 h-9 px-3 text-right font-bold text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-brand-neon focus:ring-2 focus:ring-brand-neon/20"
                  />
                  <span className="text-xs font-bold text-gray-600">kg</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="bg-inset-gray border border-gray-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-gray-500 font-medium">
                Total Berat Riil Aktual:
              </div>
              <div className="text-base font-black text-text-primary">
                {totalBerat} kg Real
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-gray-500 font-medium">
                Hasil Konversi Reward:
              </div>
              <div className="text-base font-black text-emerald-600">
                +{totalPoin} Poin
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? "Menyimpan..." : "Simpan & Verifikasi Timbangan"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
