/**
 * @file DashboardSplitSection.tsx
 * @description Komponen tata letak belah (Split Section) 2-kolom responsif pada dashboard admin.
 * Membagi ruang kerja dashboard secara proporsional:
 * - Kolom Kiri (8/12 - 66%): Tabel kartu antrean tiket penyetoran masuk (`WeighingQueueTableCard`).
 * - Kolom Kanan (4/12 - 33%): Kartu bento diagram komposisi material sampah (`MaterialCompositionBento`).
 * 
 * @module Components/AdminDashboard/DashboardSplitSection
 */

"use client";

import React from "react";
import { QueueItemRecord, CompositionMaterialStat } from "@/types/adminDashboard";
import WeighingQueueTableCard from "./WeighingQueueTableCard";
import MaterialCompositionBento from "./MaterialCompositionBento";

/**
 * Properti untuk komponen DashboardSplitSection
 * 
 * @interface DashboardSplitSectionProps
 * @property {QueueItemRecord[]} queueList - Daftar tiket antrean menunggu verifikasi.
 * @property {string} scaleDeviceId - Identifier sensor perangkat timbangan tera digital.
 * @property {CompositionMaterialStat[]} materials - Rincian data statistik kelompok material daur ulang.
 * @property {number} totalTonaseMasukKg - Total tonase berat keseluruhan dalam kilogram.
 * @property {(ticket: QueueItemRecord) => void} onTimbang - Callback untuk memproses penimbangan tiket antrean.
 */
interface DashboardSplitSectionProps {
  queueList: QueueItemRecord[];
  scaleDeviceId: string;
  materials: CompositionMaterialStat[];
  totalTonaseMasukKg: number;
  onTimbang: (ticket: QueueItemRecord) => void;
}

/**
 * Komponen DashboardSplitSection
 * 
 * @component
 * @param {DashboardSplitSectionProps} props - Data gabungan antrean dan komposisi material.
 * @returns {JSX.Element} Tata letak grid 12-kolom responsif.
 */
export default function DashboardSplitSection({
  queueList,
  scaleDeviceId,
  materials,
  totalTonaseMasukKg,
  onTimbang,
}: DashboardSplitSectionProps) {
  return (
    <section
      aria-label="Antrean Verifikasi dan Komposisi Material"
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8 sm:mb-10"
    >
      {/* ===================================================================== */}
      {/* KOLOM KIRI (8/12): KARTU TABEL ANTREAN SETORAN MASUK                  */}
      {/* ===================================================================== */}
      <div className="lg:col-span-8 flex flex-col">
        <WeighingQueueTableCard
          queueList={queueList}
          scaleDeviceId={scaleDeviceId}
          onTimbang={onTimbang}
        />
      </div>

      {/* ===================================================================== */}
      {/* KOLOM KANAN (4/12): KARTU BENTO KOMPOSISI MATERIAL SAMPAH             */}
      {/* ===================================================================== */}
      <div className="lg:col-span-4 flex flex-col">
        <MaterialCompositionBento
          materials={materials}
          totalTonaseMasukKg={totalTonaseMasukKg}
        />
      </div>
    </section>
  );
}
