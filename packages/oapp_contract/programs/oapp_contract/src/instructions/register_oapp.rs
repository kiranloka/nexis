use anchor_lang::prelude::*;
use crate::{state::OAppConfig,errors::PredictionMarketError};

#[derive(AnchorSerialize,AnchorDeserialize)]
pub struct RegisterOAppParams{
    pub endpoint:Pubkey,
}


#[derive(Accounts)]
pub struct RegisterOApp<'info>{
    #[account(
        init,
        payer=owner,
        space=8+32+32+33,
        seeds=[b"opp_config"],
        bump
    )]

    pbu oapp_config::Account<'info,OAppConfig>,
    #[account(mut)]
    pub owner:Signer<'info>,
    pub system_program:Program<'info,System>,
    pub endpoint_program:AccountInfo<'info>
}

pub fn register_oapp(ctx:Context<RegisterOApp>,params:RegisterOApp)->Result<()>{

    let oapp_config = &mut ctx.accounts.oapp_config;
    oapp_config.endpoint = params.endpoint;
    oapp_config.owner = *ctx.accounts.owner.key;
    oapp_config.delegate=None;

    endpoint::cpi::register_oapp()
    Ok(())
}