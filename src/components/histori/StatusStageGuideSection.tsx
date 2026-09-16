import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

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
        {/* Left Column: Dark Stage Guide Card (Clean without eyebrow badge) */}
        <div className="bg-dark-container rounded-3xl p-6 sm:p-8 md:p-10 text-white border border-white/10 flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
              Arti 4 Tahap Status Penyetoran Anda
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              Pastikan sampah Anda melewati seluruh tahapan untuk pencairan poin.
            </p>

            <div className="mt-6 space-y-3.5">
              {stages.map((stage) => (
                <div
                  key={stage.num}
                  className="p-3.5 rounded-2xl bg-dark-widget border border-white/10 flex items-start gap-3.5 transition-all hover:border-brand-neon/30"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-neon text-dark-container flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-dark-container" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      {stage.num}. {stage.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-300 mt-0.5 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Industrial Scale & Conveyor Inspection Photography */}
        <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl min-h-95">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
            alt="Timbangan Industri Tera Digital Berkalibrasi"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark-container/95 via-dark-container/40 to-transparent" />

          {/* Bottom Docked Inset Banner */}
          <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-dark-container/90 border border-white/15 backdrop-blur-md text-white">
            <h4 className="text-sm sm:text-base font-bold text-white">
              Timbangan Transparan &amp; Akurat
            </h4>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              Setiap gram material daur ulang yang disetor ditimbang menggunakan timbangan
              berstandar industri dengan sensor bersertifikat Metrologi Nasional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
