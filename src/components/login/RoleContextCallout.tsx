import React from "react";
import { Leaf, Building2 } from "lucide-react";
import { AuthRole } from "@/types/auth";

interface RoleContextCalloutProps {
  role: AuthRole;
}

export default function RoleContextCallout({ role }: RoleContextCalloutProps) {
  const isNasabah = role === "NASABAH";

  return (
    <div className="bg-inset-gray border border-gray-200 rounded-2xl p-4 mb-6 flex items-start gap-3.5 transition-all">
      <div className="w-8 h-8 rounded-xl bg-brand-neon/25 text-dark-container flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
        {isNasabah ? (
          <Leaf className="w-4 h-4 text-dark-container fill-dark-container" />
        ) : (
          <Building2 className="w-4 h-4 text-dark-container" />
        )}
      </div>

      <p className="text-xs sm:text-[13px] text-text-primary leading-relaxed">
        <strong className="font-bold">
          {isNasabah ? "Portal Nasabah: " : "Konsol Admin Unit: "}
        </strong>
        <span className="text-text-secondary">
          {isNasabah
            ? "Masuk menggunakan username dan password Anda untuk cek saldo poin, riwayat transaksi, dan katalog voucher."
            : "Masuk untuk verifikasi timbangan lapangan, perbarui status pengajuan, dan cetak rekapitulasi bulanan."}
        </span>
      </p>
    </div>
  );
}
