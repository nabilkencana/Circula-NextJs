"use client";

import React from "react";
import {
  Building2,
  User,
  Phone,
  AtSign,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { RegisterAdminBankPayload } from "@/types/adminAuth";

interface UnitFieldGroupsProps {
  formData: RegisterAdminBankPayload;
  errors: Record<string, string>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onInputChange: (
    field: keyof RegisterAdminBankPayload,
    value: string | boolean
  ) => void;
  onToggleShowPassword: () => void;
  onToggleShowConfirmPassword: () => void;
}

export default function UnitFieldGroups({
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  onInputChange,
  onToggleShowPassword,
  onToggleShowConfirmPassword,
}: UnitFieldGroupsProps) {
  return (
    <div className="space-y-4">
      {/* Field 1: Nama Unit Bank Sampah */}
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
            type="text"
            id="namaUnit"
            name="namaUnit"
            value={formData.namaUnit}
            onChange={(e) => onInputChange("namaUnit", e.target.value)}
            placeholder="cth. Bank Sampah Asri Jaya RW 05 / Unit Hijau Telkom"
            className={`w-full pl-10 pr-3.5 py-3 bg-inset-gray border ${
              errors.namaUnit
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-dark-container focus:ring-dark-container"
            } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all`}
          />
        </div>
        {errors.namaUnit ? (
          <p className="text-xs text-red-600 mt-1 font-medium">
            {errors.namaUnit}
          </p>
        ) : (
          <p className="text-[11px] text-text-secondary mt-1">
            Nama resmi unit yang akan tercetak pada struk nota transaksi nasabah.
          </p>
        )}
      </div>

      {/* Row 2: Nama Lengkap Penanggung Jawab & WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nama Pengelola */}
        <div>
          <label
            htmlFor="namaPengelola"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Nama Lengkap Penanggung Jawab <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="namaPengelola"
              name="namaPengelola"
              value={formData.namaPengelola}
              onChange={(e) => onInputChange("namaPengelola", e.target.value)}
              placeholder="cth. Bapak H. Sukirman"
              className={`w-full pl-10 pr-3.5 py-3 bg-inset-gray border ${
                errors.namaPengelola
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-dark-container focus:ring-dark-container"
              } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all`}
            />
          </div>
          {errors.namaPengelola && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              {errors.namaPengelola}
            </p>
          )}
        </div>

        {/* WhatsApp Operasional with +62 Badge */}
        <div>
          <label
            htmlFor="telp"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Nomor Kontak<span className="text-red-500">*</span>
          </label>
          <div className="relative flex rounded-xl border border-gray-200 bg-inset-gray overflow-hidden focus-within:border-dark-container focus-within:ring-1 focus-within:ring-dark-container">
            <div className="flex items-center px-3 bg-gray-100 border-r border-gray-200 text-xs font-bold text-text-primary select-none gap-1">
              <Phone className="w-3.5 h-3.5 text-text-secondary" />
              <span>+62</span>
            </div>
            <input
              type="tel"
              id="telp"
              name="telp"
              value={formData.telp}
              onChange={(e) => onInputChange("telp", e.target.value)}
              placeholder="81234567890"
              className={`w-full px-3.5 py-3 text-sm text-text-primary placeholder:text-gray-400 focus:outline-none bg-transparent ${
                errors.telp ? "bg-red-50/20" : ""
              }`}
            />
          </div>
          {errors.telp && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              {errors.telp}
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Username & Kata Sandi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Username Akun Admin <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              <AtSign className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => onInputChange("username", e.target.value)}
              placeholder="cth. admin_asrijaya"
              autoCapitalize="none"
              className={`w-full pl-10 pr-3.5 py-3 bg-inset-gray border ${
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
              Digunakan untuk login ke konsol unit.
            </p>
          )}
        </div>

        {/* Kata Sandi */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
          >
            Kata Sandi Akun <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => onInputChange("password", e.target.value)}
              placeholder="Min. 6 karakter"
              className={`w-full pl-10 pr-10 py-3 bg-inset-gray border ${
                errors.password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-dark-container focus:ring-dark-container"
              } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all`}
            />
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
          {errors.password && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              {errors.password}
            </p>
          )}
        </div>
      </div>

      {/* Field 4: Konfirmasi Kata Sandi */}
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
            onChange={(e) => onInputChange("confirmPassword", e.target.value)}
            placeholder="Ketik ulang kata sandi"
            className={`w-full pl-10 pr-10 py-3 bg-inset-gray border ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-dark-container focus:ring-dark-container"
            } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all`}
          />
          <button
            type="button"
            onClick={onToggleShowConfirmPassword}
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
  );
}
