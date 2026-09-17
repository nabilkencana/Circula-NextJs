"use client";

import React, { useState } from "react";
import { X, TrendingUp, Check } from "lucide-react";

interface BatchPricingModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirmBatch: (percentage: number) => void;
}

export default function BatchPricingModal({
  isOpen,
  isSubmitting,
  onClose,
  onConfirmBatch,
}: BatchPricingModalProps) {
  const [percentage, setPercentage] = useState<number>(5);

  if (!isOpen) return null;

  const PRESETS = [5, 10, 15, -5, -10];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBatch(percentage);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-container/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-200 z-10 animate-modal-enter">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-neon/20 border border-brand-neon/40 flex items-center justify-center text-dark-container shrink-0">
              <TrendingUp className="w-5 h-5 text-dark-container" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-text-primary">
                Penyesuaian Harga Massal (Batch)
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Update serentak seluruh material aktif
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="py-5 space-y-4">
          <p className="text-xs text-text-secondary leading-relaxed">
            Pilih persentase penyesuaian tarif harga beli tunai per kilogram untuk semua kategori
            material. Nilai rupiah akan otomatis dibulatkan ke kelipatan ratusan rupiah terdekat.
          </p>

          {/* Quick Preset Buttons */}
          <div>
            <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider block mb-2">
              PRESET PERSENTASE
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {PRESETS.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setPercentage(val)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    percentage === val
                      ? "bg-dark-container text-white shadow-xs"
                      : "bg-inset-gray border border-gray-200 text-text-secondary hover:text-text-primary hover:bg-gray-100"
                  }`}
                >
                  {val > 0 ? `+${val}%` : `${val}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div>
            <label className="block text-[11px] font-bold text-text-primary uppercase tracking-wider mb-1.5">
              PERSENTASE KUSTOM (%)
            </label>
            <div className="relative">
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-inset-gray font-mono text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-gray-400">
                %
              </span>
            </div>
          </div>

          {/* Impact Inset Card */}
          <div className="p-3 rounded-xl bg-[#FAFBF9] border border-gray-200 text-xs text-text-secondary">
            <span>Simulasi dampak: </span>
            <span className="font-semibold text-text-primary">
              {percentage >= 0
                ? `Kenaikan tarif ${percentage}% untuk seluruh nasabah.`
                : `Penurunan tarif ${Math.abs(percentage)}% untuk seluruh nasabah.`}
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors disabled:opacity-60 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{isSubmitting ? "Menerapkan..." : "Terapkan Penyesuaian"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
