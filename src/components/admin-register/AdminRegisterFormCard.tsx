"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import UnitFieldGroups from "./UnitFieldGroups";
import UnitComplianceCheckbox from "./UnitComplianceCheckbox";
import RegisterRoleSegmentSwitcher from "@/components/register/RegisterRoleSegmentSwitcher";
import { useRegisterAdminUnit } from "@/hooks/useRegisterAdminUnit";

type UseRegisterAdminUnitReturn = ReturnType<typeof useRegisterAdminUnit>;

interface AdminRegisterFormCardProps {
  controller: UseRegisterAdminUnitReturn;
}

export default function AdminRegisterFormCard({
  controller,
}: AdminRegisterFormCardProps) {
  const {
    formData,
    errors,
    showPassword,
    showConfirmPassword,
    isSubmitting,
    handleInputChange,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSubmit,
  } = controller;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 border-t-4 border-t-brand-neon p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* 1. Role Segment Switcher (Nasabah vs Admin Unit) */}
      <RegisterRoleSegmentSwitcher activeRole="admin" />

      {/* Form Header */}
      <div className="border-b border-gray-100 pb-6 mb-6">
        <h2 className="text-xl sm:text-[22px] font-bold text-text-primary tracking-tight">
          Formulir Pendaftaran Unit Operasional
        </h2>
        <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
          Pastikan data penanggung jawab valid untuk proses otorisasi penerbitan poin nasabah.
        </p>
      </div>

      {/* Form Element */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Field Groups */}
        <UnitFieldGroups
          formData={formData}
          errors={errors}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          onInputChange={handleInputChange}
          onToggleShowPassword={toggleShowPassword}
          onToggleShowConfirmPassword={toggleShowConfirmPassword}
        />

        {/* Compliance Checkbox */}
        <UnitComplianceCheckbox
          checked={formData.setujuKetentuan}
          error={errors.setujuKetentuan}
          onToggle={() =>
            handleInputChange("setujuKetentuan", !formData.setujuKetentuan)
          }
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

        {/* Submit CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 px-6 sm:px-8 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-sm sm:text-base flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed group"
          >
            <span className="flex items-center gap-2 font-bold">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses Registrasi Unit...</span>
                </>
              ) : (
                <span>Daftarkan Unit Bank Sampah Sekarang</span>
              )}
            </span>

            <div className="w-8 h-8 rounded-full bg-dark-container text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>

        {/* Nasabah Redirection Footer */}
        <div className="text-center pt-3 border-t border-gray-100">
          <p className="text-xs text-text-secondary">
            Nasabah perorangan yang ingin menabung sampah?{" "}
            <Link
              href="/register"
              className="font-semibold text-xs text-text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Registrasi Akun Nasabah di Sini</span>
              <ExternalLink className="w-3 h-3 text-text-primary" />
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
