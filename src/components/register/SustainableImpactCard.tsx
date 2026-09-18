/**
 * @file SustainableImpactCard.tsx
 * @description Komponen kartu visual dampak lingkungan berkelanjutan (Ecological & ESG Impact).
 * Menampilkan statistik riil jumlah sampah yang berhasil didaur ulang dan reduksi emisi karbon.
 * 
 * Peran dalam UKK:
 * - Menegaskan visi platform sirkular ekonomi Circula dengan metrik dampak lingkungan konkret.
 * - Menggunakan teknik visual Next.js Image dengan zoom lambat saat kursor diarahkan (`group-hover:scale-105`).
 * - Menerapkan docking glassmorphism card di atas foto latar belakang.
 */

import React from "react";
import Image from "next/image"; // Komponen gambar Next.js
import { Sprout, Award } from "lucide-react"; // Ikon: Tunas tanaman (Sprout) & Penghargaan (Award)

export default function SustainableImpactCard() {
  return (
    /* Kontainer Utama:
       - group: Mengaktifkan group-hover pada elemen anak (child image)
       - h-64 sm:h-72: Menetapkan tinggi kartu responsif
    */
    <div className="relative rounded-3xl overflow-hidden border border-gray-200 h-64 sm:h-72 shadow-xs group">
      
      {/* ─── 1. Foto Latar Belakang Lingkungan Hidup ─── */}
      <Image
        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"
        alt="Inisiatif Penghijauan dan Sirkular Berkelanjutan"
        fill // Menyesuaikan ukuran kontainer pembungkus
        sizes="(max-width: 1024px) 100vw, 35vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700" // Efek zoom halus saat di-hover
      />
      {/* Lapisan Gradient Gelap untuk meningkatkan kontras teks */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

      {/* ─── 2. Badge Penghargaan Melayang (Top Floating Badge) ─── */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-container/90 backdrop-blur-md border border-white/15 text-brand-neon text-[11px] font-bold shadow-md">
          <Award className="w-3.5 h-3.5 fill-brand-neon" />
          <span>Dampak Ekologis Riil</span>
        </div>
      </div>

      {/* ─── 3. Kartu Kaca Informasi Statistik (Bottom Docked Glassmorphism) ─── */}
      <div className="absolute bottom-4 inset-x-4 z-10">
        <div className="bg-dark-container/85 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-white shadow-lg">
          {/* Baris Judul Metrik Sampah */}
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-7 h-7 rounded-lg bg-brand-neon/20 text-brand-neon flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">
              +148 Ton Sampah Terdaur Ulang
            </span>
          </div>
          {/* Deskripsi Dampak Reduksi Karbon */}
          <p className="text-[11px] text-gray-300 leading-relaxed pl-9">
            Kontribusi kolektif nasabah Circula berhasil mencegah emisi 312 ton CO₂e ke atmosfer Malang Raya.
          </p>
        </div>
      </div>

    </div>
  );
}
