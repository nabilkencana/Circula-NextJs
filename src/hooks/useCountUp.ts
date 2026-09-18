/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Custom Hook Animasi Pertambahan Angka (Count-Up Number Animation)
 *
 * File: src/hooks/useCountUp.ts
 * Deskripsi:
 * Memberikan animasi kenaikan angka yang halus (smooth count-up) dari angka 0
 * ke nilai target (`targetValue`) dengan kurva pelambatan ease-out quadratic,
 * mendukung format desimal dan lokalisasi Indonesia (`id-ID`), serta
 * menghargai preferensi aksesibilitas pengguna (`prefers-reduced-motion`).
 *
 * Standar Teknis UKK RPL:
 * - Menggunakan `requestAnimationFrame` untuk performa 60 FPS tanpa jank.
 * - Aksesibilitas: Mendeteksi `prefers-reduced-motion` untuk pengguna dengan sensitivitas gerak.
 * - Format output angka lokal Indonesia (`toLocaleString("id-ID")`).
 */

"use client";

import { useState, useEffect } from "react";

/**
 * Hook `useCountUp` menganimasikan angka dari 0 hingga `targetValue`.
 *
 * @param targetValue - Angka tujuan akhir yang ingin dicapai.
 * @param durationMs - Durasi total animasi dalam milidetik (default: 750ms).
 * @param decimals - Jumlah angka di belakang koma (default: 0).
 * @returns String representasi angka terformat rapi sesuai lokal Indonesia.
 */
export function useCountUp(
  targetValue: number,
  durationMs: number = 750,
  decimals: number = 0
): string {
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    // Menghargai preferensi aksesibilitas prefers-reduced-motion pengguna
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        setCurrentValue(targetValue);
        return;
      }
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const startValue = 0;
    const change = targetValue - startValue;

    // Fungsi perulangan frame animasi
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / durationMs, 1);

      // Rumus perlambatan ease-out quad: 1 - (1 - progress) ^ 2
      const easedProgress = 1 - Math.pow(1 - progress, 2);
      const val = startValue + change * easedProgress;

      setCurrentValue(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrentValue(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    // Pembersihan frame saat unmount atau target berubah
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue, durationMs]);

  return decimals > 0
    ? currentValue.toFixed(decimals)
    : Math.round(currentValue).toLocaleString("id-ID");
}
