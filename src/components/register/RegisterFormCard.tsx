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
    <div className="bg-white rounded-3xl border border-gray-200 border-t-4 border-t-brand-neon p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* 1. Role Segment Switcher (Nasabah vs Admin Unit) */}
      <RegisterRoleSegmentSwitcher activeRole="nasabah" />

      {/* Header Section */}
      <div className="border-b border-gray-100 pb-6 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
          Pendaftaran Nasabah Baru
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
          Lengkapi data identitas di bawah ini untuk membuka rekening tabungan sampah digital
          dan mulai kumpulkan saldo poin rewards.
        </p>
      </div>

      {/* Form Element */}
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Global Submit Error Banner */}
        {errors.submit && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 font-medium leading-relaxed">
              {errors.submit}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-sm sm:text-base flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed group"
          >
            <span className="flex items-center gap-2 font-bold">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses Pendaftaran...</span>
                </>
              ) : (
                <span>Daftar Akun Nasabah Sekarang</span>
              )}
            </span>

            <div className="w-8 h-8 rounded-full bg-dark-container text-brand-neon flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Bottom Redirect to Login */}
        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-xs text-text-secondary">
            Sudah memiliki akun nasabah?{" "}
            <Link
              href="/login"
              className="text-text-primary font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Masuk ke Akun</span>
              <ArrowRight className="w-3 h-3 text-text-primary" />
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
