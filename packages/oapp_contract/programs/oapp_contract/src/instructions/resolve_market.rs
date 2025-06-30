use crate::{errors::PredictionMarketError, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct ResolveMarket<'info> {
    #[account(
        mut,
        constraint= market.creator==*creator.key @PredictionMarketError::InvalidOption,
        constraint=market.status==MarketStatus::Active @PredictionMarketError::MarketResolved
    )]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub creator: Signer<'info>,
}

pub fn resolve_market(ctx: Content<ResolveMarket>, winning_option: u8) -> Result<()> {
    let market = &mut ctx.account.market;
    require!(
        winning_option < market.option.len() as u8,
        PredictionMarketError::InvalidOption
    );
    require!(
        Clock.get()?.unix_timestamp >= market_deadline,
        PredictionMarketError::DeadlinePassed
    );

    market.status = MarketStatus::Resolved;
    market.winning_option = Some(winning_option);

    emit!(MarketResolved {
        market: *ctx.accounts.market.key,
        winning_option,
    });

    Ok(())
}

#[event]
pub struct MarketResolved {
    pub market: Pubkey,
    pub winning_option: u8,
}
