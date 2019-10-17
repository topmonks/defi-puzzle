import React from 'react';
import cn from 'classnames';
import { WALLET_NAMES } from '../library/wallet';

const logos = {
    metamask: require('../assets/logo-metamask.svg'),
    ledger: require('../assets/logo-ledger.svg'),
    trezor: require('../assets/logo-trezor.svg'),
};

export default function WalletIcon({ type, active, size = 24 }) {
    const [width, height] = [size, size].map(x => x + 'px');
    return (
        <span
            className={cn(
                'wallet-icon',
                `wallet-icon--${type}`,
                !active && 'wallet-icon--inactive',
            )}
        >
            <img
                className={cn(
                    'wallet-icon__image',
                    !active && 'wallet-icon__image--inactive',
                )}
                src={logos[type]}
                alt={WALLET_NAMES[type]}
                width={width}
                height={height}
            />
        </span>
    );
}
