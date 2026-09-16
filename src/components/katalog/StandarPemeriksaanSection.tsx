import React from "react";
import Image from "next/image";
import { Recycle } from "lucide-react";

export default function StandarPemeriksaanSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Dark Standards Card */}
        <div className="lg:col-span-6 bg-dark-container rounded-2xl p-6 sm:p-8 md:p-10 text-white border border-white/10 flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              Standar Penerimaan Sampah di Unit Circula
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
              Pastikan sampah terpilah memenuhi 3 kriteria utama sebelum diserahkan guna menjamin
              akurasi nilai timbangan serta higienitas penampungan.
            </p>

            {/* 3 Checklist Items */}
            <div className="mt-8 space-y-4">
              {/* Item 1 */}
              <div className="bg-dark-widget rounded-xl p-4 border border-white/10 flex items-start gap-4">
                <div className="w-7 h-7 rounded-lg bg-brand-neon text-dark-container flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Kering &amp; Bebas Minyak</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Sampah tidak terkontaminasi cairan organik busuk atau sisa makanan hewani.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-dark-widget rounded-xl p-4 border border-white/10 flex items-start gap-4">
                <div className="w-7 h-7 rounded-lg bg-brand-neon text-dark-container flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Terpilah Menurut Kategori</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Pisahkan tutup botol, isolasi plastik/lakban, dan staples atau perekat berlebih.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-dark-widget rounded-xl p-4 border border-white/10 flex items-start gap-4">
                <div className="w-7 h-7 rounded-lg bg-brand-neon text-dark-container flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Timbangan Digital Realtime</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Menggunakan sensor timbangan digital terkalibrasi metrologi saat verifikasi
                    petugas unit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Industrial Media Card */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-95 border border-gray-200 shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1763315156830-07870b159121?auto=format&fit=crop&w=1000&q=80"
            alt="Pemeriksaan dan Pemilahan Kualitas Material Daur Ulang"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

          {/* Bottom Overlay Card */}
          <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-dark-container/90 border border-white/15 backdrop-blur-md text-white flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-brand-neon text-dark-container flex items-center justify-center shrink-0 shadow-sm">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-neon block">
                Fasilitas Ramah Lingkungan
              </span>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
                Dukungan fasilitas pemilahan bersertifikasi ISO 14001
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
