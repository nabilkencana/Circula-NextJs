"use client";

import React from "react";
import { Leaf, Building2 } from "lucide-react";
import { AuthRole } from "@/types/auth";

interface RoleSegmentSwitcherProps {
  activeRole: AuthRole;
  onRoleChange: (role: AuthRole) => void;
}

export default function RoleSegmentSwitcher({
  activeRole,
  onRoleChange,
}: RoleSegmentSwitcherProps) {
  return (
    <div className="w-full bg-[#F4F5F4] p-1.5 rounded-full flex items-center mb-6 border border-gray-200/80">
      {/* Tab A: Nasabah */}
      <button
        type="button"
        onClick={() => onRoleChange("NASABAH")}
        className={`flex-1 py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
          activeRole === "NASABAH"
            ? "bg-dark-container text-white shadow-sm"
            : "text-text-secondary hover:text-text-primary hover:bg-white/50"
        }`}
        aria-pressed={activeRole === "NASABAH"}
      >
        {activeRole === "NASABAH" && (
          <span className="w-2 h-2 rounded-full bg-brand-neon shadow-[0_0_8px_#D4E836] shrink-0" />
        )}
        <Leaf
          className={`w-4 h-4 shrink-0 ${
            activeRole === "NASABAH" ? "text-brand-neon fill-brand-neon" : "text-text-secondary"
          }`}
        />
        <span>Masuk sebagai Nasabah</span>
      </button>

      {/* Tab B: Admin Unit */}
      <button
        type="button"
        onClick={() => onRoleChange("ADMIN")}
        className={`flex-1 py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
          activeRole === "ADMIN"
            ? "bg-dark-container text-white shadow-sm"
            : "text-text-secondary hover:text-text-primary hover:bg-white/50"
        }`}
        aria-pressed={activeRole === "ADMIN"}
      >
        {activeRole === "ADMIN" && (
          <span className="w-2 h-2 rounded-full bg-brand-neon shadow-[0_0_8px_#D4E836] shrink-0" />
        )}
        <Building2
          className={`w-4 h-4 shrink-0 ${
            activeRole === "ADMIN" ? "text-brand-neon" : "text-text-secondary"
          }`}
        />
        <span>Masuk sebagai Admin Unit</span>
      </button>
    </div>
  );
}
