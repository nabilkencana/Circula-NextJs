"use client";

import React from "react";
import Link from "next/link";
import { Leaf, Store } from "lucide-react";

interface RegisterRoleSegmentSwitcherProps {
  activeRole: "nasabah" | "admin";
}

export default function RegisterRoleSegmentSwitcher({
  activeRole,
}: RegisterRoleSegmentSwitcherProps) {
  const isNasabah = activeRole === "nasabah";

  return (
    <div className="bg-[#F3F4F6] p-1.5 rounded-full inline-flex items-center gap-1 self-start mb-6">
      {/* Tab Nasabah */}
      <Link
        href="/register"
        className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
          isNasabah
            ? "bg-[#111315] text-white shadow-xs"
            : "text-gray-600 hover:text-gray-900"
        }`}
        aria-current={isNasabah ? "page" : undefined}
      >
        <Leaf
          className={`w-3.5 h-3.5 transition-colors ${
            isNasabah ? "text-brand-neon" : "text-gray-400"
          }`}
        />
        <span>Daftar sebagai Nasabah</span>
      </Link>

      {/* Tab Admin / Petugas Loket Unit */}
      <Link
        href="/admin/register"
        className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
          !isNasabah
            ? "bg-[#111315] text-white shadow-xs"
            : "text-gray-600 hover:text-gray-900"
        }`}
        aria-current={!isNasabah ? "page" : undefined}
      >
        <Store
          className={`w-3.5 h-3.5 transition-colors ${
            !isNasabah ? "text-brand-neon" : "text-gray-400"
          }`}
        />
        <span>Daftarkan Unit Bank Sampah</span>
      </Link>
    </div>
  );
}
