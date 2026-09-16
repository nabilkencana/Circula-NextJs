import { TransaksiPenyetoran } from "@/types/historiSetor";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://learn.smktelkom-mlg.sch.id/bank_sampah/";

export const MOCK_TRANSAKSI_HISTORI: TransaksiPenyetoran[] = [
  {
    id: "tx-1002",
    kodeSetor: "STR-202608-1002",
    tanggalPengajuan: "2026-08-26T10:00:00Z",
    status: "menunggu_konfirmasi",
    metodePenyerahan: "drop-off",
    lokasiTujuan: "Drop-off Mandiri Unit Pusat",
    catatanNasabah: "Sampah sudah dipilah rapi dalam 2 karung",
    totalBeratKg: 6.5,
    totalPoin: 55,
    items: [
      {
        kategoriNama: "Botol Plastik PET (Est. 4.5 Kg)",
        beratKg: 4.5,
        isRealWeight: false,
        poinSubtotal: 45,
        rupiahSubtotal: 15750,
      },
      {
        kategoriNama: "Kardus & Karton (Est. 2.0 Kg)",
        beratKg: 2.0,
        isRealWeight: false,
        poinSubtotal: 10,
        rupiahSubtotal: 4000,
      },
    ],
  },
  {
    id: "tx-1001",
    kodeSetor: "STR-202608-1001",
    tanggalPengajuan: "2026-08-26T09:15:00Z",
    tanggalVerifikasi: "2026-08-26T09:35:00Z",
    status: "selesai",
    metodePenyerahan: "drop-off",
    lokasiTujuan: "Unit Penimbangan Pusat",
    petugasVerifikator: "Ahmad Fauzi (Timbangan Tera Digital #04)",
    catatanPetugas: "Berat sampah sesuai hasil timbangan real",
    totalBeratKg: 15.0,
    totalPoin: 150,
    items: [
      {
        kategoriNama: "Botol Plastik PET: 10.0 Kg",
        beratKg: 10.0,
        isRealWeight: true,
        poinSubtotal: 100,
        rupiahSubtotal: 35000,
      },
      {
        kategoriNama: "Kardus & Karton: 5.0 Kg",
        beratKg: 5.0,
        isRealWeight: true,
        poinSubtotal: 25,
        rupiahSubtotal: 10000,
      },
    ],
  },
  {
    id: "tx-0994",
    kodeSetor: "STR-202608-0994",
    tanggalPengajuan: "2026-08-14T14:20:00Z",
    tanggalVerifikasi: "2026-08-14T14:45:00Z",
    status: "ditolak",
    metodePenyerahan: "drop-off",
    lokasiTujuan: "Unit Penimbangan Pusat",
    catatanPetugas:
      "Sampah botol plastik masih tercampur cairan residu oli dan tidak memenuhi standar kebersihan 3R.",
    totalBeratKg: 6.0,
    totalPoin: 0,
    items: [
      {
        kategoriNama: "Botol Plastik Bekas Oli (Tercemar)",
        beratKg: 6.0,
        isRealWeight: false,
        poinSubtotal: 0,
        rupiahSubtotal: 0,
      },
    ],
  },
];

function getAuthHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const appKey = process.env.NEXT_PUBLIC_APP_KEY;
  if (appKey) {
    headers["x-app-key"] = appKey;
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("circula_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

interface ApiTransactionItem {
  id?: string;
  kodeSetor?: string;
  tanggal?: string;
  tanggalVerifikasi?: string;
  status?: string;
  metode?: string;
  lokasi?: string;
  catatan?: string;
  catatanPetugas?: string;
  petugas?: string;
  totalBerat?: number | string;
  totalPoin?: number | string;
  items?: Array<{
    namaKategori?: string;
    berat?: number | string;
    isReal?: boolean;
    poin?: number | string;
    rupiah?: number | string;
  }>;
}

export async function getMySetorHistory(
  bulan?: string
): Promise<TransaksiPenyetoran[]> {
  const query = bulan ? `?bulan=${encodeURIComponent(bulan)}` : "";
  const url = `${API_BASE_URL}/api/v1/setor-sampah/my-setor${query}`;
  const headers = getAuthHeaders();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url, {
      method: "GET",
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
        return json.data.map((item: ApiTransactionItem, index: number) => {
          const statusMap: Record<string, TransaksiPenyetoran["status"]> = {
            menunggu_konfirmasi: "menunggu_konfirmasi",
            diverifikasi: "diverifikasi",
            selesai: "selesai",
            ditolak: "ditolak",
          };
          const rawStatus = item.status?.toLowerCase() || "menunggu_konfirmasi";
          const status = statusMap[rawStatus] || "menunggu_konfirmasi";

          return {
            id: item.id || `tx-${index}`,
            kodeSetor: item.kodeSetor || `STR-202608-${1000 + index}`,
            tanggalPengajuan: item.tanggal || new Date().toISOString(),
            tanggalVerifikasi: item.tanggalVerifikasi,
            status,
            metodePenyerahan: (item.metode === "jemput" ? "jemput" : "drop-off") as "drop-off" | "jemput",
            lokasiTujuan: item.lokasi || "Drop-off Mandiri Unit Pusat",
            catatanNasabah: item.catatan,
            catatanPetugas: item.catatanPetugas,
            petugasVerifikator: item.petugas,
            totalBeratKg: Number(item.totalBerat) || 0,
            totalPoin: Number(item.totalPoin) || 0,
            items: (item.items || []).map((sub) => ({
              kategoriNama: sub.namaKategori || "Kategori Sampah",
              beratKg: Number(sub.berat) || 0,
              isRealWeight: Boolean(sub.isReal),
              poinSubtotal: Number(sub.poin) || 0,
              rupiahSubtotal: Number(sub.rupiah) || 0,
            })),
          };
        });
      }
    }
  } catch (err) {
    console.warn("[HistoriService] Using simulated dataset:", err);
  }

  return MOCK_TRANSAKSI_HISTORI;
}
