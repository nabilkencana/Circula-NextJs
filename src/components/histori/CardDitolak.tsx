import React from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { TransaksiPenyetoran } from "@/types/historiSetor";

interface CardDitolakProps {
  transaksi: TransaksiPenyetoran;
}

export default function CardDitolak({ transaksi }: CardDitolakProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:border-gray-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-rose-50 border border-rose-200/60 text-rose-600 flex items-center justify-center shrink-0">
            <X className="w-4 h-4 text-rose-600 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-mono text-base sm:text-lg font-extrabold text-gray-900 tracking-tight leading-tight">
              {transaksi.kodeSetor}
            </h3>
            <span className="text-xs text-gray-400 block mt-0.5 font-medium">
              14 Agu 2026
            </span>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1F2] border border-[#FECDD3] text-[#BE123C] text-xs font-semibold">
          <div className="w-3.5 h-3.5 rounded-full border border-[#BE123C] flex items-center justify-center text-[9px] font-bold">
            ✕
          </div>
          <span>Pengajuan Ditolak</span>
        </div>
      </div>

      {/* Warning Alert Container */}
      <div className="p-4 my-4.5 rounded-2xl bg-[#FFF1F2]/60 border border-[#FEE2E2] text-xs text-[#9F1239] leading-relaxed">
        <strong className="font-bold text-[#881337]">Catatan Petugas:</strong>{" "}
        {transaksi.catatanPetugas ||
          "Sampah botol plastik masih tercampur cairan residu oli dan tidak memenuhi standar kebersihan 3R."}
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
        <span className="text-gray-400 font-normal">
          Silakan bersihkan dan keringkan material kembali sebelum mengajukan ulang.
        </span>

        <Link
          href="/kategori-sampah"
          className="self-start sm:self-auto inline-flex items-center gap-1.5 font-bold text-gray-900 hover:text-black transition-colors"
        >
          <span>Pelajari Panduan Pemilahan Ulang</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-700" />
        </Link>
      </div>
    </div>
  );
}
