import React from "react";
import Link from "next/link";
import { Package, Clock, Info, ArrowRight, Star } from "lucide-react";
import { TransaksiPenyetoran } from "@/types/historiSetor";

interface CardMenungguKonfirmasiProps {
  transaksi: TransaksiPenyetoran;
}

export default function CardMenungguKonfirmasi({
  transaksi,
}: CardMenungguKonfirmasiProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-xs">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-base sm:text-lg font-extrabold text-text-primary tracking-wide block">
              {transaksi.kodeSetor}
            </span>
            <span className="text-xs text-text-secondary">
              Diajukan: 26 Agu 2026, 10:00 WIB
            </span>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold shadow-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>Menunggu Konfirmasi Petugas</span>
        </div>
      </div>

      {/* 3-Column Content Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        {/* Col 1: Items List */}
        <div className="p-4 rounded-2xl bg-inset-gray border border-gray-200 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-2">
              Item Sampah Diajukan
            </span>
            <ul className="space-y-1.5 text-xs font-semibold text-text-primary">
              {transaksi.items.map((it, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-neon shrink-0" />
                  <span>{it.kategoriNama}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Col 2: Key Estimation Metrics */}
        <div className="p-4 rounded-2xl bg-inset-gray border border-gray-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-xs text-text-secondary">Total Estimasi Berat:</span>
            <span className="text-sm font-extrabold text-text-primary">
              {transaksi.totalBeratKg} Kg
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">Estimasi Poin:</span>
            <div className="flex items-center gap-1 text-sm font-extrabold text-text-primary">
              <Star className="w-4 h-4 fill-brand-neon text-dark-container" />
              <span>+{transaksi.totalPoin} Poin</span>
            </div>
          </div>
        </div>

        {/* Col 3: Unit Penyerahan & Notes */}
        <div className="p-4 rounded-2xl bg-inset-gray border border-gray-200">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-1">
            Unit Penyerahan
          </span>
          <p className="text-xs font-semibold text-text-primary leading-tight">
            Metode: {transaksi.lokasiTujuan} (Gratis)
          </p>
          {transaksi.catatanNasabah && (
            <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
              Catatan: {transaksi.catatanNasabah}
            </p>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-text-secondary">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Tunjukkan kode setor ini ke loket unit penimbangan.</span>
        </div>

        <Link
          href={`/setor/ajukan`}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-text-primary text-text-primary font-bold hover:bg-brand-neon hover:border-brand-neon transition-all cursor-pointer shadow-xs"
        >
          <span>Lihat Rincian Pengajuan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
