import React from "react";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export default function OnboardingRedirectLinks() {
  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="relative flex items-center justify-center mb-5">
        <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold px-3 bg-white">
          atau buat akun baru
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs font-bold text-text-primary">
        <Link
          href="/register"
          className="hover:underline flex items-center gap-1.5 transition-colors py-1 group"
        >
          <span>Daftar Akun Nasabah</span>
          <ArrowRight className="w-3.5 h-3.5 text-text-primary group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <span className="hidden sm:inline text-gray-300">•</span>

        <Link
          href="/admin/register"
          className="hover:underline flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors py-1 group"
        >
          <Building2 className="w-3.5 h-3.5 text-text-secondary group-hover:text-text-primary transition-colors" />
          <span>Registrasi Unit Bank Sampah</span>
        </Link>
      </div>
    </div>
  );
}
