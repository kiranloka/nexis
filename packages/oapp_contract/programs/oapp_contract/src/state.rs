use anchor_lang::prelude::*;

#[account]
pub struct OAppConfig{
    pub endpoint : PubKey,
    pub owner:PubKey,
    pub delegate:Option<Pubkey>
}

#[account]
pub struct Peer{
    pub eid:u32,
    pub peer_address:[u8,32],
}

#[account]
pub struct Nonce{
    pub outbound_nonce:u64,
    pub inbound_nonce:u64,
}

#[account]
pub struct PayloadHash{
    pub hash:[u8;32],
}

#[account]
pub struct Market{
    pub question:String,
    pub options:Vec<String>
    pub deadline:i64,
    pub status:MarketStatus,
    pub creator:Pubkey,
    pub total_bets:u64,
    pub option_bets:Vec<u64>,
    pub winning_options:Option<u8>
}

#[account]
pub struct Bet{
    pub market:Pubkey,
    pub user:Pubkey,
    pub amount:u64,
    pub option:u8,
    pub chain_id:u32,
    pub claimed:bool,
}

#[derive(AnchorSerialize,AnchorDeserialize,Clone,PartialEq)]
pub enum MarketStatus{
    Active,
    Resolved
}

