import React from 'react';
import Headline from '../components/Headline';
import { PuzzleTokenType, BundleType, BundleTemplateType } from '../types';
import PuzzleToken from '../components/PuzzleToken';
import PuzzleBundle from '../components/PuzzleBundle';
import TokenPrice from '../components/TokenPrice';
import PuzzleConfigurator from '../components/PuzzleConfigurator';
import ConfiguredBundlePreview from '../components/ConfiguredBundlePreview';
import BundleDetail from '../components/BundleDetail';

const parseFromEvent = type => event =>
    JSON.parse(event.dataTransfer.getData(type) || 'null');

export default function DashboardScreen({
    tokens = [],
    bundles = [],
    templates = [],
    pricesCurrency,
    prices,
    configuratorTokens,
    configuratorTemplateUsed,
    configuratorBundleUsed,
    compoudRates,
    configuratorHighlightTokenInputs,
    dispatch,
}: {
    tokens: PuzzleTokenType[],
    bundles: BundleType[],
    templates: BundleTemplateType[],
}) {
    const handleConfiguratorDragOver = event => {
        event.preventDefault(); // to enable dnd
    };
    const handleConfiguratorDrop = event => {
        const token = parseFromEvent('token')(event);
        if (token) {
            dispatch('ConfiguratorTokenChange', { token });
            return;
        }

        const template = parseFromEvent('template')(event);
        const bundle = parseFromEvent('bundle')(event);

        if (bundle) {
            dispatch('ConfiguratorUseBundle', { bundle, template });
        }
    };
    const handleTokenUse = token => async () => {
        if (configuratorBundleUsed) {
            await dispatch('ConfiguratorRemoveBundle', {
                bundle: configuratorBundleUsed,
            });
        }
        dispatch('ConfiguratorTokenChange', { token });
    };
    const handleTemplateUse = template => async () => {
        if (configuratorBundleUsed) {
            await dispatch('ConfiguratorRemoveBundle', {
                bundle: configuratorBundleUsed,
            });
        }
        template.tokens.forEach(token => {
            dispatch('ConfiguratorTokenChange', {
                token,
                template,
            });
        });
    };
    const handleBundleUse = bundle => async () => {
        if (configuratorBundleUsed) {
            await dispatch('ConfiguratorRemoveBundle', {
                bundle: configuratorBundleUsed,
            });
        }

        bundle.tokens.forEach(token => {
            dispatch('ConfiguratorTokenChange', {
                token,
                bundle,
            });
        });
    };
    const handleRemoveToken = token => {
        if (configuratorBundleUsed) {
            dispatch('ConfiguratorRemoveBundle', {
                bundle: configuratorBundleUsed,
            });
        } else {
            dispatch('ConfiguratorRemoveToken', { token });
        }
    };
    const handleConfigurationSubmit = () => {
        dispatch('ChangeModal', {
            name: configuratorBundleUsed ? 'Unbundle' : 'Bundle',
            bundle: configuratorBundleUsed,
            tokens: Object.values(configuratorTokens),
        });
    };
    const handleConfiguratorTokenChange = changedToken => {
        dispatch('ConfiguratorTokenChange', {
            token: changedToken,
            edit: true,
            template: configuratorTemplateUsed,
        });
    };

    // TODO: use memo or better the app state?
    const configuredBundleTokens = [
        configuratorTokens.long,
        configuratorTokens.short,
    ]
        .filter(x => Boolean(x))
        .map(token => ({ ...token, amount: token.usedAmount, usedAmount: 0 }));

    const handlePuzzleHover = input => highlight => {
        const tokens = input?.tokens || [input]; // input is bundle or token
        tokens.forEach(token => {
            dispatch('HighlightTokenDropArea', {
                token,
                highlight,
            });
        });
    };

    return (
        <div className="dashboard-screen">
            <div className="dashboard-screen__tokens">
                <section>
                    <Headline primary>Long positions</Headline>
                    {tokens
                        .filter(token => token.type === 'long')
                        .map(token => (
                            <PuzzleToken
                                key={token.currency}
                                token={token}
                                draggable
                                onHoverChange={handlePuzzleHover(token)}
                                onClick={handleTokenUse(token)}
                            />
                        ))}
                </section>
                <section>
                    <Headline primary>Short positions</Headline>

                    {tokens
                        .filter(token => token.type === 'short')
                        .map(token => (
                            <PuzzleToken
                                key={token.currency}
                                token={token}
                                draggable
                                onHoverChange={handlePuzzleHover(token)}
                                onClick={handleTokenUse(token)}
                            />
                        ))}
                </section>
                <section>
                    <Headline primary>Your bundles</Headline>
                    {bundles.map(bundle => (
                        <PuzzleBundle
                            key={bundle.timestamp}
                            bundle={bundle}
                            draggable
                            onHoverChange={handlePuzzleHover(bundle)}
                            onButtonClick={handleBundleUse(bundle)}
                        />
                    ))}
                    {!bundles.length && (
                        <div className="empty-placeholder">
                            <span>You don’t have any bundles yet :(</span>
                        </div>
                    )}
                </section>
            </div>

            <div className="dashboard-screen__demonstration">
                <section>
                    <Headline secondary>Demonstration</Headline>
                    <button onClick={() => localStorage.clear()}>
                        clear storage
                    </button>
                </section>
            </div>

            <div className="dashboard-screen__headline">
                <Headline primary>
                    {configuratorBundleUsed
                        ? 'UNPACK YOUR BUNDLE'
                        : 'CREATE YOUR BUNDLE'}
                </Headline>
            </div>
            <div
                className="dashboard-screen__configurator"
                onDragOver={handleConfiguratorDragOver}
                onDrop={handleConfiguratorDrop}
            >
                <PuzzleConfigurator
                    longToken={configuratorTokens?.long}
                    shortToken={configuratorTokens?.short}
                    highlightedInputs={configuratorHighlightTokenInputs}
                    onTokenRemove={handleRemoveToken}
                    onSubmit={handleConfigurationSubmit}
                    onTokenChange={handleConfiguratorTokenChange}
                    fromTemplate={configuratorTemplateUsed}
                    fromBundle={configuratorBundleUsed}
                />
                <ConfiguredBundlePreview
                    bundleTokens={configuredBundleTokens}
                    walletTokens={tokens}
                    prices={prices}
                    pricesCurrency={pricesCurrency}
                    compoudRates={compoudRates}
                />
                {configuratorBundleUsed && (
                    <BundleDetail bundle={configuratorBundleUsed} />
                )}
            </div>
            <div className="dashboard-screen__footline">
                <p>
                    * Please note the interest rates are variable and subject to
                    real-time changes. Please see the <br />
                    <a href="https://medium.com/compound-finance/faq-1a2636713b69">
                        Compound FAQ
                    </a>{' '}
                    for more detail on how the interest rates are determined.
                </p>
            </div>
            <div className="dashboard-screen__bundle-templates">
                <section>
                    <Headline primary>BUNDLE TEMPLATES</Headline>
                    {templates.map(template => (
                        <div key={template.id}>
                            <Headline secondary>{template.name}</Headline>
                            <PuzzleBundle
                                bundle={template}
                                template
                                onHoverChange={handlePuzzleHover(template)}
                                onClick={handleTemplateUse(template)}
                            />
                        </div>
                    ))}
                </section>
            </div>
            <div className="dashboard-screen__current-prices">
                <section>
                    <Headline>CURRENT PRICES</Headline>
                    {['ETH', 'DAI'].map(type => (
                        <TokenPrice
                            key={type}
                            type={type}
                            price={prices[type]}
                            currency={pricesCurrency}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
}
