import React from 'react';
import TokenIcon from './TokenIcon';
// import "./TokenPrice.css";
// import cn from "classnames";
// import PropTypes from "prop-types$";

export default function TokenPrice({ type, currency, price }) {
    return (
        <div className="token-price">
            <TokenIcon tokenCurrency={type} />
            <span className="token-price__label">
                {type} / {currency}
            </span>
            <span className="token-price__value">
                {currency} {price}
            </span>
        </div>
    );
}
