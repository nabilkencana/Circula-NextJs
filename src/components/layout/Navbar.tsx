"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, ArrowRight, Menu, X, Star, ChevronDown } from "lucide-react";

interface NavbarProps {
  userRole?: "guest" | "nasabah" | "admin";
  userPoints?: number;
  userName?: string;
  variant?: "default" | "auth";
}

export default function Navbar({
  userRole = "guest",
  userPoints = 150,
  userName = "Budi Santoso",
  variant = "default",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage = variant === "auth" || pathname === "/register";
  const isKatalog = pathname.startsWith("/kategori-sampah");
  const isSetor = pathname === "/setor/ajukan" || pathname === "/setor";
  const isHistori = pathname.startsWith("/histori") || pathname.startsWith("/setor/status");
  const isTukar = pathname.startsWith("/tukar-poin");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80 transition-all">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between"
        aria-label="Navigasi Utama"
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-brand-neon flex items-center justify-center transition-transform group-hover:scale-105 shadow-inner">
            <Leaf className="w-5 h-5 text-dark-container fill-dark-container" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-[0.14em] text-text-primary leading-none">
              CIRCULA
            </span>
            <span className="text-[9px] font-bold tracking-wider text-text-secondary uppercase mt-0.5">
              Bank Sampah Digital
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {isAuthPage ? (
            <>
              <Link
                href="/kategori-sampah"
                className="px-3.5 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-inset-gray font-medium rounded-full transition-colors"
              >
                Katalog Sampah
              </Link>
              <Link
                href="/#panduan-3r"
                className="px-3.5 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-inset-gray font-medium rounded-full transition-colors"
              >
                Panduan 3R
              </Link>
              <Link
                href="/#tentang-kami"
                className="px-3.5 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-inset-gray font-medium rounded-full transition-colors"
              >
                Tentang Kami
              </Link>
              <Link
                href="/#kemitraan"
                className="px-3.5 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-inset-gray font-medium rounded-full transition-colors"
              >
                Kemitraan
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  pathname === "/"
                    ? "text-text-primary font-semibold relative"
                    : "text-text-secondary hover:text-text-primary hover:bg-inset-gray"
                }`}
              >
                Beranda
                {pathname === "/" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-neon rounded-full" />
                )}
              </Link>

              <Link
                href="/kategori-sampah"
                className={`px-3.5 py-1.5 text-xs rounded-full transition-colors ${
                  isKatalog
                    ? "text-text-primary font-semibold relative"
                    : "text-text-secondary hover:text-text-primary hover:bg-inset-gray font-medium"
                }`}
              >
                Katalog Sampah
                {isKatalog && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-neon rounded-full" />
                )}
              </Link>

              <Link
                href="/setor/ajukan"
                className={`px-3.5 py-1.5 text-xs rounded-full transition-colors ${
                  isSetor
                    ? "text-text-primary font-semibold relative"
                    : "text-text-secondary hover:text-text-primary hover:bg-inset-gray font-medium"
                }`}
              >
                Setor Sampah
              </Link>

              <Link
                href="/tukar-poin"
                className={`px-3.5 py-1.5 text-xs rounded-full transition-colors ${
                  isTukar
                    ? "text-text-primary font-semibold relative"
                    : "text-text-secondary hover:text-text-primary hover:bg-inset-gray font-medium"
                }`}
              >
                Tukar Poin
                {isTukar && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-neon rounded-full" />
                )}
              </Link>

              <Link
                href="/histori"
                className={`px-3.5 py-1.5 text-xs rounded-full transition-colors ${
                  isHistori
                    ? "text-text-primary font-semibold relative"
                    : "text-text-secondary hover:text-text-primary hover:bg-inset-gray font-medium"
                }`}
              >
                Histori Setoran
                {isHistori && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-neon rounded-full" />
                )}
              </Link>
            </>
          )}
        </div>

        {/* Right Actions / Account Bar */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* User state preview as seen in Mockup / Role */}
          {userRole === "nasabah" ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-container text-brand-neon text-xs font-bold shadow-sm">
                <Star className="w-3.5 h-3.5 fill-brand-neon" />
                <span>{userPoints} Poin</span>
              </div>
              <div className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-gray-200 bg-inset-gray text-xs font-semibold text-text-primary">
                <div className="w-6 h-6 rounded-full bg-dark-container text-white flex items-center justify-center text-[10px] font-bold">
                  BS
                </div>
                <span>{userName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </div>
            </div>
          ) : isAuthPage ? (
            <>
              <Link
                href="/admin/login"
                className="ghost-pill border border-gray-200 text-xs font-semibold px-4 py-2 rounded-full hover:bg-inset-gray text-text-primary transition-all hover:border-gray-400"
              >
                Portal Admin
              </Link>
              <Link
                href="/login"
                className="border border-dark-container text-dark-container font-bold text-xs px-5 py-2 rounded-full hover:bg-inset-gray transition-all shadow-xs"
              >
                Masuk ke Akun
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/admin/login"
                className="ghost-pill border border-gray-200 text-xs font-semibold px-4 py-2 rounded-full hover:bg-inset-gray text-text-primary transition-all hover:border-gray-400"
              >
                Portal Admin
              </Link>
              <Link
                href="/login"
                className="pill-button bg-dark-container text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-black transition-all hover:shadow-md flex items-center gap-2 group"
              >
                <span>Daftar / Masuk</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-neon group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/login"
            className="bg-dark-container text-white text-xs font-bold px-3 py-1.5 rounded-full"
          >
            Masuk
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 pb-6 pt-2 border-t border-gray-200/80 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
          {isAuthPage ? (
            <>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold py-2 px-3 rounded-xl transition-colors text-text-secondary hover:text-text-primary hover:bg-gray-50"
              >
                Beranda
              </Link>
              <Link
                href="/kategori-sampah"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold py-2 px-3 rounded-xl transition-colors text-text-secondary hover:text-text-primary hover:bg-gray-50"
              >
                Katalog Sampah
              </Link>
              <Link
                href="/#panduan-3r"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold py-2 px-3 rounded-xl transition-colors text-text-secondary hover:text-text-primary hover:bg-gray-50"
              >
                Panduan 3R
              </Link>
              <Link
                href="/#tentang-kami"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold py-2 px-3 rounded-xl transition-colors text-text-secondary hover:text-text-primary hover:bg-gray-50"
              >
                Tentang Kami
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors ${
                  pathname === "/"
                    ? "bg-inset-gray text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
                }`}
              >
                Beranda
              </Link>
              <Link
                href="/kategori-sampah"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors ${
                  isKatalog
                    ? "bg-inset-gray text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
                }`}
              >
                Katalog Sampah
              </Link>
              <Link
                href="/setor/ajukan"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors ${
                  isSetor
                    ? "bg-inset-gray text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
                }`}
              >
                Setor Sampah
              </Link>
              <Link
                href="/tukar-poin"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors ${
                  isTukar
                    ? "bg-inset-gray text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
                }`}
              >
                Tukar Poin
              </Link>
              <Link
                href="/histori"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors ${
                  isHistori
                    ? "bg-inset-gray text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
                }`}
              >
                Histori Setoran
              </Link>
            </>
          )}
          <div className="pt-3 mt-1 flex flex-col gap-2 border-t border-gray-100">
            <Link
              href="/admin/login"
              className="w-full text-center border border-gray-200 text-xs font-semibold py-2.5 rounded-full hover:bg-gray-50 text-text-primary"
            >
              Portal Admin Unit
            </Link>
            <Link
              href={isAuthPage ? "/login" : "/register"}
              className="w-full text-center bg-brand-neon text-text-primary text-xs font-bold py-2.5 rounded-full hover:bg-brand-neon-hover shadow-sm"
            >
              {isAuthPage ? "Masuk ke Akun" : "Mulai Tabung Sampah"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
