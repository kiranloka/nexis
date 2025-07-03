declare_id!("8G6tF3faT1q6Qqdc1uGGyAMKGyogCNGVsJ4AGivMibcS");

mod errors;
mod instructions;
mod state;

use crate::instructions::*;
use crate::state::{MessagingFee, MessagingReceipt};
use anchor_lang::prelude::*;

#[program]
pub mod oapp_contract {

    use super::*;

    pub fn register_oapp(ctx: Context<RegisterOApp>, params: RegisterOAppParams) -> Result<()> {
        register_oapp(ctx, params)
    }

    pub fn set_delegate(ctx: Context<SetDelegate>, params: SetDelegateParams) -> Result<()> {
        set_delegate(ctx, params)
    }

    pub fn quote(ctx: Context<Quote>, params: QuoteParams) -> Result<MessagingFee> {
        quote(ctx, params)
    }

    pub fn send(ctx: Context<SendContext>, params: SendParams) -> Result<MessagingReceipt> {
        send(ctx, params)
    }

    pub fn lz_receive(ctx: Context<LzReceive>, params: LzReceiveParams) -> Result<()> {
        lz_receive(ctx, params)
    }

    pub fn create_market(
        ctx: Context<CreateMarket>,
        question: String,
        options: Vec<String>,
        deadline: i64,
    ) -> Result<()> {
        create_market(ctx, question, options, deadline)
    }

    pub fn place_bet(ctx: Context<PlaceBet>, amount: u64, option: u8, chain_id: u32) -> Result<()> {
        place_bet(ctx, amount, option, chain_id)
    }

    pub fn resolve_market(ctx: Context<ResolveMarket>, winning_option: u8) -> Result<()> {
        resolve_market(ctx, winning_option)
    }

    pub fn claim_payout(ctx: Context<ClaimPayout>) -> Result<()> {
        claim_payout(ctx)
    }
}
