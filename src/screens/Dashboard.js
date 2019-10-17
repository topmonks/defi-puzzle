import React from 'react';
import Headline from '../components/Headline';

export default function DashboardScreen({ location, id }) {
    return (
        <div className="dashboard-screen">
            <div className="dashboard-screen__tokens">
                <section>
                    <Headline>Long positions</Headline>
                </section>
                <section>
                    <Headline>Short positions</Headline>
                </section>
                <section>
                    <Headline>Your bundles</Headline>
                </section>
            </div>

            <div className="dashboard-screen__headline">
                <Headline>CREATE YOUR BUNDLE</Headline>
            </div>
            <div className="dashboard-screen__configurator"></div>
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
