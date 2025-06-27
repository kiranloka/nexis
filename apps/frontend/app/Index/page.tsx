"use client";

import { AuroraBackground } from "@/components/AuroraBackground";

export default function Marktes() {
  return (
    <AuroraBackground>
      <div className="bg-black w-full h-full  py-20">
        <h1
          className="text-3xl font-bold flex justify-center bg-gradient-to-r from-[#C6C6F9] via-[#E6F0FF] to-[#A8E0FF] bg-clip-text text-transparent"
          style={{ fontFamily: "neuropol" }}
        >
          Welcome to the future
        </h1>
        <p className="text-gray-400 text-sm text-center font-stretch-ultra ">
          Human life is a gamble, here we predict future beyound blockchains
        </p>
      </div>
    </AuroraBackground>
  );
}
