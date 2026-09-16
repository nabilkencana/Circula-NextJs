"use client";

import React from "react";
import UnitPlangUploadZone from "./UnitPlangUploadZone";
import UnitProfileFieldGroups from "./UnitProfileFieldGroups";
import ProfilFormActions from "./ProfilFormActions";
import { useAdminProfil } from "@/hooks/useAdminProfil";

type UseAdminProfilReturn = ReturnType<typeof useAdminProfil>;

interface ProfilFormCardProps {
  controller: UseAdminProfilReturn;
}

export default function ProfilFormCard({ controller }: ProfilFormCardProps) {
  const {
    unitData,
    formData,
    logoPreview,
    isDirty,
    isSaving,
    handleInputChange,
    handleLogoUpload,
    handleReset,
    handleSubmit,
  } = controller;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 border-t-4 border-t-brand-neon p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* Form Header */}
      <div className="border-b border-gray-100 pb-5 mb-6">
        <h2 className="text-xl sm:text-[22px] font-bold text-text-primary tracking-tight">
          Informasi Detail Unit Bank Sampah
        </h2>
        <p className="text-xs text-text-secondary mt-1 leading-relaxed">
          Perubahan data akan otomatis diperbarui pada nota transaksi dan struk nasabah.
        </p>
      </div>

      {/* Form Element */}
      <form onSubmit={handleSubmit}>
        {/* Plang Upload Zone */}
        <UnitPlangUploadZone
          logoPreview={logoPreview}
          onLogoUpload={handleLogoUpload}
        />

        {/* Form Fields */}
        <UnitProfileFieldGroups
          formData={formData}
          onInputChange={handleInputChange}
        />

        {/* Action Buttons & Status */}
        <ProfilFormActions
          isSaving={isSaving}
          isDirty={isDirty}
          terakhirDisimpan={unitData?.terakhirDisimpan}
          onReset={handleReset}
        />
      </form>
    </div>
  );
}
