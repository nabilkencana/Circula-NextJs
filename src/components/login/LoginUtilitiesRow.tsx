/**
 * @file LoginUtilitiesRow.tsx
 * @description Komponen baris utilitas formulir masuk (Login Utilities Row).
 * Memuat fitur:
 * 1. Kotak centang "Ingat sesi masuk di perangkat ini" (Remember Me persistence).
 * 2. Tautan bantuan "Lupa kata sandi?" untuk pengarahan pemulihan kredensial.
 * 
 * Peran dalam UKK:
 * - Menunjukkan penanganan UX kenyamanan pengguna (Session Retention).
 * - Menerapkan aksesibilitas keyboard (`tabIndex={0}`, event 'Space' dan 'Enter') pada custom checkbox.
 */

"use client"; // Komponen interaktif di sisi klien

import React from "react";
import { Check } from "lucide-react"; // Ikon centang Lucide React

/**
 * Interface props untuk LoginUtilitiesRow
 * @property rememberMe - Status boolean apakah opsi ingat sesi sedang aktif
 * @property onRememberMeToggle - Callback fungsi saat checkbox diklik atau ditekan melalui keyboard
 */
interface LoginUtilitiesRowProps {
  rememberMe: boolean;
  onRememberMeToggle: () => void;
}

export default function LoginUtilitiesRow({
  rememberMe,
  onRememberMeToggle,
}: LoginUtilitiesRowProps) {
  return (
    <div className="mt-4 flex items-center justify-between select-none">
      
      {/* ─── 1. Checkbox Ingat Sesi Masuk (Remember Me) ─── */}
      <div
        onClick={onRememberMeToggle}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div
          role="checkbox"
          aria-checked={rememberMe} // Status keterpilihan untuk aksesibilitas
          tabIndex={0} // Memungkinkan fokus tombol tab
          onKeyDown={(e) => {
            // Kontrol keyboard Spasi atau Enter
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onRememberMeToggle();
            }
          }}
          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
            rememberMe
              ? "bg-dark-container border-dark-container text-brand-neon" // Warna gelap saat dicentang
              : "border-gray-300 bg-white group-hover:border-gray-500" // Warna putih saat tidak aktif
          }`}
        >
          {rememberMe && <Check className="w-3 h-3 stroke-3" />}
        </div>
        <span className="text-xs font-semibold text-text-primary">
          Ingat sesi masuk di perangkat ini
        </span>
      </div>

      {/* ─── 2. Tombol Bantuan Pemulihan Kata Sandi (Forgot Password) ─── */}
      <button
        type="button"
        onClick={() => {
          // Dialog peringatan panduan pemulihan kata sandi melalui unit bank sampah binaan
          alert(
            "Untuk pemulihan kata sandi, silakan hubungi petugas unit bank sampah atau helpdesk Circula."
          );
        }}
        className="text-xs font-semibold text-gray-500 hover:text-text-primary transition-colors cursor-pointer hover:underline"
      >
        Lupa kata sandi?
      </button>

    </div>
  );
}
