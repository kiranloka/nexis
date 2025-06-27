import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Zap,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Coins,
  Network,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 lg:px-6 h-16 flex items-center border-b border-gray-800/50 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <span
            className="text-xl font-bold "
            style={{ fontFamily: "neuropol" }}
          >
            Nexis
          </span>
        </div>
        <nav className="ml-auto flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#roadmap"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Roadmap
          </Link>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 py-20 md:py-32 lg:py-40">
          <div className="container mx-auto text-center">
            <div className="mb-8">
              <Badge
                variant="outline"
                className="border-purple-500/50 text-purple-300 mb-4"
              >
                Powered by LayerZero V2 × Solana
              </Badge>
            </div>
            <h1
              className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "neuropol" }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Predict the Future
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Across All Chains
              </span>
            </h1>
            <p
              className="text-sm md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "satoshi" }}
            >
              The first decentralized cross-chain prediction market platform.
              Make predictions, earn rewards, and shape the future of DeFi
              across multiple blockchains.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-24">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Revolutionary Features
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience the next generation of prediction markets with
                cutting-edge cross-chain technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Cross-Chain Interoperability
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Seamlessly interact across multiple blockchains using
                    LayerZero V2 technology for true cross-chain predictions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Lightning Fast on Solana
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Built on Solana for ultra-fast transactions and minimal
                    fees, ensuring smooth user experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Decentralized & Secure
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Fully decentralized architecture with smart contract
                    security audits and transparent governance.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Advanced Analytics
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Real-time market data, predictive analytics, and
                    comprehensive insights for informed decision making.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Community Governance
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Token-based governance allowing the community to shape the
                    platform's future and market parameters.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Multi-Asset Support
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Support for multiple cryptocurrencies and tokens across
                    different chains for diverse prediction markets.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-4 py-24 bg-gray-900/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span
                  className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  style={{ fontFamily: "neuropol" }}
                >
                  How It Works
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Simple steps to start predicting and earning across multiple
                blockchains
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Connect Your Wallet
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Connect your multi-chain wallet and access prediction markets
                  across supported blockchains.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Make Predictions
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Browse active markets and make predictions on various events
                  using your preferred tokens.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Earn Rewards
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Collect rewards when your predictions are correct and
                  participate in platform governance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-24">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Ready to Shape the Future?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join thousands of users already making predictions and earning
                rewards on the most advanced cross-chain prediction market
                platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
                >
                  Start Predicting Now
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg bg-transparent"
                >
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 px-4 py-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Network className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  CrossChainPredictor
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                The future of decentralized prediction markets across all
                blockchains.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Markets
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Governance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Rewards
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Whitepaper
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Telegram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 CrossChainPredictor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
