"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import ProfilePhotoUploadZone from "./ProfilePhotoUploadZone";
import RegistrationFieldGroups from "./RegistrationFieldGroups";
import TermsComplianceCheckbox from "./TermsComplianceCheckbox";
import RegisterRoleSegmentSwitcher from "./RegisterRoleSegmentSwitcher";
import { useRegisterNasabah } from "@/hooks/useRegisterNasabah";

type UseRegisterNasabahReturn = ReturnType<typeof useRegisterNasabah>;

interface RegisterFormCardProps {
  controller: UseRegisterNasabahReturn;
}

export default function RegisterFormCard({ controller }: RegisterFormCardProps) {
  const {
    formData,
    errors,
    avatarPreview,
    isSubmitting,
    handleInputChange,
    handleInputBlur,
    handleTermsToggle,
    handleAvatarChange,
    handleAvatarRemove,
    handleSubmit,
  } = controller;

  return (
    <div className="w-full bg-white rounded-4xl border border-gray-200/80 p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl shadow-gray-200/40 flex flex-col justify-between min-h-145 lg:min-h-160">
      <div>
        {/* 1. Role Segment Switcher (Capsule Pill) */}
        <RegisterRoleSegmentSwitcher activeRole="nasabah" />

        {/* 2. Welcome Headline */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Pendaftaran Nasabah Baru
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
            Lengkapi data identitas di bawah ini untuk membuka rekening tabungan sampah digital dan mulai kumpulkan saldo poin rewards.
          </p>
        </div>

        {/* Global Submit Error Banner */}
        {errors.submit && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 mb-5 animate-in fade-in duration-150">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-red-700 font-medium leading-relaxed">
              {errors.submit}
            </p>
          </div>
        )}

        {/* 3. Form Element */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Avatar Upload */}
          <ProfilePhotoUploadZone
            avatarPreview={avatarPreview}
            error={errors.fotoProfil}
            onAvatarChange={handleAvatarChange}
            onAvatarRemove={handleAvatarRemove}
          />

          {/* Form Input Groups */}
          <RegistrationFieldGroups
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onInputBlur={handleInputBlur}
          />

          {/* Terms Compliance Checkbox */}
          <TermsComplianceCheckbox
            checked={formData.setujuKetentuan}
            error={errors.setujuKetentuan}
            onToggle={handleTermsToggle}
          />

          {/* 4. Primary Neon Submit CTA Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 px-6 rounded-full bg-brand-neon hover:opacity-95 text-black font-extrabold text-sm sm:text-base flex items-center justify-between transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2.5 w-full">
                  <Loader2 className="w-5 h-5 animate-spin text-black" />
                  <span className="font-bold">Memproses Pendaftaran...</span>
                </div>
              ) : (
                <>
                  <span className="font-extrabold text-sm sm:text-base text-gray-950 pl-2">
                    Daftar Akun Nasabah Sekarang
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </>
              )}
            </button>
          </div>

          {/* 5. ATAU Divider */}
          <div className="relative flex py-4 items-center">
            <div className="grow border-t border-gray-200" />
            <span className="shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
              ATAU
            </span>
            <div className="grow border-t border-gray-200" />
          </div>

          {/* 6. Bottom Redirect Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs pt-1">
            <div className="text-gray-600">
              Sudah memiliki akun?{" "}
              <Link
                href="/login"
                className="font-bold text-gray-950 underline hover:text-black transition-colors"
              >
                Masuk ke Akun
              </Link>
            </div>
            <Link
              href="/admin/register"
              className="px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Daftarkan Unit Bank Sampah</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
