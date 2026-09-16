import React from "react";
import { ItemNotaSetor } from "@/types/nota";

interface ReceiptItemsTableProps {
  items: ItemNotaSetor[];
}

export default function ReceiptItemsTable({ items }: ReceiptItemsTableProps) {
  const getCategoryBadgeClass = (kategori: ItemNotaSetor["kategori"]) => {
    switch (kategori) {
      case "plastik":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "kertas":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "logam":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "kaca":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-text-secondary">
            <th className="pb-3 pr-4">Material Terpilah</th>
            <th className="pb-3 px-3">Kategori</th>
            <th className="pb-3 px-3 text-right">Timbangan Real</th>
            <th className="pb-3 px-3 text-right">Poin / Kg</th>
            <th className="pb-3 pl-4 text-right">Subtotal Poin</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
          {items.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
              {/* Material & SKU */}
              <td className="py-3.5 pr-4">
                <span className="font-bold text-text-primary block leading-tight">
                  {item.materialNama}
                </span>
                <span className="font-mono text-[10px] text-gray-400 mt-0.5 block">
                  SKU: {item.sku}
                </span>
              </td>

              {/* Category Pill */}
              <td className="py-3.5 px-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize shadow-2xs ${getCategoryBadgeClass(
                    item.kategori
                  )}`}
                >
                  {item.kategori}
                </span>
              </td>

              {/* Real Weight */}
              <td className="py-3.5 px-3 font-mono font-bold text-text-primary text-right whitespace-nowrap">
                {item.timbanganRealKg.toFixed(1)} Kg
              </td>

              {/* Rate */}
              <td className="py-3.5 px-3 font-mono text-text-secondary text-right whitespace-nowrap">
                {item.poinPerKg} Poin
              </td>

              {/* Subtotal */}
              <td className="py-3.5 pl-4 font-mono font-bold text-text-primary text-right whitespace-nowrap">
                +{item.subtotalPoin} Poin
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
