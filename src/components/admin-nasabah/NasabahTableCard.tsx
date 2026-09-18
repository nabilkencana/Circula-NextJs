/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Kontainer Tabel Buku Induk Nasabah Admin
 *
 * File: src/components/admin-nasabah/NasabahTableCard.tsx
 * Deskripsi:
 * Menggabungkan Header Tabel (ekspor CSV), Body Tabel responsif (dengan horizontal
 * scrollbar untuk perangkat sempit), baris data terpetakan, empty state bila pencarian nihil,
 * serta kontrol paginasi di bagian footer kartu.
 *
 * Standar Teknis UKK RPL:
 * - Pembungkus kartu tabel terpadu dengan border-radius 3xl dan shadow halus.
 * - Penanganan empty state informatif saat hasil penyaringan data nihil.
 * - Terintegrasi dengan subkomponen Header, Row, dan Pagination.
 */

import React from "react";
import { NasabahRecord } from "@/types/adminNasabah";
import NasabahTableHeader from "./NasabahTableHeader";
import NasabahTableRow from "./NasabahTableRow";
import NasabahPagination from "./NasabahPagination";
import { UserX } from "lucide-react";

/**
 * Properti komponen NasabahTableCard.
 */
interface NasabahTableCardProps {
  /** Record data nasabah pada halaman saat ini */
  records: NasabahRecord[];
  /** Jumlah total seluruh nasabah unit */
  totalCount: number;
  /** Jumlah record nasabah hasil filter pencarian */
  totalFilteredCount: number;
  /** Nomor halaman aktif saat ini */
  currentPage: number;
  /** Jumlah total halaman paginasi */
  totalPages: number;
  /** Callback saat halaman berpindah */
  onPageChange: (page: number) => void;
  /** Callback saat tombol edit ditekan */
  onEdit: (record: NasabahRecord) => void;
  /** Callback saat tombol lihat rincian ditekan */
  onView: (record: NasabahRecord) => void;
  /** Callback saat tombol hapus ditekan */
  onDelete: (record: NasabahRecord) => void;
  /** Callback saat tombol ekspor CSV ditekan */
  onExportCsv: () => void;
}

/**
 * Komponen kontainer kartu tabel buku induk data nasabah.
 */
export default function NasabahTableCard({
  records,
  totalCount,
  totalFilteredCount,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onView,
  onDelete,
  onExportCsv,
}: NasabahTableCardProps) {
  return (
    <section
      className="max-w-7xl mx-auto my-4 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs"
      aria-label="Tabel Buku Induk Nasabah"
    >
      {/* Table Card Header */}
      <NasabahTableHeader totalCount={totalCount} onExportCsv={onExportCsv} />

      {/* Table Responsive Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-190">
          <thead>
            <tr className="border-b border-gray-200 bg-white text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              <th scope="col" className="py-3.5 px-6">
                IDENTITAS NASABAH
              </th>
              <th scope="col" className="py-3.5 px-6">
                KONTAK &amp; ALAMAT
              </th>
              <th scope="col" className="py-3.5 px-6">
                USERNAME
              </th>
              <th scope="col" className="py-3.5 px-6">
                SALDO POIN AKTIF
              </th>
              <th scope="col" className="py-3.5 px-6">
                STATUS
              </th>
              <th scope="col" className="py-3.5 px-6 text-center">
                AKSI
              </th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <NasabahTableRow
                  key={record.id}
                  record={record}
                  onEdit={onEdit}
                  onView={onView}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <UserX className="w-8 h-8 text-gray-300" />
                    <p className="font-semibold text-sm text-text-primary">
                      Tidak ada nasabah yang cocok dengan pencarian
                    </p>
                    <p className="text-xs text-text-secondary">
                      Coba sesuaikan kata kunci pencarian atau ganti filter segmentasi.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Card Pagination */}
      <NasabahPagination
        displayedCount={records.length}
        totalCount={totalFilteredCount}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </section>
  );
}
