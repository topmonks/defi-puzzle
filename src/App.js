import React, { useEffect, useState } from 'react';
import './App.css';
import classNames from 'classnames';

function App() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 800);
    }, []);

    return (
        <div className="App">
            <header
                className={classNames(
                    'App-header',
                    loaded && 'App-header--collapsed',
                )}
            >
                <h1 className="App-logo">DeFi Puzzle</h1>
                {!loaded && <p>Connecting your Metamask...</p>}
            </header>
            {loaded && <main className="App-main">Configurator</main>}
        </div>
    );
}

export default App;
