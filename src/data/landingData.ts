import { WasteCategory, WorkflowStep } from "@/types";

export const UKK_WASTE_CATEGORIES: WasteCategory[] = [
  {
    id: "eacfc2cf-2dc6-40c3-96fe-d55806f96b50",
    name: "Botol Plastik PET (Bersih)",
    category: "Plastik",
    pricePerKg: 3500,
    pointsPerKg: 10,
    color: "#3B82F6",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    image:
      "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=600&q=80",
    desc: "Botol plastik bening, dicuci bersih dan tanpa tutup label keras.",
  },
  {
    id: "5b2eff42-e462-400f-95c7-4b096e8cc6e1",
    name: "Kardus & Karton Bekas",
    category: "Kertas",
    pricePerKg: 2000,
    pointsPerKg: 5,
    color: "#F59E0B",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    image:
      "https://images.unsplash.com/photo-1507560461415-997cd00bfd45?auto=format&fit=crop&w=600&q=80",
    desc: "Kardus gelombang cokelat kering, dilipat rapi bebas isolasi lakban.",
  },
  {
    id: "ae28e806-940e-4c7f-8c93-c3184eb105a0",
    name: "Kaleng Aluminium / Minuman",
    category: "Logam",
    pricePerKg: 12000,
    pointsPerKg: 30,
    color: "#10B981",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    image:
      "https://images.unsplash.com/photo-1561503412-852800622772?auto=format&fit=crop&w=600&q=80",
    desc: "Kaleng minuman soda, susu kental manis, atau wadah biskuit bersih.",
  },
  {
    id: "440f0550-7e61-44d2-889b-8f9bef8835e7",
    name: "Botol Kaca Bening",
    category: "Kaca",
    pricePerKg: 1500,
    pointsPerKg: 4,
    color: "#8B5CF6",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    image:
      "https://images.unsplash.com/photo-1608745167260-e15bc0e0521f?auto=format&fit=crop&w=600&q=80",
    desc: "Botol kecap, sirup, atau toples kaca utuh tanpa retak pecah.",
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: "01",
    title: "1. Pilah dari Rumah",
    desc: "Pisahkan sampah anorganik (botol plastik, kardus, kaleng logam, kaca) dalam kondisi bersih dan kering.",
    iconName: "Recycle",
    tagline: "Siap Ditimbang",
  },
  {
    stepNumber: "02",
    title: "2. Ajukan Setor Online",
    desc: "Pilih jenis sampah di aplikasi, masukkan estimasi berat (kg), dan peroleh tiket kode setor STR-XXXX.",
    iconName: "FileText",
    tagline: "Tiket Digital Instan",
  },
  {
    stepNumber: "03",
    title: "3. Timbang di Loket Unit",
    desc: "Bawa sampah ke loket unit terdekat. Petugas menimbang dengan timbangan digital dan memvalidasi bobot real.",
    iconName: "Scale",
    tagline: "Verifikasi Presisi",
  },
  {
    stepNumber: "04",
    title: "4. Poin Cair Jadi Hadiah",
    desc: "Poin otomatis bertambah di saldo akun Anda dan siap ditukar sembako, pulsa, atau voucher belanja.",
    iconName: "Gift",
    tagline: "Redeem Poin Cepat",
  },
];
