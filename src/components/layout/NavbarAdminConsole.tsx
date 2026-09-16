"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, LogOut, Menu, X, Building2 } from "lucide-react";

export default function NavbarAdminConsole() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard", isActive: pathname === "/admin/dashboard" },
    { name: "Transaksi Setor", href: "/admin/transaksi", isActive: pathname === "/admin/transaksi" },
    { name: "Data Nasabah", href: "/admin/nasabah", isActive: pathname === "/admin/nasabah" },
    { name: "Kategori Sampah", href: "/admin/kategori-sampah", isActive: pathname === "/admin/kategori-sampah" },
    { name: "Katalog Hadiah", href: "/admin/hadiah", isActive: pathname === "/admin/hadiah" },
    { name: "Laporan", href: "/admin/laporan", isActive: pathname === "/admin/laporan" },
    { name: "Profil Unit", href: "/admin/profil", isActive: pathname === "/admin/profil" },
  ];

  return (
    <header className="sticky top-3 z-50 w-full px-4 sm:px-6 lg:px-8 mb-2">
      {/* Floating Single Pill Navbar */}
      <nav
        className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs transition-all"
        aria-label="Navigasi Konsol Admin"
      >
        {/* Brand Console Logo */}
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-brand-neon flex items-center justify-center transition-transform group-hover:scale-105 shadow-inner">
            <Leaf className="w-4 h-4 text-dark-container fill-dark-container" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm tracking-wider text-text-primary uppercase leading-none">
            CIRCULA ADMIN CONSOLE
          </span>
        </Link>

        {/* Center Admin Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {adminLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors relative whitespace-nowrap ${
                link.isActive
                  ? "text-text-primary font-bold"
                  : "text-text-secondary hover:text-text-primary hover:bg-gray-50 font-medium"
              }`}
            >
              {link.name}
              {link.isActive && (
                <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-brand-neon rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Section: Active Unit Badge & Logout Action */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* Unit Status Pill */}
          <div className="bg-inset-gray border border-gray-200 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-text-primary shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-gray-500" />
            <span>Bank Sampah Asri Jaya</span>
            <span className="w-2 h-2 rounded-full bg-brand-neon-hover shadow-[0_0_6px_#D4E836]" />
          </div>

          {/* Logout Action */}
          <Link
            href="/login"
            title="Keluar dari Konsol Admin"
            className="w-8 h-8 rounded-full border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-text-secondary flex items-center justify-center transition-colors shadow-2xs"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-inset-gray border border-gray-200 text-[11px] font-bold text-text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Asri Jaya</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 focus:outline-none"
            aria-label="Toggle menu admin"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto mt-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-3xl p-4 shadow-lg flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
          {adminLinks.map((link) => (
            <Link
              key={link.name}
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

          <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-text-secondary font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Unit Bank Sampah Asri Jaya</span>
            </div>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
