use crate::{
    errors::PredictionMarketError,
    state::{Nonce, OAppConfig, PayloadHash, Peer},
};
use anchor_lang::prelude::*;
use anchor_lang::solana_program::hash::hash;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct LzReceiveParams {
    pub src_eid: u32,
    pub sender: [u8; 32],
    pub nonce: u64,
    pub guid: [u8; 32],
    pub message: Vec<u8>,
}

#[derive(Accounts)]
#[instruction(params: LzReceiveParams)]
pub struct LzReceive<'info> {
    #[account(
        constraint = oapp_config.endpoint == *endpoint_program.key @ PredictionMarketError::InvalidEndPoint
    )]
    pub oapp_config: Account<'info, OAppConfig>,

    #[account(
        seeds = [b"peer", &params.src_eid.to_le_bytes()],
        bump,
        constraint = peer.eid == params.src_eid && peer.peer_address == params.sender @ PredictionMarketError::InvalidPeer
    )]
    pub peer: Account<'info, Peer>,

    #[account(
        mut,
        seeds = [b"nonce", &params.src_eid.to_le_bytes()],
        bump
    )]
    pub nonce: Account<'info, Nonce>,

    #[account(
        mut,
        seeds = [b"payload_hash", &params.guid],
        bump
    )]
    pub payload_hash: Account<'info, PayloadHash>,

    /// CHECK: LayerZero endpoint
    pub endpoint_program: AccountInfo<'info>,
}

pub fn lz_receive(ctx: Context<LzReceive>, params: LzReceiveParams) -> Result<()> {
    let nonce = &mut ctx.accounts.nonce;
    let payload_hash = &mut ctx.accounts.payload_hash;

    // Ensure correct nonce ordering
    require!(
        nonce.inbound_nonce + 1 == params.nonce,
        PredictionMarketError::UnauthorizedOApp
    );
    nonce.inbound_nonce = params.nonce;

    // Store payload hash
    payload_hash.hash = hash(&params.message).to_bytes();

    // Decode message from bytes using Anchor's deserialization
    let message: Message = Message::try_from_slice(&params.message)
        .map_err(|_| PredictionMarketError::InvalidOption)?;

    match message {
        Message::CreateMarket {
            question,
            options,
            deadline,
        } => {
            // TODO: Call create_market(ctx, question, options, deadline)
            // You need to pass in additional required accounts manually via CPI or dynamic dispatch
            msg!("Received CreateMarket: {}", question);
        }
        Message::PlaceBet {
            market_id,
            amount,
            option,
            chain_id,
        } => {
            // TODO: Call place_bet(ctx, market_id, amount, option, chain_id)
            msg!("Received PlaceBet for market {}", market_id);
        }
        Message::ResolveMarket {
            market_id,
            winning_option,
        } => {
            // TODO: Call resolve_market(ctx, market_id, winning_option)
            msg!("Received ResolveMarket for market {}", market_id);
        }
    }

    Ok(())
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub enum Message {
    CreateMarket {
        question: String,
        options: Vec<String>,
        deadline: i64,
    },
    PlaceBet {
        market_id: Pubkey,
        amount: u64,
        option: u8,
        chain_id: u32,
    },
    ResolveMarket {
        market_id: Pubkey,
        winning_option: u8,
    },
}
