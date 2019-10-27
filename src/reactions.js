/**
 * Reactions to application actions
 *
 *  When store.dispatch('ExampleAction', { foo: true, bar: false }) is called
 *   here you can react to such action
 *   use action payload ({ foo: true, bar: false }),
 *   set context instance by context({ instanceName: instance })
 *   use already setted context.instanceName
 *   and update state
 *    synchronously by return { fooAndBar: foo && bar }
 *    and/or asynchronously by update({ fooAndBar: foo && bar })
 */

import {
    initializeWallet,
    isWalletReady,
    getWalletName,
} from './library/wallet';

export const STATE_STORAGE_KEY = 'defi-puzzle-state';

export const ETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
export const DAI_ADDRESS = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359';

const initialState = {
    wallet: null,
    tokens: [],
    bundles: [],
    templates: [],
    pricesCurrency: 'USD',
    prices: {
        ETH: 0,
        DAI: 0,
    },
    configuratorTemplateUsed: false,
    configuratorTokens: {
        long: null,
        short: null,
    },
    configuratorHighlightTokenInputs: {
        long: false,
        short: false,
    },
    compoudRates: {
        'L-ETH': 0,
        'L-DAI': 0,
        'S-ETH': 0,
        'S-DAI': 0,
    },
    bundling: false,
    lastBundled: null,
};

export const getInitialState = () => {
    const storedStateJson = localStorage.getItem(STATE_STORAGE_KEY);

    if (!storedStateJson) {
        return initialState;
    }

    try {
        const storedState = JSON.parse(storedStateJson);
        return storedState;
    } catch (error) {
        console.error('Cannot parse stored state.');
        return initialState;
    }
};

export default {
    ExampleAction: ({ payload, update, context, currentState, dispatch }) => {
        // Use context, like
        // context.web3
        // context.etherum

        // Use currentState

        // Use dispatch to call another action
        // dispatch('ActionName', { foo: true })

        // Update state asynconously
        setTimeout(() => {
            update({ foo: true });
        }, 600);

        // Update state syncronously
        return {
            foo: null,
        };
    },

    InitializeWallet: ({ payload, update, context }) => {
        const walletState = ({ web3, ethereum }) => ({
            wallet: {
                isReady: Boolean(web3),
                isConnected: isWalletReady({ web3 }),
                name: getWalletName({ ethereum }),
            },
        });

        const wallet = initializeWallet(wallet => {
            context(wallet);
            update(walletState(wallet));
        });

        context(wallet);
        return walletState(wallet);
    },

    ConnectWallet: ({ context }) => {
        if (context.ethereum) {
            context.ethereum.enable().catch(() => {
                console.log('Connection canceled.');
            });
        } else {
            console.warn('No ethereum wallet to connect');
        }
    },

    ChangeModal: ({ payload: modal }) => {
        if (typeof modal === 'string') return { modal: { name: modal } };
        else return { modal };
    },

    LoadPuzzleTokens: ({
        update,
        context,
        dispatch,
        currentState: { configuratorTokens, bundles },
    }) => {
        // TODO: make real web3 requests
        //   use context.web3 or context.etherum

        const fakeTokens = [
            {
                type: 'short',
                amount: 1000,
                usedAmount: 0,
                currency: 'S-DAI',
                assetType: 'stable',
            },
            {
                type: 'short',
                amount: 2,
                usedAmount: 0,
                currency: 'S-ETH',
                assetType: 'speculative',
            },
            {
                type: 'long',
                amount: 5000,
                usedAmount: 0,
                currency: 'L-DAI',
                assetType: 'stable',
            },
            {
                type: 'long',
                amount: 2,
                usedAmount: 0,
                currency: 'L-ETH',
                assetType: 'speculative',
            },
        ].map(token => {
            // subtract wallet amount by used token if any
            const usedToken = Object.values(configuratorTokens).find(
                usedToken => usedToken && usedToken.currency === token.currency,
            );
            return !usedToken
                ? token
                : { ...token, usedAmount: usedToken.usedAmount };
        });

        // TODO: Load Bundles aswell
        console.log('Bundles', bundles);

        setTimeout(() => {
            update({
                tokens: fakeTokens,
            });
        }, 400);
    },

    CreateTemplates: ({ currentState: { tokens, prices } }) => {
        // S-DAI=(L-ETH * ETHprice)/DAIprice
        // L-DAI=(S-ETH * ETHprice)/DAIprice

        const prepareTemplate = token => {
            if (token.assetType === 'speculative') {
                return { ...token, usedAmount: 1 };
            }
            if (token.assetType === 'stable') {
                const usedAmount = parseFloat(
                    (prices.ETH / prices.DAI).toFixed(2),
                );
                return { ...token, usedAmount };
            }
        };

        return {
            templates: [
                {
                    id: 1,
                    name: 'Pure ETH Upside',
                    tokens: tokens
                        .filter(({ currency }) =>
                            ['L-ETH', 'S-DAI'].includes(currency),
                        )
                        .map(prepareTemplate),
                },
                {
                    id: 2,
                    name: 'Pure ETH Downside',

                    tokens: tokens
                        .filter(({ currency }) =>
                            ['L-DAI', 'S-ETH'].includes(currency),
                        )
                        .map(prepareTemplate),
                },
            ],
        };
    },

    LoadCurrentPrices: async ({
        currentState: { pricesCurrency: currency },
    }) => {
        const getPrice = async address =>
            (await (await fetch(
                `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address}&vs_currencies=${currency}`,
            )).json())?.[address.toLowerCase()]?.[currency.toLowerCase()];

        try {
            return {
                prices: {
                    ETH: await getPrice(ETH_ADDRESS),
                    DAI: await getPrice(DAI_ADDRESS),
                },
            };
        } catch (error) {
            console.error('Cannot load current prices', error);
        }
    },

    LoadCompoundRates: ({ update }) => {
        // Fake API call
        setTimeout(() => {
            update({
                compoudRates: {
                    'L-ETH': 0.1498,
                    'L-DAI': 0.0196,
                    'S-ETH': 0.1731,
                    'S-DAI': 0.0796,
                },
            });
        }, 350);
    },

    ConfiguratorTokenChange: ({
        payload: { token, remove, edit, template = false, bundle } = {},
        update,
        context,
        currentState,
        dispatch,
    }) => {
        // This method usually updates wallet amounts based on configurator input changes
        const updateTokenInTokens = (updates, _token = token) => {
            const tokens = currentState.tokens.map(currentToken =>
                currentToken.currency !== _token.currency
                    ? currentToken
                    : { ...currentToken, ...updates },
            );

            update({ tokens });
        };
        const updateTokenInBundles = (updates, _token = token) => {
            const bundles = currentState.bundles.map(currentBundle => ({
                ...currentBundle,
                tokens: currentBundle.tokens.map(currentBundleToken =>
                    currentBundleToken.currency !== _token.currency
                        ? currentBundleToken
                        : { ...currentBundleToken, ...updates },
                ),
            }));

            update({ bundles });
        };

        // store these
        update({
            configuratorTemplateUsed: template,
            configuratorBundleUsed: bundle,
        });

        if (remove) {
            // add amount back to your token
            if (!bundle || template) updateTokenInTokens({ usedAmount: 0 });
            if (bundle) updateTokenInBundles({ usedAmount: 0 });

            return {
                // remove token from configurator
                configuratorTokens: {
                    ...currentState.configuratorTokens,
                    [token.type]: null,
                },
            };
        }

        const currentConfigurationToken =
            currentState.configuratorTokens[token.type];

        // Propably just changed amount,
        //   so we need to update currentConfigurationToken amount and tokens list aswell
        if (edit) {
            if (template) {
                console.warn('Template recalculation not implemented yet');
            }

            if (template) {
                updateTokenInTokens({ usedAmount: token.usedAmount });
            }

            // bundles cannot be edited

            return {
                configuratorTokens: {
                    ...currentState.configuratorTokens,
                    [token.type]: token, // with already updated amount
                },
            };
        }

        // Placing token over same token in configurtor has no effect if not template or bundle used
        if (
            !template &&
            !bundle &&
            token.currency === currentConfigurationToken?.currency
        ) {
            return void 0;
        }

        // When some token in configurator already is, we need to swap them
        if (Boolean(currentConfigurationToken)) {
            // So firstly empty occupied slot,
            update({
                configuratorTokens: {
                    ...currentState.configuratorTokens,
                    [currentConfigurationToken.type]: null,
                },
            });

            // returns used amounts back (if not bundle)
            if (!bundle || template) {
                updateTokenInTokens(
                    { usedAmount: 0 },
                    currentConfigurationToken,
                );
            }

            if (bundle) {
                updateTokenInBundles({ usedAmount: token.amount });
            }

            // and then call update again to place new token to the slot
            dispatch('ConfiguratorTokenChange', { token, template, bundle });
            return void 0;
        }

        // No token in configurator yet,
        const usedAmount = template ? token.usedAmount : token.amount;

        // so just reset amount
        if (!bundle || template) {
            updateTokenInTokens({ usedAmount });
        }
        if (bundle) updateTokenInBundles({ usedAmount });

        // and use the new one
        return {
            configuratorTokens: {
                ...currentState.configuratorTokens,
                [token.type]: { ...token, usedAmount },
            },
        };
    },

    Bundle: async ({
        currentState: { configuratorTokens, bundles, tokens },
        dispatch,
        update,
    }) => {
        const { long: longToken, short: shortToken } = configuratorTokens;

        update({
            bundling: true,
        });

        // TODO: do something, call web3 provider or whatever to complete bundle
        // and then reset configurator and just created bundle

        setTimeout(async () => {
            const bundle = {
                detail: null, // TODO detail of bundle
                tokens: [
                    {
                        ...shortToken,
                        amount: shortToken.usedAmount,
                        usedAmount: 0,
                    },
                    {
                        ...longToken,
                        amount: longToken.usedAmount,
                        usedAmount: 0,
                    },
                ],
                timestamp: new Date().toISOString(),
            };

            update({
                tokens: tokens.map(token => {
                    if (token.currency === shortToken.currency) {
                        return {
                            ...token,
                            amount: (
                                token.amount - shortToken.usedAmount
                            ).toFixed(2),
                            usedAmount: 0,
                        };
                    }
                    if (token.currency === longToken.currency) {
                        return {
                            ...token,
                            amount: (
                                token.amount - longToken.usedAmount
                            ).toFixed(2),
                            usedAmount: 0,
                        };
                    }
                    return token;
                }),

                bundles: bundles.concat([bundle]),
                configuratorTokens: {
                    short: null,
                    long: null,
                },

                bundling: false,
                lastBundled: bundle,
            });
        }, 10000);
    },

    RefreshBundling: ({ dispatch }) => {
        // Here we should reload transaction info
        // but now, for mock:
        // ..
    },

    HighlightTokenDropArea: ({
        payload: { token, highlight },
        currentState,
    }) => {
        return {
            configuratorHighlightTokenInputs: {
                ...currentState.configuratorHighlightTokenInputs,
                [token.type]: highlight,
            },
        };
    },

    StoreState: ({ currentState }) => {
        try {
            const json = JSON.stringify(currentState);
            localStorage.setItem(STATE_STORAGE_KEY, json);
        } catch (error) {
            console.error('Cannot store current state.');
        }
    },

    Unbundle: async ({
        update,
        dispatch,
        currentState: { configuratorTokens },
    }) => {
        // const { long: longToken, short: shortToken } = configuratorTokens;
    },
};
