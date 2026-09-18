/**
 * @file useAdminDashboard.ts
 * @description Custom React Hook untuk manajemen state dan navigasi pada modul Dashboard Admin Circula.
 * Mengelola siklus hidup pemuatan telemetri operasional (`isLoading`, `error`),
 * penyegaran data otomatis maupun manual (`refreshTelemetry`),
 * serta fungsionalitas navigasi rute terintegrasi (timbang tiket, nasabah, kategori, laporan, profil).
 * 
 * @module Hooks/UseAdminDashboard
 */

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

/**
 * Hook useAdminDashboard
 * 
 * @returns {object} Kumpulan state telemetri dan fungsi pengendali navigasi operasional admin.
 */
export function useAdminDashboard() {
  const router = useRouter();

  // State data telemetri dashboard operasional
  const [telemetry, setTelemetry] = useState<DashboardTelemetryData>(
    EMPTY_DASHBOARD_DATA
  );
  // Indikator status pemuatan data dari API
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Pesan galat jika terjadi gangguan jaringan
  const [error, setError] = useState<string | null>(null);

  /**
   * Mengambil data telemetri terbaru dari backend dan memperbarui state.
   */
  const fetchTelemetry = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getDashboardTelemetry();
      setTelemetry(data);
    } catch (err: unknown) {
      console.error("Gagal memuat telemetri dashboard admin:", err);
      setError("Gagal memuat telemetri dashboard.");
      setTelemetry(EMPTY_DASHBOARD_DATA);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memuat data saat komponen pertama kali di-mount
  useEffect(() => {
    let isMounted = true;
    async function initTelemetry() {
      try {
        const data = await getDashboardTelemetry();
        if (isMounted) {
          setTelemetry(data);
        }
      } catch (err: unknown) {
        console.error("Gagal memuat telemetri dashboard admin:", err);
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

  /**
   * Navigasi langsung ke modul verifikasi penimbangan transaksi.
   * Dapat menerima tiket antrean spesifik untuk pre-select transaksi yang dituju.
   * 
   * @param {QueueItemRecord} [ticket] - Tiket antrean penyetoran pilihan.
   */
  const handleNavigateToWeigh = useCallback(
    (ticket?: QueueItemRecord) => {
      if (ticket) {
        // Teruskan kode transaksi via query param untuk langsung membuka form timbangan
        router.push(`/admin/transaksi?ticket=${encodeURIComponent(ticket.kodeTransaksi)}`);
      } else {
        router.push("/admin/transaksi");
      }
    },
    [router]
  );

  /**
   * Navigasi ke modul manajemen dan pendaftaran nasabah baru.
   */
  const handleNavigateToNasabah = useCallback(() => {
    router.push("/admin/nasabah");
  }, [router]);

  /**
   * Navigasi ke modul konfigurasi kategori dan tarif harga sampah.
   */
  const handleNavigateToKategori = useCallback(() => {
    router.push("/admin/kategori-sampah");
  }, [router]);

  /**
   * Navigasi ke modul cetak rekapitulasi dan laporan tonase bulanan.
   */
  const handleNavigateToLaporan = useCallback(() => {
    router.push("/admin/laporan");
  }, [router]);

  /**
   * Navigasi ke modul pengaturan profil dan konfigurasi unit operasional.
   */
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
