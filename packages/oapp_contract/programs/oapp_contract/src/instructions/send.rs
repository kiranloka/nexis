use crate::{
    errors::PredictionMarketError,
    state::{Nonce, OAppConfig, Peer},
};
use anchor_lang::prelude::*;

/// Parameters used when sending a cross-chain message.
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct SendParams {
    pub dst_eid: u32,
    pub peer_address: [u8; 32],
    pub message: Vec<u8>,
    pub options: Vec<u8>,
    pub native_fee: u64,
}

/// Accounts required for sending a message via LayerZero.
#[derive(Accounts)]
#[instruction(params: SendParams)]
pub struct SendContext<'info> {
    #[account(
        constraint = oapp_config.owner == *sender.key
            || oapp_config.delegate == Some(*sender.key) @ PredictionMarketError::UnauthorizedOApp
    )]
    pub oapp_config: Account<'info, OAppConfig>,

    #[account(
        seeds = [b"peer", &params.dst_eid.to_le_bytes()],
        bump,
        constraint = peer.eid == params.dst_eid
            && peer.peer_address == params.peer_address @ PredictionMarketError::InvalidPeer
    )]
    pub peer: Account<'info, Peer>,

    #[account(
        mut,
        seeds = [b"nonce", &params.dst_eid.to_le_bytes()],
        bump
    )]
    pub nonce: Account<'info, Nonce>,

    #[account(mut)]
    pub sender: Signer<'info>,

    /// CHECK: Verified in constraint and used for CPI only
    pub endpoint_program: AccountInfo<'info>,
}

/// Executes a send operation with nonce and message info.
pub fn send(ctx: Context<SendContext>, params: SendParams) -> Result<MessagingReceipt> {
    let nonce = &mut ctx.accounts.nonce;
    nonce.outbound_nonce += 1;

    // TODO: Add actual CPI call to LayerZero Endpoint here

    Ok(MessagingReceipt {
        guid: [0u8; 32], // Placeholder
        nonce: nonce.outbound_nonce,
        fee: MessagingFee {
            native_fee: params.native_fee,
            lz_token_fee: 0, // Placeholder
        },
    })
}

/// A structure representing the receipt of a sent message.
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct MessagingReceipt {
    pub guid: [u8; 32],
    pub nonce: u64,
    pub fee: MessagingFee,
}

/// A structure representing message fees.
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct MessagingFee {
    pub native_fee: u64,
    pub lz_token_fee: u64,
}
