import React from "react";
import Link from "next/link";
import { XCircle, AlertCircle, ArrowRight } from "lucide-react";
import { TransaksiPenyetoran } from "@/types/historiSetor";

interface CardDitolakProps {
  transaksi: TransaksiPenyetoran;
}

export default function CardDitolak({ transaksi }: CardDitolakProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0 shadow-xs">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-base sm:text-lg font-extrabold text-text-primary tracking-wide block">
              {transaksi.kodeSetor}
            </span>
            <span className="text-xs text-text-secondary">
              14 Agu 2026
            </span>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-800 text-xs font-bold shadow-xs">
          <XCircle className="w-3.5 h-3.5" />
          <span>Pengajuan Ditolak</span>
        </div>
      </div>

      {/* Warning Box */}
      <div className="p-4 my-4 rounded-2xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-bold">Catatan Petugas:</strong>{" "}
          {transaksi.catatanPetugas ||
            "Sampah botol plastik masih tercampur cairan residu oli dan tidak memenuhi standar kebersihan 3R."}
        </p>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="text-text-secondary">
          Silakan bersihkan dan keringkan material kembali sebelum mengajukan ulang.
        </span>

        <Link
          href="/kategori-sampah"
          className="self-start sm:self-auto inline-flex items-center gap-1 font-bold text-text-primary hover:underline hover:text-dark-container"
        >
          <span>Pelajari Panduan Pemilahan Ulang</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
