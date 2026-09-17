import React from "react";
import Link from "next/link";
import { Leaf, Check } from "lucide-react";

export default function FooterAdmin() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-12 pb-8 mt-auto print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 text-sm">
          {/* Col 1: Brand & Narasi */}
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-neon flex items-center justify-center shadow-xs shrink-0">
                <Leaf className="w-4 h-4 text-dark-container fill-dark-container" />
              </div>
              <span className="font-extrabold text-sm tracking-wider text-text-primary uppercase leading-none">
                CIRCULA PLATFORM
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Infrastruktur digital bank sampah multi-tenant untuk ekonomi sirkular Indonesia yang
              terukur, akuntabel, dan transparan.
            </p>
          </div>

          {/* Col 2: Modul Operasional */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3.5">
              MODUL OPERASIONAL
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
              <li>
                <Link
                  href="/admin/transaksi"
                  className="hover:text-text-primary transition-colors block"
                >
                  Penimbangan &amp; Klasifikasi
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/nasabah"
                  className="hover:text-text-primary transition-colors block"
                >
                  Buku Tabungan Nasabah
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/hadiah"
                  className="hover:text-text-primary transition-colors block"
                >
                  Penebusan Voucher Sembako
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/laporan"
                  className="hover:text-text-primary transition-colors block"
                >
                  Penjualan ke Pengepul / Mitra
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Keamanan & Kepatuhan */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3.5">
              KEAMANAN &amp; KEPATUHAN
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Standar ISO 14001:2015</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Regulasi Permen LHK RI</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Enkripsi Data Transaksi 256-bit</span>
              </li>
              <li className="pt-0.5">
                <span className="cursor-default hover:text-text-primary transition-colors block">
                  Kebijakan Privasi Unit
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Footer Links */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <p>© 2026 Circula Environmental Technologies. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-5">
            <span className="cursor-pointer hover:text-text-primary transition-colors">
              Dokumentasi API
            </span>
            <span className="cursor-pointer hover:text-text-primary transition-colors">
              Bantuan Teknis
            </span>
            <span className="cursor-pointer hover:text-text-primary transition-colors">
              Status Server
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
