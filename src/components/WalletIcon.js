import React from 'react';
import cn from 'classnames';
import { WALLET_NAMES } from '../library/wallet';

const logos = {
    metamask: require('../assets/logo-metamask.svg').default,
    ledger: require('../assets/logo-ledger.svg').default,
    trezor: require('../assets/logo-trezor.svg').default,
};

export default function WalletIcon({ type, active, size = 24 }) {
    const [width, height] = [size, size].map(x => x + 'px');
    const Icon = logos[type];

    return (
        <span
            className={cn(
                'wallet-icon',
                `wallet-icon--${type}`,
                !active && 'wallet-icon--inactive',
            )}
        >
            <Icon
                title={WALLET_NAMES[type]}
                className={cn(
                    'wallet-icon__image',
                    !active && 'wallet-icon__image--inactive',
                )}
                width={width}
                height={height}
            />
        </span>
    );
}
