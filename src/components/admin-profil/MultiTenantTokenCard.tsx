/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Kartu Token Multi-Tenant (App Key) Admin Profil
 *
 * File: src/components/admin-profil/MultiTenantTokenCard.tsx
 * Deskripsi:
 * Menampilkan token identifikasi multi-tenant unit bank sampah (App Key) dengan
 * tombol aksi salin cepat ke clipboard, memberikan konfirmasi visual "Tersalin!",
 * serta catatan keamanan data isolasi multi-tenant terverifikasi.
 *
 * Standar Teknis UKK RPL:
 * - Format token dengan font monospaced dan pemilihan teks kontras.
 * - Tombol salin interaktif dengan state feedback visual (icon Check dan teks "Tersalin!").
 * - Catatan edukatif mengenai keterkaitan dengan Panitia Uji Kompetensi Keahlian.
 */

"use client";

import React from "react";
import { Key, Copy, Check } from "lucide-react";

/**
 * Properti komponen MultiTenantTokenCard.
 */
interface MultiTenantTokenCardProps {
  /** Nilai token App Key unit */
  appKey: string;
  /** Status apakah tombol salin baru saja ditekan */
  copied: boolean;
  /** Callback eksekusi penyalinan App Key */
  onCopy: () => void;
}

/**
 * Komponen kartu pratinjau token multi-tenant environment unit bank sampah.
 */
export default function MultiTenantTokenCard({
  appKey,
  copied,
  onCopy,
}: MultiTenantTokenCardProps) {
  return (
    <div className="bg-dark-widget rounded-2xl p-4 sm:p-4.5 border border-white/10 text-white mt-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-brand-neon/20 text-brand-neon flex items-center justify-center shrink-0">
          <Key className="w-3.5 h-3.5 text-brand-neon" />
        </div>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-neon">
          Multi-Tenant Environment Token
        </span>
      </div>

      {/* Token Box */}
      <div className="mt-2.5 flex items-center justify-between bg-black/40 px-3 py-2.5 rounded-xl border border-white/5 gap-2">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="text-[11px] text-gray-400 shrink-0 font-medium">App Key:</span>
          <code className="font-mono text-xs text-lime-300 truncate selection:bg-brand-neon selection:text-black">
            {appKey}
          </code>
        </div>

        <button
          type="button"
          onClick={onCopy}
          title="Salin App Key"
          className="relative p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
        >
          {copied ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-brand-neon">
              <Check className="w-3.5 h-3.5 text-brand-neon" />
              <span>Tersalin!</span>
            </span>
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Security Footnote */}
      <p className="text-[11px] text-gray-400 mt-2.5 leading-relaxed font-normal">
        Database unit terisolasi aman dan tersinkron langsung ke API Panitia Uji Kompetensi.
      </p>
    </div>
  );
}
