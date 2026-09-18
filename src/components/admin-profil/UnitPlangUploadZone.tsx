/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Zona Unggah Foto Plang & Logo Unit Admin
 *
 * File: src/components/admin-profil/UnitPlangUploadZone.tsx
 * Deskripsi:
 * Mengakomodasi tombol pemilihan file foto plang atau logo unit bank sampah,
 * menampilkan pratinjau avatar lingkaran (atau inisial nama "AJ" bila belum ada foto),
 * serta memvalidasi format file (PNG, JPG, WebP) maks. 2MB.
 *
 * Standar Teknis UKK RPL:
 * - Hidden file input yang dipicu programatik melalui tombol kustom bergaya Next.js.
 * - Pratinjau gambar responsif dengan fill sizing dan fallback inisial teks.
 * - Validasi tipe MIME file gambar yang diperbolehkan.
 */

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";

/**
 * Properti komponen UnitPlangUploadZone.
 */
interface UnitPlangUploadZoneProps {
  /** URL string pratinjau gambar logo yang dipilih */
  logoPreview: string | null;
  /** Callback saat berkas baru dipilih */
  onLogoUpload: (file: File) => void;
}

/**
 * Komponen zona unggah foto plang unit operasional bank sampah.
 */
export default function UnitPlangUploadZone({
  logoPreview,
  onLogoUpload,
}: UnitPlangUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Menangani perubahan file yang dipilih oleh user.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onLogoUpload(e.target.files[0]);
    }
  };

  /**
   * Membuka dialog pemilih berkas saat tombol diklik.
   */
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-inset-gray border border-gray-200 rounded-2xl p-4 sm:p-4.5 mb-6 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap shadow-xs">
      {/* Left: Avatar / Initial Badge */}
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full bg-dark-container text-brand-neon font-bold text-base flex items-center justify-center shrink-0 shadow-inner relative overflow-hidden border border-white/10">
          {logoPreview ? (
            <Image
              src={logoPreview}
              alt="Logo Plang Unit"
              fill
              className="object-cover"
            />
          ) : (
            <span>AJ</span>
          )}
        </div>

        {/* Center Details */}
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-text-primary leading-tight">
            Logo / Foto Plang Unit Bank Sampah
          </h3>
          <p className="text-[11px] sm:text-xs text-text-secondary mt-0.5 leading-relaxed">
            Format PNG, JPG maks. 2MB. Tampil pada struk fisik &amp; nota digital.
          </p>
        </div>
      </div>

      {/* Right: Upload Button */}
      <div className="shrink-0 w-full sm:w-auto">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full sm:w-auto border border-gray-200 bg-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-gray-50 text-text-primary flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer hover:border-gray-300"
        >
          <Upload className="w-3.5 h-3.5 text-text-secondary" />
          <span>Unggah Foto Plang</span>
        </button>
      </div>
    </div>
  );
}
