// Declare modules for each instruction file
pub mod claim_payout;
pub mod create_market;
pub mod lz_recieve;
pub mod place_bet;
pub mod quote;
pub mod register_oapp;
pub mod resolve_market;
pub mod send;
pub mod set_delegate;

// Re-export the main instruction functions for use in lib.rs
pub use claim_payout::claim_payout;
pub use create_market::create_market;
pub use lz_recieve::lz_receive;
pub use place_bet::place_bet;
pub use quote::quote;
pub use register_oapp::register_oapp;
pub use resolve_market::resolve_market;
pub use send::send;
pub use set_delegate::set_delegate;
