import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Coins, FileText } from "lucide-react";

interface MissionSectionProps {
  /** Total berat sampah dalam kg dari API dashboard stats */
  totalBeratKg?: number;
  /** Total transaksi penyetoran berhasil dari API */
  totalTransaksi?: number;
}

/**
 * Komponen Seksi Misi & Transparansi Insentif Lingkungan (MissionSection)
 *
 * Menjelaskan visi sirkular Bank Sampah Circula dalam mengonversi limbah anorganik
 * menjadi instrumen ekonomi nyata melalui 3 pilar keunggulan operasional:
 * 1. Valuasi Harga Beli Riil: Transparansi indeks rupiah per kg (Rp/kg) tanpa potongan liar.
 * 2. Reward Poin Fleksibel: Kemudahan konversi poin ke sembako, pulsa, dan voucher belanja.
 * 3. Pencatatan Nota Digital Terverifikasi: Dokumentasi tanda terima penimbangan resmi (STR-XXXX).
 *
 * Di sisi kanan, terdapat kartu media visual fasilitas logistik dan volume sampah real dari API.
 *
 * @param {MissionSectionProps} props - Metrik volume dan transaksi dari server
 * @returns JSX Element seksi misi sirkular
 */
export default function MissionSection({
  totalBeratKg = 0,
  totalTransaksi = 0,
}: MissionSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* ================= KOLOM KIRI: NARASI MISI & 3 PILAR UTAMA ================= */}
        <div className="lg:col-span-6 flex flex-col">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight leading-tight">
            Mendorong Kesadaran Lingkungan Melalui Insentif Daur Ulang Transparan
          </h2>
          <p className="text-text-secondary text-base leading-relaxed mt-4">
            Setiap gram sampah anorganik yang Anda pilah di rumah memiliki nilai ekonomi terukur
            dan berkontribusi langsung pada target percepatan nol emisi karbon serta kelestarian
            lingkungan lokal.
          </p>

          {/* Deretan 3 Pilar Keunggulan Transparansi */}
          <div className="mt-8 space-y-5">
            {/* Pilar 1: Harga Beli Transparan */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-inset-gray border border-gray-200 transition-all hover:border-gray-400">
              <div className="w-8 h-8 rounded-full bg-brand-neon text-text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <CheckCircle2 className="w-5 h-5 fill-text-primary text-brand-neon" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  Valuasi Harga Beli Riil
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                  Indeks rupiah per kilogram (Rp/kg) diperbarui transparan sesuai harga pasar daur
                  ulang industri nasional tanpa potongan tersembunyi.
                </p>
              </div>
            </div>

            {/* Pilar 2: Reward Poin Fleksibel */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-inset-gray border border-gray-200 transition-all hover:border-gray-400">
              <div className="w-8 h-8 rounded-full bg-brand-neon text-text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Coins className="w-4 h-4 text-text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  Reward Poin Fleksibel
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                  Akumulasi poin penyetoran dapat langsung ditukarkan dengan pulsa seluler,
                  sembako dapur, e-wallet, dan voucher belanja mitra.
                </p>
              </div>
            </div>

            {/* Pilar 3: Nota Digital Terverifikasi */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-inset-gray border border-gray-200 transition-all hover:border-gray-400">
              <div className="w-8 h-8 rounded-full bg-brand-neon text-text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <FileText className="w-4 h-4 text-text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  Pencatatan Nota Digital Terverifikasi
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                  Bukti tanda terima digital resmi dengan nomor transaksi unik (STR-XXXX), siap
                  diunduh, disimpan, dan dicetak sebagai bukti penimbangan sah.
                </p>
              </div>
            </div>
          </div>

          {/* Tombol Ajakan Registrasi Nasabah */}
          <div className="mt-8">
            <Link
              href="/register"
              className="bg-dark-container text-white font-bold px-7 py-3.5 rounded-full inline-flex items-center gap-3 hover:bg-black transition-all group text-sm shadow-md"
            >
              <span>Daftar sebagai Nasabah</span>
              <div className="w-6 h-6 rounded-full bg-brand-neon text-dark-container flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* ================= KOLOM KANAN: MEDIA FASILITAS PEMILAHAN ================= */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl aspect-4/3 sm:aspect-16/11">
            <Image
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80"
              alt="Fasilitas Pemilahan Sampah Terpadu 4 Kategori"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            {/* Kartu Overlay Keterangan Kapasitas Operasional */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-dark-container/90 border border-white/15 backdrop-blur-md text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-neon">
                    Fasilitas Daur Ulang Sirkular
                  </p>
                  <h4 className="text-sm sm:text-base font-bold mt-0.5 text-white">
                    {totalBeratKg > 0
                      ? `Volume Terkelola: ${totalBeratKg} Kg Sampah Terpilah`
                      : "Kapasitas Operasional: 250+ Metrik Ton / Bulan"}
                  </h4>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-xs bg-dark-widget text-brand-neon border border-brand-neon/30 px-2.5 py-1 rounded-full font-bold">
                    {totalTransaksi > 0
                      ? `${totalTransaksi} Transaksi Sukses`
                      : "Aktif 24/7"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

