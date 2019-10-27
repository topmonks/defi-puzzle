import React from 'react';

const icons = {
    DAI: require('../assets/icon-dai.svg').default,
    ETH: require('../assets/icon-eth.svg').default,
};

const tokenTypeFromCurrency = currency => {
    if (currency.endsWith('ETH')) return 'ETH';
    if (currency.endsWith('DAI')) return 'DAI';
};

export default function TokenIcon({ tokenCurrency }) {
    const type = tokenTypeFromCurrency(tokenCurrency);
    const Icon = icons[type];
    return <Icon className="token-icon" />;
}
