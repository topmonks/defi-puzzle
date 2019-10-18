import React from 'react';
import Headline from '../components/Headline';
import { PuzzleTokenType } from '../types';
import PuzzleToken from '../components/PuzzleToken';
import PuzzleConfigurator from '../components/PuzzleConfigurator';

export default function DashboardScreen({
    tokens = [],
}: {
    tokens: PuzzleTokenType[],
}) {
    tokens = [
        { type: 'short', amount: 2.45, currency: 'L-DAI' },
        { type: 'short', amount: 2, currency: 'L-ETH' },
        { type: 'long', amount: 1000, currency: 'S-DAI' },
        { type: 'long', amount: 212.13, currency: 'S-ETH' },
    ];
    return (
        <div className="dashboard-screen">
            <div className="dashboard-screen__tokens">
                <section>
                    <Headline>Long positions</Headline>
                    {tokens
                        .filter(token => token.type !== 'long')
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
                        .filter(token => token.type !== 'short')
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
                <PuzzleConfigurator />
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
