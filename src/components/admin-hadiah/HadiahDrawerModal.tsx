/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Drawer Formulir Tambah & Edit Hadiah Admin
 *
 * File: src/components/admin-hadiah/HadiahDrawerModal.tsx
 * Deskripsi:
 * Menampilkan panel laci geser (slide-over drawer) dari sisi kanan layar
 * untuk pendaftaran produk reward baru atau pembaruan atribut (nama, kategori,
 * stok, satuan, poin tebus, dan pemilihan preset foto produk).
 *
 * Standar Teknis UKK RPL:
 * - Slide-over drawer pattern dengan animasi Tailwind CSS `slide-in-from-right`.
 * - Controlled inputs dengan validasi kelengkapan form sebelum submit.
 * - Pemilihan foto produk fleksibel (URL kustom atau preset contoh gambar cepat).
 */

"use client";

import React, { useState } from "react";
import { X, Check, Upload } from "lucide-react";
import {
  HadiahAdminRecord,
  CreateHadiahPayload,
  UpdateHadiahPayload,
  KategoriHadiah,
} from "@/types/adminHadiah";
import Image from "next/image";

/**
 * Properti komponen HadiahDrawerModal.
 */
interface HadiahDrawerModalProps {
  /** Penanda apakah drawer sedang terbuka */
  isOpen: boolean;
  /** Mode formulir: "create" untuk tambah baru atau "edit" untuk memperbarui */
  mode: "create" | "edit";
  /** Data hadiah yang sedang diedit (null jika mode create) */
  record: HadiahAdminRecord | null;
  /** Status proses penyimpanan asinkron */
  isSubmitting: boolean;
  /** Callback menutup drawer */
  onClose: () => void;
  /** Callback menyimpan payload formulir */
  onSave: (payload: CreateHadiahPayload | UpdateHadiahPayload) => void;
}

/** Koleksi gambar preset hadiah untuk mempermudah demonstrasi sistem */
const SAMPLE_HADIAH_PRESETS = [
  "https://images.unsplash.com/photo-1556742049-0a67e55722c0?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80",
];

/**
 * Properti internal untuk komponen isi drawer.
 */
interface DrawerContentProps {
  mode: "create" | "edit";
  record: HadiahAdminRecord | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSave: (payload: CreateHadiahPayload | UpdateHadiahPayload) => void;
}

/**
 * Komponen isi formulir drawer yang di-mount dengan state terisolasi.
 */
function HadiahDrawerContent({
  mode,
  record,
  isSubmitting,
  onClose,
  onSave,
}: DrawerContentProps) {
  // State form fields
  const [namaHadiah, setNamaHadiah] = useState(
    mode === "edit" && record ? record.namaHadiah : ""
  );
  const [kategori, setKategori] = useState<KategoriHadiah>(
    mode === "edit" && record ? record.kategori : "sembako"
  );
  const [deskripsi, setDeskripsi] = useState(
    mode === "edit" && record ? record.deskripsi : ""
  );
  const [poinDibutuhkan, setPoinDibutuhkan] = useState<number | string>(
    mode === "edit" && record ? record.poinDibutuhkan : ""
  );
  const [stok, setStok] = useState<number | string>(
    mode === "edit" && record ? record.stok : ""
  );
  const [satuanStok, setSatuanStok] = useState(
    mode === "edit" && record ? record.satuanStok : "Pcs"
  );
  const [imageUrl, setImageUrl] = useState<string>(
    mode === "edit" && record?.imageUrl ? record.imageUrl : SAMPLE_HADIAH_PRESETS[0]
  );

  /**
   * Menangani submit data form hadiah.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaHadiah.trim() || poinDibutuhkan === "" || stok === "") return;

    if (mode === "create") {
      onSave({
        namaHadiah: namaHadiah.trim(),
        kategori,
        deskripsi: deskripsi.trim(),
        poinDibutuhkan: Number(poinDibutuhkan),
        stok: Number(stok),
        satuanStok: satuanStok.trim() || "Pcs",
        imageUrl,
      });
    } else if (record) {
      onSave({
        id: record.id,
        namaHadiah: namaHadiah.trim(),
        kategori,
        deskripsi: deskripsi.trim(),
        poinDibutuhkan: Number(poinDibutuhkan),
        stok: Number(stok),
        satuanStok: satuanStok.trim() || "Pcs",
        imageUrl,
      });
    }
  };

  return (
    <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-250">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-start justify-between bg-white sticky top-0 z-10">
        <div>
          <h2 className="font-extrabold text-xl text-text-primary tracking-tight">
            {mode === "create" ? "Tambah Hadiah Baru" : `Edit / Restok: ${record?.namaHadiah}`}
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Kelola inventaris hadiah, ketersediaan stok voucher, dan atur biaya penukaran poin.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Tutup form drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Form Body */}
      <form id="hadiah-form" onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
        {/* Photo Upload / Preset Zone */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
            FOTO PRODUK / HADIAH
          </label>
          <div className="p-4 rounded-2xl bg-inset-gray border border-dashed border-brand-neon flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-200 border border-gray-300 shrink-0">
                <Image
                  src={imageUrl}
                  alt="Preview Hadiah"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-xs text-text-secondary">
                <p className="font-semibold text-text-primary">
                  Unggah Foto Produk / Voucher
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Format JPG/PNG maks. 2MB. Resolusi 16:9 disarankan.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <Upload className="w-3 h-3" />
                    Pilih File Foto
                  </span>
                </div>
              </div>
            </div>

            {/* Presets Row */}
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-semibold block mb-1.5">
                Atau pilih contoh foto hadiah:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {SAMPLE_HADIAH_PRESETS.map((pUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(pUrl)}
                    className={`relative w-10 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      imageUrl === pUrl
                        ? "border-brand-neon ring-2 ring-brand-neon/40 scale-105"
                        : "border-gray-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={pUrl}
                      alt={`Preset Hadiah ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nama Hadiah / Voucher */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
            NAMA HADIAH / VOUCHER <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={namaHadiah}
            onChange={(e) => setNamaHadiah(e.target.value)}
            placeholder="cth. Minyak Goreng Bimoli 1 Liter"
            className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-inset-gray text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
          />
        </div>

        {/* 2-Columns: Kategori & Satuan */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
              KATEGORI HADIAH <span className="text-red-500">*</span>
            </label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value as KategoriHadiah)}
              className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-inset-gray text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all cursor-pointer"
            >
              <option value="voucher">Voucher / Pulsa</option>
              <option value="sembako">Sembako / Pangan</option>
              <option value="merchandise">Merchandise / Alat</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
              SATUAN STOK <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={satuanStok}
              onChange={(e) => setSatuanStok(e.target.value)}
              placeholder="Unit / Pcs / Sak"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-inset-gray text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
            />
          </div>
        </div>

        {/* 2-Columns: Biaya Poin & Sisa Stok */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
              BIAYA POIN (REWARD) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                required
                min={1}
                value={poinDibutuhkan}
                onChange={(e) => setPoinDibutuhkan(e.target.value)}
                placeholder="75"
                className="w-full h-11 pl-3 pr-14 rounded-xl border border-gray-200 bg-inset-gray font-mono text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                Poin
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
              JUMLAH STOK TERSEDIA <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min={0}
              value={stok}
              onChange={(e) => setStok(e.target.value)}
              placeholder="50"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-inset-gray font-mono text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
            />
          </div>
        </div>

        {/* Deskripsi Singkat / Syarat Klaim */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
            DESKRIPSI &amp; SYARAT KLAIM <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Kebutuhan pokok higienis, dapat ditukarkan di loket unit bank sampah setiap jam operasional..."
            className="w-full p-3.5 rounded-xl border border-gray-200 bg-inset-gray text-xs sm:text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all resize-none leading-relaxed"
          />
        </div>
      </form>

      {/* Footer CTA Actions */}
      <div className="p-6 border-t border-gray-200 bg-[#FAFBF9] flex flex-col gap-2">
        <button
          type="submit"
          form="hadiah-form"
          disabled={isSubmitting}
          className="w-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs sm:text-sm py-3.5 rounded-full flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{isSubmitting ? "Menyimpan Master..." : "Simpan Master Hadiah"}</span>
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 text-text-secondary hover:text-text-primary font-semibold text-xs text-center hover:underline cursor-pointer"
        >
          Batal &amp; Tutup
        </button>
      </div>
    </div>
  );
}

/**
 * Komponen modal drawer pembungkus dengan backdrop gelap dan transisi mulus.
 */
export default function HadiahDrawerModal({
  isOpen,
  mode,
  record,
  isSubmitting,
  onClose,
  onSave,
}: HadiahDrawerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-container/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <HadiahDrawerContent
        key={record ? record.id : "new-hadiah"}
        mode={mode}
        record={record}
        isSubmitting={isSubmitting}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
}
