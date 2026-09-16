import React, { useState } from "react";
import Image from "next/image";
import { X, Phone, MapPin, AtSign, Calendar, Star, ShieldCheck } from "lucide-react";
import { NasabahRecord } from "@/types/adminNasabah";

interface NasabahDetailModalProps {
  isOpen: boolean;
  record: NasabahRecord | null;
  onClose: () => void;
  onEdit: (record: NasabahRecord) => void;
}

export default function NasabahDetailModal({
  isOpen,
  record,
  onClose,
  onEdit,
}: NasabahDetailModalProps) {
  const [imgError, setImgError] = useState(false);

  if (!isOpen || !record) return null;

  const initials = record.namaLengkap
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-container/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-200 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center shrink-0">
              {record.fotoProfilUrl && !imgError ? (
                <Image
                  src={record.fotoProfilUrl}
                  alt={record.namaLengkap}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="font-bold text-sm text-gray-700">{initials}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-text-primary">
                  {record.namaLengkap}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    record.status === "aktif"
                      ? "bg-[#DCFCE7] text-[#15803D]"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {record.status === "aktif" ? "Aktif" : "Nonaktif"}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {record.id} • Terdaftar {record.tanggalDaftar}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Tutup detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Details */}
        <div className="py-5 space-y-3.5">
          {/* Points Inset Box */}
          <div className="bg-inset-gray border border-gray-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-neon/20 flex items-center justify-center">
                <Star className="w-4 h-4 text-brand-neon-hover fill-brand-neon" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-text-secondary uppercase">
                  SALDO POIN AKTIF
                </span>
                <p className="font-extrabold text-lg text-text-primary">
                  {record.saldoPoin} Poin
                </p>
              </div>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold border border-emerald-200">
              ≈ Rp {(record.saldoPoin * 350).toLocaleString("id-ID")}
            </span>
          </div>

          {/* Contact Details List */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl">
              <AtSign className="w-4 h-4 text-gray-400 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                  Username Portal
                </span>
                <span className="font-mono font-semibold text-text-primary text-xs">
                  @{record.username}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                  Nomor WhatsApp
                </span>
                <a
                  href={`https://wa.me/62${record.telp.replace(/^0/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-semibold text-emerald-600 hover:underline text-xs"
                >
                  {record.telp}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-xl">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                  Alamat Domisili
                </span>
                <p className="font-medium text-text-primary text-xs mt-0.5">
                  {record.alamat}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                  Terdaftar Sejak
                </span>
                <span className="font-semibold text-text-primary text-xs">
                  {record.tanggalDaftar}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Terverifikasi Buku Induk</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(record);
              }}
              className="px-4 py-2 rounded-full bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              Edit Profil
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
