use crate::{errors::PredictionMarketError, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct ClaimPayout<'info> {
    #[account(
        constraint = market.status == MarketStatus::Resolved @ PredictionMarketError::MarketNotResolved
    )]
    pub market: Account<'info, Market>,
    #[account(
        mut,
        constraint = bet.user == *user.key @ PredictionMarketError::InvalidOption,
        constraint = !bet.claimed @ PredictionMarketError::PayoutClaimed,
        constraint = Some(bet.option) == market.winning_option @ PredictionMarketError::NotWinningBet
    )]
    pub bet: Account<'info, Bet>,
    #[account(mut)]
    pub user: Signer<'info>,
    /// CHECK: LayerZero OFT program for token transfer
    pub oft_program: AccountInfo<'info>,
    /// CHECK: User’s token account
    pub user_token_account: AccountInfo<'info>,
    /// CHECK: Market’s token vault
    pub market_token_vault: AccountInfo<'info>,
}

pub fn claim_payout(ctx: Context<ClaimPayout>) -> Result<()> {
    let market = &ctx.accounts.market;
    let bet = &mut ctx.accounts.bet;

    // Calculate payout (parimutuel: amount * (total_bets / winning_bets))
    let winning_bets = market.option_bets[market.winning_option.unwrap() as usize];
    let payout = bet
        .amount
        .checked_mul(market.total_bets)
        .ok_or(PredictionMarketError::InsufficientAmount)?
        .checked_div(winning_bets)
        .ok_or(PredictionMarketError::InsufficientAmount)?;

    bet.claimed = true;

    // Placeholder: CPI to LayerZero OFT program to transfer tokens
    // Mint tokens to user’s chain (based on bet.chain_id)
    emit!(PayoutClaimed {
        market: bet.market,
        user: bet.user,
        amount: payout,
        chain_id: bet.chain_id,
    });

    Ok(())
}

#[event]
pub struct PayoutClaimed {
    pub market: Pubkey,
    pub user: Pubkey,
    pub amount: u64,
    pub chain_id: u32,
}
