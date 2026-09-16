import React from "react";
import { Zap } from "lucide-react";

export default function MultiTenantSecurityBadge() {
  return (
    <div className="bg-dark-widget rounded-2xl p-4 border border-white/12 mt-6">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-brand-neon/20 text-brand-neon flex items-center justify-center shrink-0">
          <Zap className="w-3.5 h-3.5 fill-brand-neon" />
        </div>
        <h4 className="text-xs font-bold text-brand-neon tracking-wide">
          Multi-Tenant Security
        </h4>
      </div>
      <p className="text-xs text-gray-300 mt-1.5 leading-relaxed pl-7">
        Unit Anda langsung terdaftar dengan isolasi data independen yang terlindungi token JWT dan x-app-key.
      </p>
    </div>
  );
}
