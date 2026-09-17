export interface QueueItemRecord {
  id: string; // e.g. "str-1002"
  kodeTransaksi: string; // e.g. "STR-202608-1002"
  waktuPengajuan: string; // e.g. "26 Agu 2026, 10:00 WIB"
  nasabahNama: string;
  nasabahTelp: string;
  rincianEstimasi: string; // e.g. "Botol PET & Kardus (Est. 6.5 kg)"
  estimasiPoin: number;
}

export interface DashboardKpiSummary {
  totalNasabah: number;
  nasabahBaruBulanIni: number;
  tonaseBulanIniTon: number;
  tonaseGrowthVsBulanLalu: number;
  valuasiKasRupiah: number;
  poinAktifBeredar: number;
}

export interface CompositionMaterialStat {
  kategoriLabel: string; // e.g. "Plastik (PET & Jerigen)"
  beratKg: number;
  persentase: number;
  barColorHex: string;
}

export interface DashboardTelemetryData {
  unitNama: string;
  unitKode: string;
  antreanCount: number;
  totalTonaseMasukKg: number;
  kpi: DashboardKpiSummary;
  queueList: QueueItemRecord[];
  composition: CompositionMaterialStat[];
  scaleDeviceId: string; // e.g. "#SCL-042-A"
}
