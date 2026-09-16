import React from "react";
import Link from "next/link";
import { CheckCircle2, FileText, ArrowRight, Star } from "lucide-react";
import { TransaksiPenyetoran } from "@/types/historiSetor";

interface CardSelesaiProps {
  transaksi: TransaksiPenyetoran;
}

export default function CardSelesai({ transaksi }: CardSelesaiProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-base sm:text-lg font-extrabold text-text-primary tracking-wide block">
              {transaksi.kodeSetor}
            </span>
            <span className="text-xs text-text-secondary">
              Selesai: 26 Agu 2026, 09:35 WIB
            </span>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-lime-100 border border-lime-200 text-lime-900 text-xs font-bold shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-lime-800" />
          <span>Selesai &amp; Poin Diterbitkan</span>
        </div>
      </div>

      {/* 3-Column Content Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        {/* Col 1: Hasil Timbangan Petugas */}
        <div className="p-4 rounded-2xl bg-inset-gray border border-gray-200 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-2">
              Hasil Timbangan Petugas
            </span>
            <ul className="space-y-1.5 text-xs font-semibold text-text-primary">
              {transaksi.items.map((it, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>
                    {it.kategoriNama} ({it.poinSubtotal} Poin)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Col 2: Final Metrics Box */}
        <div className="p-4 rounded-2xl bg-inset-gray border border-gray-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-xs text-text-secondary">Total Timbangan Real:</span>
            <span className="text-sm font-extrabold text-text-primary">
              {transaksi.totalBeratKg} Kg
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">Total Poin Diterima:</span>
            <div className="flex items-center gap-1 text-sm font-extrabold text-text-primary">
              <Star className="w-4 h-4 fill-brand-neon text-dark-container" />
              <span className="text-base font-extrabold text-dark-container">
                +{transaksi.totalPoin} Poin
              </span>
            </div>
          </div>
        </div>

        {/* Col 3: Verifikator Petugas */}
        <div className="p-4 rounded-2xl bg-inset-gray border border-gray-200">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-1">
            Verifikator Petugas
          </span>
          <p className="text-xs font-semibold text-text-primary leading-tight">
            {transaksi.petugasVerifikator || "Petugas: Ahmad Fauzi (Timbangan Tera Digital #04)"}
          </p>
          {transaksi.catatanPetugas && (
            <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
              Catatan: {transaksi.catatanPetugas}
            </p>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-text-secondary">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Transaksi telah diverifikasi dan masuk ke ledger akun Anda.</span>
        </div>

        <Link
          href={`/nota/${transaksi.kodeSetor}`}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-text-primary text-text-primary font-bold hover:bg-brand-neon hover:border-brand-neon transition-all cursor-pointer shadow-xs"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Cetak Struk / Nota Digital</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
