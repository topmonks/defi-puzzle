import React from 'react';
import Headline from '../components/Headline';
import Button from '../components/Button';
import icon from '../assets/icon-check.svg';

export default function BundledModal({ dispatch }) {
    const handleClose = () => {
        dispatch('ChangeModal', null);
    };
    return (
        <div className="bundle-modal">
            <div className="bundle-modal__success-icon">
                <img src={icon} alt="success" />
            </div>
            <Headline modal>Bundling completed!</Headline>
            <p>
                Your bundle is created and saved. You created bundle of{' '}
                <span className="color-long">183.13 L-DAI</span> and{' '}
                <span className="color-short">1 S-ETH</span>.
            </p>
            <div className="bundle-modal__bottom">
                <Button onClick={handleClose} secondary>
                    Yaaay
                </Button>
            </div>
        </div>
    );
}
