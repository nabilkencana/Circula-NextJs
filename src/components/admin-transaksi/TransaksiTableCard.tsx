import React from "react";
import {
  TransaksiSetorAdminRecord,
  TransaksiTkrAdminRecord,
  TransaksiViewType,
} from "@/types/adminTransaksi";
import TransaksiTableHeader from "./TransaksiTableHeader";
import TransaksiTableRow from "./TransaksiTableRow";
import TransaksiTkrTableRow from "./TransaksiTkrTableRow";
import TransaksiPagination from "./TransaksiPagination";

interface TransaksiTableCardProps {
  viewType: TransaksiViewType;
  selectedBulan: string;
  totalFilteredCount: number;
  displayedCount: number;
  currentPage: number;
  totalPages: number;
  paginatedStrList: TransaksiSetorAdminRecord[];
  paginatedTkrList: TransaksiTkrAdminRecord[];
  onPageChange: (page: number) => void;
  onExportRekap: () => void;
  onOpenVerify: (record: TransaksiSetorAdminRecord) => void;
  onFinalize: (id: string) => void;
  onCompleteTkr: (id: string) => void;
}

export default function TransaksiTableCard({
  viewType,
  selectedBulan,
  totalFilteredCount,
  displayedCount,
  currentPage,
  totalPages,
  paginatedStrList,
  paginatedTkrList,
  onPageChange,
  onExportRekap,
  onOpenVerify,
  onFinalize,
  onCompleteTkr,
}: TransaksiTableCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-xs overflow-hidden mb-8">
      {/* Table Header */}
      <TransaksiTableHeader
        viewType={viewType}
        selectedBulan={selectedBulan}
        displayedCount={displayedCount}
        onExportRekap={onExportRekap}
      />

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-190">
          <thead>
            <tr className="border-b border-gray-200 bg-inset-gray text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              {viewType === "STR" ? (
                <>
                  <th className="py-3.5 px-6">KODE &amp; TANGGAL</th>
                  <th className="py-3.5 px-6">NASABAH PENYETOR</th>
                  <th className="py-3.5 px-6">RINCIAN TIMBANGAN</th>
                  <th className="py-3.5 px-6">TOTAL REWARD</th>
                  <th className="py-3.5 px-6">STATUS</th>
                  <th className="py-3.5 px-6">AKSI OPERASIONAL</th>
                </>
              ) : (
                <>
                  <th className="py-3.5 px-6">KODE &amp; TANGGAL</th>
                  <th className="py-3.5 px-6">NASABAH</th>
                  <th className="py-3.5 px-6">ITEM HADIAH</th>
                  <th className="py-3.5 px-6">BIAYA PENUKARAN</th>
                  <th className="py-3.5 px-6">STATUS</th>
                  <th className="py-3.5 px-6">AKSI OPERASIONAL</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {viewType === "STR" ? (
              paginatedStrList.length > 0 ? (
                paginatedStrList.map((record) => (
                  <TransaksiTableRow
                    key={record.id}
                    record={record}
                    onOpenVerify={onOpenVerify}
                    onFinalize={onFinalize}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-xs">
                    Tidak ada transaksi penyetoran sampah yang sesuai dengan filter.
                  </td>
                </tr>
              )
            ) : paginatedTkrList.length > 0 ? (
              paginatedTkrList.map((record) => (
                <TransaksiTkrTableRow
                  key={record.id}
                  record={record}
                  onCompleteTkr={onCompleteTkr}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400 text-xs">
                  Tidak ada transaksi penukaran reward yang sesuai dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TransaksiPagination
        displayedCount={displayedCount}
        totalCount={totalFilteredCount}
        currentPage={currentPage}
        totalPages={totalPages}
        selectedBulan={selectedBulan}
        onPageChange={onPageChange}
      />
    </div>
  );
}
