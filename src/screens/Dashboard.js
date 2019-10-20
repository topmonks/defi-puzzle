import React from 'react';
import Headline from '../components/Headline';
import { PuzzleTokenType } from '../types';
import PuzzleToken from '../components/PuzzleToken';
import PuzzleBundle from '../components/PuzzleBundle';
import TokenPrice from '../components/TokenPrice';
import PuzzleConfigurator from '../components/PuzzleConfigurator';

const parseTokenFromEvent = event =>
    JSON.parse(event.dataTransfer.getData('token') || 'null');

export default function DashboardScreen({
    tokens = [],
    bundles = [],
    templates = [],
    pricesCurrency,
    prices,
    configuratorTokens,
    dispatch,
}: {
    tokens: PuzzleTokenType[],
}) {
    const handleConfiguratorDragOver = event => {
        event.preventDefault(); // to enable dnd
    };
    const handleConfiguratorDrop = event => {
        const token = parseTokenFromEvent(event);
        dispatch('ConfiguratorTokenChange', { token });
    };
    const handleRemoveToken = token => {
        dispatch('ConfiguratorTokenChange', { token, remove: true });
    };
    const handleBundle = ({ shortToken, longToken }) => {
        dispatch('ChangeModal', 'Bundle');
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
                            />
                        ))}
                </section>
                <section>
                    <Headline primary>Your bundles</Headline>
                    {bundles.map(bundles => null)}
                    {!bundles.length && (
                        <div className="empty-placeholder">
                            <span>You don’t have any bundles yet :(</span>
                        </div>
                    )}
                </section>
            </div>

            <div className="dashboard-screen__headline">
                <Headline primary>CREATE YOUR BUNDLE</Headline>
            </div>
            <div className="dashboard-screen__configurator">
                <PuzzleConfigurator
                    longToken={configuratorTokens?.long}
                    shortToken={configuratorTokens?.short}
                    onDragOver={handleConfiguratorDragOver}
                    onDrop={handleConfiguratorDrop}
                    onTokenRemove={handleRemoveToken}
                    onBundle={handleBundle}
                />
            </div>
            <div className="dashboard-screen__footline">
                <p>
                    * Please note the interest rates are variable and subject to
                    real-time changes. Please see the <br />
                    <a href="/">Compound FAQ</a> for more detail on how the
                    interest rates are determined.
                </p>
            </div>
            <div className="dashboard-screen__bundle-templates">
                <section>
                    <Headline primary>BUNDLE TEMPLATES</Headline>
                    {templates.map(({ id, tokens, name }) => (
                        <div key={id}>
                            <Headline>{name}</Headline>
                            <PuzzleBundle tokens={tokens} template />
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
