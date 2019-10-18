import React from 'react';

const icons = {
    DAI: require('../assets/icon-dai.svg'),
    ETH: require('../assets/icon-eth.svg'),
};
// import "./TokenIcon.css";
// import cn from "classnames";
// import PropTypes from "prop-types$";

const tokenTypeFromCurrency = currency => {
    if (currency.endsWith('ETH')) return 'ETH';
    if (currency.endsWith('DAI')) return 'DAI';
};

export default function TokenIcon({ tokenCurrency }) {
    const type = tokenTypeFromCurrency(tokenCurrency);

    return (
        <div className="token-icon">
            <img width="24px" height="24px" src={icons[type]} alt={type} />
        </div>
    );
}
