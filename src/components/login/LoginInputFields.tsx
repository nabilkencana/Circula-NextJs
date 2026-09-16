"use client";

import React from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { AuthRole } from "@/types/auth";

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
  const usernamePlaceholder =
    role === "NASABAH"
      ? "cth. nasabah_budi atau budi.santoso"
      : "cth. admin_banksampah atau admin_asrijaya";

  return (
    <div className="space-y-4">
      {/* Field 1: Username */}
      <div>
        <label
          htmlFor="username"
          className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
        >
          Username / ID Pengguna <span className="text-red-500">*</span>
        </label>
        <div className="relative">
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
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-dark-container focus:ring-dark-container"
            } rounded-xl text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all`}
          />
        </div>
        {errors.username && (
          <p className="text-xs text-red-600 mt-1 font-medium">
            {errors.username}
          </p>
        )}
      </div>

      {/* Field 2: Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5"
        >
          Kata Sandi <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
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
  );
}
