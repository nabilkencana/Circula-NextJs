/**
 * @file RegistrationFieldGroups.tsx
 * @description Komponen kelompok input form pendaftaran nasabah baru.
 * Mencakup input nama lengkap (KTP), username, nomor WhatsApp dengan prefix Indonesia (+62),
 * textarea alamat domisili, serta input kata sandi & konfirmasi dengan fitur toggle visibilitas (show/hide password).
 * 
 * Peran dalam UKK:
 * - Menunjukkan arsitektur Controlled Component (state data diatur secara terpusat oleh controller parent).
 * - Menangani event input perubahan data (`onChange`) dan validasi saat kursor keluar (`onBlur`).
 * - Menyediakan fitur Show/Hide password interaktif menggunakan React `useState`.
 * - Memberikan feedback validasi visual instan (border merah & pesan peringatan teks merah saat field tidak valid).
 */

"use client"; // Komponen interaktif di sisi klien

import React, { useState } from "react";
import { Eye, EyeOff, User, AtSign, MapPin, Lock } from "lucide-react"; // Ikon: Mata intip, User, Simbol @, Pin Peta, dan Gembok Sandi
import { RegisterFormState } from "@/hooks/useRegisterNasabah"; // Tipe data state formulir

/**
 * Interface props untuk RegistrationFieldGroups
 * @property formData - Objek data formulir nasabah terkini
 * @property errors - Objek pesan error validasi per field (namaLengkap, username, nomorWhatsapp, dll.)
 * @property onInputChange - Handler saat nilai input berubah
 * @property onInputBlur - Handler opsional saat elemen input kehilangan fokus (blur)
 */
interface RegistrationFieldGroupsProps {
  formData: RegisterFormState;
  errors: Record<string, string>;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onInputBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function RegistrationFieldGroups({
  formData,
  errors,
  onInputChange,
  onInputBlur,
}: RegistrationFieldGroupsProps) {
  // State lokal untuk toggle visibilitas input kata sandi (true: tampil teks biasa, false: titik sandi rahasia)
  const [showPassword, setShowPassword] = useState(false);
  // State lokal untuk toggle visibilitas konfirmasi kata sandi
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-5">
      
      {/* ─── Baris 1: Nama Lengkap & Username ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Input Field: Nama Lengkap (KTP) */}
        <div>
          <label
            htmlFor="namaLengkap"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Nama Lengkap (KTP) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            {/* Ikon User di sisi kiri dalam input field */}
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="namaLengkap"
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={onInputChange}
              onBlur={onInputBlur}
              placeholder="Contoh: Budi Santoso"
              className={`w-full pl-10 pr-3.5 py-2.5 bg-white border ${
                errors.namaLengkap
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500" // Border merah saat terjadi error
                  : "border-gray-200 focus:border-dark-container focus:ring-dark-container" // Border normal
              } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all`}
            />
          </div>
          {/* Umpan balik error atau deskripsi bantuan */}
          {errors.namaLengkap ? (
            <p className="text-xs text-red-600 mt-1 font-medium">
              {errors.namaLengkap}
            </p>
          ) : (
            <p className="text-[11px] text-text-secondary mt-1">
              Nama resmi untuk pencatatan buku tabungan bank sampah.
            </p>
          )}
        </div>

        {/* Input Field: Username Akun */}
        <div>
          <label
            htmlFor="username"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Username <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            {/* Ikon AtSign (@) di sisi kiri dalam input field */}
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              <AtSign className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={onInputChange}
              onBlur={onInputBlur}
              placeholder="budisantoso26"
              autoCapitalize="none"
              className={`w-full pl-10 pr-3.5 py-2.5 bg-white border ${
                errors.username
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-dark-container focus:ring-dark-container"
              } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all font-mono`}
            />
          </div>
          {errors.username ? (
            <p className="text-xs text-red-600 mt-1 font-medium">
              {errors.username}
            </p>
          ) : (
            <p className="text-[11px] text-text-secondary mt-1">
              Digunakan untuk masuk akun. Huruf kecil tanpa spasi.
            </p>
          )}
        </div>
      </div>

      {/* ─── Baris 2: Nomor WhatsApp Aktif dengan Prefix (+62) ─── */}
      <div>
        <label
          htmlFor="nomorWhatsapp"
          className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
        >
          Nomor WhatsApp Aktif <span className="text-red-500">*</span>
        </label>
        <div className="relative flex rounded-xl border border-gray-200 bg-white overflow-hidden focus-within:border-dark-container focus-within:ring-1 focus-within:ring-dark-container">
          {/* Prefix Kode Negara Indonesia +62 */}
          <div className="flex items-center px-3.5 bg-inset-gray border-r border-gray-200 text-xs font-bold text-text-primary select-none">
            <span>+62</span>
          </div>
          <input
            type="tel"
            id="nomorWhatsapp"
            name="nomorWhatsapp"
            value={formData.nomorWhatsapp}
            onChange={onInputChange}
            onBlur={onInputBlur}
            placeholder="81234567890"
            className={`w-full px-3.5 py-2.5 text-sm text-text-primary placeholder:text-gray-400 focus:outline-none ${
              errors.nomorWhatsapp ? "bg-red-50/20" : ""
            }`}
          />
        </div>
        {errors.nomorWhatsapp ? (
          <p className="text-xs text-red-600 mt-1 font-medium">
            {errors.nomorWhatsapp}
          </p>
        ) : (
          <p className="text-[11px] text-text-secondary mt-1">
            Untuk notifikasi penimbangan, verifikasi tiket setor, dan penarikan poin.
          </p>
        )}
      </div>

      {/* ─── Baris 3: Alamat Lengkap Domisili (Textarea) ─── */}
      <div>
        <label
          htmlFor="alamatLengkap"
          className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
        >
          Alamat Lengkap Domisili <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          {/* Ikon Pin Lokasi MapPin */}
          <div className="absolute top-3 left-3.5 pointer-events-none text-text-secondary">
            <MapPin className="w-4 h-4" />
          </div>
          <textarea
            id="alamatLengkap"
            name="alamatLengkap"
            rows={3}
            value={formData.alamatLengkap}
            onChange={onInputChange}
            onBlur={onInputBlur}
            placeholder="Jl. Veteran No. 12, RT 03/RW 02, Kec. Lowokwaru, Kota Malang"
            className={`w-full pl-10 pr-3.5 py-2.5 bg-white border ${
              errors.alamatLengkap
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-dark-container focus:ring-dark-container"
            } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all resize-none`}
          />
        </div>
        {errors.alamatLengkap ? (
          <p className="text-xs text-red-600 mt-1 font-medium">
            {errors.alamatLengkap}
          </p>
        ) : (
          <p className="text-[11px] text-text-secondary mt-1">
            Penentuan unit bank sampah terdekat dan validasi penjemputan armada.
          </p>
        )}
      </div>

      {/* ─── Baris 4: Kata Sandi & Konfirmasi Kata Sandi ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Input: Kata Sandi */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Kata Sandi <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            {/* Ikon Gembok Lock */}
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"} // Dinamis berubah antara text dan password
              id="password"
              name="password"
              value={formData.password}
              onChange={onInputChange}
              onBlur={onInputBlur}
              placeholder="Minimal 8 karakter"
              className={`w-full pl-10 pr-10 py-2.5 bg-white border ${
                errors.password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-dark-container focus:ring-dark-container"
              } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all`}
            />
            {/* Tombol Toggle Show/Hide Password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-text-primary"
              aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              {errors.password}
            </p>
          )}
        </div>

        {/* Input: Konfirmasi Kata Sandi */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Konfirmasi Kata Sandi <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onInputChange}
              onBlur={onInputBlur}
              placeholder="Ulangi kata sandi"
              className={`w-full pl-10 pr-10 py-2.5 bg-white border ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-dark-container focus:ring-dark-container"
              } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all`}
            />
            {/* Tombol Toggle Show/Hide Confirm Password */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-text-primary"
              aria-label={
                showConfirmPassword
                  ? "Sembunyikan konfirmasi sandi"
                  : "Tampilkan konfirmasi sandi"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              {errors.confirmPassword}
            </p>
          )}
        </div>

      </div>

    </div>
  );
}
