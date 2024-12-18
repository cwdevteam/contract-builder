import { base, baseSepolia } from 'wagmi/chains'

export const IS_TESTNET = process.env.NEXT_PUBLIC_TEST === 'true'
export const CHAIN = IS_TESTNET ? baseSepolia : base
export const CHAIN_ID = CHAIN.id

//DocuSign
export const pricePerContract = 2.0
export const taxPerContract = 0.14
