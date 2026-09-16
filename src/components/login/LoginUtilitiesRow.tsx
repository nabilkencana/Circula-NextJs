"use client";

import React from "react";
import { Check } from "lucide-react";

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
      {/* Remember Me Checkbox */}
      <div
        onClick={onRememberMeToggle}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div
          role="checkbox"
          aria-checked={rememberMe}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onRememberMeToggle();
            }
          }}
          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
            rememberMe
              ? "bg-dark-container border-dark-container text-brand-neon"
              : "border-gray-300 bg-white group-hover:border-gray-500"
          }`}
        >
          {rememberMe && <Check className="w-3 h-3 stroke-3" />}
        </div>
        <span className="text-xs font-semibold text-text-primary">
          Ingat sesi masuk di perangkat ini
        </span>
      </div>

      {/* Forgot Password Trigger */}
      <button
        type="button"
        onClick={() => {
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
