import React from "react";
import Image from "next/image";
import { LayoutGrid, Scale, BarChart3 } from "lucide-react";

export default function AdminRegisterHero() {
  return (
    <section className="px-4 sm:px-6">
      <div className="max-w-7xl mx-auto mt-2 rounded-[28px] bg-dark-container overflow-hidden text-white border border-white/10 relative p-6 sm:p-8 md:p-12 shadow-2xl">
        {/* Twilight industrial sorting facility backdrop */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=2000&q=80"
            alt="Fasilitas Penimbangan dan Logistik Daur Ulang Modern"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-dark-container via-dark-container/95 to-dark-container/80" />
          <div className="absolute inset-0 bg-linear-to-t from-dark-container via-transparent to-dark-container/60" />
        </div>

        {/* Headline & Subtitle */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight">
            Daftarkan Unit Bank Sampah Anda
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl font-normal">
            Integrasikan fasilitas penimbangan warga, kelola master harga daur ulang
            mandiri, dan pantau rekapitulasi tonase lingkungan dalam satu sistem
            konsol terpadu.
          </p>
        </div>

        {/* Floating Hero Deck (3 docked cards) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          {/* Deck 1 */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/12 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Multi-Tenant Terisolasi
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Setiap unit memiliki database transaksi, katalog hadiah, dan
                nasabah tersendiri.
              </p>
            </div>
          </div>

          {/* Deck 2 */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/12 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Validasi Timbangan Real
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Akses penimbangan langsung dengan verifikasi status Menunggu -&gt;
                Selesai.
              </p>
            </div>
          </div>

          {/* Deck 3 */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/12 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Rekapitulasi Otomatis
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Laporan tonase per jenis sampah (kg/ton) dan estimasi perputaran
                rupiah per bulan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
