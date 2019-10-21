import { PuzzleTokenType } from '../types';

/**
 *
 * @param {PuzzleTokenType[]} tokens
 */
const bundlePositionType = (tokens: PuzzleTokenType = []) => {
    const leaderToken = tokens.find(
        ({ assetType } = {}) => assetType === 'speculative',
    );

    // FIXME: in the future there can be more then 2 tokens
    if (tokens[0].assetType === tokens[1].assetType) {
        return 'Complex';
    }

    return leaderToken.type
        .replace('long', 'Long ETH')
        .replace('short', 'Short ETH');
};

// Naive way how to get price by token currency type (L-ETH -> ETH, S-DAI -> DAI)
const tokenCurrencyBase = token => token.currency.split('-')[1];

const tokenByType = t => ({ type } = {}) => type === t;

// TODO: use sum in future sum(shortPrice * shortAmount), sum(longPrice * longAmount)
const leverageFormula = ({ shortPrice, shortAmount, longPrice, longAmount }) =>
    1 / (1 - (shortPrice * shortAmount) / (longPrice * longAmount));

const netValueFormula = ({ shortPrice, shortAmount, longPrice, longAmount }) =>
    longPrice * longAmount - shortPrice * shortAmount;

/**
 *
 * @param {PuzzleTokenType[]} tokens
 */
const calculateLeverage = (tokens: PuzzleTokenType = [], prices) => {
    const shortToken = tokens.find(tokenByType('short'));
    const longToken = tokens.find(tokenByType('long'));

    if (!shortToken || !longToken) {
        return null;
    }

    // if (tokenCurrencyBase(shortToken) === tokenCurrencyBase(longToken)) {
    //     return '-';
    // }

    return leverageFormula({
        shortPrice: prices[tokenCurrencyBase(shortToken)],
        shortAmount: shortToken.amount,
        longPrice: prices[tokenCurrencyBase(longToken)],
        longAmount: longToken.amount,
    }).toFixed(2);
};

const calulateNetValue = (tokens = [], prices = {}, currency) => {
    const shortToken = tokens.find(tokenByType('short'));
    const longToken = tokens.find(tokenByType('long'));

    if (!shortToken || !longToken) {
        return null;
    }

    const value = netValueFormula({
        shortPrice: prices[tokenCurrencyBase(shortToken)],
        shortAmount: shortToken.amount,
        longPrice: prices[tokenCurrencyBase(longToken)],
        longAmount: longToken.amount,
    });

    return value + ' ' + currency;
};

// Collateralization ratio (%): `(price * amount of long) / (price * amount of short)` -> %
const calculateBundleCollatRatioFormula = ({
    shortPrice,
    shortAmount,
    longPrice,
    longAmount,
}) => (longPrice * longAmount) / (shortPrice * shortAmount);

const calculateBundleCollatRatio = (tokens = [], prices = {}) => {
    const shortToken = tokens.find(tokenByType('short'));
    const longToken = tokens.find(tokenByType('long'));

    if (!shortToken || !longToken) {
        return null;
    }

    const ratio = calculateBundleCollatRatioFormula({
        shortPrice: prices[tokenCurrencyBase(shortToken)],
        shortAmount: shortToken.amount,
        longPrice: prices[tokenCurrencyBase(longToken)],
        longAmount: longToken.amount,
    });

    return (ratio * 100).toFixed(2) + '%';
};

// (price * amount of all long) / (price * amount of all short)
// TODO: in future count in woth bundles values not only tokens
const calculateWalletCollatRatio = (tokens = [], prices = {}) => {
    const shortTokens = tokens.filter(tokenByType('short'));
    const longTokens = tokens.filter(tokenByType('long'));

    const totalPrice = (total, token) =>
        total + token.amount * prices[tokenCurrencyBase(token)];

    const ratio =
        longTokens.reduce(totalPrice, 0) / shortTokens.reduce(totalPrice, 0);

    return (ratio * 100).toFixed(2) + '%';
};

/**
 *
 * @param {*} bundle
 */
export const createBundlePreview = (
    { bundleTokens, walletTokens },
    { prices, pricesCurrency },
) => {
    if (bundleTokens.length !== 2) {
        return null;
    }

    return {
        position: bundlePositionType(bundleTokens),
        leverage: calculateLeverage(bundleTokens, prices),
        netValue: calulateNetValue(bundleTokens, prices, pricesCurrency),
        bundleCollatRatio: calculateBundleCollatRatio(bundleTokens, prices),
        walletCollatRatio: calculateWalletCollatRatio(walletTokens, prices),
        collatRequired: null,
        longYield: null,
        shortCost: null,
    };
};
