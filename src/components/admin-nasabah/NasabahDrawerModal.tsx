/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Drawer Formulir Tambah & Edit Nasabah Admin
 *
 * File: src/components/admin-nasabah/NasabahDrawerModal.tsx
 * Deskripsi:
 * Menampilkan panel slide-over drawer dari sisi kanan untuk pendaftaran manual
 * nasabah baru atau pengubahan data nasabah terdaftar (nama lengkap, username portal,
 * nomor kontak seluler/WhatsApp, alamat tempat tinggal, password baru, dan status akun).
 *
 * Standar Teknis UKK RPL:
 * - Slide-over drawer form dengan validasi data input.
 * - Pemilihan foto avatar visual dari koleksi pilihan yang disediakan.
 * - Reset state form otomatis menggunakan `key` prop pattern pada komponen konten.
 */

"use client";

import React, { useState } from "react";
import { X, User, Phone, MapPin, Lock, AtSign, Check, Coins } from "lucide-react";
import {
  NasabahRecord,
  CreateNasabahPayload,
  UpdateNasabahPayload,
  StatusNasabah,
} from "@/types/adminNasabah";
import Image from "next/image";

/**
 * Properti komponen NasabahDrawerModal.
 */
interface NasabahDrawerModalProps {
  /** Penanda apakah drawer sedang terbuka */
  isOpen: boolean;
  /** Mode formulir: "create" untuk baru, "edit" untuk memperbarui */
  mode: "create" | "edit";
  /** Record data nasabah yang sedang diedit (null jika mode create) */
  record: NasabahRecord | null;
  /** Status indikator mutasi data asinkron sedang berlangsung */
  isSubmitting: boolean;
  /** Callback menutup drawer */
  onClose: () => void;
  /** Callback menyimpan payload data */
  onSave: (payload: CreateNasabahPayload | UpdateNasabahPayload) => void;
}

/** Koleksi tautan gambar avatar profil yang dapat dipilih admin */
const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
];

/**
 * Properti komponen internal form drawer nasabah.
 */
interface DrawerContentProps {
  mode: "create" | "edit";
  record: NasabahRecord | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSave: (payload: CreateNasabahPayload | UpdateNasabahPayload) => void;
}

/**
 * Konten formulir pendaftaran / pengeditan data nasabah.
 */
function NasabahDrawerContent({
  mode,
  record,
  isSubmitting,
  onClose,
  onSave,
}: DrawerContentProps) {
  // State form fields
  const [namaLengkap, setNamaLengkap] = useState(mode === "edit" && record ? record.namaLengkap : "");
  const [username, setUsername] = useState(mode === "edit" && record ? record.username : "");
  const [password, setPassword] = useState("");
  const [telp, setTelp] = useState(mode === "edit" && record ? record.telp : "");
  const [alamat, setAlamat] = useState(mode === "edit" && record ? record.alamat : "");
  const [status, setStatus] = useState<StatusNasabah>(mode === "edit" && record ? record.status : "aktif");
  const [saldoAwal, setSaldoAwal] = useState<number>(0);
  const [fotoProfilUrl, setFotoProfilUrl] = useState(
    mode === "edit" && record?.fotoProfilUrl ? record.fotoProfilUrl : AVATAR_OPTIONS[0]
  );

  /**
   * Menangani pengiriman formulir.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaLengkap.trim() || !username.trim() || !telp.trim()) return;

    if (mode === "create") {
      onSave({
        namaLengkap,
        username,
        password: password || undefined,
        telp,
        alamat,
        status,
        saldoAwal,
        fotoProfilUrl,
      });
    } else if (record) {
      onSave({
        id: record.id,
        namaLengkap,
        username,
        password: password || undefined,
        telp,
        alamat,
        status,
        fotoProfilUrl,
      });
    }
  };

  return (
    <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-250">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-start justify-between bg-white sticky top-0 z-10">
        <div>
          <h2 className="font-extrabold text-xl text-text-primary tracking-tight">
            {mode === "create" ? "Tambah Data Nasabah Manual" : `Edit Data: ${record?.namaLengkap}`}
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            {mode === "create"
              ? "Daftarkan warga nasabah baru langsung ke buku induk unit."
              : "Perbarui identitas, kontak, atau status akun nasabah."}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Tutup form"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Form Body */}
      <form id="nasabah-form" onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
        {/* Avatar Selector */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
            PILIH AVATAR PROFIL
          </label>
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {AVATAR_OPTIONS.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setFotoProfilUrl(imgUrl)}
                className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  fotoProfilUrl === imgUrl
                    ? "border-brand-neon ring-2 ring-brand-neon/40 scale-105"
                    : "border-gray-200 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`Avatar ${idx + 1}`}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
                {fotoProfilUrl === imgUrl && (
                  <div className="absolute inset-0 bg-brand-neon/30 flex items-center justify-center">
                    <Check className="w-4 h-4 text-dark-container stroke-3" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Nama Lengkap */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
            NAMA LENGKAP <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-inset-gray text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
            USERNAME NASABAH <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <AtSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nasabah_budi"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-inset-gray font-mono text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Digunakan warga untuk login ke portal nasabah.
          </p>
        </div>

        {/* Password (Optional for Edit) */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
            KATA SANDI {mode === "create" ? <span className="text-red-500">*</span> : "(OPSIONAL)"}
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required={mode === "create"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "create" ? "Minimal 8 karakter..." : "Biarkan kosong bila tidak diubah"}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-inset-gray text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
            />
          </div>
        </div>

        {/* No WhatsApp / Telepon */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
            NOMOR TELEPON / WHATSAPP <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={telp}
              onChange={(e) => setTelp(e.target.value)}
              placeholder="085678901234"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-inset-gray font-mono text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
            />
          </div>
        </div>

        {/* Alamat Lengkap */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
            ALAMAT DOMISILI LENGKAP <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <textarea
              required
              rows={3}
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Jl. Merdeka No. 12, RT 03/05, Sukun, Malang"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-inset-gray text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all resize-none"
            />
          </div>
        </div>

        {/* Saldo Poin Awal (Only on Create) */}
        {mode === "create" && (
          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
              SALDO POIN AWAL
            </label>
            <div className="relative">
              <Coins className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min={0}
                value={saldoAwal}
                onChange={(e) => setSaldoAwal(Number(e.target.value) || 0)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-inset-gray text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
              />
            </div>
          </div>
        )}

        {/* Status Akun */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
            STATUS OPERASIONAL AKUN
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setStatus("aktif")}
              className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                status === "aktif"
                  ? "bg-[#DCFCE7] border-emerald-400 text-[#15803D] ring-2 ring-emerald-400/20"
                  : "bg-inset-gray border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Aktif</span>
            </button>
            <button
              type="button"
              onClick={() => setStatus("nonaktif")}
              className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                status === "nonaktif"
                  ? "bg-gray-200 border-gray-400 text-gray-800 ring-2 ring-gray-300"
                  : "bg-inset-gray border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              <span>Nonaktif</span>
            </button>
          </div>
        </div>
      </form>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-200 bg-[#FAFBF9] flex items-center gap-3">
        <button
          type="submit"
          form="nasabah-form"
          disabled={isSubmitting}
          className="flex-1 bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs sm:text-sm py-3 rounded-full flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{isSubmitting ? "Menyimpan..." : "Simpan Data Nasabah"}</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-3 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        >
          Batal
        </button>
      </div>
    </div>
  );
}

/**
 * Komponen modal drawer pembungkus form pendaftaran/edit data nasabah.
 */
export default function NasabahDrawerModal({
  isOpen,
  mode,
  record,
  isSubmitting,
  onClose,
  onSave,
}: NasabahDrawerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-container/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Content with key reset */}
      <NasabahDrawerContent
        key={record ? record.id : "new-nasabah"}
        mode={mode}
        record={record}
        isSubmitting={isSubmitting}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
}
