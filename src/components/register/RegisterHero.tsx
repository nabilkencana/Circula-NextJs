import React from "react";
import Image from "next/image";
import { Users, ShieldCheck, TrendingUp } from "lucide-react";

export default function RegisterHero() {
  return (
    <section className="px-4 sm:px-6 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto rounded-[28px] bg-dark-container overflow-hidden text-white relative border border-white/10 shadow-2xl p-6 sm:p-10 md:p-12">
        {/* Background urban circular economy photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80"
            alt="Komunitas Daur Ulang dan Sirkular Berkelanjutan"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-20 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-dark-container via-dark-container/95 to-dark-container/80" />
          <div className="absolute inset-0 bg-linear-to-t from-dark-container via-transparent to-dark-container/60" />
        </div>

        {/* Content Container (No eyebrow badge, direct bold H1) */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight">
            Ubah Sampah Terpilah Menjadi Nilai Nyata
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl font-normal">
            Bergabung bersama 12.000+ nasabah aktif di Malang Raya. Buka rekening tabungan
            sampah digital Anda dalam 2 menit tanpa biaya admin.
          </p>
        </div>

        {/* Floating Hero Deck (3 docked cards / social proof) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-6 border-t border-white/10">
          {/* Deck 1: Avatar Stack & Nasabah Count */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">12.400+</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-neon/20 text-brand-neon">
                  Aktif
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Nasabah terdaftar aktif di jaringan bank sampah Circula.
              </p>
            </div>
          </div>

          {/* Deck 2: DLH Verification */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                100% Terverifikasi DLH
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Kemitraan resmi Dinas Lingkungan Hidup standar 3R nasional.
              </p>
            </div>
          </div>

          {/* Deck 3: Live Rate Valuation */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Hingga Rp 75.000/kg
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Valuasi rate harga material transparan dan update harian.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
