import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/**
 * Komponen Banner Ajakan Bergabung Sebelum Footer (PreFooterCTA)
 *
 * Elemen penutup halaman beranda yang mendorong konversi pengunjung menjadi nasabah aktif:
 * 1. Menampilkan latar belakang fotografi alam lestari dengan gradasi gelap.
 * 2. Judul persuasif dan insentif bonus saldo poin untuk penyetoran perdana.
 * 3. Tombol CTA utama menuju halaman pendaftaran akun nasabah (`/register`).
 *
 * @returns JSX Element banner ajakan registrasi
 */
export default function PreFooterCTA() {
  return (
    <section className="px-4 sm:px-6 my-16 max-w-7xl mx-auto">
      <div className="rounded-[28px] bg-dark-container p-8 sm:p-12 md:p-14 text-white border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        {/* ================= LAPISAN LATAR BELAKANG GAMBAR & GRADASI ================= */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80"
            alt="Mewujudkan Lingkungan Sirkular Berkelanjutan"
            fill
            sizes="100vw"
            className="object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-linear-to-r from-dark-container via-dark-container/90 to-dark-container/80" />
        </div>

        {/* ================= SISI KIRI: AJAKAN BERTINDAK & INSENTIF POIN ================= */}
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            Siap Mewujudkan Lingkungan Bersih dan Bernilai Ekonomi?
          </h2>
          <p className="mt-3 text-gray-300 text-sm sm:text-base leading-relaxed">
            Bergabung bersama ribuan nasabah lainnya dan mulai setor sampah terpilah pertama
            Anda hari ini. Dapatkan saldo poin langsung di setoran perdana!
          </p>
        </div>

        {/* ================= SISI KANAN: TOMBOL REGISTRASI AKUN ================= */}
        <div className="relative z-10 shrink-0">
          <Link
            href="/register"
            className="bg-brand-neon text-text-primary font-bold px-8 py-4 rounded-full hover:bg-brand-neon-hover transition-all transform hover:scale-[1.03] flex items-center gap-3 text-sm sm:text-base shadow-xl shadow-brand-neon/25 group"
          >
            <span>Daftar Akun Sekarang</span>
            <span className="w-7 h-7 rounded-full bg-text-primary text-brand-neon flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
