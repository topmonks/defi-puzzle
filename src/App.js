import React from 'react';
import './App.css';
import classNames from 'classnames';
import { Grid, Cell } from 'styled-css-grid';
import CanvasBoard from './components/CanvasBoard';
import InventoryDeck from './components/InventoryDeck';
import FlowArrow from './components/FlowArrow';

export default function App({ web3, loading, state, dispatch }) {
    console.log(state.inventory);
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
            {!loading && (
                <main className="App-main">
                    <Grid
                        columns=".7fr"
                        // rows="auto 48px auto 48px auto"
                        // areas={['bundles', 'dir', 'tokens', 'dir', 'preview']}
                        justifyContent="center"
                    >
                        <Cell>
                            <div>
                                <h2>1. Select bundle</h2>
                                <InventoryDeck
                                    inventory={state.inventory.bundles}
                                />
                            </div>
                        </Cell>

                        <Cell center middle>
                            <FlowArrow />
                        </Cell>

                        <Cell>
                            <div>
                                <h2>2. Select token</h2>
                                <InventoryDeck
                                    inventory={state.inventory.tokens}
                                />
                            </div>
                        </Cell>

                        <Cell center middle>
                            <FlowArrow />
                        </Cell>

                        <Cell>
                            <div>
                                <h2>3. Define maturity</h2>
                                ...
                            </div>
                        </Cell>

                        <Cell center middle>
                            <FlowArrow />
                        </Cell>

                        <Cell>
                            <div>
                                <h2>4. Check preview</h2>
                                <CanvasBoard />
                            </div>
                        </Cell>

                        <Cell center middle>
                            <FlowArrow />
                        </Cell>

                        <Cell>
                            <div>
                                <h2>5. Submit</h2>
                                ...
                            </div>
                        </Cell>
                    </Grid>

                    {/* <input
                        type="text"
                        value={state.test || ''}
                        onChange={({ target: { value } }) => {
                            dispatch('test', value);
                        }}
                    /> */}
                </main>
            )}
        </div>
    );
}
