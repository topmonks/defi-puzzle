import React from 'react';
import Headline from '../components/Headline';
import { PuzzleTokenType } from '../types';
import PuzzleToken from '../components/PuzzleToken';
import PuzzleConfigurator from '../components/PuzzleConfigurator';

const parseTokenFromEvent = event =>
    JSON.parse(event.dataTransfer.getData('token') || 'null');

export default function DashboardScreen({
    tokens = [],
    configuratorTokens,
    dispatch,
}: {
    tokens: PuzzleTokenType[],
}) {
    const handleDragOver = direction => event => {
        event.preventDefault();
    };
    const handleDrop = direction => event => {
        const token = parseTokenFromEvent(event);
        const remove = direction === 'out';

        dispatch('ConfiguratorTokenChange', { token, remove });
    };

    return (
        <div className="dashboard-screen">
            <div
                className="dashboard-screen__tokens"
                onDrop={handleDrop('out')}
                onDragOver={handleDragOver('out')}
            >
                <section>
                    <Headline>Long positions</Headline>
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
                    <Headline>Short positions</Headline>

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
                    <Headline>Your bundles</Headline>
                </section>
            </div>

            <div className="dashboard-screen__headline">
                <Headline>CREATE YOUR BUNDLE</Headline>
            </div>
            <div className="dashboard-screen__configurator">
                <PuzzleConfigurator
                    longToken={configuratorTokens?.long}
                    shortToken={configuratorTokens?.short}
                    onDragOver={handleDragOver('in')}
                    onDrop={handleDrop('in')}
                />
            </div>
            <div className="dashboard-screen__footline">
                <p>
                    * Please note the interest rates are variable and subject to
                    real-time changes. Please see the{' '}
                    <a href="/">Compound FAQ</a> for more detail on how the
                    interest rates are determined.
                </p>
            </div>
            <div className="dashboard-screen__bundle-templates">
                <section>
                    <Headline>BUNDLE TEMPLATES</Headline>
                </section>
            </div>
            <div className="dashboard-screen__current-prices">
                <section>
                    <Headline>CURRENT PRICES</Headline>
                </section>
            </div>
        </div>
    );
}
