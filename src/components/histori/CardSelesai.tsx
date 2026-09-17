import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Printer, ArrowRight } from "lucide-react";
import { TransaksiPenyetoran } from "@/types/historiSetor";

interface CardSelesaiProps {
  transaksi: TransaksiPenyetoran;
}

export default function CardSelesai({ transaksi }: CardSelesaiProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:border-gray-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-mono text-base sm:text-lg font-extrabold text-gray-900 tracking-tight leading-tight">
              {transaksi.kodeSetor}
            </h3>
            <span className="text-xs text-gray-400 block mt-0.5 font-medium">
              Selesai: 26 Agu 2026, 09.35 WIB
            </span>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-semibold">
          <div className="w-3.5 h-3.5 rounded-sm border border-[#065F46] flex items-center justify-center text-[9px] font-bold">
            ✓
          </div>
          <span>Selesai &amp; Poin Diterbitkan</span>
        </div>
      </div>

      {/* 3-Column Unified Bento Grid Container */}
      <div className="bg-[#F9FAFB] rounded-2xl border border-gray-100 p-4 sm:p-5 my-4.5 grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {/* Col 1: Hasil Timbangan Petugas */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
            HASIL TIMBANGAN PETUGAS
          </span>
          <ul className="space-y-1.5 text-xs font-medium text-gray-800">
            {transaksi.items && transaksi.items.length > 0 ? (
              transaksi.items.map((it, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] shrink-0" />
                  <span>{it.kategoriNama}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] shrink-0" />
                  <span>Botol Plastik PET: 10.0 Kg (100 Poin)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] shrink-0" />
                  <span>Kardus &amp; Karton: 5.0 Kg (25 Poin)</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Col 2: Real Metrics Box */}
        <div className="space-y-2.5 md:border-l md:border-gray-200/60 md:pl-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Total Timbangan Real:</span>
            <span className="text-sm font-bold text-gray-900">
              {Number(transaksi.totalBeratKg || 15).toFixed(1)} Kg
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Total Poin Diterima:</span>
            <div className="flex items-center gap-1 text-sm font-extrabold text-gray-900">
              <span className="text-amber-500">★</span>
              <span>+{transaksi.totalPoin || "150"} Poin</span>
            </div>
          </div>
        </div>

        {/* Col 3: Verifikator Petugas & Catatan */}
        <div className="space-y-1 md:border-l md:border-gray-200/60 md:pl-5 text-xs">
          <p className="font-bold text-gray-900 leading-snug">
            {transaksi.petugasVerifikator && transaksi.petugasVerifikator.startsWith("Petugas:")
              ? transaksi.petugasVerifikator
              : `Petugas: ${transaksi.petugasVerifikator || "Ahmad Fauzi (Timbangan Tera Digital #04)"}`}
          </p>
          <p className="text-gray-500 text-[11px] leading-relaxed">
            Catatan: {transaksi.catatanPetugas || "Berat sampah sesuai hasil timbangan real"}
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
        <div className="flex items-center gap-2 text-gray-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Transaksi telah diverifikasi dan masuk ke ledger akun Anda.</span>
        </div>

        <Link
          href={`/nota/${transaksi.id || transaksi.kodeSetor}`}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300/90 bg-white text-gray-800 text-xs font-semibold hover:bg-gray-50 transition-colors shadow-2xs"
        >
          <Printer className="w-3.5 h-3.5 text-gray-600" />
          <span>Cetak Struk / Nota Digital</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
        </Link>
      </div>
    </div>
  );
}
