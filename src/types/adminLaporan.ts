export type JenisSampahKey = "plastik" | "kertas" | "logam" | "kaca";

export interface BreakdownMaterialItem {
  kategoriKey: JenisSampahKey;
  badgeLabel: string; // e.g. "PLASTIK"
  subLabel: string; // e.g. "Botol PET, Cup, Jerigen Bersih (Grade A & B)"
  tonaseKg: number;
  tonaseTon: number;
  valuasiRupiah: number;
  rewardPoin: number;
  persentaseTotal: number; // e.g. 52.0
  colorHex: string; // e.g. "#3B82F6"
}

export interface RekapitulasiBulananResponse {
  periodeBulan: string; // e.g. "2026-08"
  periodeLabel: string; // e.g. "Agustus 2026"
  totalVolume: {
    totalKg: number;
    totalTon: number;
    growthPercentage: number;
    comparedToMonth: string;
  };
  pembayaranKas: {
    totalRupiah: number;
    rataRataTransaksiRupiah: number;
  };
  sirkulasiReward: {
    totalPoinDiterbitkan: number;
    totalPoinTerpakai: number;
    totalKlaimVoucherSelesai: number;
  };
  breakdownMaterials: BreakdownMaterialItem[];
  compliance: {
    isoStandard: string;
    dinasTujuan: string;
    penanggungJawab: string;
    signatureVerified: boolean;
  };
}
