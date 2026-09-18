/**
 * @file LoginFormCard.tsx
 * @description Komponen kartu formulir login (Login Form Card) multi-peran aplikasi Circula.
 * Menangani proses otentikasi kredensial pengguna (Username/No. WA dan Kata Sandi),
 * opsi retensi sesi ("Ingat sesi masuk"), penanganan error asynchronous, serta tombol submit CTA.
 * 
 * Peran dalam UKK:
 * - Menunjukkan integrasi arsitektur React Container/Hook (`useLoginMultiRole`).
 * - Mengelola feedback visual status loading proses otentikasi (`isLoading`, `Loader2`).
 * - Memberikan validasi input seketika dan penanganan error responsif dari server.
 * - Menyediakan rute alternatif pendaftaran nasabah baru dan unit bank sampah.
 */

"use client"; // Komponen interaktif di sisi klien

import React from "react";
import Link from "next/link"; // Komponen navigasi internal Next.js
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react"; // Kumpulan ikon vektor dari Lucide React
import { useLoginMultiRole } from "@/hooks/useLoginMultiRole"; // Hook pengelola state & logika login

/**
 * Mendapatkan tipe data return spesifik dari custom hook useLoginMultiRole
 */
type UseLoginMultiRoleReturn = ReturnType<typeof useLoginMultiRole>;

/**
 * Interface props untuk LoginFormCard
 * @property controller - Objek kendali login yang berisi state dan handler
 */
interface LoginFormCardProps {
  controller: UseLoginMultiRoleReturn;
}

export default function LoginFormCard({ controller }: LoginFormCardProps) {
  /**
   * Destrukturisasi state dan action handler dari controller hook:
   * - username / password: Nilai input kredensial
   * - rememberMe: Status boolean simpan sesi
   * - showPassword: Status boolean visibilitas kata sandi
   * - errors: Objek pesan error validasi per field dan error global submit
   * - isLoading: Penanda proses request login ke backend sedang berjalan
   * - toggleShowPassword: Fungsi pembalik visibilitas kata sandi
   * - handleRememberMeToggle: Handler kotak centang simpan sesi
   * - handleInputChange: Handler perubahan nilai input
   * - handleLoginSubmit: Handler pengiriman form otentikasi
   */
  const {
    username,
    password,
    rememberMe,
    showPassword,
    errors,
    isLoading,
    toggleShowPassword,
    handleRememberMeToggle,
    handleInputChange,
    handleLoginSubmit,
  } = controller;

  return (
    /* Kontainer Putih Kartu Form Login */
    <div className="w-full bg-white rounded-4xl border border-gray-200/80 p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl shadow-gray-200/40 flex flex-col justify-between min-h-145 lg:min-h-160">
      <div>
        
        {/* ─── 1. Headline Selamat Datang & Deskripsi ─── */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Selamat Datang Kembali
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
            Masuk ke akun Circula Anda untuk mengelola setoran sampah, cek saldo poin, atau administrasi bank sampah.
          </p>
        </div>

        {/* ─── 2. Banner Notifikasi Error Global ─── */}
        {/* Muncul jika kredensial salah, akun tidak aktif, atau jaringan gagal */}
        {errors.submit && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 mb-5 animate-in fade-in duration-150">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-red-700 font-medium leading-relaxed">
              {errors.submit}
            </p>
          </div>
        )}

        {/* ─── 3. Formulir Input Kredensial ─── */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {/* Field 1: Identitas Akun (Username / Nomor WhatsApp / ID Akun) */}
          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="block text-xs font-bold text-gray-900 tracking-tight"
            >
              Username / No. WhatsApp / ID Akun *
            </label>
            <div className="relative flex items-center">
              {/* Ikon Pengguna di sisi kiri */}
              <div className="absolute left-4 text-gray-400 pointer-events-none">
                <User className="w-4 h-4" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="Masukkan username atau ID akun Anda"
                className={`w-full h-13 pl-11 pr-4 rounded-2xl border ${
                  errors.username
                    ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500" // Warna merah saat error
                    : "border-gray-300/90 bg-white hover:border-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                } text-sm text-gray-900 placeholder:text-gray-400 transition-all outline-none font-medium`}
              />
            </div>
            {/* Pesan Kesalahan Validasi Username */}
            {errors.username && (
              <p className="text-xs text-red-600 font-medium mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Field 2: Kata Sandi beserta tautan Lupa Sandi */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-bold text-gray-900 tracking-tight"
              >
                Kata Sandi *
              </label>
              {/* Tautan WhatsApp Helpdesk untuk pemulihan akun */}
              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20Circula,%20saya%20lupa%20kata%20sandi%20akun%20saya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-gray-700 hover:text-black transition-colors cursor-pointer"
              >
                Lupa kata sandi?
              </a>
            </div>
            <div className="relative flex items-center">
              {/* Ikon Gembok di sisi kiri */}
              <div className="absolute left-4 text-gray-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"} // Dinamis berdasarkan toggle
                autoComplete="current-password"
                value={password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Masukkan kata sandi akun"
                className={`w-full h-13 pl-11 pr-11 rounded-2xl border ${
                  errors.password
                    ? "border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300/90 bg-white hover:border-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                } text-sm text-gray-900 placeholder:text-gray-400 transition-all outline-none font-medium`}
              />
              {/* Tombol Show/Hide Password */}
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {/* Pesan Kesalahan Validasi Password */}
            {errors.password && (
              <p className="text-xs text-red-600 font-medium mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* ─── 4. Checkbox Ingat Sesi Masuk (30 Hari) ─── */}
          <div className="flex items-center gap-2.5 pt-2">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeToggle}
              className="w-4 h-4 rounded border-gray-300 text-black accent-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="text-xs font-medium text-gray-600 cursor-pointer select-none"
            >
              Ingat sesi masuk di perangkat ini selama 30 hari
            </label>
          </div>

          {/* ─── 5. Tombol Submit Masuk (Primary CTA Neon) ─── */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isLoading} // Nonaktifkan tombol saat request berlangsung
              className="w-full h-14 px-6 rounded-full bg-brand-neon hover:opacity-95 text-black font-extrabold text-sm sm:text-base flex items-center justify-between transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                // Animasi Spinner Verifikasi Kredensial
                <div className="flex items-center justify-center gap-2.5 w-full">
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span className="font-bold">Memverifikasi Kredensial...</span>
                </div>
              ) : (
                // State Tombol Normal
                <>
                  <span className="font-extrabold text-sm sm:text-base text-gray-950 pl-2">
                    Masuk ke Akun
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </>
              )}
            </button>
          </div>

          {/* ─── 6. Pemisah Estetis "ATAU" ─── */}
          <div className="relative flex py-4 items-center">
            <div className="grow border-t border-gray-200" />
            <span className="shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
              ATAU
            </span>
            <div className="grow border-t border-gray-200" />
          </div>

          {/* ─── 7. Tautan Onboarding & Pendaftaran Baru ─── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs pt-1">
            {/* Tautan Daftar Akun Nasabah */}
            <div className="text-gray-600">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-bold text-gray-950 underline hover:text-black transition-colors"
              >
                Daftar Akun Nasabah Baru
              </Link>
            </div>
            
            {/* Tautan Daftar Unit Bank Sampah Baru */}
            <Link
              href="/admin/register"
              className="px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Daftarkan Unit Bank Sampah</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}
