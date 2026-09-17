"use client";

import React from "react";
import { QueueItemRecord, CompositionMaterialStat } from "@/types/adminDashboard";
import WeighingQueueTableCard from "./WeighingQueueTableCard";
import MaterialCompositionBento from "./MaterialCompositionBento";

interface DashboardSplitSectionProps {
  queueList: QueueItemRecord[];
  scaleDeviceId: string;
  materials: CompositionMaterialStat[];
  totalTonaseMasukKg: number;
  onTimbang: (ticket: QueueItemRecord) => void;
}

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
      {/* Left 65%: Queue Table Card */}
      <div className="lg:col-span-8 flex flex-col">
        <WeighingQueueTableCard
          queueList={queueList}
          scaleDeviceId={scaleDeviceId}
          onTimbang={onTimbang}
        />
      </div>

      {/* Right 35%: Material Composition Bento */}
      <div className="lg:col-span-4 flex flex-col">
        <MaterialCompositionBento
          materials={materials}
          totalTonaseMasukKg={totalTonaseMasukKg}
        />
      </div>
    </section>
  );
}
