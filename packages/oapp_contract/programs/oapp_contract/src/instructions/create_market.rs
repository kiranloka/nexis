use crate::{errors::PredictionMarketError, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(question: String)]
pub struct CreateMarket<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + Market::MAX_SIZE,
        seeds = [b"market", creator.key().as_ref(), question.as_bytes()],
        bump
    )]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn create_market(
    ctx: Context<CreateMarket>,
    question: String,
    options: Vec<String>,
    deadline: i64,
) -> Result<()> {
    let market = &mut ctx.accounts.market;

    require!(
        options.len() >= 2 && options.len() <= 10,
        PredictionMarketError::InvalidOption
    );

    let now = Clock::get()?.unix_timestamp;
    require!(deadline > now, PredictionMarketError::DeadlinePassed);

    market.question = question.clone();
    market.options = options.clone();
    market.deadline = deadline;
    market.status = MarketStatus::Active;
    market.creator = *ctx.accounts.creator.key;
    market.total_bets = 0;
    market.option_bets = vec![0; options.len()];
    market.winning_option = None;

    emit!(MarketCreated {
        market: ctx.accounts.market.key(),
        question,
        options,
        deadline,
    });

    Ok(())
}

#[event]
pub struct MarketCreated {
    pub market: Pubkey,
    pub question: String,
    pub options: Vec<String>,
    pub deadline: i64,
}
