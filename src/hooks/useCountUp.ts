"use client";

import { useState, useEffect } from "react";

export function useCountUp(
  targetValue: number,
  durationMs: number = 750,
  decimals: number = 0
): string {
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    // Honor accessibility prefers-reduced-motion
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

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease-out quad formula: 1 - (1 - progress) ^ 2
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

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue, durationMs]);

  return decimals > 0
    ? currentValue.toFixed(decimals)
    : Math.round(currentValue).toLocaleString("id-ID");
}
