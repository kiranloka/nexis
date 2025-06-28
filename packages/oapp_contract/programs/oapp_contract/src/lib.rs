use anchor_lang::prelude::*;
use instructions::*;

mod errors;
mod instructions;
mod state;

declare_id!("8G6tF3faT1q6Qqdc1uGGyAMKGyogCNGVsJ4AGivMibcS");

#[program]
pub mod oapp_contract {
    use super::*;

    pub fn register_oapp(ctx: Context<RegisterOApp>, params: RegisterOAppParams) -> Result<()> {
        register_oapp::register_oapp(ctx, params)
    }

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
