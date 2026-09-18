/**
 * ============================================================================
 * Komponen: AlurPenukaranGuideSection
 * Direktori: src/components/tukar-poin/AlurPenukaranGuideSection.tsx
 *
 * Fungsi Utama:
 * Bagian panduan visual (Educational Guide) yang menjelaskan 3 langkah alur
 * penukaran poin reward bagi nasabah:
 * 1. Langkah 1: Pilih Voucher atau Produk (memilih hadiah sesuai kecukupan saldo poin).
 * 2. Langkah 2: Dapatkan Kode Nota Penukaran (sistem otomatis menerbitkan tiket TKR-XXXX).
 * 3. Langkah 3: Ambil di Unit atau Terima E-Wallet (tunjukkan nota ke kasir atau terima saldo instan).
 * 4. Kolom visual: Menampilkan foto kemitraan berkelanjutan bersama koperasi & merchant terpercaya.
 *
 * Karakteristik Teknis:
 * - Server Component / Static: Tanpa hooks, sangat ringan dan cepat di-render.
 * - Next.js Image Optimization: Menggunakan `<Image fill sizes="..." />` dengan overlay gradasi.
 * ============================================================================
 */

import React from "react";
import Image from "next/image";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AlurPenukaranGuideSection() {
  // Master data 3 tahapan penukaran poin
  const steps = [
    {
      num: "1",
      title: "Pilih Voucher atau Produk",
      desc: "Pastikan saldo poin mencukupi biaya reward yang dipilih dalam katalog terpadu.",
    },
    {
      num: "2",
      title: "Dapatkan Kode Nota Penukaran",
      desc: "Sistem otomatis mencatat transaksi dan menerbitkan kode klaim digital resmi (TKR-YYYYMM-XXXX).",
    },
    {
      num: "3",
      title: "Ambil di Unit atau Terima E-Wallet",
      desc: "Tunjukkan nota klaim ke loket bank sampah Circula atau terima transfer saldo instan langsung.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* ===================================================================== */}
        {/* KOLOM KIRI: Kartu Panduan Gelap dengan 3 Nomor Langkah               */}
        {/* ===================================================================== */}
        <div className="bg-dark-container rounded-3xl p-6 sm:p-8 md:p-10 text-white border border-white/10 flex flex-col justify-between shadow-xl">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-neon/15 border border-brand-neon/30 text-brand-neon text-[10px] font-extrabold uppercase tracking-wider mb-3">
              Panduan Transaksi
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
              Alur Mudah Penukaran Poin Circula
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              Poin Anda langsung terpotong saat penukaran diajukan dan bukti transaksi diterbitkan
              secara otomatis oleh sistem.
            </p>

            {/* 3 Langkah Bernomor */}
            <div className="mt-8 space-y-4">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="p-4 rounded-2xl bg-dark-widget border border-white/10 flex items-start gap-3.5 hover:border-brand-neon/40 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-neon text-dark-container flex items-center justify-center font-extrabold text-sm shrink-0 mt-0.5 shadow-xs">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* KOLOM KANAN: Visual Kemitraan Berkelanjutan & Banner Garansi          */}
        {/* ===================================================================== */}
        <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl min-h-80 lg:min-h-95">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
            alt="Kemitraan Berkelanjutan Koperasi dan Merchant Ramah Lingkungan"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Overlay gradasi gelap */}
          <div className="absolute inset-0 bg-linear-to-t from-dark-container/95 via-dark-container/40 to-transparent" />

          {/* Banner Mengambang di Bagian Bawah Gambar */}
          <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-dark-container/90 border border-white/15 backdrop-blur-md text-white">
            <div className="flex items-center gap-1.5 text-brand-neon">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider">
                Kemitraan Berkelanjutan
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white leading-snug mt-1.5">
              100% Produk Berkualitas Terkurasi dari Koperasi UMKM &amp; Merchant Resmi Terpercaya.
            </h4>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-neon shrink-0" />
                <span>Tanpa Biaya Tersembunyi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-neon shrink-0" />
                <span>Garansi Fisik Produk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
