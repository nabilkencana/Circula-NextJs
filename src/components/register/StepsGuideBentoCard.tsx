import React from "react";
import { UserCheck, CalendarCheck, Coins } from "lucide-react";

export default function StepsGuideBentoCard() {
  const steps = [
    {
      number: "01",
      icon: UserCheck,
      title: "Buka Rekening Digital",
      desc: "Daftar online gratis dalam 2 menit dan dapatkan nomor buku tabungan bank sampah Anda seketika.",
    },
    {
      number: "02",
      icon: CalendarCheck,
      title: "Pilah & Jadwalkan Setor",
      desc: "Pisahkan material anorganik (Plastik, Kertas, Logam) dan buat tiket pengajuan penimbangan.",
    },
    {
      number: "03",
      icon: Coins,
      title: "Timbang & Cairkan Poin",
      desc: "Bawa ke unit penimbangan resmi, timbang akurat, dan konversi poin menjadi saldo e-wallet rupiah.",
    },
  ];

  return (
    <div className="bg-dark-container rounded-3xl p-6 sm:p-7 border border-white/10 text-white shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
        <h3 className="text-base font-bold text-white tracking-tight">
          3 Langkah Mudah Menabung Sampah
        </h3>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-neon/20 text-brand-neon border border-brand-neon/30">
          Alur 3R
        </span>
      </div>

      <div className="space-y-3.5">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="bg-dark-widget rounded-2xl p-4 border border-white/10 hover:border-brand-neon/40 transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                {step.number}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-neon transition-colors">
                    {step.title}
                  </h4>
                  <Icon className="w-3.5 h-3.5 text-brand-neon/70 ml-auto shrink-0" />
                </div>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
