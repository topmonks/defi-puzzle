import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { initializeWeb3 } from './library/web3';
import createStore from './library/store';

const web3 = initializeWeb3(render);
const { getState, dispatch } = createStore(render);

// Initial render
const rootElement = document.getElementById('root');
render();

(async () => {
    // const Contract = web3.eth.contract(await (await fetch('/contracts/koment.json')).json());
    // const contract = KomentContract.at('0x4e0b292b46dbd40b8c76cda4cdf21e2ba56a3189');
    setTimeout(() => {
        dispatch('update-inventory', [
            { id: 'savs', balance: 10, symbol: 'lcETH' },
            { id: 'rwfs', balance: 512.5, symbol: 'lcDAI' },
            { id: '3rfa', balance: 500, symbol: 'scDAI' },
            // { balance },
        ]);
    }, 800);
})();

function render() {
    const props = {
        web3,
        state: getState(),
        dispatch,
        loading:
            web3.currentProvider.networkVersion !== '3' ||
            !web3.eth.defaultAccount,
    };

    ReactDOM.render(<App {...props} />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
