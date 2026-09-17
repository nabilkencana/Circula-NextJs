"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  DashboardTelemetryData,
  QueueItemRecord,
} from "@/types/adminDashboard";
import {
  getDashboardTelemetry,
  EMPTY_DASHBOARD_DATA,
} from "@/services/adminDashboardService";

export function useAdminDashboard() {
  const router = useRouter();
  const [telemetry, setTelemetry] = useState<DashboardTelemetryData>(
    EMPTY_DASHBOARD_DATA
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTelemetry = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getDashboardTelemetry();
      setTelemetry(data);
    } catch (err: unknown) {
      console.error("Failed to load admin dashboard data:", err);
      setError("Gagal memuat telemetri dashboard.");
      setTelemetry(EMPTY_DASHBOARD_DATA);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function initTelemetry() {
      try {
        const data = await getDashboardTelemetry();
        if (isMounted) {
          setTelemetry(data);
        }
      } catch (err: unknown) {
        console.error("Failed to load admin dashboard data:", err);
        if (isMounted) {
          setError("Gagal memuat telemetri dashboard.");
          setTelemetry(EMPTY_DASHBOARD_DATA);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initTelemetry();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigateToWeigh = useCallback(
    (ticket?: QueueItemRecord) => {
      if (ticket) {
        // Pre-select or pass ticket reference via query param
        router.push(`/admin/transaksi?ticket=${encodeURIComponent(ticket.kodeTransaksi)}`);
      } else {
        router.push("/admin/transaksi");
      }
    },
    [router]
  );

  const handleNavigateToNasabah = useCallback(() => {
    router.push("/admin/nasabah");
  }, [router]);

  const handleNavigateToKategori = useCallback(() => {
    router.push("/admin/kategori-sampah");
  }, [router]);

  const handleNavigateToLaporan = useCallback(() => {
    router.push("/admin/laporan");
  }, [router]);

  const handleNavigateToProfil = useCallback(() => {
    router.push("/admin/profil");
  }, [router]);

  return {
    telemetry,
    isLoading,
    error,
    refreshTelemetry: fetchTelemetry,
    handleNavigateToWeigh,
    handleNavigateToNasabah,
    handleNavigateToKategori,
    handleNavigateToLaporan,
    handleNavigateToProfil,
  };
}
