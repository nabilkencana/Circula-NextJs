import React from "react";
import Link from "next/link";
import { Compass, ChevronRight } from "lucide-react";

export default function AksesCepatPengelolaanCard() {
  const links = [
    {
      title: "Kelola Master Kategori Sampah Unit",
      href: "/kategori-sampah",
      badge: "Katalog",
    },
    {
      title: "Perbarui Katalog Hadiah & Stok",
      href: "/tukar-poin",
      badge: "Reward",
    },
    {
      title: "Lihat Rekapitulasi Tonase Bulanan",
      href: "/histori",
      badge: "Laporan",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-xl bg-inset-gray border border-gray-200 text-dark-container flex items-center justify-center shrink-0">
          <Compass className="w-4 h-4 text-dark-container" />
        </div>
        <h3 className="text-sm font-bold text-text-primary tracking-tight">
          Akses Cepat Pengelolaan
        </h3>
      </div>

      {/* Links List */}
      <div className="space-y-2">
        {links.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-inset-gray border border-transparent hover:border-gray-200 transition-all text-xs font-semibold text-text-primary group"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-neon-hover group-hover:scale-125 transition-transform" />
              <span>{item.title}</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {item.badge}
              </span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
