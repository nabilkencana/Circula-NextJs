"use client";

import React from "react";
import Link from "next/link";
import { Leaf, Building2 } from "lucide-react";

interface RegisterRoleSegmentSwitcherProps {
  activeRole: "nasabah" | "admin";
}

export default function RegisterRoleSegmentSwitcher({
  activeRole,
}: RegisterRoleSegmentSwitcherProps) {
  const isNasabah = activeRole === "nasabah";

  return (
    <div className="space-y-4 mb-6">
      {/* Segment Switcher Bar */}
      <div className="w-full bg-[#F4F5F4] p-1.5 rounded-full flex items-center border border-gray-200/80 shadow-inner">
        {/* Tab A: Daftar sebagai Nasabah */}
        <Link
          href="/register"
          className={`flex-1 py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
            isNasabah
              ? "bg-dark-container text-white shadow-sm"
              : "text-text-secondary hover:text-text-primary hover:bg-white/60"
          }`}
          aria-current={isNasabah ? "page" : undefined}
        >
          <Leaf
            className={`w-4 h-4 shrink-0 ${
              isNasabah ? "text-brand-neon" : "text-text-secondary"
            }`}
          />
          <span>Daftar sebagai Nasabah</span>
        </Link>

        {/* Tab B: Daftar sebagai Admin Unit */}
        <Link
          href="/admin/register"
          className={`flex-1 py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
            !isNasabah
              ? "bg-dark-container text-white shadow-sm"
              : "text-text-secondary hover:text-text-primary hover:bg-white/60"
          }`}
          aria-current={!isNasabah ? "page" : undefined}
        >
          <Building2
            className={`w-4 h-4 shrink-0 ${
              !isNasabah ? "text-brand-neon" : "text-text-secondary"
            }`}
          />
          <span>Daftar sebagai Admin Unit</span>
        </Link>
      </div>

      {/* Role Context Callout */}
      <div className="bg-inset-gray border border-gray-200 rounded-2xl p-4 flex items-start gap-3.5 transition-all">
        <div className="w-8 h-8 rounded-xl bg-brand-neon/25 text-dark-container flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          {isNasabah ? (
            <Leaf className="w-4 h-4 text-dark-container fill-dark-container" />
          ) : (
            <Building2 className="w-4 h-4 text-dark-container" />
          )}
        </div>

        <p className="text-xs sm:text-[13px] text-text-primary leading-relaxed">
          <strong className="font-bold">
            {isNasabah ? "Registrasi Akun Nasabah: " : "Registrasi Unit Bank Sampah: "}
          </strong>
          <span className="text-text-secondary">
            {isNasabah
              ? "Daftar gratis sebagai nasabah untuk menabung sampah terpilah, pantau timbangan presisi, dan dapatkan poin reward yang dapat dicairkan."
              : "Daftarkan operasional unit resmi untuk mengelola nasabah lingkungan, validasi penimbangan sampah lapangan, dan sinkronisasi laporan tonase DLH."}
          </span>
        </p>
      </div>
    </div>
  );
}
