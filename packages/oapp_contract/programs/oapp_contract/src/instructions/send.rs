use anchor_lang::prelude::*;
use crate::{state:{OAppConfig,Peer,Nonce},errors::PredictionMarketError};

#[derive(AnchorSerialize,AnchorDeserialize)]
pub struct SendParams{
    pub dst_eid:u32,
    pub peer_address:[u8,32],
    pub message:Vec<u8>,
    pub options:Vec<u8>,
    pub native_fee:u64
}

#[derive(Accounts)]
pub struct Send<'info>{
    #[account(
        constraint=oapp_config.owner==*sender.key||oapp_config.delegate==Some(*sender.key) @PredictionMarketError::UnauthorizedOApp
    )]
    #[account(
        seed=[b"peer",&dst_eid.to_le_bytes()],
        bump,
        constraint=peer.eid==params.dst_eid && peer.peer_address==params.peer_address @PredictionMarketError::InvalidPeer
    )]
    pub peer:Account<'info,Peer>
    #[account(
        mut,
        seeds=[b"nonce",&dst_eid.to_le_bytes()],
        bump
    )]
    pub nonce:Account<'info,Nonce>
    #[account(mut)]
    pub sender:Signer<'info>
    pub endpoint_program:AccountInfo<'info>,
}

pub fn send(ctx:Context<Send>,params:SendParams)->Result<MessagingReciept>{
    let nonce= &mut ctx.accounts.nonce;
    nonce.outbound_nonce+=1;

    Ok(MessagingReciept{
        guid:[0u8,32],
        nonce:nonce.outbound_nonce,
        fee:MessagingFee{
            native_fee:params.native_fee,
            lz_token_fee:0,
        },
    })
}