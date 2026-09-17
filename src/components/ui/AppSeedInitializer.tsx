"use client";

/**
 * AppSeedInitializer
 * Silent background component that calls POST /api/v1/seed on first app load
 * to register the x-app-key UUID with the backend.
 * Runs invisibly with no UI — only logs status to console.
 */

import { useEffect, useRef } from "react";
import { getAppKey, APP_KEY_STORAGE_KEY } from "@/lib/api/client";

const SEED_STATUS_KEY = "circula_seed_done";

export default function AppSeedInitializer() {
  const hasSeedRan = useRef(false);

  useEffect(() => {
    if (hasSeedRan.current) return;
    hasSeedRan.current = true;

    const alreadySeeded = localStorage.getItem(SEED_STATUS_KEY);
    if (alreadySeeded === "1") return;

    const appKey = getAppKey();
    if (!appKey) return;

    // Fire-and-forget seed — does not block render
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://learn.smktelkom-mlg.sch.id/bank_sampah"}/api/v1/seed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-key": appKey,
        },
        signal: AbortSignal.timeout(8000),
      }
    )
      .then(async (res) => {
        if (res.ok || res.status === 200 || res.status === 201) {
          // Mark as seeded so we don't call again this session
          localStorage.setItem(SEED_STATUS_KEY, "1");
          localStorage.setItem(APP_KEY_STORAGE_KEY, appKey);
          console.info("[Circula] App seeded successfully ✓");
        } else {
          const body = await res.json().catch(() => ({}));
          console.warn("[Circula] Seed returned non-OK:", res.status, body?.message ?? "");
        }
      })
      .catch((err) => {
        console.warn("[Circula] Seed request failed (offline?):", err?.message ?? err);
      });
  }, []);

  return null;
}
