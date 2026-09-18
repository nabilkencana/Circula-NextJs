/**
 * @file LoginInputFields.tsx
 * @description Komponen kumpulan field input kredensial pada formulir login.
 * Menyesuaikan teks bantuan (placeholder) secara dinamis sesuai peran yang dipilih (Nasabah vs Admin Unit).
 * 
 * Peran dalam UKK:
 * - Menunjukkan kemampuan membuat UI dinamis yang adaptif terhadap state `role`.
 * - Menerapkan teknik Show/Hide password untuk keamanan dan kenyamanan pengetikan pengguna.
 * - Memisahkan komponen input menjadi unit modular yang mudah diuji (clean architecture).
 */

"use client"; // Komponen interaktif di sisi klien

import React from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react"; // Ikon: User, Lock, Eye, dan EyeOff
import { AuthRole } from "@/types/auth"; // Tipe data peran ('NASABAH' | 'ADMIN')

/**
 * Interface props untuk LoginInputFields
 * @property role - Peran yang saat ini aktif untuk membedakan placeholder
 * @property username - Nilai username / identitas pengguna
 * @property password - Nilai kata sandi
 * @property showPassword - Status boolean visibilitas kata sandi
 * @property errors - Objek pesan kesalahan validasi per field
 * @property onInputChange - Callback saat pengguna mengetik pada salah satu field
 * @property onToggleShowPassword - Callback saat tombol intip password diklik
 */
interface LoginInputFieldsProps {
  role: AuthRole;
  username: string;
  password: string;
  showPassword: boolean;
  errors: Record<string, string>;
  onInputChange: (field: "username" | "password", value: string) => void;
  onToggleShowPassword: () => void;
}

export default function LoginInputFields({
  role,
  username,
  password,
  showPassword,
  errors,
  onInputChange,
  onToggleShowPassword,
}: LoginInputFieldsProps) {
  /**
   * Placeholder dinamis yang memberikan contoh input yang relevan sesuai peran aktif:
   * - Nasabah: contoh nama nasabah personal
   * - Admin: contoh nama unit pengelola bank sampah
   */
  const usernamePlaceholder =
    role === "NASABAH"
      ? "cth. nasabah_budi atau budi.santoso"
      : "cth. admin_banksampah atau admin_asrijaya";

  return (
    <div className="space-y-4">
      
      {/* ─── Field 1: Username / ID Pengguna ─── */}
      <div>
        <label
          htmlFor="username"
          className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
        >
          Username / ID Pengguna <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          {/* Ikon User */}
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => onInputChange("username", e.target.value)}
            placeholder={usernamePlaceholder}
            autoCapitalize="none"
            className={`w-full pl-10 pr-3.5 py-3 bg-inset-gray border ${
              errors.username
                ? "border-red-500 focus:ring-red-500 focus:border-red-500" // Border merah jika ada error
                : "border-gray-200 focus:border-dark-container focus:ring-dark-container" // Normal
            } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all`}
          />
        </div>
        {/* Pesan Error Validasi */}
        {errors.username && (
          <p className="text-xs text-red-600 mt-1 font-medium">
            {errors.username}
          </p>
        )}
      </div>

      {/* ─── Field 2: Kata Sandi (Password) ─── */}
      <div>
        <label
          htmlFor="password"
          className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
        >
          Kata Sandi <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          {/* Ikon Gembok */}
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? "text" : "password"} // Berubah dinamis antara mode intip teks atau bintang
            id="password"
            name="password"
            value={password}
            onChange={(e) => onInputChange("password", e.target.value)}
            placeholder="Masukkan kata sandi"
            className={`w-full pl-10 pr-10 py-3 bg-inset-gray border ${
              errors.password
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-dark-container focus:ring-dark-container"
            } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all`}
          />
          {/* Tombol Toggle Show/Hide Password */}
          <button
            type="button"
            onClick={onToggleShowPassword}
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
        {/* Pesan Error Validasi */}
        {errors.password && (
          <p className="text-xs text-red-600 mt-1 font-medium">
            {errors.password}
          </p>
        )}
      </div>

    </div>
  );
}
