"use client";

import { useEffect, useState } from "react";

export default function PhantomButton() {
  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    if ("solana" in window) {
      setHasProvider(true);
    }
  }, []);

  const connectWallet = async () => {
    const provider = (window as any).solana;
    if (provider?.isPhantom) {
      try {
        await provider.connect();
        console.log("Connected to wallet:", provider.publicKey.toString());
      } catch (err) {
        console.error("User rejected the request", err);
      }
    }
  };

  if (!hasProvider) return null;

  return (
    <button
      onClick={connectWallet}
      className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
    >
      Connect Wallet
    </button>
  );
}
