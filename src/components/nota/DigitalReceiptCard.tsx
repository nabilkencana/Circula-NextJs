import React from "react";
import { TipeNota, NotaSetorDetail, NotaTukarDetail } from "@/types/nota";
import ReceiptHeader from "./ReceiptHeader";
import ReceiptMetadataGrid from "./ReceiptMetadataGrid";
import ReceiptItemsTable from "./ReceiptItemsTable";
import ReceiptCalculationDeck from "./ReceiptCalculationDeck";
import ReceiptSignatureFooter from "./ReceiptSignatureFooter";

interface DigitalReceiptCardProps {
  activeTab: TipeNota;
  notaSetor: NotaSetorDetail;
  notaTukar: NotaTukarDetail;
}

export default function DigitalReceiptCard({
  activeTab,
  notaSetor,
  notaTukar,
}: DigitalReceiptCardProps) {
  return (
    <div className="max-w-4xl mx-auto my-4 bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm print-receipt-sheet print:m-0 print:p-0 print:border-none print:shadow-none relative">
      {/* ================= MODE 1: NOTA PENYETORAN SAMPAH (STR) ================= */}
      {activeTab === "setor" ? (
        <div>
          {/* Header */}
          <ReceiptHeader unitName={notaSetor.namaUnit} />

          {/* 4-Column Metadata Inset */}
          <ReceiptMetadataGrid
            kodeTransaksi={notaSetor.kodeTransaksi}
            waktuVerifikasi="26 Agu 2026, 09:35 WIB"
            namaNasabah={notaSetor.namaNasabah}
            noTelepon={notaSetor.noTelepon}
          />

          {/* Itemized Recyclable Waste Table */}
          <ReceiptItemsTable items={notaSetor.items} />

          {/* Grand Total Ledger Deck */}
          <ReceiptCalculationDeck
            totalBeratKg={notaSetor.totalBeratKg}
            estimasiNilaiRupiah={notaSetor.estimasiNilaiRupiah}
            saldoSebelumTransaksi={notaSetor.saldoSebelumTransaksi}
            totalPoinDiterbitkan={notaSetor.totalPoinDiterbitkan}
            totalSaldoAkhir={notaSetor.totalSaldoAkhir}
          />

          {/* QR Code & Signature Sign-off */}
          <ReceiptSignatureFooter
            petugasPenimbang={notaSetor.petugasPenimbang}
            catatanPetugas={notaSetor.catatanPetugas}
            digitalSignatureHash={notaSetor.digitalSignatureHash}
          />
        </div>
      ) : (
        /* ================= MODE 2: NOTA PENUKARAN POIN (TKR) ================= */
        <div>
          {/* Header */}
          <ReceiptHeader unitName="Kemitraan Merchant & Koperasi Circula (ID: REWARD-01)" />

          {/* 4-Column Metadata Inset */}
          <ReceiptMetadataGrid
            kodeTransaksi={notaTukar.kodeTransaksi}
            waktuVerifikasi="26 Agu 2026, 11:20 WIB"
            namaNasabah={notaTukar.namaNasabah}
            noTelepon="085678901234"
          />

          {/* TKR Reward Item Detail Inset */}
          <div className="my-6 p-6 rounded-2xl bg-inset-gray border border-gray-200 space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block">
              Detail Hadiah Yang Diklaim
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
              <div>
                <h4 className="font-bold text-base sm:text-lg text-text-primary">
                  {notaTukar.itemDitukar}
                </h4>
                <span className="text-xs text-text-secondary mt-0.5 block">
                  Kategori: Voucher Digital &amp; Pulsa Seluler
                </span>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block">
                  Kode Klaim Merchant
                </span>
                <span className="font-mono font-extrabold text-sm sm:text-base text-dark-container block">
                  {notaTukar.merchantClaimCode}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-text-secondary block">Biaya Penukaran Poin:</span>
                <span className="font-mono font-bold text-red-600 text-sm">
                  -{notaTukar.poinTerpakai} Poin
                </span>
              </div>
              <div>
                <span className="text-text-secondary block">Sisa Saldo Poin:</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">
                  {notaTukar.sisaSaldoPoin} Poin
                </span>
              </div>
            </div>
          </div>

          {/* Grand Total Ledger Deck for Tukar */}
          <div className="bg-dark-container rounded-2xl p-6 text-white my-6 border border-white/10 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs sm:text-sm font-bold tracking-wider text-gray-300 uppercase block">
                  Status Penukaran Hadiah
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5 block">
                  Klaim telah disetujui &amp; saldo akun telah disesuaikan
                </span>
              </div>

              <div className="text-left sm:text-right">
                <span className="font-extrabold text-2xl sm:text-3xl text-brand-neon tracking-tight block">
                  KLAIM TERVERIFIKASI
                </span>
              </div>
            </div>
          </div>

          {/* QR Code & Signature Sign-off */}
          <ReceiptSignatureFooter
            petugasPenimbang="Sistem Otomatisasi Hadiah Circula"
            catatanPetugas="Kode klaim dapat ditukarkan langsung ke merchant rekanan resmi Circula."
            digitalSignatureHash="81f72a4b-51dc-492c-85a2-c19ebdf817ea"
          />
        </div>
      )}
    </div>
  );
}
