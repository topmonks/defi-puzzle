import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';
import * as serviceWorker from './serviceWorker';
import createStore from './library/store';
import reactions from './reactions';

const store = createStore(render, {
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
});

// React on actions
store.useReducer(reactions);

// Initial render
const rootElement = document.getElementById('root');
render();

// Initial actions
(async () => {
    store.dispatch('InitializeWallet');
    store.dispatch('LoadPuzzleTokens');
    store.dispatch('LoadCurrentPrices');
})();

function render() {
    ReactDOM.render(
        <Application state={store.getState()} dispatch={store.dispatch} />,
        rootElement,
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
