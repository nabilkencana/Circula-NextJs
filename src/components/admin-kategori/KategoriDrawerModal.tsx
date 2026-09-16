"use client";

import React, { useState } from "react";
import { X, Check, Upload } from "lucide-react";
import {
  KategoriSampahAdminRecord,
  CreateKategoriPayload,
  UpdateKategoriPayload,
  JenisSampah,
} from "@/types/adminKategori";
import Image from "next/image";

interface KategoriDrawerModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  record: KategoriSampahAdminRecord | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSave: (payload: CreateKategoriPayload | UpdateKategoriPayload) => void;
}

const SAMPLE_PHOTO_PRESETS = [
  "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534056070602-a2a913134263?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
];

interface DrawerContentProps {
  mode: "create" | "edit";
  record: KategoriSampahAdminRecord | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSave: (payload: CreateKategoriPayload | UpdateKategoriPayload) => void;
}

function KategoriDrawerContent({
  mode,
  record,
  isSubmitting,
  onClose,
  onSave,
}: DrawerContentProps) {
  const [namaKategori, setNamaKategori] = useState(
    mode === "edit" && record ? record.namaKategori : ""
  );
  const [jenisSampah, setJenisSampah] = useState<JenisSampah>(
    mode === "edit" && record ? record.jenisSampah : "plastik"
  );
  const [deskripsi, setDeskripsi] = useState(
    mode === "edit" && record ? record.deskripsi : ""
  );
  const [hargaBeliPerKg, setHargaBeliPerKg] = useState<number | string>(
    mode === "edit" && record ? record.hargaBeliPerKg : ""
  );
  const [poinRewardPerKg, setPoinRewardPerKg] = useState<number | string>(
    mode === "edit" && record ? record.poinRewardPerKg : ""
  );
  const [imageUrl, setImageUrl] = useState<string>(
    mode === "edit" && record?.imageUrl ? record.imageUrl : SAMPLE_PHOTO_PRESETS[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKategori.trim() || !hargaBeliPerKg || !poinRewardPerKg) return;

    if (mode === "create") {
      onSave({
        namaKategori: namaKategori.trim(),
        jenisSampah,
        deskripsi: deskripsi.trim(),
        hargaBeliPerKg: Number(hargaBeliPerKg),
        poinRewardPerKg: Number(poinRewardPerKg),
        imageUrl,
        satuan: "kg",
      });
    } else if (record) {
      onSave({
        id: record.id,
        namaKategori: namaKategori.trim(),
        jenisSampah,
        deskripsi: deskripsi.trim(),
        hargaBeliPerKg: Number(hargaBeliPerKg),
        poinRewardPerKg: Number(poinRewardPerKg),
        imageUrl,
        satuan: "kg",
      });
    }
  };

  return (
    <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-250">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-start justify-between bg-white sticky top-0 z-10">
        <div>
          <h2 className="font-extrabold text-xl text-text-primary tracking-tight">
            {mode === "create" ? "Tambah Kategori Baru" : `Edit Kategori: ${record?.namaKategori}`}
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Konfigurasi tarif rupiah tunai, rasio insentif poin reward, dan spesifikasi material.
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
      <form id="kategori-form" onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
        {/* Photo Upload / Preset Zone */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
            FOTO CONTOH MATERIAL
          </label>
          <div className="p-4 rounded-2xl bg-inset-gray border border-dashed border-brand-neon flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-200 border border-gray-300 shrink-0">
                <Image
                  src={imageUrl}
                  alt="Preview Material"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-xs text-text-secondary">
                <p className="font-semibold text-text-primary">
                  Unggah Foto Contoh Material
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
                Atau pilih contoh foto material:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {SAMPLE_PHOTO_PRESETS.map((pUrl, idx) => (
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
                      alt={`Preset ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nama Spesifik Kategori */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
            NAMA SPESIFIK KATEGORI <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={namaKategori}
            onChange={(e) => setNamaKategori(e.target.value)}
            placeholder="cth. Botol Plastik PET Bersih & Kering"
            className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-inset-gray text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
          />
        </div>

        {/* 2-Columns: Jenis Sampah & Satuan */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
              PILIHAN JENIS SAMPAH <span className="text-red-500">*</span>
            </label>
            <select
              value={jenisSampah}
              onChange={(e) => setJenisSampah(e.target.value as JenisSampah)}
              className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-inset-gray text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all cursor-pointer"
            >
              <option value="plastik">Plastik</option>
              <option value="kertas">Kertas</option>
              <option value="logam">Logam</option>
              <option value="kaca">Kaca</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
              UNIT SATUAN
            </label>
            <input
              type="text"
              disabled
              value="Kilogram (kg)"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-100 text-sm text-gray-500 font-medium cursor-not-allowed"
            />
          </div>
        </div>

        {/* 2-Columns: Harga Beli Tunai & Nilai Poin */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
              HARGA BELI PER KG (RP) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                Rp
              </span>
              <input
                type="number"
                required
                min={0}
                value={hargaBeliPerKg}
                onChange={(e) => setHargaBeliPerKg(e.target.value)}
                placeholder="3500"
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 bg-inset-gray font-mono text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
              NILAI POIN PER KG <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                required
                min={0}
                value={poinRewardPerKg}
                onChange={(e) => setPoinRewardPerKg(e.target.value)}
                placeholder="10"
                className="w-full h-11 pl-3 pr-14 rounded-xl border border-gray-200 bg-inset-gray font-mono text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                Poin
              </span>
            </div>
          </div>
        </div>

        {/* Deskripsi & Standar Kebersihan 3R */}
        <div>
          <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-1.5">
            DESKRIPSI &amp; STANDAR KEBERSIHAN 3R <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="cth. Botol bening mineral, label & tutup dilepas, tanpa sisa residu cairan pewarna."
            className="w-full p-3.5 rounded-xl border border-gray-200 bg-inset-gray text-xs sm:text-sm text-text-primary focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all resize-none leading-relaxed"
          />
        </div>
      </form>

      {/* Footer CTA Actions */}
      <div className="p-6 border-t border-gray-200 bg-[#FAFBF9] flex flex-col gap-2">
        <button
          type="submit"
          form="kategori-form"
          disabled={isSubmitting}
          className="w-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs sm:text-sm py-3.5 rounded-full flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{isSubmitting ? "Menyimpan Master..." : "Simpan Master Kategori"}</span>
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

export default function KategoriDrawerModal({
  isOpen,
  mode,
  record,
  isSubmitting,
  onClose,
  onSave,
}: KategoriDrawerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-container/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <KategoriDrawerContent
        key={record ? record.id : "new-kategori"}
        mode={mode}
        record={record}
        isSubmitting={isSubmitting}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
}
