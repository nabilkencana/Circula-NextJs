import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function StandarPemeriksaanGuide() {
  const criteria = [
    {
      num: "1",
      title: "Kering & Bebas Minyak",
      desc: "Sampah tidak terkontaminasi cairan organik busuk atau sisa makanan hewani.",
    },
    {
      num: "2",
      title: "Terpilah Menurut Kategori",
      desc: "Pisahkan tutup botol, isolasi plastik tebal, dan staples atau perekat berlebih.",
    },
    {
      num: "3",
      title: "Timbangan Digital Realtime",
      desc: "Menggunakan sensor timbangan digital terkalibrasi metrologi saat verifikasi admin.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Dark Criteria Card */}
        <div className="lg:col-span-6 bg-dark-container rounded-3xl p-6 sm:p-8 md:p-10 text-white border border-white/10 flex flex-col justify-between shadow-xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              Standar Penerimaan Sampah di Unit Circula
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-3 leading-relaxed">
              Pastikan sampah terpilah memenuhi 3 kriteria utama sebelum diserahkan
              guna menjamin akurasi nilai timbangan serta higienitas penampungan.
            </p>

            {/* Criteria List */}
            <div className="mt-8 space-y-4">
              {criteria.map((item) => (
                <div
                  key={item.num}
                  className="p-4 rounded-2xl bg-dark-widget border border-white/10 flex items-start gap-4 transition-all hover:border-brand-neon/30"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-neon text-dark-container flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 shadow-sm">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: High-Definition Facility Photo */}
        <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl min-h-95">
          <Image
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80"
            alt="Fasilitas Pemilahan Circula Material Recovery Facility"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark-container/90 via-dark-container/30 to-transparent" />

          {/* Bottom Floating Badge Tag */}
          <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-dark-container/90 border border-white/15 backdrop-blur-md text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-neon/20 text-brand-neon flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-neon">
                  Fasilitas Ramah Lingkungan
                </p>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  Dukungan fasilitas pemilahan bersertifikasi ISO 14001
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
