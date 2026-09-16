import React from "react";

interface ReceiptSignatureFooterProps {
  petugasPenimbang: string;
  catatanPetugas: string;
  digitalSignatureHash: string;
}

export default function ReceiptSignatureFooter({
  petugasPenimbang,
  catatanPetugas,
  digitalSignatureHash,
}: ReceiptSignatureFooterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-5 border-t border-gray-200">
      {/* Left Side: Official QR Code & Tera Metrologi */}
      <div className="flex items-center gap-3.5">
        {/* Crisp Vector QR Code Simulation */}
        <div className="w-20 h-20 bg-white p-1.5 rounded-xl border border-gray-200 shadow-2xs shrink-0 relative flex items-center justify-center">
          <svg
            className="w-full h-full text-dark-container"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            {/* Corner Marker 1 (Top Left) */}
            <rect x="5" y="5" width="28" height="28" rx="4" fill="#0D110C" />
            <rect x="11" y="11" width="16" height="16" rx="2" fill="#FFFFFF" />
            <rect x="15" y="15" width="8" height="8" rx="1" fill="#0D110C" />

            {/* Corner Marker 2 (Top Right) */}
            <rect x="67" y="5" width="28" height="28" rx="4" fill="#0D110C" />
            <rect x="73" y="11" width="16" height="16" rx="2" fill="#FFFFFF" />
            <rect x="77" y="15" width="8" height="8" rx="1" fill="#0D110C" />

            {/* Corner Marker 3 (Bottom Left) */}
            <rect x="5" y="67" width="28" height="28" rx="4" fill="#0D110C" />
            <rect x="11" y="73" width="16" height="16" rx="2" fill="#FFFFFF" />
            <rect x="15" y="77" width="8" height="8" rx="1" fill="#0D110C" />

            {/* Simulated Data Matrix Dots */}
            <rect x="38" y="10" width="6" height="6" rx="1" />
            <rect x="48" y="10" width="6" height="6" rx="1" />
            <rect x="38" y="22" width="6" height="6" rx="1" />
            <rect x="48" y="22" width="6" height="6" rx="1" />
            <rect x="10" y="38" width="6" height="6" rx="1" />
            <rect x="22" y="38" width="6" height="6" rx="1" />
            <rect x="38" y="38" width="8" height="8" rx="1" fill="#D4E836" />
            <rect x="52" y="38" width="6" height="6" rx="1" />
            <rect x="68" y="38" width="6" height="6" rx="1" />
            <rect x="80" y="38" width="6" height="6" rx="1" />
            <rect x="38" y="52" width="6" height="6" rx="1" />
            <rect x="48" y="52" width="6" height="6" rx="1" />
            <rect x="62" y="52" width="6" height="6" rx="1" />
            <rect x="76" y="52" width="6" height="6" rx="1" />
            <rect x="38" y="66" width="6" height="6" rx="1" />
            <rect x="52" y="66" width="6" height="6" rx="1" />
            <rect x="68" y="66" width="6" height="6" rx="1" />
            <rect x="80" y="66" width="6" height="6" rx="1" />
            <rect x="38" y="80" width="6" height="6" rx="1" />
            <rect x="48" y="80" width="6" height="6" rx="1" />
            <rect x="62" y="80" width="6" height="6" rx="1" />
            <rect x="76" y="80" width="6" height="6" rx="1" />
          </svg>
          {/* Neon Verification Accent */}
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-neon border-2 border-white shadow-2xs" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block">
            Tera Metrologi Digital
          </span>
          <p className="text-[11px] text-gray-500 max-w-55 leading-tight mt-0.5">
            Pindai untuk memvalidasi keaslian tanda terima pada database Circula.
          </p>
        </div>
      </div>

      {/* Right Side: Officer Sign-off & Digital Signature Hash */}
      <div className="text-left sm:text-right">
        <span className="font-bold text-xs sm:text-sm text-text-primary block">
          Petugas Penimbang: {petugasPenimbang}
        </span>
        {catatanPetugas && (
          <p className="text-xs text-gray-500 italic mt-0.5 max-w-sm">
            Catatan: {catatanPetugas}
          </p>
        )}

        <div className="mt-2.5">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-gray-400 block">
            Timestamp Digital Signature
          </span>
          <div className="inline-block bg-inset-gray border border-gray-200 rounded-md px-2 py-0.5 font-mono text-[10px] text-gray-600 mt-0.5">
            Hash: {digitalSignatureHash}
          </div>
        </div>
      </div>
    </div>
  );
}
