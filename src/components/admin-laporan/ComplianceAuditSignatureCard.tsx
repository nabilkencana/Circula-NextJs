/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Kartu Audit Kepatuhan & Tanda Tangan Digital Admin
 *
 * File: src/components/admin-laporan/ComplianceAuditSignatureCard.tsx
 * Deskripsi:
 * Menampilkan pengesahan audit dan kepatuhan standar internasional (ISO 14001:2015),
 * nama dinas tujuan pelaporan (Dinas Lingkungan Hidup), serta validasi tanda tangan
 * digital pejabat penanggung jawab unit operasional bank sampah.
 *
 * Standar Teknis UKK RPL:
 * - Badge verifikasi digital signature untuk keabsahan hukum pelaporan lingkungan.
 * - Tata letak dua sisi (informasi standar audit di kiri, tanda tangan verifikasi di kanan).
 * - Aksesibilitas visual dengan badge centang hijau terotorisasi.
 */

import React from "react";
import { ShieldCheck, Check } from "lucide-react";
import { RekapitulasiBulananResponse } from "@/types/adminLaporan";

/**
 * Properti komponen ComplianceAuditSignatureCard.
 */
interface ComplianceAuditSignatureCardProps {
  /** Objek informasi kepatuhan audit dan tanda tangan */
  compliance: RekapitulasiBulananResponse["compliance"];
}

/**
 * Komponen kartu pengesahan kepatuhan audit dan tanda tangan digital penanggung jawab.
 */
export default function ComplianceAuditSignatureCard({
  compliance,
}: ComplianceAuditSignatureCardProps) {
  return (
    <div className="bg-inset-gray border border-gray-200 rounded-2xl p-5 sm:p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
      {/* Left Side: Audit Standard Details */}
      <div className="flex items-start gap-4 max-w-2xl">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-text-primary">
            Audit Kepatuhan &amp; Keterlacakan Data
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Data rekapitulasi tersinkronisasi otomatis dengan {compliance.isoStandard} dan siap
            diserahkan ke {compliance.dinasTujuan}.
          </p>
        </div>
      </div>

      {/* Right Side: Digital Signature Sign-Off */}
      <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3.5 flex items-center gap-4 shadow-2xs self-stretch md:self-auto shrink-0">
        <div>
          <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Disetujui secara digital oleh:
          </span>
          <div className="font-bold text-xs sm:text-sm text-text-primary mt-0.5">
            {compliance.penanggungJawab}
          </div>
          <div className="text-[11px] text-gray-500">
            Penanggung Jawab Bank Sampah Asri Jaya
          </div>
        </div>

        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 ring-2 ring-brand-neon/60 shadow-xs">
          <Check className="w-4 h-4 stroke-3" />
        </div>
      </div>
    </div>
  );
}
