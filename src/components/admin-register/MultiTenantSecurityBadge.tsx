/**
 * @file MultiTenantSecurityBadge.tsx
 * @description Komponen badge informatif penjamin keamanan arsitektur Multi-Tenant Bank Sampah Digital.
 * Memberikan kepastian kepada pengelola unit baru bahwa data nasabah, katalog harga, dan transaksi
 * unit mereka terisolasi secara aman dan independen berkat pemisahan tenant key di level backend.
 *
 * @author Tim Pengembang Circula
 * @version 1.0.0
 */

import React from "react";
import { Zap } from "lucide-react";

/**
 * Komponen MultiTenantSecurityBadge
 * 
 * Merender kotak informasi mini bertema gelap (dark widget) dengan ikon petir neon,
 * menjelaskan keunggulan sistem keamanan isolasi data independen untuk setiap unit bank sampah.
 */
export default function MultiTenantSecurityBadge() {
  return (
    <div className="bg-dark-widget rounded-2xl p-4 border border-white/12 mt-6">
      {/* Baris Judul Badge Keamanan */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-brand-neon/20 text-brand-neon flex items-center justify-center shrink-0">
          <Zap className="w-3.5 h-3.5 fill-brand-neon" />
        </div>
        <h4 className="text-xs font-bold text-brand-neon tracking-wide">
          Multi-Tenant Security
        </h4>
      </div>

      {/* Deskripsi Isolasi Data Independen */}
      <p className="text-xs text-gray-300 mt-1.5 leading-relaxed pl-7">
        Unit Anda langsung terdaftar dengan isolasi data independen yang terlindungi protokol keamanan modern.
      </p>
    </div>
  );
}
