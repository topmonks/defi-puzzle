/**
 * DeFi Puzzle types,
 *  may be handy while connecting to smart contracts providers
 */

export type PuzzleTokenType = {
    type: 'short' | 'long',
    amount: Float,
    currency: String,
};

export type BundleType = {
    tokens: PuzzleTokenType[],
    detail: {
        // ...
    },
};

export type BundleTemplateType = {
    id: Number,
    name: String,
    tokens: PuzzleTokenType[],
};
