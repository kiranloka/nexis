import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PredictionMarket } from "../target/types/prediction_market";
import { PublicKey } from "@solana/web3.js";

describe("prediction-market", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace
    .PredictionMarket as Program<PredictionMarket>;

  it("Registers OApp", async () => {
    const oappConfig = anchor.web3.Keypair.generate();
    await program.methods
      .registerOapp({
        endpoint: new PublicKey("Cfego9Noyr78LWyYjz2rYUiaUR4L2XymJ6su8EpRUviU"),
      })
      .accounts({
        oappConfig: oappConfig.publicKey,
        owner: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        endpointProgram: new PublicKey(
          "Cfego9Noyr78LWyYjz2rYUiaUR4L2XymJ6su8EpRUviU"
        ),
      })
      .signers([oappConfig])
      .rpc();
    console.log("OApp registered:", oappConfig.publicKey.toString());
  });

  it("Creates a market", async () => {
    const market = anchor.web3.Keypair.generate();
    await program.methods
      .createMarket(
        "Will BTC hit $100K?",
        ["Yes", "No"],
        new anchor.BN(Date.now() / 1000 + 86400)
      )
      .accounts({
        market: market.publicKey,
        creator: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([market])
      .rpc();
    console.log("Market created:", market.publicKey.toString());
  });

  it("Places a bet", async () => {
    const market = anchor.web3.Keypair.generate();
    await program.methods
      .createMarket(
        "Will BTC hit $100K?",
        ["Yes", "No"],
        new anchor.BN(Date.now() / 1000 + 86400)
      )
      .accounts({
        market: market.publicKey,
        creator: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([market])
      .rpc();

    const bet = anchor.web3.Keypair.generate();
    await program.methods
      .placeBet(new anchor.BN(100), 0, 10121) // Solana chain ID
      .accounts({
        market: market.publicKey,
        bet: bet.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        oftProgram: new PublicKey(
          "9obQfBnWMhxwYLtmarPWdjJgTc2mAYGRCoWbdvs9Wdm5"
        ),
        userTokenAccount: provider.wallet.publicKey,
        marketTokenVault: anchor.web3.Keypair.generate().publicKey,
      })
      .signers([bet])
      .rpc();
    console.log("Bet placed:", bet.publicKey.toString());
  });
});
