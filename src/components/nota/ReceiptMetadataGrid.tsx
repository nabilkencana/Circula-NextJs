import React from "react";

interface ReceiptMetadataGridProps {
  kodeTransaksi: string;
  waktuVerifikasi: string;
  namaNasabah: string;
  noTelepon: string;
}

export default function ReceiptMetadataGrid({
  kodeTransaksi,
  waktuVerifikasi,
  namaNasabah,
  noTelepon,
}: ReceiptMetadataGridProps) {
  return (
    <div className="bg-inset-gray border border-gray-200 rounded-2xl p-5 my-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {/* Col 1: Transaction Code */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-1">
          Nomor Transaksi
        </span>
        <span className="font-mono font-bold text-sm sm:text-base text-text-primary tracking-tight block">
          {kodeTransaksi}
        </span>
      </div>

      {/* Col 2: Timestamp */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-1">
          Waktu Verifikasi
        </span>
        <span className="text-xs sm:text-sm font-semibold text-text-primary block">
          {waktuVerifikasi}
        </span>
      </div>

      {/* Col 3: Customer Name */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-1">
          Nama Nasabah
        </span>
        <span className="font-bold text-xs sm:text-sm text-text-primary block">
          {namaNasabah}
        </span>
      </div>

      {/* Col 4: Phone */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-1">
          No. Telepon
        </span>
        <span className="font-mono text-xs sm:text-sm font-semibold text-text-primary block">
          {noTelepon}
        </span>
      </div>
    </div>
  );
}
