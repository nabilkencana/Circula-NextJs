"use client";

import React from "react";
import { Check } from "lucide-react";

interface TermsComplianceCheckboxProps {
  checked: boolean;
  error?: string;
  onToggle: () => void;
}

export default function TermsComplianceCheckbox({
  checked,
  error,
  onToggle,
}: TermsComplianceCheckboxProps) {
  return (
    <div className="pt-2">
      <div
        onClick={onToggle}
        className="flex items-start gap-3 cursor-pointer group select-none"
      >
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

        <label className="text-xs text-text-secondary leading-relaxed cursor-pointer">
          Saya menyetujui{" "}
          <span className="text-text-primary font-semibold hover:underline">
            Syarat &amp; Ketentuan Layanan
          </span>{" "}
          Bank Sampah Digital Circula serta tunduk pada{" "}
          <span className="text-text-primary font-semibold hover:underline">
            Kebijakan Privasi Perlindungan Data Nasabah
          </span>
          .
        </label>
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-1.5 font-medium pl-8" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
