use anchor_lang::prelude::*;

#[account]
pub struct OAppConfig {
    pub endpoint: Pubkey,         // LayerZero Endpoint program
    pub owner: Pubkey,            // OApp owner
    pub delegate: Option<Pubkey>, // Optional delegate
}

#[account]
pub struct Peer {
    pub eid: u32,               // Destination chain endpoint ID
    pub peer_address: [u8; 32], // Peer contract address on destination chain
}

#[account]
pub struct Nonce {
    pub outbound_nonce: u64, // Nonce for outgoing messages
    pub inbound_nonce: u64,  // Nonce for incoming messages
}

#[account]
pub struct PayloadHash {
    pub hash: [u8; 32], // Hash of incoming message payload
}

#[account]
pub struct Market {
    pub question: String,           // Market question
    pub options: Vec<String>,       // Options (e.g., ["Yes", "No"])
    pub deadline: i64,              // Unix timestamp for betting deadline
    pub status: MarketStatus,       // Active or Resolved
    pub creator: Pubkey,            // Market creator
    pub total_bets: u64,            // Total tokens bet
    pub option_bets: Vec<u64>,      // Tokens bet per option
    pub winning_option: Option<u8>, // Winning option after resolution
}

#[account]
pub struct Bet {
    pub market: Pubkey, // Associated market
    pub user: Pubkey,   // Bettor's public key
    pub amount: u64,    // Bet amount in tokens
    pub option: u8,     // Chosen option
    pub chain_id: u32,  // Chain ID (e.g., Solana, Ethereum)
    pub claimed: bool,  // Whether payout was claimed
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum MarketStatus {
    Active,
    Resolved,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
pub struct MessagingFee {
    pub native_fee: u64,
    pub lz_token_fee: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
pub struct MessagingReceipt {
    pub guid: [u8; 32],
    pub nonce: u64,
    pub fee: MessagingFee,
}

impl Market {
    pub const MAX_SIZE: usize = 4 + 200  // question
        + 4 + (32 * 10)                   // options (Vec<String>)
        + 8                               // deadline
        + 1                               // status (u8)
        + 32                              // creator Pubkey
        + 8                               // total_bets
        + 4 + (8 * 10)                    // option_bets (Vec<u64>)
        + 1; // winning_option (Option<u8>)
}
