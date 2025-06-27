"use client";

import Image from "next/image";
import { MarketProps } from "@/lib/interface";

export default function MarketCard({
  title,
  image,
  estimatedTime,
  winningOdds,
  losingOdds,
}: MarketProps) {
  return (
    <div
      className="relative w-full max-w-3xl mx-auto rounded-2xl p-5 transition-all duration-300 hover:scale-[1.01]"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.35), 0 0 20px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-center gap-5">
        {/* Image */}
        <div className="flex-shrink-0 relative w-16 h-16 rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-xl ring-1 ring-white/20 shadow-md"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-cyan-300 transition-colors leading-tight text-white/95">
            {title}
          </h3>
          <p className="text-white/60 text-sm font-medium">{estimatedTime}</p>
        </div>

        <div className="flex gap-3 flex-shrink-0">
          <button
            className="relative bg-gradient-to-br from-blue-500/20 to-blue-600/30 hover:from-blue-500/40 hover:to-blue-600/40 border border-blue-400/20 hover:border-blue-400/40 rounded-xl px-5 py-3 text-center transition-all duration-200 hover:scale-105 min-w-[75px] backdrop-blur-md"
            style={{
              boxShadow:
                "0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="text-blue-300 font-bold text-base">
              {winningOdds}¢
            </div>
            <div className="text-blue-200/80 text-xs font-medium">YES</div>
          </button>

          <button
            className="relative bg-gradient-to-br from-red-500/20 to-red-600/30 hover:from-red-500/40 hover:to-red-600/40 border border-red-400/20 hover:border-red-400/40 rounded-xl px-5 py-3 text-center transition-all duration-200 hover:scale-105 min-w-[75px] backdrop-blur-md"
            style={{
              boxShadow:
                "0 4px 16px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="text-red-300 font-bold text-base">
              {losingOdds}¢
            </div>
            <div className="text-red-200/80 text-xs font-medium">NO</div>
          </button>
        </div>
      </div>

      {/* Optional white halo reflection */}
      <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}
