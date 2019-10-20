import React from 'react';
import LandingScreen from './screens/Landing';
import DashboardScreen from './screens/Dashboard';
import { Modal } from './components/Modal';

const modals = {
    Bundling: require('./modals/Bundling').default,
    Bundled: require('./modals/Bundled').default,
};

export default function Application({ state, dispatch }) {
    const passProps = { ...state, dispatch };
    const handleCloseModal = () => {
        dispatch('ChangeModal', null);
    };

    if (!state.wallet) {
        // wait for wallet initialization
        return null;
    }

    return (
        <div>
            {state.wallet.isConnected ? (
                <DashboardScreen {...passProps} />
            ) : (
                <LandingScreen {...passProps} />
            )}

            <Modal open={Boolean(state.modal)} onClose={handleCloseModal}>
                {state.modal &&
                    React.createElement(modals[state.modal], passProps)}
            </Modal>
        </div>
    );
}
