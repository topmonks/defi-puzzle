import React from 'react';
import './App.css';
import classNames from 'classnames';

export default function App({ web3, loading }) {
    return (
        <div className="App">
            <header
                className={classNames(
                    'App-header',
                    !loading && 'App-header--collapsed',
                )}
            >
                <h1 className="App-logo">DeFi Puzzle</h1>
                {loading && <p>Please, connect your Metamask.</p>}
            </header>
            {!loading && <main className="App-main">Configurator</main>}
        </div>
    );
}
