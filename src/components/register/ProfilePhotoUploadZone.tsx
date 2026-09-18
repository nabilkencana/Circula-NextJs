/**
 * @file ProfilePhotoUploadZone.tsx
 * @description Komponen zona pengunggahan dan pratinjau (preview) foto profil nasabah.
 * Menggunakan teknik hidden native file input yang dipicu secara programatik melalui tombol kustom.
 * 
 * Peran dalam UKK:
 * - Menunjukkan penguasaan React Hook `useRef` untuk manipulasi DOM elemen input file secara aman.
 * - Menangani event file upload (`onChange`), membaca File object, dan menyediakan tombol hapus (remove).
 * - Menampilkan gambar pratinjau (avatar preview) secara reaktif sebelum data di-submit ke server.
 * - Menerapkan atribut aksesibilitas WAI-ARIA (`aria-label`, `role="alert"`).
 */

"use client"; // Komponen interaktif di sisi klien

import React, { useRef } from "react";
import Image from "next/image"; // Komponen gambar Next.js
import { Camera, Upload, Trash2, User } from "lucide-react"; // Ikon: Kamera, Unggah, Hapus, dan Pengguna

/**
 * Interface props untuk ProfilePhotoUploadZone
 * @property avatarPreview - URL string blob/data URL untuk preview gambar yang dipilih, atau null jika belum ada
 * @property error - Pesan kesalahan validasi ukuran/tipe file jika ada
 * @property onAvatarChange - Callback fungsi saat pengguna memilih file baru dari perangkat
 * @property onAvatarRemove - Callback fungsi saat pengguna menghapus foto yang sudah dipilih
 */
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
  /**
   * useRef untuk menyimpan referensi langsung ke elemen <input type="file"> di DOM.
   * Digunakan agar kita bisa memicu jendela pemilihan file (file dialog) saat tombol kustom diklik.
   */
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handler ketika pengguna memilih file dari dialog berkas lokal.
   * Mengambil file pertama (e.target.files[0]) dan mengirimkannya ke controller.
   */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onAvatarChange(file);

    // PENTING: Reset value input menjadi string kosong.
    // Jika tidak di-reset, memilih file yang sama dua kali berturut-turut tidak akan memicu event onChange.
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Fungsi untuk memicu klik pada input file tersembunyi secara programatis.
   */
  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-inset-gray border border-gray-200">
      {/* Label Kategori Input */}
      <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-3">
        Foto Profil Nasabah <span className="text-text-secondary font-normal lowercase">(opsional)</span>
      </label>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* ─── 1. Hidden Native File Input ─── */}
        {/* Disembunyikan dengan kelas 'hidden' karena tombol bawaan browser kurang estetik */}
        <input
          ref={fileInputRef}
          type="file"
          id="fotoProfil"
          name="fotoProfil"
          accept="image/jpeg,image/png,image/webp" // Pembatasan format file gambar yang diizinkan
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* ─── 2. Avatar Preview Circle & Quick Camera Button ─── */}
        <div className="relative group shrink-0">
          <div className="w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden bg-white flex items-center justify-center shadow-xs">
            {avatarPreview ? (
              // Jika ada gambar: tampilkan pratinjau menggunakan Next.js Image
              <Image
                src={avatarPreview}
                alt="Preview Foto Profil"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized // Dinonaktifkan optimasi CDN Next.js karena URL berupa blob lokal browser (URL.createObjectURL)
              />
            ) : (
              // Jika belum memilih gambar: tampilkan ikon default pengguna
              <User className="w-9 h-9 text-gray-400" />
            )}
          </div>

          {/* Tombol badge kamera melayang di pojok kanan bawah lingkaran foto */}
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

        {/* ─── 3. Tombol Aksi & Keterangan Panduan File ─── */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {/* Tombol Unggah / Ganti Foto */}
            <button
              type="button"
              onClick={triggerUpload}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-300 text-text-primary hover:bg-gray-50 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Upload className="w-3.5 h-3.5 text-text-secondary" />
              <span>{avatarPreview ? "Ganti Foto" : "Unggah Foto"}</span>
            </button>

            {/* Tombol Hapus: Hanya muncul jika foto sudah diunggah/dipilih */}
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

          {/* Informasi batasan format dan ukuran berkas */}
          <p className="text-[11px] text-text-secondary mt-2">
            Format yang didukung: JPG, PNG, atau WEBP. Ukuran maksimal 2MB.
          </p>

          {/* Pesan Kesalahan Validasi (jika file melebihi 2MB atau format tidak valid) */}
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
