use anchor_lang::prelude::*;
use crate::{state::OAppConfig,errors::PredictionMarketError};

#[derive(AnchorDeserialize,AnchorSerialize)]
pub struct SetDelegateParams{
    pub delegate:Pubkey,
}

#[derive(Accounts)]
pub struct SetDelegate<'info>{
    #[account(
        mut,
        constraint=oapp_config.owner ==*owner.key @ PredictionMarketError::UnauthorizedOApp
    )]
    pub oapp_config:Account<'info,OAppConfig>,
    #[account(mut)]
    pub owner:Signer<'info>
    pub endpoint_program:AccountInfo<'info>
}

pub fn set_delegate(ctx:Context<SetDelegate>,params:SetDelegateParams)->Result<()>{
    let oapp_config=&mut ctx.accounts.oapp_config;
    oapp_config.delegate=Some(params.delegate);

    Ok(())
}