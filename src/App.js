import React from 'react';
import './App.css';
import classNames from 'classnames';
import { Grid, Cell } from 'styled-css-grid';
import CanvasBoard from './components/CanvasBoard';
import InventoryDeck from './components/InventoryDeck';
import FlowArrow from './components/FlowArrow';

export default function App({ web3, loading, state, dispatch }) {
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
                        columns={'1fr 48px 1fr'}
                        rows={'218px auto'}
                        areas={['deck deck  deck', 'input dir output']}
                    >
                        <Cell area="deck">
                            <InventoryDeck inventory={state.inventory} />
                        </Cell>
                        <Cell area="input">
                            <CanvasBoard
                                contents={[
                                    // mock
                                    state.inventory[0],
                                    state.inventory[1],
                                ].filter(Boolean)}
                            />
                        </Cell>
                        <Cell area="dir" center middle>
                            <FlowArrow />
                        </Cell>
                        <Cell area="output">
                            <CanvasBoard />
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
