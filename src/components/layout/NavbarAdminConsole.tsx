/**
 * @file NavbarAdminConsole.tsx
 * @description Header navigasi khusus antarmuka panel kendali administrator unit bank sampah (Admin Console).
 * Menampilkan menu navigasi modul operasional (Dashboard, Transaksi Setor, Data Nasabah, Kategori Sampah,
 * Katalog Hadiah, dan Laporan Bulanan), indikator identitas unit aktif (misal: Unit Bank Sampah Asri Jaya),
 * serta tombol aksi keluar sesi (Logout) dengan dukungan menu drawer responsif untuk perangkat seluler.
 * 
 * @module Components/Layout/NavbarAdminConsole
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, LogOut, Menu, X, Building2 } from "lucide-react";

/**
 * Komponen NavbarAdminConsole
 * 
 * @component
 * @returns {JSX.Element} Header navigasi khusus area admin dengan efek glassmorphism dan penanda rute aktif.
 */
export default function NavbarAdminConsole() {
  // State untuk kendali buka/tutup menu drawer pada perangkat mobile/tablet kecil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Konfigurasi tautan menu navigasi konsol admin dengan status rute aktif
  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard", isActive: pathname === "/admin/dashboard" },
    { name: "Transaksi Setor", href: "/admin/transaksi", isActive: pathname === "/admin/transaksi" },
    { name: "Data Nasabah", href: "/admin/nasabah", isActive: pathname === "/admin/nasabah" },
    { name: "Kategori Sampah", href: "/admin/kategori-sampah", isActive: pathname === "/admin/kategori-sampah" },
    { name: "Katalog Hadiah", href: "/admin/hadiah", isActive: pathname === "/admin/hadiah" },
    { name: "Laporan", href: "/admin/laporan", isActive: pathname === "/admin/laporan" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80 transition-all mb-4 sm:mb-6">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between"
        aria-label="Navigasi Konsol Admin Circula"
      >
        {/* ========================================================================= */}
        {/* LOGO DAN IDENTITAS KONSOL ADMIN                                           */}
        {/* ========================================================================= */}
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-full bg-brand-neon flex items-center justify-center transition-transform group-hover:scale-105 shadow-inner shrink-0">
            <Leaf className="w-4 h-4 text-dark-container fill-dark-container" aria-hidden="true" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm tracking-wider text-text-primary whitespace-nowrap">
            CIRCULA ADMIN CONSOLE
          </span>
        </Link>

        {/* ========================================================================= */}
        {/* TAUTAN NAVIGASI DESKTOP DENGAN INDIKATOR RUTE AKTIF                       */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3.5 py-1.5 text-xs rounded-full transition-colors relative whitespace-nowrap ${
                link.isActive
                  ? "text-text-primary font-bold"
                  : "text-text-secondary hover:text-text-primary hover:bg-inset-gray font-medium"
              }`}
            >
              {link.name}
              {/* Indikator pil garis aktif di bagian bawah link */}
              {link.isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-neon rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* AREA KANAN: BADGE UNIT OPERASIONAL & TOMBOL LOGOUT                        */}
        {/* ========================================================================= */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* Lencana Identitas Unit Bank Sampah Terdaftar */}
          <div className="bg-inset-gray border border-gray-200 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-text-primary shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" />
            <span>Bank Sampah Asri Jaya</span>
          </div>

          {/* Tombol Aksi Keluar Sesi Konsol */}
          <Link
            href="/login"
            title="Keluar dari Konsol Admin"
            className="btn-interactive w-8 h-8 rounded-full border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-text-secondary flex items-center justify-center transition-all active:scale-95 shadow-2xs"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* TOMBOL TOGGLE MENU MOBILE (HAMBURGER)                                     */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-inset-gray border border-gray-200 text-[11px] font-bold text-text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Asri Jaya</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700 focus:outline-none"
            aria-label="Toggle menu admin"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* DRAWER MENU MOBILE RESPONSIVE                                             */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 pb-6 pt-2 border-t border-gray-200/80 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="py-2 mb-1 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
              <Building2 className="w-3.5 h-3.5 text-gray-500" />
              <span>Unit Bank Sampah Asri Jaya</span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              Aktif
            </span>
          </div>

          {/* Render daftar link modul admin */}
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors flex items-center justify-between ${
                link.isActive
                  ? "bg-inset-gray text-text-primary font-bold"
                  : "text-text-secondary hover:text-text-primary hover:bg-inset-gray"
              }`}
            >
              <span>{link.name}</span>
              {link.isActive && (
                <span className="w-2 h-2 rounded-full bg-brand-neon" />
              )}
            </Link>
          ))}

          {/* Tombol Logout pada Drawer Mobile */}
          <div className="pt-3 mt-1 border-t border-gray-100">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-red-600 hover:bg-red-50 py-2 px-3 rounded-xl flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Konsol Admin</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
