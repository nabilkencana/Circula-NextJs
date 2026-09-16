"use client";

import React from "react";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import RoleSegmentSwitcher from "./RoleSegmentSwitcher";
import RoleContextCallout from "./RoleContextCallout";
import LoginInputFields from "./LoginInputFields";
import LoginUtilitiesRow from "./LoginUtilitiesRow";
import OnboardingRedirectLinks from "./OnboardingRedirectLinks";
import { useLoginMultiRole } from "@/hooks/useLoginMultiRole";

type UseLoginMultiRoleReturn = ReturnType<typeof useLoginMultiRole>;

interface LoginFormCardProps {
  controller: UseLoginMultiRoleReturn;
}

export default function LoginFormCard({ controller }: LoginFormCardProps) {
  const {
    selectedRole,
    username,
    password,
    rememberMe,
    showPassword,
    errors,
    isLoading,
    setSelectedRole,
    toggleShowPassword,
    handleRememberMeToggle,
    handleInputChange,
    handleLoginSubmit,
  } = controller;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 border-t-4 border-t-brand-neon p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* 1. Role Segment Switcher */}
      <RoleSegmentSwitcher
        activeRole={selectedRole}
        onRoleChange={setSelectedRole}
      />

      {/* 2. Role Context Callout */}
      <RoleContextCallout role={selectedRole} />

      {/* Global Error Banner */}
      {errors.submit && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 mb-5">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-xs text-red-700 font-medium leading-relaxed">
            {errors.submit}
          </p>
        </div>
      )}

      {/* 3. Form Inputs */}
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <LoginInputFields
          role={selectedRole}
          username={username}
          password={password}
          showPassword={showPassword}
          errors={errors}
          onInputChange={handleInputChange}
          onToggleShowPassword={toggleShowPassword}
        />

        {/* 4. Utilities Row (Remember Me & Forgot Password) */}
        <LoginUtilitiesRow
          rememberMe={rememberMe}
          onRememberMeToggle={handleRememberMeToggle}
        />

        {/* 5. Submit CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-13 px-6 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Memverifikasi Kredensial...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Sistem</span>
                <div className="w-7 h-7 rounded-full bg-dark-container text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </>
            )}
          </button>
        </div>

        {/* 6. Onboarding Redirect Links */}
        <OnboardingRedirectLinks />
      </form>
    </div>
  );
}
