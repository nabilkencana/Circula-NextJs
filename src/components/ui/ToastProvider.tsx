/**
 * @file ToastProvider.tsx
 * @description Provider konteks notifikasi toast global untuk seluruh aplikasi Circula.
 * Menyediakan fungsi pemanggilan pesan pop-up ringan (`toast`) dengan 4 varian gaya:
 * `success`, `error`, `warning`, dan `info`, auto-dismiss berdasarkan durasi waktu (default 4000ms),
 * pembatasan maksimal 5 notifikasi bertumpuk, serta animasi transisi modern.
 * 
 * @module Components/UI/ToastProvider
 */

"use client";

import React, { createContext, useContext, useCallback, useState, useRef } from "react";

/**
 * Tipe varian status notifikasi toast
 */
export type ToastVariant = "success" | "error" | "warning" | "info";

/**
 * Struktur data objek notifikasi toast
 * 
 * @interface ToastItem
 * @property {string} id - Identifier unik notifikasi.
 * @property {ToastVariant} variant - Jenis status visual notifikasi (warna border & ikon).
 * @property {string} title - Judul utama pesan notifikasi.
 * @property {string} [message] - Deskripsi rincian atau keterangan pesan (opsional).
 * @property {number} [duration] - Durasi tampil dalam milidetik sebelum hilang otomatis (default: 4000ms).
 */
export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  message?: string;
  duration?: number;
}

/**
 * Kontrak nilai konteks toast yang dapat diakses oleh komponen turunan
 * 
 * @interface ToastContextValue
 * @property {ToastItem[]} toasts - Daftar antrean notifikasi aktif yang sedang ditampilkan.
 * @property {(item: Omit<ToastItem, "id">) => void} toast - Fungsi untuk memicu kemunculan notifikasi baru.
 * @property {(id: string) => void} dismiss - Fungsi untuk menutup/menghapus notifikasi berdasarkan ID.
 */
interface ToastContextValue {
  toasts: ToastItem[];
  toast: (item: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

// Inisialisasi React Context untuk notifikasi toast
const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Custom hook untuk mengonsumsi fungsionalitas toast di seluruh komponen React.
 * 
 * @example
 * ```tsx
 * const { toast } = useToast();
 * toast({ variant: "success", title: "Berhasil", message: "Sampah berhasil diajukan!" });
 * ```
 * 
 * @returns {ToastContextValue} Objek context berisi fungsi `toast` dan `dismiss`.
 * @throws {Error} Jika dipanggil di luar naungan `<ToastProvider>`.
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus digunakan di dalam ToastProvider");
  return ctx;
}

/**
 * Komponen Provider Notifikasi Toast
 * 
 * @component
 * @param {{ children: React.ReactNode }} props - Komponen anak yang dinaungi oleh konteks toast.
 * @returns {JSX.Element} Provider context pembungkus beserta viewport rendering toast.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  // State antrean daftar toast aktif
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  // Referensi penyimpanan timer auto-dismiss untuk mencegah kebocoran memori
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  /**
   * Menutup dan menghapus toast dari antrean berdasarkan ID.
   */
  const dismiss = useCallback((id: string) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * Memicu pembuatan toast baru dengan pembatasan maksimal 5 notifikasi simultan.
   */
  const toast = useCallback(
    (item: Omit<ToastItem, "id">) => {
      // Pembuatan ID unik berbasis timestamp dan karakter acak
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const duration = item.duration ?? 4000;

      setToasts((prev) => {
        // Jika sudah mencapai 5, buang notifikasi tertua (FIFO)
        const capped = prev.length >= 5 ? prev.slice(1) : prev;
        return [...capped, { ...item, id }];
      });

      // Atur timer otomatis penghapusan toast setelah durasi berakhir
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {/* Viewport render notifikasi mengambang di pojok kanan bawah */}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// =============================================================================
// KONFIGURASI GAYA VISUAL UNTUK MASING-MASING VARIAN TOAST
// =============================================================================

const VARIANT_STYLES: Record<
  ToastVariant,
  { bar: string; icon: string; bg: string; border: string; text: string }
> = {
  success: {
    bar: "bg-emerald-500",
    icon: "✓",
    bg: "bg-white",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
  error: {
    bar: "bg-red-500",
    icon: "✕",
    bg: "bg-white",
    border: "border-red-200",
    text: "text-red-700",
  },
  warning: {
    bar: "bg-amber-400",
    icon: "⚠",
    bg: "bg-white",
    border: "border-amber-200",
    text: "text-amber-700",
  },
  info: {
    bar: "bg-blue-500",
    icon: "ℹ",
    bg: "bg-white",
    border: "border-blue-200",
    text: "text-blue-700",
  },
};

/**
 * Komponen Internal Viewport Toast
 * Bertanggung jawab merender tumpukan toast di layer teratas layar browser (fixed position).
 */
function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  // Jangan render kontainer bila antrean toast kosong
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-10000 flex flex-col gap-3 items-end pointer-events-none"
      aria-live="polite"
      aria-label="Notifikasi Sistem"
    >
      {toasts.map((t) => {
        const s = VARIANT_STYLES[t.variant];
        return (
          <div
            key={t.id}
            role="alert"
            className={`pointer-events-auto w-80 max-w-[calc(100vw-3rem)] ${s.bg} rounded-2xl border ${s.border} shadow-xl overflow-hidden animate-in slide-in-from-right-5 fade-in duration-300`}
          >
            {/* Garis Aksen Indikator Warna Status di Bagian Atas */}
            <div className={`h-1 ${s.bar} w-full`} />

            <div className="flex items-start gap-3 px-4 py-3.5">
              {/* Ikon Simbol Status */}
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 ${s.bar}`}
                aria-hidden="true"
              >
                {s.icon}
              </span>

              {/* Konten Judul & Pesan Keterangan */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {t.title}
                </p>
                {t.message && (
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {t.message}
                  </p>
                )}
              </div>

              {/* Tombol Tutup Silang Manual */}
              <button
                type="button"
                onClick={() => onDismiss(t.id)}
                className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-xs cursor-pointer"
                aria-label="Tutup notifikasi"
              >
                ✕
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
