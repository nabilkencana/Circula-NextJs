import React from "react";
import Image from "next/image";
import { Building2, Users, CheckCircle2 } from "lucide-react";

export default function ProfilHero() {
  return (
    <section className="px-4 sm:px-6 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto rounded-[28px] bg-dark-container overflow-hidden text-white border border-white/10 relative p-6 sm:p-8 md:p-12 shadow-2xl">
        {/* Twilight industrial recycling backdrop */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=2000&q=80"
            alt="Fasilitas Penimbangan dan Gudang Logistik Daur Ulang Unit"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-20 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-dark-container via-dark-container/95 to-dark-container/80" />
          <div className="absolute inset-0 bg-linear-to-t from-dark-container via-transparent to-dark-container/60" />
        </div>

        {/* Content Layout */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight">
            Profil &amp; Pengaturan Unit Operasional
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl font-normal">
            Kelola informasi legalitas unit pengelola, identitas penanggung jawab,
            kontak layanan warga, dan parameter operasional penimbangan terintegrasi.
          </p>
        </div>

        {/* Bottom Floating Hero Deck (3 docked cards) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          {/* Deck 1: Identitas Unit Resmi */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/12 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Identitas Unit Resmi</span>
              </h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Terdaftar resmi di sistem sirkular dengan kode unik{" "}
                <span className="font-bold text-brand-neon">UNIT-04</span>.
              </p>
            </div>
          </div>

          {/* Deck 2: Penanggung Jawab */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/12 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Penanggung Jawab
              </h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Terverifikasi di bawah binaan Dinas Lingkungan Hidup &amp; Kelurahan Sukun.
              </p>
            </div>
          </div>

          {/* Deck 3: Status Operasional Aktif */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/12 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 relative group-hover:scale-105 transition-transform shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-brand-neon" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Status Operasional Aktif
              </h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Siap menerima setoran limbah terpilah dan pencairan reward tabungan warga.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
