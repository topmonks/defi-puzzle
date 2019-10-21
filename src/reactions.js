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
    configuratorTokens: {
        long: null,
        short: null,
    },
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

    LoadPuzzleTokens: ({ update, context, dispatch }) => {
        // TODO: make real web3 requests
        //   use context.web3 or context.etherum

        const fakeTokens = [
            { type: 'short', amount: 1000, usedAmount: 0, currency: 'S-DAI' },
            { type: 'short', amount: 2, usedAmount: 0, currency: 'S-ETH' },
            { type: 'long', amount: 5000, usedAmount: 0, currency: 'L-DAI' },
            { type: 'long', amount: 2, usedAmount: 0, currency: 'L-ETH' },
        ];
        setTimeout(() => {
            update({ tokens: fakeTokens });
            dispatch('CreateTemplates', fakeTokens);
        }, 600);

        // TODO: Load Bundles aswell
    },

    CreateTemplates: ({ payload: tokens }) => {
        return {
            templates: [
                {
                    id: 1,
                    name: 'Pure ETH Upside',
                    tokens: tokens.filter(({ currency }) =>
                        ['L-ETH', 'S-DAI'].includes(currency),
                    ),
                },
                {
                    id: 2,
                    name: 'Pure ETH Downside',
                    tokens: tokens.filter(({ currency }) =>
                        ['L-DAI', 'S-ETH'].includes(currency),
                    ),
                },
            ],
        };
    },

    LoadCurrentPrices: ({ update }) => {
        // Fake API call
        setTimeout(() => {
            update({
                pricesCurrency: 'USD',
                prices: {
                    ETH: 185.87,
                    DAI: 1.004,
                },
            });
        }, 350);
    },

    ConfiguratorTokenChange: ({
        payload: { token, remove, edit },
        update,
        context,
        currentState,
    }) => {
        if (remove) {
            return {
                // add amount back to your token
                tokens: currentState.tokens.map(currentToken =>
                    currentToken.currency !== token.currency
                        ? currentToken
                        : { ...token, usedAmount: 0 },
                ),
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
            return {
                tokens: currentState.tokens.map(currentToken =>
                    currentToken.currency !== token.currency
                        ? currentToken
                        : {
                              ...currentToken,
                              usedAmount: token.usedAmount,
                          },
                ),
                configuratorTokens: {
                    ...currentState.configuratorTokens,
                    [token.type]: token, // with already updated amount
                },
            };
        }

        // Placing token over same token in configurtor has no effect
        if (token.currency === currentConfigurationToken?.currency) {
            return void 0;
        }

        // When some token in configurator already is, we need to swap them
        if (Boolean(currentConfigurationToken)) {
            console.log('rep', token);
            return {
                // Keep it simple, :facepalm:
                tokens: currentState.tokens.map(
                    currentToken =>
                        currentToken.currency !==
                        currentConfigurationToken.currency
                            ? currentToken.currency === token.currency
                                ? { ...token, usedAmount: currentToken.amount } // move token to configuration (keep copy with no amount)
                                : currentToken // keep that token untouched, it's not interesting
                            : { ...currentConfigurationToken, usedAmount: 0 }, // return token amount back
                ),
                // add new token to configurator
                configuratorTokens: {
                    ...currentState.configuratorTokens,
                    [token.type]: { ...token, usedAmount: token.amount },
                },
            };
        }

        // No token in configurator yet, so just use the new one and reset amount
        return {
            tokens: currentState.tokens.map(currentToken =>
                currentToken.currency !== token.currency
                    ? currentToken
                    : { ...token, usedAmount: token.amount },
            ),
            configuratorTokens: {
                ...currentState.configuratorTokens,
                [token.type]: { ...token, usedAmount: token.amount },
            },
        };
    },

    StartBundling: ({
        currentState: { configuratorTokens, bundles, tokens },
        dispatch,
        update,
    }) => {
        const { long: longToken, short: shortToken } = configuratorTokens;
        dispatch('ChangeModal', 'Bundling');

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

            await update({
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
            });

            dispatch('ChangeModal', {
                name: 'Bundled',
                bundle,
            });
        }, 1400);
    },

    RefreshBundling: ({ dispatch }) => {
        // Here we should reload transaction info
        // but now, for mock:
        // ..
    },
};
