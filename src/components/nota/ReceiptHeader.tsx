import React from "react";
import { Leaf, CheckCircle2 } from "lucide-react";

/**
 * Interface properties untuk komponen kop kepala nota (ReceiptHeader).
 */
interface ReceiptHeaderProps {
  /** Nama unit bank sampah pelaksana transaksi */
  unitName: string;
}

/**
 * Komponen Kop Kepala Nota Digital (ReceiptHeader)
 *
 * Menampilkan identitas resmi penerbit struk:
 * 1. Logo Circula Bank Sampah Digital dan nama cabang unit operasional.
 * 2. Lencana verifikasi ("TRANSAKSI SELESAI") dengan aksen hijau emerald dan border neon.
 *
 * @param props Properti nama unit
 * @returns JSX Element kop nota
 */
export default function ReceiptHeader({ unitName }: ReceiptHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
      {/* Brand & Unit ID Identification */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-dark-container text-brand-neon flex items-center justify-center shrink-0 shadow-xs">
          <Leaf className="w-5 h-5 fill-brand-neon" />
        </div>
        <div>
          <span className="font-extrabold text-sm sm:text-base tracking-wider text-text-primary uppercase block leading-none">
            Circula Bank Sampah Digital
          </span>
          <span className="text-xs text-text-secondary mt-1 block">
            {unitName}
          </span>
        </div>
      </div>

      {/* Verified Status Pill */}
      <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-lime-100 border border-brand-neon/50 text-dark-container text-xs font-bold shadow-2xs">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
        <span>TRANSAKSI SELESAI</span>
      </div>
    </div>
  );
}

