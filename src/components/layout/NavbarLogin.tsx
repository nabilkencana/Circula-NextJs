"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf, Menu, X } from "lucide-react";

export default function NavbarLogin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6">
      <nav
        className="max-w-7xl mx-auto my-3 sm:my-4 bg-white/85 backdrop-blur-md border border-gray-200 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-xs transition-all"
        aria-label="Navigasi Login"
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-dark-container text-brand-neon flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
            <Leaf className="w-4 h-4 fill-brand-neon" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xs sm:text-sm tracking-tight text-text-primary leading-none">
              Circula Bank Sampah
            </span>
            <span className="text-[8px] font-bold tracking-widest text-text-secondary uppercase mt-0.5">
              Ekosistem Daur Ulang Digital
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
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
            Panduan Pemilahan
          </Link>
          <Link
            href="/#bantuan"
            className="px-3.5 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-inset-gray font-medium rounded-full transition-colors"
          >
            Bantuan
          </Link>
        </div>

        {/* Right Action Button */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
            href="/register"
            className="border border-text-primary text-text-primary font-bold text-xs px-5 py-2 rounded-full hover:bg-inset-gray transition-all shadow-xs"
          >
            Daftar Akun Baru
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/register"
            className="border border-text-primary text-text-primary font-bold text-[11px] px-3 py-1.5 rounded-full hover:bg-inset-gray"
          >
            Daftar
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto px-4 py-3 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 mt-2 shadow-lg flex flex-col gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
          <Link
            href="/kategori-sampah"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold py-2 px-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-gray-50"
          >
            Katalog Sampah
          </Link>
          <Link
            href="/#panduan-3r"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold py-2 px-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-gray-50"
          >
            Panduan Pemilahan
          </Link>
          <Link
            href="/#bantuan"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold py-2 px-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-gray-50"
          >
            Bantuan
          </Link>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/register"
              className="w-full text-center block bg-brand-neon text-text-primary text-xs font-bold py-2.5 rounded-full shadow-xs"
            >
              Daftar Akun Nasabah Baru
            </Link>
            <Link
              href="/admin/register"
              className="w-full text-center block border border-gray-200 text-text-primary text-xs font-semibold py-2 rounded-full hover:bg-gray-50"
            >
              Registrasi Unit Bank Sampah
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
