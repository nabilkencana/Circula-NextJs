/**
 * @file UnitComplianceCheckbox.tsx
 * @description Komponen checkbox persetujuan kepatuhan operasional dan SOP Bank Sampah Digital Circula.
 * Memastikan pengelola unit menyatakan kepemilikan timbangan digital/analog terkalibrasi serta
 * komitmen penerapan standar operasional prosedur penimbangan dan pemilahan sampah 3R.
 * Dilengkapi dukungan aksesibilitas keyboard (Space / Enter) dan penanganan pesan kesalahan.
 *
 * @author Tim Pengembang Circula
 * @version 1.0.0
 */

"use client";

import React from "react";
import { Check } from "lucide-react";

/**
 * @interface UnitComplianceCheckboxProps
 * @description Kontrak properti untuk komponen persetujuan kepatuhan operasional unit.
 */
interface UnitComplianceCheckboxProps {
  /** Menandakan apakah persetujuan telah dicentang oleh pengelola unit */
  checked: boolean;
  /** Pesan galat validasi jika pengguna belum mencentang checkbox saat submit form */
  error?: string;
  /** Callback untuk membalikkan (toggle) status centang */
  onToggle: () => void;
}

/**
 * Komponen UnitComplianceCheckbox
 * 
 * Merender kotak centang kustom bernuansa Circula yang ramah aksesibilitas (WAI-ARIA compliant),
 * mengikat keyboard event (Space / Enter) dan klik mouse untuk kemudahan penggunaan.
 */
export default function UnitComplianceCheckbox({
  checked,
  error,
  onToggle,
}: UnitComplianceCheckboxProps) {
  return (
    <div className="pt-2">
      {/* Kontainer Interaktif Checkbox & Teks Pernyataan */}
      <div
        onClick={onToggle}
        className="flex items-start gap-3 cursor-pointer group select-none"
      >
        {/* Kotak Centang Custom dengan Dukungan Aksesibilitas Keyboard */}
        <div
          role="checkbox"
          aria-checked={checked}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onToggle();
            }
          }}
          className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
            checked
              ? "bg-dark-container border-dark-container text-brand-neon"
              : "border-gray-300 bg-white group-hover:border-gray-500"
          }`}
        >
          {checked && <Check className="w-3.5 h-3.5 stroke-3" />}
        </div>

        {/* Teks Pernyataan Kepatuhan Standar Timbangan & SOP 3R Circula */}
        <label className="text-xs text-text-secondary leading-relaxed cursor-pointer">
          Saya menyatakan bahwa unit operasional ini memiliki timbangan terkalibrasi dan bersedia mematuhi SOP penerimaan sampah 3R Circula.
        </label>
      </div>

      {/* Tampilan Pesan Galat Validasi Jika Wajib Dicentang */}
      {error && (
        <p className="text-xs text-red-600 mt-1.5 font-medium pl-8" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
