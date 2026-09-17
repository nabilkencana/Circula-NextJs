import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

export default function StatusStageGuideSection() {
  const stages = [
    {
      num: "1",
      title: "Menunggu Konfirmasi",
      desc: "Menunggu penyerahan fisik sampah ke unit Circula.",
    },
    {
      num: "2",
      title: "Diverifikasi",
      desc: "Sampah sedang ditimbang menggunakan timbangan tera digital.",
    },
    {
      num: "3",
      title: "Selesai",
      desc: "Timbangan disepakati, poin langsung diterbitkan ke saldo akun.",
    },
    {
      num: "4",
      title: "Ditolak",
      desc: "Sampah tercampur zat berbahaya atau tidak terpilah rapi.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Dark Stage Guide Card */}
        <div className="bg-[#111315] rounded-3xl p-6 sm:p-8 md:p-10 text-white border border-white/10 flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
              Arti 4 Tahap Status Penyetoran Anda
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed font-normal">
              Pastikan sampah Anda melewati seluruh tahapan untuk pencairan poin.
            </p>

            <div className="mt-7 space-y-4">
              {stages.map((stage) => (
                <div key={stage.num} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#CEF241] text-[#111315] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-3.5 h-3.5 text-[#111315] stroke-3" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {stage.num}. {stage.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Industrial Scale & Conveyor Inspection Photography */}
        <div className="relative rounded-3xl overflow-hidden border border-gray-200/80 shadow-xl min-h-95 flex flex-col justify-between p-6 sm:p-8 bg-[#181B1E]">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
            alt="Timbangan Industri Tera Digital Berkalibrasi"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#111315] via-[#111315]/40 to-transparent z-1" />

          {/* Bottom Docked Direct Text Overlay */}
          <div className="relative z-10 text-white mt-auto pt-8">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Timbangan Transparan &amp; Akurat
            </h4>
            <p className="text-xs text-gray-300 mt-1.5 leading-relaxed max-w-lg font-normal">
              Setiap gram material daur ulang yang disetor ditimbang menggunakan timbangan
              berstandar industri dengan sensor bersertifikat Metrologi Nasional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
