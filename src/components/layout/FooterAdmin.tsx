import React from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function FooterAdmin() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          {/* Col 1: Brand & Narasi */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-neon flex items-center justify-center shadow-xs">
                <Leaf className="w-4 h-4 text-dark-container fill-dark-container" />
              </div>
              <span className="font-extrabold text-base tracking-wider text-text-primary uppercase leading-none">
                CIRCULA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Infrastruktur digital bank sampah multi-tenant untuk ekonomi sirkular Indonesia yang
              terukur dan akuntabel.
            </p>
          </div>

          {/* Col 2: Modul Operasional */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
              MODUL OPERASIONAL
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
              <li>
                <Link
                  href="/admin/nasabah"
                  className="hover:text-text-primary transition-colors block"
                >
                  Buku Induk Nasabah
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/transaksi"
                  className="hover:text-text-primary transition-colors block"
                >
                  Timbangan & Transaksi
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/laporan"
                  className="hover:text-text-primary transition-colors block"
                >
                  Logistik Pengepul
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Keamanan & Kepatuhan */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
              KEAMANAN & KEPATUHAN
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
              <li>
                <span className="cursor-default hover:text-text-primary transition-colors">
                  Multi-Tenant Vault
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-text-primary transition-colors">
                  Audit Trail Aktivitas
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-text-primary transition-colors">
                  Kebijakan Privasi Nasabah
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Dukungan Sistem */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
              DUKUNGAN SISTEM
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
              <p className="text-xs">
                Unit Operasional:{" "}
                <span className="font-semibold text-text-primary">
                  BS Asri Jaya (ID #JKT-042)
                </span>
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-inset-gray border border-gray-200 text-xs font-medium text-text-primary">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]" />
                <span>API v1 Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Node Tag */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <p>© 2026 Circula Digital Circular Platform. Seluruh hak cipta dilindungi.</p>
          <span className="font-mono text-xs text-gray-400">
            Node: prod-sea-app-09
          </span>
        </div>
      </div>
    </footer>
  );
}
