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
const tokenByType = type => (token = {}) => token.type === type;

const calculateLeverage = (tokens: PuzzleTokenType = [], prices) => {
    const shortToken = tokens.find(tokenByType('short'));
    const longToken = tokens.find(tokenByType('long'));

    if (!shortToken || !longToken) {
        return null;
    }

    // if (tokenCurrencyBase(shortToken) === tokenCurrencyBase(longToken)) {
    //     return '-';
    // }

    // TODO: use sum in future sum(shortPrice * shortAmount), sum(longPrice * longAmount)
    const formula = ({ shortPrice, shortAmount, longPrice, longAmount }) =>
        shortToken.assetType === 'speculative'
            ? -1 /
              (
                  1 -
                  (longPrice * longAmount) / (shortPrice * shortAmount)
              ).toFixed(2)
            : 1 /
              (
                  1 -
                  (shortPrice * shortAmount) / (longPrice * longAmount)
              ).toFixed(2);
    const leverage = formula({
        shortPrice: prices[tokenCurrencyBase(shortToken)],
        shortAmount: shortToken.amount,
        longPrice: prices[tokenCurrencyBase(longToken)],
        longAmount: longToken.amount,
    }).toFixed(2);
    return isFinite(leverage) ? leverage : "N/A";
};

const calulateNetValue = (tokens = [], prices = {}, currency) => {
    const shortToken = tokens.find(tokenByType('short'));
    const longToken = tokens.find(tokenByType('long'));

    if (!shortToken || !longToken) {
        return null;
    }

    const formula = ({ shortPrice, shortAmount, longPrice, longAmount }) =>
        longPrice * longAmount - shortPrice * shortAmount;

    const value = formula({
        shortPrice: prices[tokenCurrencyBase(shortToken)],
        shortAmount: shortToken.amount,
        longPrice: prices[tokenCurrencyBase(longToken)],
        longAmount: longToken.amount,
    }).toFixed(2);

    return (Number(value) === -0 ? "0.00" : value) + ' ' + currency;
};

const calculateBundleCollatRatio = (tokens = [], prices = {}) => {
    const shortToken = tokens.find(tokenByType('short'));
    const longToken = tokens.find(tokenByType('long'));

    if (!shortToken || !longToken) {
        return null;
    }

    // `(price * amount of long) / (price * amount of short)`
    const formula = ({ shortPrice, shortAmount, longPrice, longAmount }) =>
        (longPrice * longAmount) / (shortPrice * shortAmount);

    const ratio = formula({
        shortPrice: prices[tokenCurrencyBase(shortToken)],
        shortAmount: shortToken.amount,
        longPrice: prices[tokenCurrencyBase(longToken)],
        longAmount: longToken.amount,
    });

    return (ratio * 100).toFixed(2) + '%';
};

// TODO: in future count in woth bundles values not only tokens
const calculateWalletCollatRatio = (tokens = [], prices = {}) => {
    const shortTokens = tokens.filter(tokenByType('short'));
    const longTokens = tokens.filter(tokenByType('long'));

    const totalPrice = (total, token) =>
        total + token.amount * prices[tokenCurrencyBase(token)];

    const ratio = // (price * amount of all long) / (price * amount of all short)
        longTokens.reduce(totalPrice, 0) / shortTokens.reduce(totalPrice, 0);

    return (ratio * 100).toFixed(2) + '%';
};

const calculateCollatRequired = (tokens = []) => {
    const longToken = tokens.find(tokenByType('long'));

    // TODO: calculate agains compound
    if (longToken.currency === 'L-DAI') return '142.8%';
    if (longToken.currency === 'L-ETH') return '125%';
};

const getCompoundRate = type => (tokens = [], compoudRates = {}) => {
    const leaderToken = tokens.find(tokenByType(type));
    const rate = (compoudRates[leaderToken.currency] * 100).toFixed(2);

    return isNaN(rate) ? '-' : rate + '% APR';
};

export const createBundlePreview = (
    { bundleTokens, walletTokens },
    { prices = {}, simulation, pricesCurrency, compoudRates },
) => {
    if (bundleTokens.length !== 2) {
        return null;
    }

    if (simulation) {
        const shortToken = bundleTokens.find(tokenByType('short'));
        const longToken = bundleTokens.find(tokenByType('long'));
        // cons
        prices[tokenCurrencyBase(shortToken)] = simulation.shortTokenPrice;
        prices[tokenCurrencyBase(longToken)] = simulation.longTokenPrice;
    }

    return {
        position: bundlePositionType(bundleTokens),
        leverage: calculateLeverage(bundleTokens, prices),
        netValue: calulateNetValue(bundleTokens, prices, pricesCurrency),
        bundleCollatRatio: calculateBundleCollatRatio(bundleTokens, prices),
        walletCollatRatio: calculateWalletCollatRatio(walletTokens, prices),
        collatRequired: calculateCollatRequired(bundleTokens),
        longYield: getCompoundRate('long')(bundleTokens, compoudRates),
        shortCost: getCompoundRate('short')(bundleTokens, compoudRates),
    };
};

export const createBundleDetail = ({
    shortToken,
    longToken,
    daysElapsed,
    shortPrice,
    longPrice,
}) => {
    // TODO
    return {
        longPositionYield: null,
        shortPositionCost: null,
        unbundleCost: null,
    };
};
