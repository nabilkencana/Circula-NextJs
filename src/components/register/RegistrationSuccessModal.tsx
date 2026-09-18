/**
 * @file RegistrationSuccessModal.tsx
 * @description Komponen modal dialog yang muncul secara otomatis setelah pendaftaran nasabah berhasil.
 * Menampilkan ringkasan kredensial akun baru, status aktif, serta timer hitung mundur (countdown)
 * yang secara otomatis mengarahkan (redirect) pengguna ke halaman login.
 * 
 * Peran dalam UKK:
 * - Menunjukkan pemahaman mendalam tentang React Hook `useEffect` dan lifecycle komponen.
 * - Mengimplementasikan pembersihan timer asynchronous (`clearInterval`) untuk mencegah kebocoran memori (memory leak).
 * - Menggunakan router Next.js (`useRouter` dari `next/navigation`) untuk navigasi programatis.
 * - Menyajikan umpan balik visual (visual feedback) yang jelas dan kredibel kepada pengguna.
 */

"use client"; // Menandai komponen ini dieksekusi di sisi client (browser)

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Komponen navigasi Next.js
import { useRouter } from "next/navigation"; // Hook untuk navigasi rute programatis di App Router Next.js
import { CheckCircle2, ArrowRight, Home, ShieldCheck } from "lucide-react"; // Ikon Lucide React
import { RegisterResponse } from "@/types/auth"; // Tipe data kontrak respon API registrasi

/**
 * Interface props untuk RegistrationSuccessModal
 * @property isOpen - Flag boolean apakah modal sedang ditampilkan atau disembunyikan
 * @property data - Objek data nasabah yang baru berhasil didaftarkan (ID, nama, username)
 * @property onClose - Callback fungsi untuk menutup modal secara manual
 */
interface RegistrationSuccessModalProps {
  isOpen: boolean;
  data: RegisterResponse["data"] | null;
  onClose: () => void;
}

export default function RegistrationSuccessModal({
  isOpen,
  data,
  onClose,
}: RegistrationSuccessModalProps) {
  const router = useRouter(); // Instance router untuk mengarahkan pengguna ke rute '/login'
  const [countdown, setCountdown] = useState<number>(5); // State hitung mundur waktu otomatis (default 5 detik)

  /**
   * Effect Hook: Mengatur siklus timer hitung mundur otomatis ketika modal terbuka.
   */
  useEffect(() => {
    // Jika modal tidak terbuka atau data registrasi belum tersedia, hentikan eksekusi
    if (!isOpen || !data) return;

    // Reset countdown ke 5 detik setiap kali modal dibuka
    setCountdown(5);

    // Jalankan interval per 1 detik (1000 ms)
    const interval = setInterval(() => {
      setCountdown((prev) => {
        // Jika hitungan tersisa 1 detik atau kurang, bersihkan interval dan arahkan ke login
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/login"); // Navigasi otomatis ke halaman login nasabah
          return 0;
        }
        return prev - 1; // Kurangi 1 detik
      });
    }, 1000);

    // PENTING UNTUK UKK (Memory Cleanup):
    // Mengembalikan fungsi cleanup agar interval dibatalkan jika komponen unmount atau props berubah.
    return () => clearInterval(interval);
  }, [isOpen, data, router]);

  // Jika modal dalam keadaan tertutup atau data kosong, jangan render apapun ke DOM (Early return)
  if (!isOpen || !data) return null;

  return (
    /* Overlay Latar Belakang Gelap Transparan (Backdrop Blur) */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Kontainer Modal Card Putih */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center animate-in zoom-in-95 duration-200">
        
        {/* ─── 1. Ikon Centang Berhasil dengan Aksen Neon ─── */}
        <div className="w-16 h-16 rounded-full bg-brand-neon/20 border-2 border-brand-neon flex items-center justify-center mx-auto mb-4 text-dark-container">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        {/* ─── 2. Headline & Ucapan Selamat ─── */}
        <h3 className="text-xl font-bold text-text-primary tracking-tight">
          Pendaftaran Berhasil!
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
          Selamat datang di Circula. Rekening tabungan bank sampah digital Anda telah aktif dan siap digunakan.
        </p>

        {/* ─── 3. Inset Card Ringkasan Akun Baru ─── */}
        <div className="my-5 p-4 rounded-2xl bg-inset-gray border border-gray-200 text-left text-xs space-y-2.5">
          {/* ID Nasabah */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">ID Nasabah</span>
            <span className="font-mono font-bold text-text-primary">
              {data.id}
            </span>
          </div>

          {/* Nama Lengkap Terdaftar */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">Nama Lengkap</span>
            <span className="font-semibold text-text-primary">
              {data.namaLengkap}
            </span>
          </div>

          {/* Username Login */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">Username</span>
            <span className="font-mono font-semibold text-text-primary">
              @{data.username}
            </span>
          </div>

          {/* Status Rekening Tabungan */}
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Status Rekening</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
              <ShieldCheck className="w-3 h-3" />
              <span>AKTIF</span>
            </span>
          </div>
        </div>

        {/* ─── 4. Tombol Aksi Navigasi & Countdown Info ─── */}
        <div className="space-y-2.5 pt-2">
          {/* Tombol Langsung Masuk ke Login */}
          <Link
            href="/login"
            className="w-full py-3 px-5 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Masuk ke Akun Sekarang ({countdown}s)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          {/* Teks Indikator Timer Redirect Otomatis */}
          <p className="text-[11px] text-text-secondary text-center">
            Mengalihkan otomatis ke halaman masuk dalam {countdown} detik...
          </p>

          {/* Tautan Alternatif Kembali ke Beranda */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <Link
              href="/"
              className="text-xs font-semibold text-text-secondary hover:text-text-primary inline-flex items-center gap-1 py-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
