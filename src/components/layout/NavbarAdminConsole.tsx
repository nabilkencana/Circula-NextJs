/**
 * @file NavbarAdminConsole.tsx
 * @description Header navigasi khusus antarmuka panel kendali administrator unit bank sampah (Admin Console).
 * Diselaraskan sepenuhnya dengan estetika, layout, dan interaktivitas Navbar utama Circula:
 * - Menampilkan brand identitas Circula dengan badge admin dan nama unit operasional riil.
 * - Mengambil data sesi admin aktif dan profil unit secara live dari localStorage/API (tanpa data dummy).
 * - Tautan navigasi modul lengkap (Dashboard, Transaksi Setor, Data Nasabah, Kategori Sampah, Katalog Hadiah, Laporan).
 * - Lencana unit bank sampah interaktif yang mengarah langsung ke `/admin/profil`.
 * - Dropdown menu profil administrator (Profil Unit, Portal Publik, dan Keluar Sesi).
 * - Menu drawer responsif untuk perangkat mobile dengan penanda rute aktif.
 * 
 * @module Components/Layout/NavbarAdminConsole
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  LogOut,
  Menu,
  X,
  Building2,
  User,
  ChevronDown,
  Settings,
  ExternalLink,
} from "lucide-react";
import { getCurrentUser, logout } from "@/services/authService";
import { getUnitProfil } from "@/services/adminProfilService";
import { UserSessionData } from "@/types/auth";

/**
 * Komponen NavbarAdminConsole
 * 
 * @component
 * @returns {JSX.Element} Header navigasi konsol admin yang selaras dengan tema Circula.
 */
export default function NavbarAdminConsole() {
  // State buka/tutup menu drawer seluler
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State buka/tutup menu dropdown profil
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  // Data pengguna aktif dari sesi otentikasi
  const [sessionUser, setSessionUser] = useState<UserSessionData | null>(null);
  // Nama unit bank sampah riil dari database/profil
  const [unitNama, setUnitNama] = useState<string>("");
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mengambil identitas admin dan profil unit riil dari sistem
  useEffect(() => {
    // 1. Baca sesi admin yang sedang login
    const user = getCurrentUser();
    if (user) {
      setSessionUser(user);
      if (user.adminBank?.namaUnit) {
        setUnitNama(user.adminBank.namaUnit);
      }
    }

    // 2. Ambil profil unit terbaru dari backend / cache profil
    getUnitProfil()
      .then((res) => {
        if (res && res.namaUnit) {
          setUnitNama(res.namaUnit);
        }
      })
      .catch(() => {});

    // 3. Listener untuk event update profil atau perubahan storage
    const handleSync = () => {
      const updatedUser = getCurrentUser();
      if (updatedUser) {
        setSessionUser(updatedUser);
        if (updatedUser.adminBank?.namaUnit) {
          setUnitNama(updatedUser.adminBank.namaUnit);
        }
      }
      getUnitProfil()
        .then((res) => {
          if (res && res.namaUnit) {
            setUnitNama(res.namaUnit);
          }
        })
        .catch(() => {});
    };

    window.addEventListener("storage", handleSync);
    window.addEventListener("circula_profile_updated", handleSync);

    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("circula_profile_updated", handleSync);
    };
  }, []);

  // Menutup dropdown profil saat klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  // Menutup menu mobile & dropdown saat rute berpindah
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  // Handler logout resmi dari authService
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  // Nama unit riil dengan fallback terstandarisasi (bukan data dummy statis)
  const unitName =
    unitNama ||
    sessionUser?.adminBank?.namaUnit ||
    "Unit Bank Sampah Circula";

  // Nama pengelola admin aktif
  const adminName =
    sessionUser?.namaLengkap ||
    sessionUser?.adminBank?.namaPengelola ||
    sessionUser?.username ||
    "Administrator Unit";

  // Inisial untuk avatar profil
  const initials = adminName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "AD";

  // Konfigurasi tautan modul admin console dengan status rute aktif
  const adminLinks = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      isActive: pathname === "/admin/dashboard",
    },
    {
      name: "Transaksi Setor",
      href: "/admin/transaksi",
      isActive: pathname.startsWith("/admin/transaksi"),
    },
    {
      name: "Data Nasabah",
      href: "/admin/nasabah",
      isActive: pathname.startsWith("/admin/nasabah"),
    },
    {
      name: "Kategori Sampah",
      href: "/admin/kategori-sampah",
      isActive: pathname.startsWith("/admin/kategori-sampah"),
    },
    {
      name: "Katalog Hadiah",
      href: "/admin/hadiah",
      isActive: pathname.startsWith("/admin/hadiah"),
    },
    {
      name: "Laporan",
      href: "/admin/laporan",
      isActive: pathname.startsWith("/admin/laporan"),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100/90 transition-all shadow-[0_1px_12px_rgba(0,0,0,0.02)] mb-4 sm:mb-6">
      <nav
        aria-label="Navigasi Konsol Admin Circula"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        {/* ========================================================================= */}
        {/* 1. BRAND LOGO DAN IDENTITAS KONSOL ADMIN (SELARAS DENGAN NAVBAR UTAMA)    */}
        {/* ========================================================================= */}
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2.5 group shrink-0"
        >
          {/* Lingkaran Logo Tema Circula Gelap + Daun Neon */}
          <div className="w-8 h-8 rounded-full bg-[#111315] flex items-center justify-center text-[#CEF241] shadow-xs group-hover:scale-105 transition-transform shrink-0">
            <Leaf className="w-4 h-4 fill-[#CEF241]" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wider text-gray-900 leading-none uppercase">
                CIRCULA
              </span>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-[#111315] text-[#CEF241] leading-none uppercase tracking-wider">
                ADMIN
              </span>
            </div>
            <span className="text-[8px] font-bold tracking-wider text-gray-500 uppercase mt-0.5 max-w-44 truncate">
              {unitName}
            </span>
          </div>
        </Link>

        {/* ========================================================================= */}
        {/* 2. TAUTAN NAVIGASI DESKTOP DENGAN INDIKATOR GARIS NEON AKTIF              */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative py-1 text-xs font-semibold transition-colors duration-150 whitespace-nowrap ${
                link.isActive
                  ? "text-gray-900 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.name}
              {/* Indikator pil garis aktif di bagian bawah link */}
              {link.isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#CEF241] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 3. AREA KANAN: BADGE UNIT RIIL, DROPDOWN PROFIL ADMIN, & LOGOUT           */}
        {/* ========================================================================= */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* Lencana Identitas Unit Bank Sampah Riil (Tautan ke Profil Unit) */}
          <Link
            href="/admin/profil"
            title="Pengaturan Profil Unit Bank Sampah"
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-inset-gray border border-gray-200/80 hover:border-gray-300 hover:bg-gray-100/80 text-xs font-bold text-gray-900 shadow-2xs transition-all group"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200 group-hover:scale-105 transition-transform">
              <Building2 className="w-3 h-3" aria-hidden="true" />
            </div>
            <span className="max-w-40 truncate">{unitName}</span>
          </Link>

          {/* Tombol Pembuka Dropdown Akun Profil Admin */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProfileDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-gray-200/80 bg-white hover:bg-gray-50 shadow-2xs text-xs font-bold text-gray-900 transition-all cursor-pointer"
              aria-expanded={profileDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-6 h-6 rounded-full bg-[#111315] text-[#CEF241] flex items-center justify-center font-bold text-[10px] shadow-inner">
                {initials}
              </div>
              <span className="max-w-28 truncate">{adminName}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-150 ${
                  profileDropdownOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Popover Dropdown Profil Akun Administrator */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-2.5 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-900 truncate">
                    {adminName}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-bold uppercase mt-0.5">
                    Admin Unit Operasional
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium truncate mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{unitName}</span>
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    href="/admin/profil"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-gray-400" />
                    <span>Pengaturan Profil Unit</span>
                  </Link>

                  <Link
                    href="/"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                    <span>Lihat Portal Publik</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Keluar Sesi</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. TOMBOL TOGGLE MENU MOBILE (HAMBURGER)                                   */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Badge Unit Ringkas Mobile */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-inset-gray border border-gray-200 text-[11px] font-bold text-gray-900 max-w-36 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">{unitName}</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700 focus:outline-none cursor-pointer"
            aria-label="Toggle menu admin"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 5. DRAWER MENU MOBILE RESPONSIVE                                          */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 pb-6 pt-2 border-t border-gray-100 bg-white/95 backdrop-blur-xl flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Card Info Unit & Admin di Mobile Drawer */}
          <div className="py-2.5 px-3 mb-1 bg-inset-gray rounded-2xl border border-gray-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#111315] text-[#CEF241] flex items-center justify-center font-bold text-[10px] shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {adminName}
                </p>
                <p className="text-[10px] text-gray-500 truncate">{unitName}</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full shrink-0">
              Admin Aktif
            </span>
          </div>

          {/* Render daftar link modul admin */}
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${
                link.isActive
                  ? "bg-dark-container text-white font-bold"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span>{link.name}</span>
              {link.isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#CEF241]" />
              )}
            </Link>
          ))}

          {/* Tautan ke Pengaturan Profil Unit */}
          <Link
            href="/admin/profil"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 py-2.5 px-3 rounded-xl flex items-center gap-2"
          >
            <Settings className="w-4 h-4 text-gray-500" />
            <span>Pengaturan Profil Unit</span>
          </Link>

          {/* Tautan ke Portal Publik */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 py-2.5 px-3 rounded-xl flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-gray-500" />
            <span>Lihat Portal Publik</span>
          </Link>

          {/* Tombol Logout pada Drawer Mobile */}
          <div className="pt-2 mt-1 border-t border-gray-100">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left text-xs font-bold text-red-600 hover:bg-red-50 py-2.5 px-3 rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Konsol Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
