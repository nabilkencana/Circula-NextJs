import React from "react";
import Link from "next/link";
import { Leaf, ChevronRight, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          {/* Col 1: Brand & Identity */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-neon flex items-center justify-center">
                <Leaf className="w-4 h-4 text-dark-container fill-dark-container" />
              </div>
              <span className="font-extrabold text-base tracking-[0.16em] text-text-primary">
                CIRCULA
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
              Aplikasi Pengelolaan Bank Sampah Digital & Daur Ulang Multi-Tenant (UKK RPL Paket A
              Tahun Ajaran 2026/2027, SMK Telkom Malang).
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-inset-gray border border-gray-200 text-[11px] font-semibold text-text-primary">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>ISO 14001 Environmental System</span>
            </div>
          </div>

          {/* Col 2: Navigasi Nasabah */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">
              Navigasi Nasabah
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
              <li>
                <Link
                  href="/kategori-sampah"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  Katalog Sampah Daur Ulang
                </Link>
              </li>
              <li>
                <Link
                  href="/setor-sampah"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  Ajukan Penyetoran Sampah
                </Link>
              </li>
              <li>
                <Link
                  href="/tracking"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  Status & Tracking Penyetoran
                </Link>
              </li>
              <li>
                <Link
                  href="/tukar-poin"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  Katalog Hadiah & Tukar Poin
                </Link>
              </li>
              <li>
                <Link
                  href="/nota"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  Cetak Nota & Bukti Transaksi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Konsol Admin Unit */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">
              Konsol Admin Unit
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
              <li>
                <Link
                  href="/admin/register"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  Registrasi Unit Bank Sampah
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  Login Admin Unit
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/nasabah"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  Buku Induk & CRUD Nasabah
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/laporan"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  Rekapitulasi Tonase Bulanan
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/kategori"
                  className="hover:text-text-primary transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                  Kelola Harga & Master Kategori
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <p>© 2026 Circula Eco-Waste System. Seluruh hak cipta dilindungi.</p>
          <p className="flex items-center gap-2">
            <span>SMK Telkom Malang</span>
            <span>•</span>
            <span>UKK Paket A 2026/2027</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
