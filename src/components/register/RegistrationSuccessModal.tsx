"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Home, ShieldCheck } from "lucide-react";
import { RegisterResponse } from "@/types/auth";

interface RegistrationSuccessModalProps {
  isOpen: boolean;
  data: RegisterResponse["data"] | null;
  onClose: () => void;
}

export default function RegistrationSuccessModal({
  isOpen,
  data,
  onClose,
}: RegistrationSuccessModalProps) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center animate-in zoom-in-95 duration-200">
        {/* Animated Check Icon */}
        <div className="w-16 h-16 rounded-full bg-brand-neon/20 border-2 border-brand-neon flex items-center justify-center mx-auto mb-4 text-dark-container">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-text-primary tracking-tight">
          Pendaftaran Berhasil!
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
          Selamat datang di Circula. Rekening tabungan bank sampah digital Anda telah aktif dan siap digunakan.
        </p>

        {/* Account Info Inset Card */}
        <div className="my-5 p-4 rounded-2xl bg-inset-gray border border-gray-200 text-left text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">ID Nasabah</span>
            <span className="font-mono font-bold text-text-primary">
              {data.id}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">Nama Lengkap</span>
            <span className="font-semibold text-text-primary">
              {data.namaLengkap}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <span className="text-text-secondary">Username</span>
            <span className="font-mono font-semibold text-text-primary">
              @{data.username}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Status Rekening</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
              <ShieldCheck className="w-3 h-3" />
              <span>AKTIF</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <Link
            href="/login"
            className="w-full py-3 px-5 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Masuk ke Akun Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-2 pt-1">
            <Link
              href="/"
              className="text-xs font-semibold text-text-secondary hover:text-text-primary inline-flex items-center gap-1 py-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </Link>
            <span className="text-gray-300">•</span>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-text-secondary hover:text-text-primary py-1"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
