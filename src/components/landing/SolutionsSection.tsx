import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function SolutionsSection() {
  return (
    <section id="unit-resmi" className="px-4 sm:px-6 my-10 max-w-7xl mx-auto">
      <div className="rounded-[28px] bg-dark-container p-6 sm:p-10 md:p-14 text-white border border-white/10 relative overflow-hidden shadow-2xl">
        {/* Ambient glow accent */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Box */}
          <div className="lg:col-span-6 flex flex-col">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Solusi Cerdas untuk Unit & Pengelola Sampah
            </h2>

            <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              Satu ekosistem terpadu yang memfasilitasi warga penyetor (Nasabah) dan pengurus
              loket operasional (Admin Unit) dengan sistem isolasi data per siswa melalui header
              resmi <code className="bg-dark-widget text-brand-neon px-2 py-0.5 rounded text-xs font-mono">x-app-key</code>.
            </p>

            {/* Feature Progress Metrics */}
            <div className="mt-8 space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-1.5">
                  <span className="text-gray-200">Efisiensi Pemilahan Plastik & Kertas</span>
                  <span className="text-brand-neon">84% Terkelola</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-brand-neon rounded-full w-[84%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-1.5">
                  <span className="text-gray-200">Kecepatan Timbang Lapangan</span>
                  <span className="text-brand-neon">&lt; 2 Menit / Penyetoran</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-brand-neon rounded-full w-[95%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm font-semibold mb-1.5">
                  <span className="text-gray-200">Akurasi Rekapitulasi Tonase Bulanan</span>
                  <span className="text-brand-neon">100% Real-Time Digital</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-brand-neon rounded-full w-full" />
                </div>
              </div>
            </div>

            {/* CTA Admin */}
            <div className="mt-8">
              <Link
                href="/admin/register"
                className="bg-brand-neon text-text-primary font-bold px-6 py-3.5 rounded-full inline-flex items-center gap-2.5 hover:bg-brand-neon-hover transition-all text-sm group"
              >
                <span>Daftarkan Unit Bank Sampah</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Box: Industrial Bento Visual Card */}
          <div className="lg:col-span-6">
            <div className="bg-dark-widget rounded-2xl p-4 sm:p-5 border border-white/15">
              <div className="relative h-60 sm:h-72 w-full rounded-xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1781243680823-aae6c7f1ff12?auto=format&fit=crop&w=1000&q=80"
                  alt="Pengepakan dan Pemrosesan Material Daur Ulang Industri"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark-container via-transparent to-black/30" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white">
                Peningkatan Nilai Tambah Daur Ulang Lingkungan
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
                Pengolahan terpadu mulai dari pencatatan logistik unit hingga pengepakan briket
                daur ulang industri dan konversi limbah organik menjadi pupuk cair bernilai tinggi.
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-neon" />
                  Isolasi Data Multi-Tenant
                </span>
                <span className="font-mono text-white/70">Endpoint: /api/v1/*</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
