"use client";

import React, { useState, useEffect, useCallback } from "react";
import { KeyRound, Zap, CheckCircle2, AlertCircle, X, Loader2 } from "lucide-react";
import { hasAppKey, saveAppKey, fetchWithAuth } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

export default function TenantKeyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [appKey, setAppKey] = useState("");
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const checkAndShow = useCallback(() => {
    if (!hasAppKey()) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(checkAndShow, 800);
    return () => clearTimeout(t);
  }, [checkAndShow]);

  const handleSaveKey = () => {
    const trimmed = appKey.trim();
    if (!trimmed) {
      setFeedback({ type: "error", message: "App Key tidak boleh kosong." });
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      saveAppKey(trimmed);
      setFeedback({
        type: "success",
        message: "App Key berhasil disimpan! Sistem siap digunakan.",
      });
      setIsSaving(false);
      setTimeout(() => setIsOpen(false), 1200);
    }, 400);
  };

  const handleAutoSeed = async () => {
    setIsSeeding(true);
    setFeedback(null);

    const defaultKey = process.env.NEXT_PUBLIC_DEFAULT_APP_KEY || "1d99c078-9a3f-45e0-978e-8e0806338593";

    try {
      const result = await fetchWithAuth(ENDPOINTS.AUTH.SEED, {
        method: "POST",
        timeoutMs: 8000,
      });

      if (result.ok) {
        saveAppKey(defaultKey);
        setAppKey(defaultKey);
        setFeedback({
          type: "success",
          message: "Auto-seed berhasil! App Key telah dikonfigurasi dan siap digunakan.",
        });
        setTimeout(() => setIsOpen(false), 1400);
      } else {
        setFeedback({
          type: "error",
          message: `Seed gagal: ${result.error || "Periksa koneksi server."}`,
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Koneksi gagal. Masukkan App Key secara manual.",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSkip = () => {
    const defaultKey = process.env.NEXT_PUBLIC_DEFAULT_APP_KEY || "1d99c078-9a3f-45e0-978e-8e0806338593";
    saveAppKey(defaultKey);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleSkip}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Dark header stripe */}
        <div className="bg-dark-container px-8 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand-neon rounded-xl flex items-center justify-center shrink-0">
              <KeyRound className="w-5 h-5 text-dark-container" />
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-neon uppercase tracking-widest">
                Setup Diperlukan
              </p>
              <h2 className="text-lg font-bold text-white leading-tight">
                Konfigurasi App Key
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Sistem membutuhkan{" "}
            <code className="text-brand-neon font-mono text-xs bg-white/10 px-1 py-0.5 rounded">
              x-app-key
            </code>{" "}
            untuk mengakses API Bank Sampah Circula. Gunakan Auto-Seed atau masukkan key secara manual.
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-5">
          {/* Auto-Seed Button */}
          <button
            onClick={handleAutoSeed}
            disabled={isSeeding || isSaving}
            className="w-full flex items-center justify-center gap-2.5 bg-brand-neon hover:bg-brand-neon-hover disabled:opacity-60 disabled:cursor-not-allowed text-dark-container font-bold text-sm py-3.5 px-6 rounded-2xl transition-all duration-200 active:scale-[0.98]"
          >
            {isSeeding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            {isSeeding ? "Menghubungi Server..." : "Auto-Seed via API"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">atau masukkan manual</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Manual Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              App Key
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={appKey}
                onChange={(e) => setAppKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveKey()}
                placeholder="Contoh: circula-ukk-2026"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-neon focus:border-transparent transition-all"
                disabled={isSeeding || isSaving}
              />
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`flex items-start gap-2.5 p-3.5 rounded-xl text-sm font-medium ${
                feedback.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleSkip}
              className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
            >
              Lewati
            </button>
            <button
              onClick={handleSaveKey}
              disabled={isSaving || isSeeding || !appKey.trim()}
              className="flex-1 py-3 px-4 text-sm font-bold text-white bg-dark-container hover:bg-dark-widget disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              Simpan Key
            </button>
          </div>
        </div>

        {/* Close corner button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
