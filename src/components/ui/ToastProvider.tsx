"use client";

import React, { createContext, useContext, useCallback, useState, useRef } from "react";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  message?: string;
  duration?: number; // ms, default 4000
}

interface ToastContextValue {
  toasts: ToastItem[];
  toast: (item: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (item: Omit<ToastItem, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const duration = item.duration ?? 4000;

      setToasts((prev) => {
        // Max 5 toasts at once
        const capped = prev.length >= 5 ? prev.slice(1) : prev;
        return [...capped, { ...item, id }];
      });

      timers.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

// ─── Toast Viewport (renders toasts) ────────────────────────────────────────

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

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-10000 flex flex-col gap-3 items-end pointer-events-none"
      aria-live="polite"
      aria-label="Notifikasi"
    >
      {toasts.map((t) => {
        const s = VARIANT_STYLES[t.variant];
        return (
          <div
            key={t.id}
            className={`pointer-events-auto w-80 max-w-[calc(100vw-3rem)] ${s.bg} rounded-2xl border ${s.border} shadow-xl overflow-hidden animate-in slide-in-from-right-5 fade-in duration-300`}
          >
            {/* Color bar */}
            <div className={`h-1 ${s.bar} w-full`} />

            <div className="flex items-start gap-3 px-4 py-3.5">
              {/* Icon */}
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 ${s.bar}`}
              >
                {s.icon}
              </span>

              {/* Content */}
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

              {/* Close */}
              <button
                onClick={() => onDismiss(t.id)}
                className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-xs"
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
