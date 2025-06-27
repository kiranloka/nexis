"use client";

import React, { useState } from "react";

interface PredictionCardProps {
  title: string;
  image: string;
  endDate: string;
  volume: string;
  yesPrice: number;
  noPrice: number;
  yesChange?: number;
}

const PredictionCard: React.FC<PredictionCardProps> = ({
  title,
  image,
  endDate,
  volume,
  yesPrice,
  noPrice,
  yesChange,
}) => {
  const [selectedTab, setSelectedTab] = useState<"Buy" | "Sell">("Buy");
  const [amount, setAmount] = useState<string>("");

  const quickAmounts = [1, 20, 100];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Prediction Card */}
          <div className="lg:col-span-2">
            <div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "0 16px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <img
                  src={image}
                  alt={title}
                  className="w-20 h-20 rounded-2xl object-cover ring-1 ring-white/20 shadow-xl"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-3 text-white/95 leading-tight">
                    {title}
                  </h1>
                  <div className="flex items-center gap-6 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <span>{volume} Vol.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                      <span>{endDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Selector */}
              <div className="flex gap-3 mb-8">
                {["1D", "1W", "1M", "3M", "All"].map((period) => (
                  <button
                    key={period}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      period === "1M"
                        ? "bg-white/15 text-white border border-white/20"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>

              {/* Main Outcome */}
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white/95">
                      Outcome
                    </h3>
                    <div className="text-white/60 text-sm">{volume} Vol.</div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold text-white/95 mb-1">
                      {Math.round((yesPrice / (yesPrice + noPrice)) * 100)}%
                    </div>
                    {yesChange && (
                      <div
                        className={`text-sm font-medium ${yesChange > 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {yesChange > 0 ? "+" : ""}
                        {yesChange}%
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="bg-gradient-to-br from-green-500/30 to-green-600/30 hover:from-green-500/40 hover:to-green-600/40 border border-green-400/30 hover:border-green-400/50 rounded-xl px-6 py-3 text-center transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                      style={{
                        boxShadow: "0 4px 16px rgba(34, 197, 94, 0.2)",
                      }}
                    >
                      <div className="text-green-300 font-bold text-lg">
                        Yes {yesPrice}¢
                      </div>
                    </button>

                    <button
                      className="bg-gradient-to-br from-red-500/30 to-red-600/30 hover:from-red-500/40 hover:to-red-600/40 border border-red-400/30 hover:border-red-400/50 rounded-xl px-6 py-3 text-center transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                      style={{
                        boxShadow: "0 4px 16px rgba(239, 68, 68, 0.2)",
                      }}
                    >
                      <div className="text-red-300 font-bold text-lg">
                        No {noPrice}¢
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="lg:col-span-1">
            <div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl h-fit"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "0 16px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* User Avatar & Info */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={image}
                  alt="User"
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/20"
                />
                <div>
                  <div className="text-white/95 font-medium">Outcome</div>
                  <div className="text-white/60 text-sm">
                    {Math.round((yesPrice / (yesPrice + noPrice)) * 100)}%
                    chance
                  </div>
                </div>
              </div>

              {/* Buy/Sell Toggle */}
              <div className="flex rounded-xl bg-white/5 p-1 mb-6">
                {["Buy", "Sell"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab as "Buy" | "Sell")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTab === tab
                        ? "bg-white/15 text-white shadow-lg"
                        : "text-white/60 hover:text-white/80"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Yes/No Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 rounded-xl p-3 text-center hover:from-green-500/30 hover:to-green-600/30 transition-all duration-200">
                  <div className="text-green-300 font-bold">
                    Yes {yesPrice}¢
                  </div>
                </button>
                <button className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30 rounded-xl p-3 text-center hover:from-red-500/30 hover:to-red-600/30 transition-all duration-200">
                  <div className="text-red-300 font-bold">No {noPrice}¢</div>
                </button>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-white/80 text-sm font-medium mb-3">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-2xl font-bold">
                    $
                  </span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-2xl font-bold placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white/80 hover:text-white transition-all duration-200"
                  >
                    +${quickAmount}
                  </button>
                ))}
                <button
                  onClick={() => setAmount("1000")}
                  className="py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white/80 hover:text-white transition-all duration-200"
                >
                  Max
                </button>
              </div>

              {/* Trade Button */}
              <button
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
                style={{
                  boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
                }}
              >
                Trade
              </button>

              {/* Terms */}
              <p className="text-white/40 text-xs text-center mt-4">
                By trading, you agree to the{" "}
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                  Terms of Use
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage
const App: React.FC = () => {
  return (
    <PredictionCard
      title="Fed decision in July?"
      image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop"
      endDate="Jul 30, 2025"
      volume="$18,350,938"
      yesPrice={18}
      noPrice={82}
      yesChange={5}
    />
  );
};

export default App;
