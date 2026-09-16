import React from "react";
import Image from "next/image";
import { CheckCircle2, Printer, Database } from "lucide-react";

export default function NotaHero() {
  return (
    <section className="px-4 sm:px-6 pt-4 sm:pt-6 print:hidden">
      <div className="max-w-7xl mx-auto rounded-3xl bg-dark-container overflow-hidden text-white relative border border-white/10 shadow-2xl p-6 sm:p-10 md:p-12">
        {/* Background sorting & verification line photography overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80"
            alt="Pusat Verifikasi Digital dan Tera Timbangan Circula"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-dark-container via-dark-container/95 to-dark-container/80" />
          <div className="absolute inset-0 bg-linear-to-t from-dark-container via-transparent to-dark-container/60" />
        </div>

        {/* Content - Clean Headline without eyebrow */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight">
            Bukti Transaksi &amp; Struk Nota Digital
          </h1>

          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-3xl font-normal">
            Dokumen digital terverifikasi yang mencatat keabsahan penimbangan tonase sampah atau
            penukaran poin reward pada unit operasional Circula.
          </p>
        </div>

        {/* Floating Hero Deck (3 docked status cards) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
          {/* Deck 1 */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Keabsahan Digital
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Dilengkapi kode verifikasi unik dan QR-Code tera metrologi resmi.
              </p>
            </div>
          </div>

          {/* Deck 2 */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Siap Cetak &amp; PDF
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Format standar thermal printer 80mm maupun lembar A4 formal.
              </p>
            </div>
          </div>

          {/* Deck 3 */}
          <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/10 backdrop-blur-sm flex items-start gap-3.5 hover:border-brand-neon/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Arsip Tersinkronisasi
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Terhubung otomatis dengan riwayat akun dan pelaporan bulanan unit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
