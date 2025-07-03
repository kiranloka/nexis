use crate::{errors::PredictionMarketError, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct PlaceBet<'info> {
    #[account(
        mut,
        constraint = market.status == MarketStatus::Active @ PredictionMarketError::MarketResolved,
        constraint = market.deadline > Clock::get()?.unix_timestamp @ PredictionMarketError::DeadlinePassed
    )]
    pub market: Account<'info, Market>,
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 32 + 8 + 1 + 4 + 1,
        seeds = [b"bet", market.key().as_ref(), user.key().as_ref()],
        bump
    )]
    pub bet: Account<'info, Bet>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
    /// CHECK: LayerZero OFT program for token transfer
    pub oft_program: AccountInfo<'info>,
    /// CHECK: User’s token account
    pub user_token_account: AccountInfo<'info>,
    /// CHECK: Market’s token vault
    pub market_token_vault: AccountInfo<'info>,
}

pub fn place_bet(ctx: Context<PlaceBet>, amount: u64, option: u8, chain_id: u32) -> Result<()> {
    let market = &mut ctx.accounts.market;
    let bet = &mut ctx.accounts.bet;

    require!(
        option < market.options.len() as u8,
        PredictionMarketError::InvalidOption
    );
    require!(amount > 0, PredictionMarketError::InsufficientAmount);

    // Update market state
    market.total_bets = market
        .total_bets
        .checked_add(amount)
        .ok_or(PredictionMarketError::InsufficientAmount)?;
    market.option_bets[option as usize] = market.option_bets[option as usize]
        .checked_add(amount)
        .ok_or(PredictionMarketError::InsufficientAmount)?;

    // Record bet
    bet.market = ctx.accounts.market.key();
    bet.user = ctx.accounts.user.key();
    bet.amount = amount;
    bet.option = option;
    bet.chain_id = chain_id;
    bet.claimed = false;

    // Placeholder: CPI to LayerZero OFT program to transfer tokens
    // Burn tokens on source chain (if chain_id != Solana) and mint on Solana
    emit!(BetPlaced {
        market: bet.market,
        user: bet.user,
        amount,
        option,
        chain_id,
    });

    Ok(())
}

#[event]
pub struct BetPlaced {
    pub market: Pubkey,
    pub user: Pubkey,
    pub amount: u64,
    pub option: u8,
    pub chain_id: u32,
}
