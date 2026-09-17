"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, ArrowRight, Menu, X, Star, ChevronDown, LogOut } from "lucide-react";
import { getCurrentUser, logout } from "@/services/authService";
import { getSaldoNasabah } from "@/services/tukarPoinService";
import { getToken } from "@/lib/api/client";
import { UserSessionData } from "@/types/auth";

export interface NavbarProps {
  userRole?: "guest" | "nasabah" | "admin";
  userPoints?: number;
  userName?: string;
  variant?: "default" | "auth";
}

export default function Navbar({
  userRole,
  userPoints,
  userName,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState<UserSessionData | null>(null);
  const [livePoints, setLivePoints] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleAuthInvalid = () => {
      setSessionUser(null);
      setLivePoints(null);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("circula_auth_invalidated", handleAuthInvalid);
    }

    const user = getCurrentUser();
    if (user && getToken()) {
      setSessionUser(user);
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

  const isNasabah = userRole === "nasabah" || (sessionUser?.role === "NASABAH");
  const isAdmin = userRole === "admin" || (sessionUser?.role === "ADMIN");
  const currentPoints = livePoints ?? (userPoints ?? 0);
  const currentName = sessionUser?.namaLengkap || sessionUser?.username || userName || "Nasabah";

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const navLinks = [
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
      isActive: pathname.startsWith("/histori") || pathname.startsWith("/setor/status"),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80 transition-all">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between"
        aria-label="Navigasi Utama Circula"
      >
        {/* Brand Logo & Typography */}
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

        {/* Desktop Navigation Links — 100% Consistent Across All Pages */}
        <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 text-xs rounded-full transition-colors relative ${
                link.isActive
                  ? "text-text-primary font-bold"
                  : "text-text-secondary hover:text-text-primary hover:bg-inset-gray font-medium"
              }`}
            >
              {link.name}
              {link.isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-neon rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Actions / Account Bar — 100% Consistent Across All Pages */}
        <div className="hidden sm:flex items-center gap-2.5">
          {isNasabah || isAdmin ? (
            <div className="relative flex items-center gap-2">
              {isNasabah && (
                <Link
                  href="/tukar-poin"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-container text-brand-neon text-xs font-bold shadow-sm hover:opacity-95 transition-opacity"
                >
                  <Star className="w-3.5 h-3.5 fill-brand-neon" />
                  <span>{currentPoints} Poin</span>
                </Link>
              )}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-gray-200 bg-inset-gray text-xs font-semibold text-text-primary hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-dark-container text-white flex items-center justify-center text-[10px] font-bold">
                    {currentName.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="max-w-30 truncate">{currentName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-text-primary truncate">{currentName}</p>
                      <p className="text-[10px] text-text-secondary uppercase font-semibold">
                        {isNasabah ? "Nasabah" : "Admin Unit"}
                      </p>
                    </div>
                    {isAdmin && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-3.5 py-2 text-xs font-semibold text-text-primary hover:bg-gray-50 transition-colors"
                      >
                        Dashboard Admin
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar Sesi</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="pill-button bg-dark-container text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-black transition-all hover:shadow-md flex items-center gap-2 group"
            >
              <span>Daftar / Masuk</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-neon group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button & Quick Auth Trigger */}
        <div className="flex md:hidden items-center gap-2">
          {isNasabah ? (
            <Link
              href="/tukar-poin"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-dark-container text-brand-neon text-xs font-bold"
            >
              <Star className="w-3 h-3 fill-brand-neon" />
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
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu — 100% Consistent Across All Pages */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 pb-6 pt-2 border-t border-gray-200/80 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
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

          {/* Drawer Actions */}
          <div className="pt-3 mt-1 flex flex-col gap-2 border-t border-gray-100">
            {isNasabah || isAdmin ? (
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
                  <LogOut className="w-3.5 h-3.5" />
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
