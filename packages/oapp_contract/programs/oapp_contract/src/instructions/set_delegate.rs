use crate::{errors::PredictionMarketError, state::OAppConfig};
use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct SetDelegateParams {
    pub delegate: Pubkey,
}

#[derive(Accounts)]
pub struct SetDelegate<'info> {
    #[account(
        mut,
        constraint = oapp_config.owner == *owner.key @ PredictionMarketError::UnauthorizedOApp
    )]
    pub oapp_config: Account<'info, OAppConfig>,
    #[account(mut)]
    pub owner: Signer<'info>,
    /// CHECK: LayerZero Endpoint program
    pub endpoint_program: AccountInfo<'info>,
}

pub fn set_delegate(ctx: Context<SetDelegate>, params: SetDelegateParams) -> Result<()> {
    let oapp_config = &mut ctx.accounts.oapp_config;
    oapp_config.delegate = Some(params.delegate);

    // Placeholder: CPI to LayerZero Endpoint to set delegate
    // Use endpoint::cpi::set_delegate as per LayerZero docs
    Ok(())
}
