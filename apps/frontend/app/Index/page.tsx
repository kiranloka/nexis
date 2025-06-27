"use client";

import { AuroraBackground } from "@/components/AuroraBackground";
import { predictions } from "@/lib/constants";
import MarketCard from "@/components/MarketCard";

export default function Markets() {
  return (
    <AuroraBackground className="h-full">
      <div className="bg-black w-full min-h-full py-20 px-4 space-y-10">
        <div className="text-center space-y-2">
          <h1
            className="text-3xl font-bold bg-gradient-to-r from-[#C6C6F9] via-[#E6F0FF] to-[#A8E0FF] bg-clip-text text-transparent"
            style={{ fontFamily: "neuropol" }}
          >
            Welcome to the future
          </h1>
          <p className="text-gray-400 text-sm font-stretch-ultra">
            Human life is a gamble, here we predict the future beyond
            blockchains
          </p>
        </div>

        <div className="space-y-6">
          {predictions.map((prediction) => (
            <MarketCard key={prediction.id} {...prediction} />
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
}
