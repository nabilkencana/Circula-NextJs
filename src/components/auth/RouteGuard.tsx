"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "@/lib/api/client";
import { getCurrentUser } from "@/services/authService";

/**
 * RouteGuard — UX auth boundary (client-side).
 * Pakai localStorage-based session (token/role) karena auth app ini
 * tersimpan di localStorage, jadi guard tidak bisa di middleware (cookie-only).
 *
 * Aturan:
 *  - /, /login, /register  -> publik, bebasa akses.
 *  - /admin/*              -> wajib login + role ADMIN, selain itu => /login.
 *  - sisanya (histori, setor, tukar, kategori, nota) -> wajib login.
 *  - tak login => redirect /login (dengan ?next= untuk balik setelah login).
 */

const PUBLIC_PATHS = ["/", "/login", "/register", "/admin/register", "/kategori-sampah"];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isAdminPath(pathname: string): boolean {
  return pathname.startsWith("/admin") && pathname !== "/admin/register";
}

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = getToken();
    const user = getCurrentUser();

    if (isPublic(pathname)) {
      setAuthorized(true);
      return;
    }

    // Tak login -> lempar ke halaman login, bawa next utk kembali.
    if (!token || !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      setAuthorized(false);
      return;
    }

    // Admin page butiruh role ADMIN.
    if (isAdminPath(pathname) && user.role !== "ADMIN") {
      router.replace("/login?next=" + encodeURIComponent(pathname));
      setAuthorized(false);
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (!authorized) {
    // Blocker render — cegah flash konten prot  sebelum redirect diproses.
    return (
      <div className="min-h-screen bg-surface-card flex items-center justify-center">
        <div className="flex items-center gap-3 text-text-secondary">
          <span className="w-5 h-5 border-2 border-brand-neon border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold">Mengalihkan...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
