use anchor_lang::prelude::*;
use crate::{state:{OAppConfig,Peer,Nonce,PayloadHash},errors::PredictionMarketError};

#[derive(AnchorSerialize,AnchorDeserialize)]
pub struct LzRecieveParams{
    pub src_eid:u32,
    pub sender:[u8;32]
    pub nonce:u64,
    pub guid:[u8,32],
    pub message:Vec<u8>,
}

#[derive(Account)]
pub struct LzRecieve<'info>{
    #[account(
        seeds=[b"peer",&src_eid.to_le_bytes()],
        bump,
        constraint=peer,eid==params.src_eid && peer.peer_address == params.sender @ PredictionMarketError::InvalidPeer
    )]

    pub peer:Account<'info,Peer>,
    #[account(
        mut,
        seeds=[b"nonce",&src_eid.to_le_bytes()],
        bump
    )]
    pub nonce:Account<'info,Nonce>,
    #[account(
        mut,
        seeds=[b"payload_hash",&quid.to_le_bytes()],
        bump
    )]

    pub payload_hash:Accont<'info,PayloadHash>,
    pub endpoint_program:AccountInfo<'info>
}

pub fn lz_recieve(ctx:Content<LzReciev>,params:LzRecieveParams)->Result<()>{
    let nonce= &mut ctx.accounts.nonce;
    let payload_hash=&mut ctx.accounts.payload_hash;

    require!(nonce.inbound+1==params.nonce,PredictionMarketError::UnauthorizedOApp);
    nonce.inbound_nonce=params.nonce;

    payload_hash.hash=hash(&params.message);

    let message:Message=params.message.try_into().map_err(|_|PredictionMarketError::InvalidOption)?;
    match message{
        Message::CreateMarket{question,options,deadline}=>{
            //Trigger create_market logic
        }
        Message::PlaceBet{market_id,amount,option,chain_id}=>{
            //Trigger place bet logic
        }

        Message::ResolveMarket{market_id,winning_question}=>{
            //Trigger resolve_market logic
        }
    }

    Ok(())
}


#[derive(AnchorSerialize,AnchorDeserialize)]
pub enum Message{
    CreateMarket{question:String,options:Vec<String>,deadline:i64},
    PlaceBet{market_id:Pubkey,amount:u64,option:u8,chain_id:u32},
    ResolveMarket{market_id:Pubkey,winning_option:u8},
}