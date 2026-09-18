/**
 * @file StepsGuideBentoCard.tsx
 * @description Komponen kartu edukasi berformat Bento Grid yang memandu calon nasabah
 * dalam 3 langkah mudah menabung sampah di Circula (Alur 3R).
 * 
 * Peran dalam UKK:
 * - Menjelaskan proses bisnis (business flow) inti aplikasi Bank Sampah kepada penguji/user.
 * - Menerapkan prinsip DRY (Don't Repeat Yourself) dengan merender array langkah secara dinamis (`array.map`).
 * - Menunjukkan teknik rendering ikon Lucide React secara dinamis (`const Icon = step.icon`).
 * - Styling modern dengan dark-theme container, aksen warna neon, dan hover micro-interaction.
 */

import React from "react";
import { UserCheck, CalendarCheck, Coins } from "lucide-react"; // Ikon: Verifikasi User, Kalender Jadwal, dan Koin Poin

export default function StepsGuideBentoCard() {
  /**
   * Data konfigurasi langkah-langkah menabung sampah.
   * Dipisahkan menjadi array objek agar mudah dirawat atau diperbarui di masa mendatang.
   */
  const steps = [
    {
      number: "01",
      icon: UserCheck,
      title: "Buka Rekening Digital",
      desc: "Daftar online gratis dalam 2 menit dan dapatkan nomor buku tabungan bank sampah Anda seketika.",
    },
    {
      number: "02",
      icon: CalendarCheck,
      title: "Pilah & Jadwalkan Setor",
      desc: "Pisahkan material anorganik (Plastik, Kertas, Logam) dan buat tiket pengajuan penimbangan.",
    },
    {
      number: "03",
      icon: Coins,
      title: "Timbang & Cairkan Poin",
      desc: "Bawa ke unit penimbangan resmi, timbang akurat, dan konversi poin menjadi saldo e-wallet rupiah.",
    },
  ];

  return (
    /* Kontainer Utama Bento Card bernuansa gelap */
    <div className="bg-dark-container rounded-3xl p-6 sm:p-7 border border-white/10 text-white shadow-xl">
      {/* ─── Header Kartu: Judul & Badge Alur ─── */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
        <h3 className="text-base font-bold text-white tracking-tight">
          3 Langkah Mudah Menabung Sampah
        </h3>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-neon/20 text-brand-neon border border-brand-neon/30">
          Alur 3R
        </span>
      </div>

      {/* ─── Daftar Langkah (Direncanakan dengan Loop .map()) ─── */}
      <div className="space-y-3.5">
        {steps.map((step) => {
          // Menyimpan referensi komponen ikon ke dalam variabel berhuruf kapital agar valid sebagai JSX tag
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="bg-dark-widget rounded-2xl p-4 border border-white/10 hover:border-brand-neon/40 transition-all flex items-start gap-3.5 group"
            >
              {/* Badge Nomor Urut Langkah (01, 02, 03) */}
              <div className="w-9 h-9 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0 font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                {step.number}
              </div>

              {/* Konten Judul Langkah dan Deskripsi */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-neon transition-colors">
                    {step.title}
                  </h4>
                  {/* Ikon Ilustrasi Langkah */}
                  <Icon className="w-3.5 h-3.5 text-brand-neon/70 ml-auto shrink-0" />
                </div>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
