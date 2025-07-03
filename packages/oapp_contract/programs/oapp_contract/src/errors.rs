use anchor_lang::prelude::*;

#[error_code]
pub enum PredictionMarketError {
    #[msg("Market is already resolved")]
    MarketResolved,
    #[msg("Betting deadline has passed")]
    DeadlinePassed,
    #[msg("Invalid Peer")]
    InvalidPeer,
    #[msg("Invalid option index")]
    InvalidOption,
    #[msg("Insufficient Bet amount")]
    InsufficientAmount,
    #[msg("Market not resolved yet!")]
    MarketNotResolved,
    #[msg("Payout already claimed")]
    PayoutClaimed,
    #[msg("Not a winning bet")]
    NotWinningBet,
    #[msg("Unauthorized OApp Caller")]
    UnauthorizedOApp,
    #[msg("Invalid endpoint")]
    InvalidEndPoint,
}
