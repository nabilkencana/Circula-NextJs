import React from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { HadiahAdminRecord } from "@/types/adminHadiah";

interface DeleteHadiahConfirmModalProps {
  isOpen: boolean;
  record: HadiahAdminRecord | null;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteHadiahConfirmModal({
  isOpen,
  record,
  isSubmitting,
  onClose,
  onConfirm,
}: DeleteHadiahConfirmModalProps) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-container/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-200 z-10 animate-in zoom-in-95 duration-200">
        {/* Warning Icon Badge */}
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Text Header & Warning */}
        <h3 className="font-extrabold text-lg text-text-primary tracking-tight">
          Hapus Item Hadiah?
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
          Apakah Anda yakin ingin menghapus item hadiah{" "}
          <span className="font-bold text-text-primary">{record.namaHadiah}</span> (
          <span className="font-mono font-semibold">{record.id}</span>)? Nasabah tidak lagi
          dapat menukarkan poin reward dengan item ini.
        </p>

        {/* Warning Inset Card */}
        <div className="mt-4 p-3 bg-red-50/60 border border-red-100 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
          <Trash2 className="w-4 h-4 shrink-0" />
          <span>Tindakan ini permanen dan tidak dapat dipulihkan.</span>
        </div>

        {/* Modal Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? "Menghapus..." : "Ya, Hapus Hadiah"}
          </button>
        </div>
      </div>
    </div>
  );
}
