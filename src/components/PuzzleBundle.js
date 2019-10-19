import React from 'react';
import TokenIcon from './TokenIcon';

// import cn from "classnames";
// import PropTypes from "prop-types";

export default function PuzzleBundle({ tokens }) {
    return (
        <div className="puzzle-bundle">
            {tokens.map(token => (
                <div className="puzzle-bundle__token" key={token.currency}>
                    <TokenIcon tokenCurrency={token.currency} />
                    <span className="puzzle-bundle__token__amount">
                        {token.amount}
                    </span>
                    <span className="puzzle-bundle__token__currency">
                        {token.currency}
                    </span>
                </div>
            ))}
        </div>
    );
}
