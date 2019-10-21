import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';

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

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Application dispatch={() => {}} state={initialState} />,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
