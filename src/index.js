import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';
import * as serviceWorker from './serviceWorker';
import createStore from './library/store';
import debounce from './library/debounce';
import reactions, { getInitialState, STATE_STORAGE_KEY } from './reactions';

const store = createStore(render, getInitialState());

const debouncedStateUpdateHandler = debounce(() => {
    // Cannot use action here cuz it leads to infinite updates
    // store.dispatch('StoreState', store.getState());
    try {
        const json = JSON.stringify(store.getState());
        localStorage.setItem(STATE_STORAGE_KEY, json);
    } catch (error) {
        console.error('Cannot store current state.');
    }
}, 1000);

// React on actions
store.useReducer(reactions);

// Initial render
const rootElement = document.getElementById('root');
render();

// Initial actions
(async () => {
    const { tokens } = store.getState();
    store.dispatch('InitializeWallet');
    if (!tokens.length) store.dispatch('LoadPuzzleTokens');
    store.dispatch('LoadCurrentPrices');
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
