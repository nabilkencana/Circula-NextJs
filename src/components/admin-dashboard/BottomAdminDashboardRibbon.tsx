"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

interface BottomAdminDashboardRibbonProps {
  unitNama?: string;
  onNavigateProfil?: () => void;
}

export default function BottomAdminDashboardRibbon({
  unitNama = "Bank Sampah Asri Jaya",
  onNavigateProfil,
}: BottomAdminDashboardRibbonProps) {
  return (
    <div className="bg-dark-container text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border border-white/10 shadow-sm">
      {/* Left Message */}
      <div className="flex items-center gap-3.5 text-xs sm:text-sm">
        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand-neon">
          <ShieldCheck className="w-5 h-5 text-brand-neon" />
        </div>
        <p className="text-gray-300 leading-relaxed">
          Dashboard operasional terhubung langsung ke basis data unit{" "}
          <strong className="text-white font-bold">{unitNama}</strong> via enkripsi kunci tenant{" "}
          <code className="font-mono text-brand-neon bg-brand-neon/10 px-1.5 py-0.5 rounded text-xs">
            x-app-key
          </code>
          .
        </p>
      </div>

      {/* Right Link */}
      <Link
        href="/admin/profil"
        onClick={(e) => {
          if (onNavigateProfil) {
            e.preventDefault();
            onNavigateProfil();
          }
        }}
        className="text-brand-neon hover:text-brand-neon-hover text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap transition-colors group shrink-0"
      >
        <span>Buka Pengaturan Profil Unit</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
