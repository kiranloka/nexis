use crate::state::OAppConfig;
use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct QuoteParams {
    pub dst_eid: u32,
    pub message: Vec<u8>,
    pub options: Vec<u8>,
}

#[derive(Accounts)]
pub struct Quote<'info> {
    pub oapp_config: Account<'info, OAppConfig>,
    pub endpoint_program: AccountInfo<'info>,
}

pub fn quote(ctx: Context<Quote>, params: QuoteParams) -> Result<()> {
    Ok(MessagingFee {
        native_fee: 0,
        lz_token_fee: 0,
    })
}
