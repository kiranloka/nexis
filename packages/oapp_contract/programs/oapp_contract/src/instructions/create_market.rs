use crate::{errors::PredictionMarketError, state::*};
use anchor_lang::prelude::*;

#[derive(Account)]
pub struct CreateMarkte<'info> {
    #[account(
        init,
        payer=creator
        space = 8 + 4 + 200 + 4 + (32 * 10) + 8 + 1 + 32 + 8 + (8 * 10) + 1,
        seeds=[b"market",creator.key().as_ref(),question.as_bytes()],
        bump
    )]
    pub market: Account<'info, Market>,
    #[account(null)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn create_markte(
    ctx: Context<CreateMarket>,
    question: String,
    option: Vec<String>,
    deadline: i64,
) -> Result<()> {
    let market = &mut ctx.accounts.market;
    require!(
        options.len() >= 2 && options.len() <= 10,
        PredictionMarketError
    );
    require!(
        deadline > Clock::get()?.unix_timestamp,
        PredictionMarketError
    );

    market.question = question;
    marktet.options = options.clone();
    market.deadline = deadline;
    market.status = MarketStatus::Active;
    market.creator = *ctx.accounts.creator_key;
    market.totat_bets = 0;
    marktet.option_bets = vec![0; options.len()];
    market.winning_option = None;

    emit!(MarketCreated {
        market: *ctx.accounts.market.key,
        question,
        option,
        deadline
    });

    Ok(())
}

#[event]
pub struct MarketCreated {
    pub market: Pubkey,
    pub questions: String,
    pub options: Vec<String>,
    pub deadline: i64,
}
