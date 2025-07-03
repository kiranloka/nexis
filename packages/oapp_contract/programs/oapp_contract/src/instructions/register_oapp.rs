use crate::{errors::PredictionMarketError, state::OAppConfig};
use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct RegisterOAppParams {
    pub endpoint: Pubkey,
}

#[derive(Accounts)]
pub struct RegisterOApp<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + 32 + 33,
        seeds = [b"oapp_config"],
        bump
    )]
    pub oapp_config: Account<'info, OAppConfig>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
    /// CHECK: LayerZero Endpoint program
    pub endpoint_program: AccountInfo<'info>,
}

pub fn register_oapp(ctx: Context<RegisterOApp>, params: RegisterOAppParams) -> Result<()> {
    let oapp_config = &mut ctx.accounts.oapp_config;
    oapp_config.endpoint = params.endpoint;
    oapp_config.owner = *ctx.accounts.owner.key;
    oapp_config.delegate = None;

    // Placeholder: CPI to LayerZero Endpoint to register OApp
    // Use endpoint::cpi::register_oapp as per LayerZero docs
    Ok(())
}
