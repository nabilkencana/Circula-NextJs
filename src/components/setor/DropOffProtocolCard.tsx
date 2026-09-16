import React from "react";
import { Clock } from "lucide-react";

export default function DropOffProtocolCard() {
  const steps = [
    {
      num: "1",
      title: "Dapatkan Tiket Penyetoran",
      desc: "Simpan barcode / kode transaksi tiket setelah form ini dikirim.",
    },
    {
      num: "2",
      title: "Kunjungi Unit / Tunggu Penjemputan",
      desc: "Tunjukkan kode tiket kepada petugas penimbangan resmi.",
    },
    {
      num: "3",
      title: "Poin Otomatis Masuk Saldo",
      desc: "Inspeksi fisik tuntas dan poin reward Circula aktif seketika.",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-text-primary" />
        <h3 className="text-sm sm:text-base font-bold text-text-primary tracking-tight">
          Tata Cara &amp; Alur Penyetoran
        </h3>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.num} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-brand-neon text-dark-container flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 shadow-xs">
              {step.num}
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-primary">
                {step.title}
              </h4>
              <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
