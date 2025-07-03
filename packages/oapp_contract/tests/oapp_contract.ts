import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { OappContract } from "../target/types/oapp_contract";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";

describe("oapp-contract", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.oapp_contract as Program<OappContract>;

  // 🪙 Replace with real addresses if needed
  const endpointProgram = new PublicKey(
    "Cfego9Noyr78LWyYjz2rYUiaUR4L2XymJ6su8EpRUviU"
  );
  const oftProgram = new PublicKey(
    "9obQfBnWMhxwYLtmarPWdjJgTc2mAYGRCoWbdvs9Wdm5"
  );

  const oappConfig = Keypair.generate();
  const market = Keypair.generate();
  const bet = Keypair.generate();
  const marketTokenVault = Keypair.generate(); // vault can be mocked
  const userTokenAccount = provider.wallet.publicKey;

  it("Registers OApp", async () => {
    await program.methods
      .register_oapp({
        endpoint: endpointProgram,
      })
      .accounts({
        oappConfig: oappConfig.publicKey,
        owner: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
        endpointProgram,
      })
      .signers([oappConfig])
      .rpc();

    console.log("✅ OApp Registered:", oappConfig.publicKey.toBase58());
  });

  it("Creates a Market", async () => {
    const question = "Will BTC hit $100K by EOY?";
    const options = ["Yes", "No"];
    const deadline = new anchor.BN(Math.floor(Date.now() / 1000) + 86400); // 24h from now

    await program.methods
      .create_market(question, options, deadline)
      .accounts({
        market: market.publicKey,
        creator: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([market])
      .rpc();

    console.log("✅ Market Created:", market.publicKey.toBase58());
  });

  it("Places a Bet", async () => {
    const amount = new anchor.BN(100); // mock 100 tokens
    const optionIndex = 0; // "Yes"
    const chainId = 10121; // Solana chain ID

    await program.methods
      .place_bet(amount, optionIndex, chainId)
      .accounts({
        market: market.publicKey,
        bet: bet.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
        oftProgram,
        userTokenAccount,
        marketTokenVault: marketTokenVault.publicKey,
      })
      .signers([bet])
      .rpc();

    console.log("✅ Bet Placed:", bet.publicKey.toBase58());
  });
});
