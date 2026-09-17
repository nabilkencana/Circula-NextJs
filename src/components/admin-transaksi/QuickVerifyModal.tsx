"use client";

import React, { useState } from "react";
import { X, Scale, Check, AlertCircle, CheckCircle2, XCircle, Clock } from "lucide-react";
import {
  TransaksiSetorAdminRecord,
  SampahItemRincian,
  StatusSetor,
  VerifySetorPayload,
} from "@/types/adminTransaksi";

interface QuickVerifyModalProps {
  isOpen: boolean;
  record: TransaksiSetorAdminRecord | null;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: (
    payload: VerifySetorPayload,
    updatedItems: SampahItemRincian[],
    totalBerat: number,
    totalPoin: number
  ) => void;
}

export default function QuickVerifyModal({
  isOpen,
  record,
  isSubmitting,
  onClose,
  onConfirm,
}: QuickVerifyModalProps) {
  if (!isOpen || !record) return null;

  return (
    <QuickVerifyModalForm
      key={record.id}
      record={record}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

function QuickVerifyModalForm({
  record,
  isSubmitting,
  onClose,
  onConfirm,
}: {
  record: TransaksiSetorAdminRecord;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: (
    payload: VerifySetorPayload,
    updatedItems: SampahItemRincian[],
    totalBerat: number,
    totalPoin: number
  ) => void;
}) {
  const [status, setStatus] = useState<StatusSetor>("selesai");
  const [catatanAdmin, setCatatanAdmin] = useState(
    record.catatanPetugas || "Berat sampah sesuai hasil timbangan real petugas."
  );
  const [items, setItems] = useState<SampahItemRincian[]>(() =>
    record.rincianSampah.map((item) => ({ ...item, isReal: true }))
  );

  const handleWeightChange = (index: number, valStr: string) => {
    const val = parseFloat(valStr) || 0;
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], berat: Math.max(0, val), isReal: true };
      return next;
    });
  };

  // Calculate total weight and poin
  const totalBerat = parseFloat(
    items.reduce((acc, curr) => acc + curr.berat, 0).toFixed(1)
  );

  // Calculate points based on individual item poinPerKg if available, or proportion
  const calculatedPoints = items.reduce((acc, curr, idx) => {
    const rate =
      curr.poinPerKg ||
      (record.totalBerat > 0 ? record.totalPoin / record.totalBerat : 10);
    return acc + Math.round(curr.berat * rate);
  }, 0);

  const totalPoin = status === "ditolak" ? 0 : calculatedPoints;

  const quickNotes = [
    "Sesuai timbangan riil",
    "Kondisi bersih & terpilah",
    "Sebagian sampah basah/tercampur",
    "Tidak memenuhi syarat daur ulang",
  ];

  const applyQuickNote = (note: string) => {
    if (!catatanAdmin || catatanAdmin === "Berat sampah sesuai hasil timbangan real petugas.") {
      setCatatanAdmin(note);
    } else {
      setCatatanAdmin((prev) => `${prev}. ${note}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "ditolak" && totalBerat <= 0) {
      alert("Total timbangan riil tidak boleh 0 kg.");
      return;
    }

    if (status === "ditolak" && !catatanAdmin.trim()) {
      alert("Harap berikan catatan/alasan penolakan setoran.");
      return;
    }

    const payload: VerifySetorPayload = {
      status,
      catatanAdmin: catatanAdmin.trim() || undefined,
      itemsReal: items.map((item) => ({
        kategoriSampahId: item.kategoriSampahId || "",
        beratKgReal: item.berat,
      })),
    };

    onConfirm(payload, items, totalBerat, totalPoin);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-inset-gray shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-neon flex items-center justify-center shadow-xs">
              <Scale className="w-5 h-5 text-text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-text-primary">
                Verifikasi Timbangan Penyetoran
              </h3>
              <p className="text-xs text-text-secondary">
                {record.kodeTransaksi} • Nasabah: {record.nasabahNama}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Status Chooser Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Status Verifikasi Hasil Timbangan
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus("selesai")}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  status === "selesai"
                    ? "bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs ring-2 ring-emerald-400/20"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 mb-1 ${status === "selesai" ? "text-emerald-600" : "text-gray-400"}`} />
                <span>Selesai</span>
                <span className="text-[10px] font-normal opacity-80 mt-0.5">Kredit Poin</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus("diverifikasi")}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  status === "diverifikasi"
                    ? "bg-blue-50 border-blue-400 text-blue-800 shadow-xs ring-2 ring-blue-400/20"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Clock className={`w-4 h-4 mb-1 ${status === "diverifikasi" ? "text-blue-600" : "text-gray-400"}`} />
                <span>Diverifikasi</span>
                <span className="text-[10px] font-normal opacity-80 mt-0.5">Timbang Saja</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus("ditolak")}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  status === "ditolak"
                    ? "bg-red-50 border-red-400 text-red-800 shadow-xs ring-2 ring-red-400/20"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <XCircle className={`w-4 h-4 mb-1 ${status === "ditolak" ? "text-red-600" : "text-gray-400"}`} />
                <span>Ditolak</span>
                <span className="text-[10px] font-normal opacity-80 mt-0.5">Batal Setor</span>
              </button>
            </div>
          </div>

          {status === "ditolak" ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-red-900">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p>
                Status ditolak akan membatalkan penyetoran. Poin tidak akan disalurkan ke nasabah.
                Mohon cantumkan alasan penolakan pada catatan petugas di bawah.
              </p>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                Sesuaikan berat aktual material sesuai hasil timbangan operasional bank sampah.
                Poin akan dikalkulasi otomatis dan langsung disalurkan ke nasabah saat berstatus <strong>Selesai</strong>.
              </p>
            </div>
          )}

          {/* Material Items List */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
              Rincian Material Terpilah (kg)
            </label>
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 p-3 rounded-xl border border-gray-200 bg-white"
              >
                <div className="min-w-0">
                  <div className="font-bold text-xs sm:text-sm text-text-primary truncate">
                    {item.namaKategori}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Estimasi Awal: {record.rincianSampah[idx]?.berat || 0} kg • Rate: {item.poinPerKg || 10} Poin/kg
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    disabled={status === "ditolak"}
                    value={item.berat}
                    onChange={(e) => handleWeightChange(idx, e.target.value)}
                    className="w-24 h-9 px-3 text-right font-bold text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-brand-neon focus:ring-2 focus:ring-brand-neon/20 disabled:bg-gray-100 disabled:text-gray-400"
                  />
                  <span className="text-xs font-bold text-gray-600">kg</span>
                </div>
              </div>
            ))}
          </div>

          {/* Catatan Admin */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
                Catatan Petugas {status === "ditolak" ? "(Wajib)" : "(Opsional)"}
              </label>
              <span className="text-[11px] text-gray-400">Tersimpan di struk nota</span>
            </div>
            <textarea
              rows={2}
              value={catatanAdmin}
              onChange={(e) => setCatatanAdmin(e.target.value)}
              placeholder="Tuliskan catatan verifikasi timbangan atau alasan penolakan..."
              className="w-full px-3.5 py-2.5 text-xs text-text-primary bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand-neon focus:ring-2 focus:ring-brand-neon/20"
            />
            {/* Quick Notes Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickNotes.map((note) => (
                <button
                  key={note}
                  type="button"
                  onClick={() => applyQuickNote(note)}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-[10px] font-medium text-gray-700 transition-colors cursor-pointer"
                >
                  + {note}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-inset-gray border border-gray-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-gray-500 font-medium">
                Total Berat Riil Aktual:
              </div>
              <div className="text-base font-black text-text-primary">
                {status === "ditolak" ? "0.0 kg" : `${totalBerat} kg Real`}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-gray-500 font-medium">
                Kredit Poin Nasabah:
              </div>
              <div
                className={`text-base font-black ${
                  status === "ditolak"
                    ? "text-red-600"
                    : status === "selesai"
                    ? "text-emerald-600"
                    : "text-blue-600"
                }`}
              >
                {status === "ditolak" ? "0 Poin (Dibatalkan)" : `+${totalPoin} Poin`}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50 ${
                status === "ditolak"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-brand-neon hover:bg-brand-neon-hover text-text-primary"
              }`}
            >
              {status === "ditolak" ? <XCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              <span>
                {isSubmitting
                  ? "Menyimpan..."
                  : status === "ditolak"
                  ? "Tolak Setoran"
                  : status === "selesai"
                  ? "Verifikasi & Selesaikan"
                  : "Simpan Verifikasi"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
