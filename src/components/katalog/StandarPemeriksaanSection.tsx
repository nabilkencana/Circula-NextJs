/**
 * @file StandarPemeriksaanSection.tsx
 * @description Komponen edukasi dan standarisasi penerimaan material sampah terpilah pada Circula.
 * Menampilkan 3 kriteria kelayakan material daur ulang (kering & bebas minyak, terpilah rapi, timbangan digital)
 * serta kartu showcase fasilitas penampungan ramah lingkungan standar ISO 14001.
 * 
 * @module Components/Katalog/StandarPemeriksaanSection
 */

import React from "react";
import Image from "next/image";
import { Recycle } from "lucide-react";

/**
 * Komponen StandarPemeriksaanSection
 * 
 * @component
 * @returns {JSX.Element} Bagian grid 2-kolom: standar kriteria teknis operasional dan media showcase fasilitas.
 */
export default function StandarPemeriksaanSection() {
  return (
    <section 
      aria-labelledby="standar-pemeriksaan-title"
      className="max-w-7xl mx-auto px-4 sm:px-6 my-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ========================================================================= */}
        {/* KOLOM KIRI: KARTU PEDOMAN TEKNIS PENERIMAAN SAMPAH                        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 bg-dark-container rounded-2xl p-6 sm:p-8 md:p-10 text-white border border-white/10 flex flex-col justify-between shadow-xl">
          <div>
            {/* Judul & Deskripsi Header Pedoman */}
            <h2 
              id="standar-pemeriksaan-title"
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug"
            >
              Standar Penerimaan Sampah di Unit Circula
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
              Pastikan sampah terpilah memenuhi 3 kriteria utama sebelum diserahkan guna menjamin
              akurasi nilai timbangan serta higienitas penampungan.
            </p>

            {/* Daftar 3 Parameter Standar Mutu Penyetoran */}
            <div className="mt-8 space-y-4">
              
              {/* Kriteria 1: Kebersihan & Kering */}
              <div className="bg-dark-widget rounded-xl p-4 border border-white/10 flex items-start gap-4 transition-colors hover:border-brand-neon/30">
                <div className="w-7 h-7 rounded-lg bg-brand-neon text-dark-container flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Kering &amp; Bebas Minyak</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Sampah tidak terkontaminasi cairan organik busuk atau sisa makanan hewani guna mencegah pembusukan dan bau.
                  </p>
                </div>
              </div>

              {/* Kriteria 2: Pemilahan Menurut Jenis/Kategori */}
              <div className="bg-dark-widget rounded-xl p-4 border border-white/10 flex items-start gap-4 transition-colors hover:border-brand-neon/30">
                <div className="w-7 h-7 rounded-lg bg-brand-neon text-dark-container flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Terpilah Menurut Kategori</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Pisahkan tutup botol, isolasi plastik/lakban, dan staples atau perekat berlebih sebelum diserahkan ke bank sampah.
                  </p>
                </div>
              </div>

              {/* Kriteria 3: Verifikasi Timbangan Digital */}
              <div className="bg-dark-widget rounded-xl p-4 border border-white/10 flex items-start gap-4 transition-colors hover:border-brand-neon/30">
                <div className="w-7 h-7 rounded-lg bg-brand-neon text-dark-container flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Timbangan Digital Realtime</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Menggunakan sensor timbangan digital terkalibrasi metrologi saat verifikasi fisik oleh petugas unit Circula.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KOLOM KANAN: MEDIA FOTO FASILITAS & OVERLAY SERTIFIKASI                   */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden min-h-95 border border-gray-200 shadow-xl group">
          {/* Gambar Fasilitas Pemilahan Berkualitas */}
          <Image
            src="https://images.unsplash.com/photo-1763315156830-07870b159121?auto=format&fit=crop&w=1000&q=80"
            alt="Pemeriksaan dan Pemilahan Kualitas Material Daur Ulang di Fasilitas Circula"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Gradien Overlay untuk Kontras Pembacaan Teks */}
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

          {/* Badge Overlay: Sertifikasi Lingkungan ISO 14001 */}
          <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-dark-container/90 border border-white/15 backdrop-blur-md text-white flex items-center gap-3.5 shadow-lg">
            <div className="w-10 h-10 rounded-lg bg-brand-neon text-dark-container flex items-center justify-center shrink-0 shadow-sm">
              <Recycle className="w-5 h-5" aria-hidden="true" />
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
