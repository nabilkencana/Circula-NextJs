"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, ShieldCheck, Home } from "lucide-react";
import { UserSessionData } from "@/types/auth";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState<number>(3);

  const isNasabah = user?.role === "NASABAH";
  const next = searchParams.get("next");
  const fallback = isNasabah ? "/setor/ajukan" : "/admin/dashboard";
  const targetRedirect = next && next.startsWith("/") ? next : fallback;

  useEffect(() => {
    if (!isOpen || !user) return;

    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push(targetRedirect);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, user, targetRedirect, router]);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center animate-in zoom-in-95 duration-200">
        {/* Animated Check Icon */}
        <div className="w-16 h-16 rounded-full bg-brand-neon/20 border-2 border-brand-neon flex items-center justify-center mx-auto mb-4 text-dark-container">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-text-primary tracking-tight">
          Autentikasi Berhasil!
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
          {isNasabah
            ? `Selamat datang kembali, ${user.namaLengkap || user.username}. Sesi nasabah Anda telah terhubung.`
            : `Selamat datang kembali, Admin ${user.adminBank?.namaUnit || user.username}. Sesi konsol operasional aktif.`}
        </p>

        {/* User Session Inset Card */}
        <div className="my-5 p-4 rounded-2xl bg-inset-gray border border-gray-200 text-left text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">Peran Akses</span>
            <span className="inline-flex items-center gap-1 font-bold text-dark-container bg-brand-neon/40 px-2 py-0.5 rounded-full text-[10px]">
              <ShieldCheck className="w-3 h-3" />
              <span>{isNasabah ? "NASABAH" : "ADMIN UNIT"}</span>
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">ID Akun</span>
            <span className="font-mono font-bold text-text-primary">
              {user.id}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">Username</span>
            <span className="font-mono font-semibold text-text-primary">
              @{user.username}
            </span>
          </div>

          {user.adminBank && (
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-text-secondary">Unit Operasional</span>
              <span className="font-semibold text-text-primary text-right max-w-50 truncate">
                {user.adminBank.namaUnit}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Status Sesi</span>
            <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
              TERVERIFIKASI AKTIF
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Link
            href={targetRedirect}
            className="w-full py-3 px-5 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>
              {isNasabah ? "Lanjut ke Form Setor Sampah" : "Lanjut ke Dashboard Admin"} ({countdown}s)
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[11px] text-text-secondary text-center">
            Mengalihkan otomatis ke halaman tujuan dalam {countdown} detik...
          </p>

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
