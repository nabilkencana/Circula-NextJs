"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calculator, ArrowRight } from "lucide-react";
import { UKK_WASTE_CATEGORIES } from "@/data/landingData";

/**
 * Komponen Seksi Katalog & Kalkulator Nilai Sampah Daur Ulang (WasteCatalogSection)
 *
 * Komponen interaktif di beranda yang menghadirkan:
 * 1. Grid 4 Kartu Sampah Baku Nasional (Plastik, Kertas, Logam, Kaca) sesuai spesifikasi UKK.
 *    - Menampilkan visual material beresolusi tinggi, badge kategori, harga beli per kg (Rp/kg),
 *      dan bonus poin per kg.
 *    - Tombol cepat untuk langsung mengajukan setor sampah (`/setor-sampah?kategori=[id]`).
 * 2. Kalkulator Simulasi Cepat (Live Estimator):
 *    - Pengguna dapat memilih kategori sampah dari dropdown.
 *    - Menggeser slider berat sampah (0.5 kg hingga 50 kg dengan step 0.5 kg).
 *    - Menghitung secara reaktif estimasi pencairan uang rupiah dan akumulasi poin yang diperoleh.
 * 3. Tombol tautan menuju indeks komprehensif 6+ jenis sampah (`/kategori-sampah`).
 *
 * @returns JSX Element seksi katalog sampah dan kalkulator interaktif
 */
export default function WasteCatalogSection() {
  // State indeks kategori sampah yang dipilih untuk kalkulator simulasi
  const [selectedCalcCategory, setSelectedCalcCategory] = useState(0);
  // State bobot estimasi dalam satuan kilogram (default 5 kg)
  const [calcWeight, setCalcWeight] = useState(5);

  // Ambil objek kategori aktif berdasarkan indeks terpilih
  const activeCategory = UKK_WASTE_CATEGORIES[selectedCalcCategory];
  // Hitung estimasi penerimaan kas rupiah dan perolehan poin secara reaktif
  const estimatedRupiah = Math.round(calcWeight * activeCategory.pricePerKg);
  const estimatedPoints = Math.round(calcWeight * activeCategory.pointsPerKg);

  return (
    <section id="katalog-sampah" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ================= HEADER SEKSI KATALOG ================= */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
          Nilai Tukar Sampah Daur Ulang Hari Ini
        </h2>
        <p className="text-text-secondary text-sm sm:text-base mt-2.5 leading-relaxed">
          Standar baku acuan harga beli per kilogram (Rp/kg) dan reward poin resmi yang
          diperbarui secara berkala mengikuti indeks pasar daur ulang nasional.
        </p>
      </div>

      {/* ================= GRID 4 KARTU MATERIAL SAMPAH UKK ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {UKK_WASTE_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
          >
            {/* Foto Material & Badge Kategori */}
            <div className="relative h-44 w-full overflow-hidden bg-gray-100">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${cat.badgeBg}`}
                >
                  {cat.category}
                </span>
              </div>
            </div>

            {/* Konten Nama, Deskripsi Kelayakan, & Tarif Penimbangan */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-text-primary leading-snug group-hover:text-emerald-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              {/* Kotak Tarif Harga Beli & Bonus Poin */}
              <div className="mt-5 pt-4 border-t border-gray-200 bg-inset-gray -mx-5 -mb-5 p-4 rounded-b-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-text-secondary block">
                      Harga Beli
                    </span>
                    <span className="text-base font-extrabold text-text-primary">
                      Rp {cat.pricePerKg.toLocaleString("id-ID")}{" "}
                      <span className="text-xs font-normal text-gray-500">/kg</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-semibold text-text-secondary block">
                      Reward Poin
                    </span>
                    <span className="text-sm font-extrabold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                      +{cat.pointsPerKg} Poin/kg
                    </span>
                  </div>
                </div>

                {/* Tombol Ajukan Setor Sampah Kategori Ini */}
                <Link
                  href={`/setor-sampah?kategori=${cat.id}`}
                  className="w-full bg-dark-container hover:bg-black text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Ajukan Setor</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brand-neon" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= SIMULASI CEPAT KALKULATOR INTERAKTIF ================= */}
      <div className="mt-12 bg-inset-gray rounded-3xl p-6 sm:p-8 border border-gray-200">
        <div className="max-w-3xl mx-auto">
          {/* Header Kalkulator */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-neon text-text-primary flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                Simulasi Cepat Penghitungan Nilai Setor
              </h3>
              <p className="text-xs text-text-secondary">
                Hitung estimasi pencairan uang tunai dan poin yang akan Anda terima di loket unit.
              </p>
            </div>
          </div>

          {/* Form Input Dropdown Kategori & Slider Bobot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 items-end">
            {/* Input Pilihan Kategori */}
            <div>
              <label className="text-xs font-bold text-text-primary block mb-2">
                Pilih Kategori Sampah
              </label>
              <select
                value={selectedCalcCategory}
                onChange={(e) => setSelectedCalcCategory(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-text-primary focus:outline-none focus:border-black"
              >
                {UKK_WASTE_CATEGORIES.map((c, i) => (
                  <option key={c.id} value={i}>
                    {c.name} ({c.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Input Slider Rentang Bobot (0.5 - 50 kg) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-text-primary">
                  Estimasi Bobot: {calcWeight} Kg
                </label>
              </div>
              <input
                type="range"
                min="0.5"
                max="50"
                step="0.5"
                value={calcWeight}
                onChange={(e) => setCalcWeight(Number(e.target.value))}
                className="w-full accent-dark-container cursor-pointer"
              />
            </div>

            {/* Kartu Ringkasan Hasil Kalkulasi Simulasi */}
            <div className="bg-white border border-gray-200 p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">
                  Estimasi Rupiah
                </span>
                <span className="text-base font-extrabold text-text-primary">
                  Rp {estimatedRupiah.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 font-semibold block uppercase">
                  Estimasi Poin
                </span>
                <span className="text-sm font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  +{estimatedPoints} Pts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TOMBOL LIHAT INDEKS SELURUH KATEGORI ================= */}
      <div className="mt-10 text-center">
        <Link
          href="/kategori-sampah"
          className="inline-flex items-center gap-2 border border-gray-200 hover:border-dark-container text-text-primary font-bold px-7 py-3 rounded-full text-xs sm:text-sm hover:bg-inset-gray transition-all"
        >
          <span>Lihat Seluruh Kategori Sampah Lengkap (6+ Material)</span>
          <ArrowRight className="w-4 h-4 text-gray-500" />
        </Link>
      </div>
    </section>
  );
}
