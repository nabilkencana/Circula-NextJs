/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Kelompok Input Formulir Profil Unit Admin
 *
 * File: src/components/admin-profil/UnitProfileFieldGroups.tsx
 * Deskripsi:
 * Mengelompokkan seluruh elemen input formulir identitas unit bank sampah:
 * - Nama Unit Bank Sampah (full-width)
 * - Penanggung Jawab / Pengelola & Nomor Kontak WhatsApp (2 kolom)
 * - Alamat Lengkap Loket / Gudang Fasilitas (textarea full-width)
 * - Jam Operasional Loket & Kapasitas Gudang Penampungan (2 kolom)
 *
 * Standar Teknis UKK RPL:
 * - Controlled input components terintegrasi dengan event callback parent.
 * - Penanda field wajib diisi (`*` merah) dan ikon pendukung (Building2, User, Phone, MapPin, Clock, Package).
 * - Prefix nomor seluler Indonesia (+62) dengan formatting monospaced font.
 */

"use client";

import React, { ChangeEvent } from "react";
import { Building2, User, Phone, MapPin, Clock, Package } from "lucide-react";
import { UpdateUnitProfilPayload } from "@/types/adminProfil";

/**
 * Properti komponen UnitProfileFieldGroups.
 */
interface UnitProfileFieldGroupsProps {
  /** Nilai data formulir saat ini */
  formData: UpdateUnitProfilPayload;
  /** Callback saat input teks atau textarea berubah */
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * Komponen kelompok kolom isian data profil unit bank sampah.
 */
export default function UnitProfileFieldGroups({
  formData,
  onInputChange,
}: UnitProfileFieldGroupsProps) {
  return (
    <div className="space-y-4">
      {/* Field 1: Nama Unit Bank Sampah (Full Width) */}
      <div>
        <label
          htmlFor="namaUnit"
          className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
        >
          Nama Unit Bank Sampah <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            <Building2 className="w-4 h-4" />
          </div>
          <input
            id="namaUnit"
            name="namaUnit"
            type="text"
            required
            value={formData.namaUnit}
            onChange={onInputChange}
            placeholder="cth. Bank Sampah Asri Jaya RW 05"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-inset-gray border border-gray-200 text-sm font-semibold text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all"
          />
        </div>
        <p className="text-[11px] text-text-secondary mt-1">
          Nama resmi yang tercantum di header setiap struk transaksi cetak.
        </p>
      </div>

      {/* Row 2: Penanggung Jawab & Kontak WA (2 Cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Penanggung Jawab */}
        <div>
          <label
            htmlFor="namaPengelola"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Penanggung Jawab / Pengelola <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              <User className="w-4 h-4" />
            </div>
            <input
              id="namaPengelola"
              name="namaPengelola"
              type="text"
              required
              value={formData.namaPengelola}
              onChange={onInputChange}
              placeholder="cth. Bapak H. Sukirman"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-inset-gray border border-gray-200 text-sm font-medium text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right: WhatsApp */}
        <div>
          <label
            htmlFor="telp"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Nomor Kontak<span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              <Phone className="w-4 h-4" />
            </div>
            <span className="absolute left-9 text-xs font-bold text-text-secondary select-none">
              +62
            </span>
            <input
              id="telp"
              name="telp"
              type="tel"
              required
              value={formData.telp}
              onChange={onInputChange}
              placeholder="81234567890"
              className="w-full pl-18 pr-4 py-3 rounded-xl bg-inset-gray border border-gray-200 text-sm font-medium text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all font-mono"
            />
          </div>
        </div>
      </div>

      {/* Field 3: Alamat Lengkap (Full Width) */}
      <div>
        <label
          htmlFor="alamatLengkap"
          className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
        >
          Alamat Lengkap Loket / Fasilitas Penimbangan <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute top-3.5 left-3.5 pointer-events-none text-text-secondary">
            <MapPin className="w-4 h-4" />
          </div>
          <textarea
            id="alamatLengkap"
            name="alamatLengkap"
            rows={2}
            required
            value={formData.alamatLengkap}
            onChange={onInputChange}
            placeholder="Balai RW, nama jalan, RT/RW, Kelurahan, Kecamatan, Kota"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-inset-gray border border-gray-200 text-sm font-medium text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all leading-relaxed"
          />
        </div>
      </div>

      {/* Row 4: Jam Operasional & Kapasitas Gudang (2 Cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Jam Operasional */}
        <div>
          <label
            htmlFor="jamOperasional"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Jam Operasional Loket <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              <Clock className="w-4 h-4" />
            </div>
            <input
              id="jamOperasional"
              name="jamOperasional"
              type="text"
              required
              value={formData.jamOperasional}
              onChange={onInputChange}
              placeholder="cth. Sabtu & Minggu (08:00 - 15:00 WIB)"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-inset-gray border border-gray-200 text-sm font-medium text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right: Kapasitas Gudang */}
        <div>
          <label
            htmlFor="kapasitasGudang"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Kapasitas Gudang Penampungan <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              <Package className="w-4 h-4" />
            </div>
            <input
              id="kapasitasGudang"
              name="kapasitasGudang"
              type="text"
              required
              value={formData.kapasitasGudang}
              onChange={onInputChange}
              placeholder="cth. Maks. 5 Ton / Periode"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-inset-gray border border-gray-200 text-sm font-medium text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
