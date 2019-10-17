import React from 'react';
import { isWeb3Ready } from './library/web3';
// import './App.css';
// import classNames from 'classnames';
// import { Grid, Cell } from 'styled-css-grid';
// import CanvasBoard from './components/CanvasBoard';
// import InventoryDeck from './components/InventoryDeck';
// import FlowArrow from './components/FlowArrow';

export default function App({ web3, state, dispatch }) {
    if (!web3) {
        return 'no web3';
    }
    return <div>{!isWeb3Ready(web3) && 'loading'}</div>;
}
