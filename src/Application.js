import React from 'react';
import LandingScreen from './screens/Landing';
import DashboardScreen from './screens/Dashboard';

// import classNames from 'classnames';
// import { Grid, Cell } from 'styled-css-grid';
// import CanvasBoard from './components/CanvasBoard';
// import InventoryDeck from './components/InventoryDeck';
// import FlowArrow from './components/FlowArrow';

export default function Application({ state, dispatch }) {
    const passProps = { ...state, dispatch };
    return (
        <div>
            {state.wallet.isConnected ? (
                <DashboardScreen {...passProps} />
            ) : (
                <LandingScreen {...passProps} />
            )}
        </div>
    );
}
