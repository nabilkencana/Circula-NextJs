/**
 * @file RouteGuard.tsx
 * @description Komponen penjaga rute (Client-Side Route Guard) dan batas otorisasi pengguna.
 * Menggunakan session berbasis `localStorage` (token dan profil) karena autentikasi disimpan
 * pada client browser, sehingga pengamanan UX dilakukan di level komponen sebelum konten dirender.
 * 
 * Aturan Otorisasi Akses:
 * - Rute Publik (`/`, `/login`, `/register`, `/admin/register`, `/kategori-sampah`): Bebas diakses tanpa login.
 * - Rute Admin (`/admin/*`): Wajib login dan memiliki peran `ADMIN`. Jika tidak, dialihkan ke `/login`.
 * - Rute Nasabah / Transaksional (`/histori`, `/setor/*`, `/tukar-poin`, `/nota/*`): Wajib memiliki token valid.
 * - Menangani pengalihan cerdas dengan parameter URL `?next=` untuk kembali ke halaman tujuan setelah login.
 * 
 * @module Components/Auth/RouteGuard
 */

"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "@/lib/api/client";
import { getCurrentUser } from "@/services/authService";

/**
 * Daftar rute publik yang dapat diakses oleh pengguna anonim tanpa sesi login.
 */
const PUBLIC_PATHS = ["/", "/login", "/register", "/admin/register", "/kategori-sampah"];

/**
 * Memeriksa apakah path yang dituju termasuk dalam daftar rute publik.
 * 
 * @param {string} pathname - Rute URL aktif.
 * @returns {boolean} True jika rute bersifat publik.
 */
function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * Memeriksa apakah rute yang dituju adalah halaman administrasi operasional.
 * 
 * @param {string} pathname - Rute URL aktif.
 * @returns {boolean} True jika rute adalah modul admin internal.
 */
function isAdminPath(pathname: string): boolean {
  return pathname.startsWith("/admin") && pathname !== "/admin/register";
}

/**
 * Komponen Pembungkus RouteGuard
 * 
 * @component
 * @param {{ children: React.ReactNode }} props - Komponen halaman yang diproteksi.
 * @returns {JSX.Element} Elemen anak jika diizinkan atau tampilan animasi pemuatan selama verifikasi.
 */
export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // Status apakah pengguna memiliki hak akses terhadap rute saat ini
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    /**
     * Memvalidasi hak akses sesi pengguna berdasarkan token dan rute URL aktif.
     */
    const checkAuth = () => {
      const token = getToken();
      const user = getCurrentUser();

      // Rute publik selalu diizinkan tanpa pengecekan token
      if (isPublic(pathname)) {
        setAuthorized(true);
        return;
      }

      // Jika belum login, alihkan ke halaman login dengan query parameter next
      if (!token || !user) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        setAuthorized(false);
        return;
      }

      // Halaman admin mewajibkan role ADMIN
      if (isAdminPath(pathname) && user.role !== "ADMIN") {
        router.replace("/login?next=" + encodeURIComponent(pathname));
        setAuthorized(false);
        return;
      }

      // Pengguna memenuhi seluruh kriteria akses
      setAuthorized(true);
    };

    // Jalankan pemeriksaan awal
    checkAuth();

    // Dengarkan event invalidasi autentikasi jika sesi kedaluwarsa sewaktu-waktu
    const handleAuthInvalid = () => {
      checkAuth();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("circula_auth_invalidated", handleAuthInvalid);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("circula_auth_invalidated", handleAuthInvalid);
      }
    };
  }, [pathname, router]);

  // Tampilkan layar transisi saat otorisasi sedang dievaluasi untuk mencegah kedipan tampilan (content flash)
  if (!authorized) {
    return (
      <div 
        aria-live="polite"
        className="min-h-screen bg-surface-card flex items-center justify-center"
      >
        <div className="flex items-center gap-3 text-text-secondary">
          <span 
            className="w-5 h-5 border-2 border-brand-neon border-t-transparent rounded-full animate-spin" 
            aria-hidden="true" 
          />
          <span className="text-sm font-semibold">Mengalihkan halaman...</span>
        </div>
      </div>
    );
  }

  // Render halaman asli jika izin telah diberikan
  return <>{children}</>;
}
