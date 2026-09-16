"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Calculator, ArrowRight, Star } from "lucide-react";
import { KategoriSampah } from "@/types/kategoriSampah";

interface LivePointEstimatorModalProps {
  isOpen: boolean;
  item: KategoriSampah | null;
  onClose: () => void;
}

export default function LivePointEstimatorModal({
  isOpen,
  item,
  onClose,
}: LivePointEstimatorModalProps) {
  const [weight, setWeight] = useState<number>(5);

  const handleClose = () => {
    setWeight(5);
    onClose();
  };

  if (!isOpen || !item) return null;

  const totalRupiah = Math.round(weight * item.hargaPerKg);
  const totalPoin = Math.round(weight * item.poinPerKg);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-3xl border border-gray-200 shadow-2xl max-w-lg w-full overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-neon text-dark-container flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-primary">
                Simulasi Nilai Setor Sampah
              </h3>
              <p className="text-xs text-text-secondary">Estimasi instan pencairan rupiah &amp; reward poin</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Selected Item Card */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-inset-gray border border-gray-200">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-200">
              <Image
                src={item.imageUrl}
                alt={item.namaKategori}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {item.jenisSampah}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-text-primary truncate mt-1">
                {item.namaKategori}
              </h4>
              <p className="text-[11px] text-text-secondary">
                Tarif: Rp {item.hargaPerKg.toLocaleString("id-ID")}/kg • {item.poinPerKg} Poin/kg
              </p>
            </div>
          </div>

          {/* Weight Input & Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-text-primary">
                Perkiraan Berat Penyetoran (Kg)
              </label>
              <span className="text-sm font-extrabold text-dark-container bg-brand-neon/30 border border-brand-neon px-3 py-0.5 rounded-full">
                {weight} Kg
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="50"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-dark-container cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>0.5 Kg</span>
              <span>25 Kg</span>
              <span>50 Kg</span>
            </div>
          </div>

          {/* Result Calculation Boxes */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-inset-gray border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-text-secondary block mb-1">
                Uang Tabungan
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg sm:text-xl font-extrabold text-text-primary">
                  Rp {totalRupiah.toLocaleString("id-ID")}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 mt-0.5 block">
                Transfer ke rekening / tunai loket
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-dark-container text-white border border-white/10">
              <span className="text-[10px] uppercase font-bold text-brand-neon block mb-1">
                Reward Poin
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-brand-neon text-brand-neon" />
                <span className="text-lg sm:text-xl font-extrabold text-white">
                  +{totalPoin} Poin
                </span>
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5 block">
                Dapat ditukar voucer &amp; sembako
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 bg-inset-gray border-t border-gray-200 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Batal
          </button>
          <Link
            href={`/setor/ajukan?kategoriId=${item.id}&berat=${weight}`}
            className="w-full sm:flex-1 bg-brand-neon hover:bg-brand-neon-hover text-text-primary text-xs font-bold py-2.5 px-5 rounded-full flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-neon/20"
          >
            <span>Lanjutkan Ajukan Setor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
