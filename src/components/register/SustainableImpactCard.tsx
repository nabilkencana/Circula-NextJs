import React from "react";
import Image from "next/image";
import { Sprout, Award } from "lucide-react";

export default function SustainableImpactCard() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-gray-200 h-64 sm:h-72 shadow-xs group">
      {/* Background Photography */}
      <Image
        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"
        alt="Inisiatif Penghijauan dan Sirkular Berkelanjutan"
        fill
        sizes="(max-width: 1024px) 100vw, 35vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-container/90 backdrop-blur-md border border-white/15 text-brand-neon text-[11px] font-bold shadow-md">
          <Award className="w-3.5 h-3.5 fill-brand-neon" />
          <span>Dampak Ekologis Riil</span>
        </div>
      </div>

      {/* Bottom Docked Glassmorphism Information */}
      <div className="absolute bottom-4 inset-x-4 z-10">
        <div className="bg-dark-container/85 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-white shadow-lg">
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-7 h-7 rounded-lg bg-brand-neon/20 text-brand-neon flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">
              +148 Ton Sampah Terdaur Ulang
            </span>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed pl-9">
            Kontribusi kolektif nasabah Circula berhasil mencegah emisi 312 ton CO₂e ke atmosfer Malang Raya.
          </p>
        </div>
      </div>
    </div>
  );
}
