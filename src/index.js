import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';
import * as serviceWorker from './serviceWorker';
import createStore from './library/store';
import debounce from './library/debounce';
import reactions, { getInitialState } from './reactions';

const store = createStore(getInitialState(), render);

const debouncedStateUpdateHandler = debounce(() => {
    store.dispatch('StoreState');
}, 200);

// React on actions
store.useHandlers(reactions);

// Initial render
const rootElement = document.getElementById('root');
render();

// Initial actions
(async () => {
    store.dispatch('InitializeWallet');
    await store.dispatch('LoadPuzzleTokens');
    await store.dispatch('LoadCurrentPrices');
    await store.dispatch('LoadCompoundRates');
    store.dispatch('CreateTemplates');
})();

function render() {
    ReactDOM.render(
        <Application state={store.getState()} dispatch={store.dispatch} />,
        rootElement,
        debouncedStateUpdateHandler,
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
