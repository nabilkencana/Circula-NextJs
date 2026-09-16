import React, { useState } from "react";
import Image from "next/image";
import { Star, Pencil, Eye, Trash2 } from "lucide-react";
import { NasabahRecord } from "@/types/adminNasabah";

interface NasabahTableRowProps {
  record: NasabahRecord;
  onEdit: (record: NasabahRecord) => void;
  onView: (record: NasabahRecord) => void;
  onDelete: (record: NasabahRecord) => void;
}

export default function NasabahTableRow({
  record,
  onEdit,
  onView,
  onDelete,
}: NasabahTableRowProps) {
  const [imgError, setImgError] = useState(false);

  // Avatar initials fallback
  const initials = record.namaLengkap
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isPointsNew = record.saldoPoin === 0 || record.isNew;

  return (
    <tr className="border-b border-gray-100 hover:bg-[#FAFBF9] transition-colors">
      {/* 1. IDENTITAS NASABAH */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          {/* Avatar Container */}
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200 bg-gray-100 flex items-center justify-center">
            {record.fotoProfilUrl && !imgError ? (
              <Image
                src={record.fotoProfilUrl}
                alt={record.namaLengkap}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="font-bold text-xs text-gray-600">{initials}</span>
            )}
          </div>

          <div>
            <p className="font-bold text-sm text-text-primary leading-tight">
              {record.namaLengkap}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              ID: <span className="font-mono">{record.id}</span> • Terdaftar {record.tanggalDaftar}
            </p>
          </div>
        </div>
      </td>

      {/* 2. KONTAK & ALAMAT */}
      <td className="py-4 px-6">
        <div>
          <p className="font-mono font-semibold text-xs text-text-primary">
            {record.telp}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate" title={record.alamat}>
            {record.alamat}
          </p>
        </div>
      </td>

      {/* 3. USERNAME */}
      <td className="py-4 px-6">
        <span className="inline-block bg-inset-gray border border-gray-200 font-mono text-xs text-gray-700 px-3 py-1 rounded-md">
          @{record.username}
        </span>
      </td>

      {/* 4. SALDO POIN AKTIF */}
      <td className="py-4 px-6">
        <div className="inline-flex items-center gap-1.5 bg-inset-gray border border-gray-200 px-3 py-1.5 rounded-full shadow-2xs">
          <Star
            className={`w-3.5 h-3.5 ${
              record.saldoPoin > 0
                ? "text-brand-neon-hover fill-brand-neon"
                : "text-gray-400 fill-transparent"
            }`}
          />
          <span className="font-bold text-xs text-text-primary">
            {record.saldoPoin} Poin {isPointsNew && "(Baru)"}
          </span>
        </div>
      </td>

      {/* 5. STATUS */}
      <td className="py-4 px-6">
        <span
          className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
            record.status === "aktif"
              ? "bg-[#DCFCE7] text-[#15803D]"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {record.status === "aktif" ? "Aktif" : "Nonaktif"}
        </span>
      </td>

      {/* 6. AKSI */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-1.5 text-gray-400">
          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(record)}
            className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-text-primary transition-colors cursor-pointer"
            title="Edit Nasabah"
            aria-label={`Edit ${record.namaLengkap}`}
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* View */}
          <button
            type="button"
            onClick={() => onView(record)}
            className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-text-primary transition-colors cursor-pointer"
            title="Lihat Detail"
            aria-label={`Lihat detail ${record.namaLengkap}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(record)}
            className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            title="Hapus Nasabah"
            aria-label={`Hapus ${record.namaLengkap}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
