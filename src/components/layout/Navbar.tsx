/**
 * @file Navbar.tsx
 * @description Komponen bilah navigasi utama (Header Navbar) responsif untuk seluruh antarmuka publik Circula.
 * Mendukung deteksi sesi pengguna multi-peran (Tamu/Guest, Nasabah, Administrator Unit),
 * sinkronisasi saldo poin aktif secara real-time dengan animasi visual penghitung (count-up),
 * dropdown menu profil akun, pemantauan invalidasi token sesi autentikasi, serta menu drawer seluler.
 * 
 * @module Components/Layout/Navbar
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, ArrowRight, Menu, X, Star, ChevronDown, LogOut, User } from "lucide-react";
import { getCurrentUser, logout } from "@/services/authService";
import { getSaldoNasabah } from "@/services/tukarPoinService";
import { getToken } from "@/lib/api/client";
import { UserSessionData } from "@/types/auth";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * Properti untuk kustomisasi tampilan Navbar
 * 
 * @interface NavbarProps
 * @property {"guest" | "nasabah" | "admin"} [userRole] - Override peran pengguna secara statis (opsional).
 * @property {number} [userPoints] - Nilai awal poin untuk pengujian tampilan (opsional).
 * @property {string} [userName] - Nama tampilan pengguna alternatif (opsional).
 * @property {"default" | "auth"} [variant] - Varian tata letak header (default atau minimalis auth).
 */
export interface NavbarProps {
  userRole?: "guest" | "nasabah" | "admin";
  userPoints?: number;
  userName?: string;
  variant?: "default" | "auth";
}

/**
 * Komponen Navbar Utama Circula
 * 
 * @component
 * @param {NavbarProps} props - Properti komponen navbar.
 * @returns {JSX.Element} Elemen header sticky dengan efek blur kaca dan navigasi pintar multi-peran.
 */
export default function Navbar({
  userRole,
  userPoints,
  userName,
  variant = "default",
}: NavbarProps) {
  // State untuk kendali visibilitas menu seluler (mobile drawer)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State untuk kendali dropdown menu profil desktop
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  // Data pengguna aktif dari penyimpanan sesi lokal (localStorage)
  const [sessionUser, setSessionUser] = useState<UserSessionData | null>(null);
  // Saldo poin riil yang ditarik secara live dari backend
  const [livePoints, setLivePoints] = useState<number | null>(null);
  const pathname = usePathname();

  // Efek sinkronisasi sesi pengguna dan pemantauan event invalidasi auth
  useEffect(() => {
    // Handler saat sesi token kedaluwarsa atau dibatalkan oleh interceptor API
    const handleAuthInvalid = () => {
      setSessionUser(null);
      setLivePoints(null);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("circula_auth_invalidated", handleAuthInvalid);
    }

    // Inisialisasi pembacaan sesi pengguna dan token aktif
    const user = getCurrentUser();
    if (user && getToken()) {
      setSessionUser(user);
      // Jika peran adalah Nasabah, ambil saldo poin terbaru untuk indikator header
      if (user.role === "NASABAH") {
        getSaldoNasabah().then((res) => {
          if (res && typeof res.saldoPoinAktif === "number") {
            setLivePoints(res.saldoPoinAktif);
          } else if (!getToken()) {
            setSessionUser(null);
            setLivePoints(null);
          }
        });
      }
    } else {
      setSessionUser(null);
      setLivePoints(null);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("circula_auth_invalidated", handleAuthInvalid);
      }
    };
  }, []);

  // Evaluasi peran pengguna aktif
  const isNasabah = userRole === "nasabah" || (sessionUser?.role === "NASABAH");
  const isAdmin = userRole === "admin" || (sessionUser?.role === "ADMIN");
  const isLoggedIn = isNasabah || isAdmin;

  // Penghitungan animasi peningkatan poin dengan durasi 650 milidetik
  const currentPoints = livePoints ?? (userPoints ?? 150);
  const animatedPoints = useCountUp(currentPoints, 650);
  const currentName = sessionUser?.namaLengkap || sessionUser?.username || userName || "Budi Santoso";

  // Handler keluar sesi (logout) dan pengalihan ke halaman login
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  // Penentuan daftar tautan navigasi dinamis berdasarkan peran aktif pengguna
  const navLinks = isLoggedIn
    ? isAdmin
      ? [
          {
            name: "Dashboard",
            href: "/admin/dashboard",
            isActive: pathname === "/admin/dashboard",
          },
          {
            name: "Transaksi",
            href: "/admin/transaksi",
            isActive: pathname.startsWith("/admin/transaksi"),
          },
          {
            name: "Katalog Sampah",
            href: "/admin/kategori-sampah",
            isActive:
              pathname.startsWith("/admin/kategori-sampah") ||
              pathname.startsWith("/kategori-sampah"),
          },
          {
            name: "Kelola Hadiah",
            href: "/admin/hadiah",
            isActive: pathname.startsWith("/admin/hadiah"),
          },
        ]
      : [
          {
            name: "Katalog Sampah",
            href: "/kategori-sampah",
            isActive: pathname.startsWith("/kategori-sampah"),
          },
          {
            name: "Setor Sampah",
            href: "/setor/ajukan",
            isActive: pathname === "/setor/ajukan" || pathname === "/setor",
          },
          {
            name: "Tukar Poin",
            href: "/tukar-poin",
            isActive: pathname.startsWith("/tukar-poin"),
          },
          {
            name: "Histori Setoran",
            href: "/histori",
            isActive:
              pathname.startsWith("/histori") || pathname.startsWith("/setor/status"),
          },
        ]
    : [
        {
          name: "Beranda",
          href: "/",
          isActive: pathname === "/",
        },
        {
          name: "Katalog Sampah",
          href: "/kategori-sampah",
          isActive: pathname.startsWith("/kategori-sampah"),
        },
        {
          name: "Cara Kerja",
          href: "/#alur-setor",
          isActive: false,
        },
        {
          name: "Unit & Loket",
          href: "/#unit-resmi",
          isActive: false,
        },
      ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100/90 transition-all shadow-[0_1px_12px_rgba(0,0,0,0.02)]">
      <nav 
        aria-label="Navigasi Utama Circula"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        
        {/* ========================================================================= */}
        {/* LOGO BRAND DAN SUBJUDUL IDENTITAS                                         */}
        {/* ========================================================================= */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[#111315] flex items-center justify-center text-[#CEF241] shadow-xs group-hover:scale-105 transition-transform">
            <Leaf className="w-4 h-4 fill-[#CEF241]" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-wider text-gray-900 leading-none uppercase">
              CIRCULA
            </span>
            <span className="text-[8px] font-bold tracking-wider text-gray-500 uppercase mt-0.5">
              BANK SAMPAH DIGITAL
            </span>
          </div>
        </Link>

        {/* ========================================================================= */}
        {/* TAUTAN MENU NAVIGASI DESKTOP DENGAN INDIKATOR GARIS NEON                   */}
        {/* ========================================================================= */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 text-xs font-semibold transition-colors duration-150 ${
                link.isActive
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.name}
              {link.isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#CEF241] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* AKSI PENGGUNA DESKTOP (SALDO POIN, PROFIL DROPDOWN, ATAU TOMBOL AUTH)      */}
        {/* ========================================================================= */}
        <div className="hidden sm:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative flex items-center gap-2.5">
              {/* Badge Poin Nasabah dengan Tautan ke Penukaran */}
              {isNasabah && (
                <Link
                  href="/tukar-poin"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111315] text-[#CEF241] text-xs font-bold shadow-xs hover:opacity-95 transition-all btn-interactive"
                >
                  <Star className="w-3.5 h-3.5 fill-[#CEF241] text-[#CEF241]" aria-hidden="true" />
                  <span>{animatedPoints} Poin</span>
                </Link>
              )}

              {/* Tombol Pembuka Dropdown Akun Profil */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-gray-200/80 bg-white hover:bg-gray-50 shadow-2xs text-xs font-bold text-gray-900 transition-all cursor-pointer"
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 text-gray-700 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-gray-700" aria-hidden="true" />
                  </div>
                  <span className="max-w-30 truncate">{currentName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                </button>

                {/* Popover Dropdown Profil Akun */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-text-primary truncate">{currentName}</p>
                      <p className="text-[10px] text-text-secondary uppercase font-semibold">
                        {isNasabah ? "Nasabah Terdaftar" : "Admin Unit Operasional"}
                      </p>
                    </div>
                    {/* Tautan Pintas ke Dashboard bila pengguna adalah Admin */}
                    {isAdmin && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-3.5 py-2 text-xs font-semibold text-text-primary hover:bg-gray-50 transition-colors"
                      >
                        Dashboard Admin
                      </Link>
                    )}
                    {/* Tombol Logout Sesi */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Keluar Sesi</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Kondisi Belum Login: Tampilkan Tombol Masuk dan Daftar Baru */
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                className="px-3.5 py-2 text-xs font-bold text-text-primary hover:text-black hover:bg-gray-100/70 rounded-full transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="bg-dark-container text-white text-xs font-bold pl-4 pr-1.5 py-1.5 rounded-full hover:bg-black hover:shadow-md transition-all flex items-center gap-2 group"
              >
                <span>Daftar Baru</span>
                <div className="w-6 h-6 rounded-full bg-brand-neon text-dark-container flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-dark-container" aria-hidden="true" />
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TOMBOL TOGGLE MOBILE & PINTASAN AKUN RINGKAS                              */}
        {/* ========================================================================= */}
        <div className="flex md:hidden items-center gap-2">
          {isNasabah ? (
            <Link
              href="/tukar-poin"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-dark-container text-brand-neon text-xs font-bold"
            >
              <Star className="w-3 h-3 fill-brand-neon" aria-hidden="true" />
              <span>{userPoints}P</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-dark-container text-white text-xs font-bold px-3 py-1.5 rounded-full"
            >
              Masuk
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700 focus:outline-none"
            aria-label="Buka navigasi menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* DRAWER MENU MOBILE RESPONSIVE                                             */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 pb-6 pt-2 border-t border-gray-100 bg-white/95 backdrop-blur-xl flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Daftar Navigasi Mobile */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors ${
                link.isActive
                  ? "bg-inset-gray text-text-primary font-bold"
                  : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Area Aksi Sesi pada Drawer Mobile */}
          <div className="pt-3 mt-1 flex flex-col gap-2 border-t border-gray-100">
            {isLoggedIn ? (
              <>
                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-inset-gray border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-dark-container text-white flex items-center justify-center text-xs font-bold">
                      {currentName.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-text-primary">{currentName}</span>
                  </div>
                  {isNasabah ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {currentPoints} Poin
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-dark-container bg-brand-neon px-2 py-0.5 rounded-full uppercase">
                      Admin
                    </span>
                  )}
                </div>
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 text-center rounded-xl bg-dark-container text-white text-xs font-bold"
                  >
                    Masuk ke Dashboard Admin
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Keluar Sesi</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-full bg-inset-gray text-text-primary text-xs font-bold border border-gray-200"
                >
                  Masuk Akun
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-full bg-brand-neon text-dark-container text-xs font-extrabold"
                >
                  Daftar Baru
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
