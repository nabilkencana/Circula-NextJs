"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Camera, Upload, Trash2, User } from "lucide-react";

interface ProfilePhotoUploadZoneProps {
  avatarPreview: string | null;
  error?: string;
  onAvatarChange: (file: File | null) => void;
  onAvatarRemove: () => void;
}

export default function ProfilePhotoUploadZone({
  avatarPreview,
  error,
  onAvatarChange,
  onAvatarRemove,
}: ProfilePhotoUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onAvatarChange(file);
    // Reset file input so selecting same file triggers change
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-inset-gray border border-gray-200">
      <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-3">
        Foto Profil Nasabah <span className="text-text-secondary font-normal lowercase">(opsional)</span>
      </label>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Hidden Native File Input */}
        <input
          ref={fileInputRef}
          type="file"
          id="fotoProfil"
          name="fotoProfil"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Avatar Preview Circle */}
        <div className="relative group shrink-0">
          <div className="w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden bg-white flex items-center justify-center shadow-xs">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Preview Foto Profil"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <User className="w-9 h-9 text-gray-400" />
            )}
          </div>

          <button
            type="button"
            onClick={triggerUpload}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-dark-container text-brand-neon hover:bg-black flex items-center justify-center shadow-md transition-transform hover:scale-110"
            title="Pilih Foto Profil"
            aria-label="Pilih Foto Profil"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Info & Action Buttons */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <button
              type="button"
              onClick={triggerUpload}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-300 text-text-primary hover:bg-gray-50 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Upload className="w-3.5 h-3.5 text-text-secondary" />
              <span>{avatarPreview ? "Ganti Foto" : "Unggah Foto"}</span>
            </button>

            {avatarPreview && (
              <button
                type="button"
                onClick={onAvatarRemove}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-text-secondary mt-2">
            Format yang didukung: JPG, PNG, atau WEBP. Ukuran maksimal 2MB.
          </p>

          {error && (
            <p className="text-xs text-red-600 font-medium mt-1.5" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
