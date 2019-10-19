/**
 * DeFi Puzzle types,
 *  may be handy while connecting to smart contracts providers
 */

export type PuzzleTokenType = {
    type: 'short' | 'long',
    amount: Float,
    currency: String,
};

export type BundleTemplate = {
    id: Number,
    name: String,
    tokens: PuzzleTokenType[],
};
