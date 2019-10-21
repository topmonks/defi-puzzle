/**
 * DeFi Puzzle types,
 *  may be handy while connecting to smart contracts providers
 */

export type PuzzleTokenType = {
    type: 'short' | 'long',
    amount: Float,
    usedAmount: Float,
    currency: String,
    assetType: 'stable' | 'speculative',
};

export type BundleType = {
    tokens: PuzzleTokenType[],
    detail: {
        // ...
    },
    timestamp: String, // used as id
};

export type BundleTemplateType = {
    id: Number,
    name: String,
    tokens: PuzzleTokenType[],
};
