import React from 'react';
// import './App.css';
// import classNames from 'classnames';
// import { Grid, Cell } from 'styled-css-grid';
// import CanvasBoard from './components/CanvasBoard';
// import InventoryDeck from './components/InventoryDeck';
// import FlowArrow from './components/FlowArrow';

export default function App({ web3, loading, state, dispatch }) {
    console.log(web3);
    return <div>{loading && 'loading'}</div>;
}
