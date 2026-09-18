/**
 * @file BottomAdminRegisterRibbon.tsx
 * @description Komponen pita informasi keamanan (reassurance banner) di bagian bawah halaman registrasi unit admin.
 * Menegaskan garansi enkripsi data pendaftaran operasional unit bank sampah,
 * serta menyediakan tautan langsung (Call to Action) bagi pengelola yang telah memiliki akun
 * untuk segera beralih ke halaman login konsol admin.
 *
 * @author Tim Pengembang Circula
 * @version 1.0.0
 */

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

/**
 * Komponen BottomAdminRegisterRibbon
 * 
 * Merender container gelap membulat (rounded-3xl) dengan border semi-transparan,
 * ikon perisai verifikasi data, dan tombol tautan cepat ke rute `/admin/login`.
 */
export default function BottomAdminRegisterRibbon() {
  return (
    <section className="px-4 sm:px-6 my-8">
      <div className="max-w-7xl mx-auto rounded-3xl bg-dark-container p-5 sm:p-6 text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Kolom Kiri: Notifikasi Perlindungan & Enkripsi Data */}
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-brand-neon" />
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
            Seluruh data pendaftaran unit operasional terenkripsi aman dan diproses
            secara otomatis sesuai standar tata kelola Circula.
          </p>
        </div>

        {/* Kolom Kanan: Tautan Aksi Cepat ke Login Admin */}
        <Link
          href="/admin/login"
          className="text-xs sm:text-sm font-bold text-brand-neon hover:text-brand-neon-hover flex items-center gap-1.5 shrink-0 transition-colors group"
        >
          <span>Masuk ke Halaman Login Admin</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
