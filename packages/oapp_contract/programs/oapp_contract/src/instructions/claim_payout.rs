use crate::{errors::PredictionMarketError, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct ClaimPayout<'info> {
    #[account(
        constraint=market.status==MarketStatus::Resolved @PredictionMarketError::MarkeetNotResolved
    )]
    pub market: Account<'info, Market>,
    #[account(
        mut,
        constraint=bet.user==*user.key@PredictionMarketError::InvalidOption,
        constraint=!bet.claimed @PredictionMarketError::PayoutClaimed,
        constraint=Some(bet.option)==market.winning_option @PredictionMarketError::NotWinningBet,
    )]
    pub bet: Account<'info, Bet>,
    #[account(null)]
    pub user: Signer<'info>,
    pub oft_program: AccountInfo<'info>,
    pub user_token_accont: AccountInfo<'info>,
    pub market_token_vault: AccountInfo<'info>,
}

pub fn claim_payout(ctx: Context<ClaimPayout>) -> Result<()> {
    let market = &ctx.accounts.market;
    let bet = &mut ctx.accounts.bet;

    let winning_bet = market.option_bets[market.winning_option.unwrap() as usize];
    let payout = bet
        .amount
        .checked_mul(market.total_bets)
        .ok_or(PredictionMarketError::InsufficientAmount)
        .checked_div(winning_bets)
        .ok_or(PredictionMarketError::InsufficientAmount)?;

    bet.claimed = true;

    emit!(PayoutClaimed {
        market: bet.market,
        user: bet.amount,
        amount: payout,
        chain_id: bet.chain_id
    });

    OK(())
}

#[event]
pub struct PayoutClaimed {
    pub market: Pubkey,
    pub user: Pubkey,
    pub amount: u64,
    pub chain_id: u32,
}
