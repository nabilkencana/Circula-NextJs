import React from "react";
import Link from "next/link";
import { Leaf, ChevronRight, ShieldCheck, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-neon flex items-center justify-center shadow-xs">
                <Leaf className="w-4 h-4 text-dark-container fill-dark-container" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-[0.16em] text-text-primary leading-none">
                  CIRCULA
                </span>
                <span className="text-[8px] font-bold tracking-wider text-text-secondary uppercase mt-0.5">
                  Bank Sampah Digital
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Aplikasi Pengelolaan Bank Sampah Digital & Daur Ulang Multi-Tenant (UKK RPL Paket A
              Tahun Ajaran 2026/2027, SMK Telkom Malang).
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-inset-gray border border-gray-200 text-[11px] font-semibold text-text-primary w-fit">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ISO 14001 Environmental System</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigasi Nasabah */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4 flex items-center gap-2">
              Navigasi Nasabah
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
              <li>
                <Link
                  href="/kategori-sampah"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Katalog Sampah Daur Ulang
                </Link>
              </li>
              <li>
                <Link
                  href="/setor/ajukan"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Ajukan Penyetoran Sampah
                </Link>
              </li>
              <li>
                <Link
                  href="/histori"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Status & Histori Penyetoran
                </Link>
              </li>
              <li>
                <Link
                  href="/tukar-poin"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Katalog Hadiah & Tukar Poin
                </Link>
              </li>
              <li>
                <Link
                  href="/nota/STR-8821"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Struk Nota Digital (Contoh)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Konsol & Kemitraan */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4 flex items-center gap-2">
              Konsol & Kemitraan
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
              <li>
                <Link
                  href="/admin/register"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Registrasi Unit Bank Sampah
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Portal Login Multi-Role
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Daftar Akun Nasabah Baru
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Konsol Operasional Unit DLH
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Edukasi & Panduan */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4 flex items-center gap-2">
              Edukasi & Bantuan
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
              <li>
                <Link
                  href="/#alur-setor"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Alur 4 Langkah Setor Sampah
                </Link>
              </li>
              <li>
                <Link
                  href="/#katalog-sampah"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Panduan Klasifikasi 3R
                </Link>
              </li>
              <li>
                <Link
                  href="/#unit-resmi"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Jaringan Unit Resmi Kota
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori-sampah"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  Indeks Fluktuasi Harga Pasar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <p>© 2026 Circula Eco-Waste System. Seluruh hak cipta dilindungi.</p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
          </div>
        </div>
      </div>
    </footer>
  );
}
