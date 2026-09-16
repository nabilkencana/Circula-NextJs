import React from "react";
import { Users, Settings2, Gift, Printer } from "lucide-react";
import MultiTenantSecurityBadge from "./MultiTenantSecurityBadge";

export default function AdminFeaturesBentoCard() {
  const features = [
    {
      icon: Users,
      title: "Manajemen Data Nasabah",
      desc: "Input nasabah baru secara manual atau setujui pendaftaran mandiri warga sekitar.",
    },
    {
      icon: Settings2,
      title: "Kustomisasi Master Kategori",
      desc: "Tentukan harga beli sampah (Rp/kg) dan multiplier reward poin sesuai kas unit.",
    },
    {
      icon: Gift,
      title: "Kelola Katalog Hadiah",
      desc: "Atur stok sembako, voucher belanja, dan hadiah lokal yang dapat ditukar nasabah.",
    },
    {
      icon: Printer,
      title: "Cetak Nota & Rekap Bulanan",
      desc: "Cetak nota timbangan dan ekspor rekap total tonase bulanan untuk laporan dinas/kelurahan.",
    },
  ];

  return (
    <div className="bg-dark-container rounded-3xl p-6 sm:p-8 text-white border border-white/10 shadow-xl">
      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-6">
        Fitur Lengkap Konsol Admin
      </h3>

      <div className="space-y-4">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-dark-widget/70 rounded-2xl p-4 border border-white/10 hover:border-brand-neon/40 transition-all flex items-start gap-3.5 group"
            >
              <div className="w-8 h-8 rounded-full bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4 text-brand-neon" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-neon transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Docked Multi-Tenant Security Badge */}
      <MultiTenantSecurityBadge />
    </div>
  );
}
