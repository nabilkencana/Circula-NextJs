/**
 * @file LoginSuccessModal.tsx
 * @description Komponen modal dialog feedback sukses masuk akun (Authentication Success Modal).
 * Menampilkan ringkasan sesi pengguna terotentikasi dan secara cerdas mengarahkan (redirect) ke:
 * - Nasabah: Halaman pengajuan setoran sampah (`/setor/ajukan`) atau rute callback query `?next=...`
 * - Admin Unit: Dasbor pengelolaan bank sampah (`/admin/dashboard`)
 * 
 * Peran dalam UKK:
 * - Mengimplementasikan Role-Based Redirection setelah proses otentikasi berhasil.
 * - Membaca Query Parameter URL secara dinamis menggunakan hook Next.js `useSearchParams`.
 * - Menangani lifecycle timer `setInterval` dan `clearInterval` (pembersihan memori komponen).
 * - Memberikan feedback visual kredensial akun yang terverifikasi aktif.
 */

"use client"; // Komponen interaktif di sisi klien

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Komponen tautan Next.js
import { useSearchParams, useRouter } from "next/navigation"; // Hook untuk membaca query param dan navigasi rute
import { CheckCircle2, ArrowRight, ShieldCheck, Home } from "lucide-react"; // Ikon Lucide React
import { UserSessionData } from "@/types/auth"; // Tipe data kontrak sesi pengguna

/**
 * Interface props untuk LoginSuccessModal
 * @property isOpen - Status boolean apakah modal aktif ditampilkan
 * @property user - Objek data sesi pengguna yang berhasil diautentikasi
 * @property onClose - Callback fungsi untuk menutup modal secara manual
 */
interface LoginSuccessModalProps {
  isOpen: boolean;
  user: UserSessionData | null;
  onClose: () => void;
}

export default function LoginSuccessModal({
  isOpen,
  user,
  onClose,
}: LoginSuccessModalProps) {
  const router = useRouter(); // Instance navigasi rute programatis
  const searchParams = useSearchParams(); // Membaca URL Query Parameters (seperti ?next=/histori)
  const [countdown, setCountdown] = useState<number>(3); // State hitung mundur timer (default 3 detik)

  // Menentukan apakah pengguna yang masuk berperan sebagai NASABAH
  const isNasabah = user?.role === "NASABAH";
  
  // Membaca parameter redirect 'next' dari URL jika ada
  const next = searchParams.get("next");
  
  // Halaman default tujuan berdasarkan peran pengguna:
  // - Nasabah langsung diarahkan ke form setoran sampah
  // - Admin diarahkan ke konsol dasbor operasional
  const fallback = isNasabah ? "/setor/ajukan" : "/admin/dashboard";
  
  // Memastikan URL tujuan redirect aman (mencegah open redirect vulnerability dengan memvalidasi awalan '/')
  const targetRedirect = next && next.startsWith("/") ? next : fallback;

  /**
   * Effect Hook: Mengelola timer hitung mundur dan eksekusi redirect otomatis
   */
  useEffect(() => {
    // Jika modal tidak terbuka atau data sesi belum tersedia, abaikan
    if (!isOpen || !user) return;

    // Set ulang countdown ke 3 detik
    setCountdown(3);

    // Jalankan timer per detik
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push(targetRedirect); // Arahkan ke rute tujuan
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Pembersihan memori: Hentikan interval jika modal ditutup atau komponen dilepas dari DOM
    return () => clearInterval(interval);
  }, [isOpen, user, targetRedirect, router]);

  // Jika modal ditutup atau data kosong, jangan render markup apapun
  if (!isOpen || !user) return null;

  return (
    /* Latar Belakang Overlay Gelap Transparan */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Kontainer Modal Card Putih Responsif */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center animate-in zoom-in-95 duration-200">
        
        {/* ─── 1. Ikon Centang Animasi dengan Aksen Neon ─── */}
        <div className="w-16 h-16 rounded-full bg-brand-neon/20 border-2 border-brand-neon flex items-center justify-center mx-auto mb-4 text-dark-container">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        {/* ─── 2. Headline & Pesan Sapaan Personal ─── */}
        <h3 className="text-xl font-bold text-text-primary tracking-tight">
          Autentikasi Berhasil!
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
          {isNasabah
            ? `Selamat datang kembali, ${user.namaLengkap || user.username}. Sesi nasabah Anda telah terhubung.`
            : `Selamat datang kembali, Admin ${user.adminBank?.namaUnit || user.username}. Sesi konsol operasional aktif.`}
        </p>

        {/* ─── 3. Inset Card Ringkasan Sesi Pengguna ─── */}
        <div className="my-5 p-4 rounded-2xl bg-inset-gray border border-gray-200 text-left text-xs space-y-2.5">
          {/* Peran Akses Sistem */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">Peran Akses</span>
            <span className="inline-flex items-center gap-1 font-bold text-dark-container bg-brand-neon/40 px-2 py-0.5 rounded-full text-[10px]">
              <ShieldCheck className="w-3 h-3" />
              <span>{isNasabah ? "NASABAH" : "ADMIN UNIT"}</span>
            </span>
          </div>

          {/* ID Akun Pengguna */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">ID Akun</span>
            <span className="font-mono font-bold text-text-primary">
              {user.id}
            </span>
          </div>

          {/* Username Akun */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">Username</span>
            <span className="font-mono font-semibold text-text-primary">
              @{user.username}
            </span>
          </div>

          {/* Unit Operasional Bank Sampah (Khusus Peran Admin Unit) */}
          {user.adminBank && (
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-text-secondary">Unit Operasional</span>
              <span className="font-semibold text-text-primary text-right max-w-50 truncate">
                {user.adminBank.namaUnit}
              </span>
            </div>
          )}

          {/* Status Sesi Login */}
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Status Sesi</span>
            <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
              TERVERIFIKASI AKTIF
            </span>
          </div>
        </div>

        {/* ─── 4. Tombol Aksi Lanjut & Tautan Alternatif ─── */}
        <div className="space-y-2.5 pt-2">
          {/* Tombol Langsung Lanjut ke Halaman Tujuan */}
          <Link
            href={targetRedirect}
            className="w-full py-3 px-5 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>
              {isNasabah ? "Lanjut ke Form Setor Sampah" : "Lanjut ke Dashboard Admin"} ({countdown}s)
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          {/* Keterangan hitung mundur otomatis */}
          <p className="text-[11px] text-text-secondary text-center">
            Mengalihkan otomatis ke halaman tujuan dalam {countdown} detik...
          </p>

          {/* Tautan Kembali ke Beranda Utama */}
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
