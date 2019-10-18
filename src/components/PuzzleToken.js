import React from 'react';
import { PuzzleTokenType } from '../types';
// import "./PuzzleToken.css";
import cn from 'classnames';
import TokenIcon from './TokenIcon';
// import PropTypes from "prop-types$";

export default function PuzzleToken({
    token,
    draggable,
}: {
    token: PuzzleTokenType,
}) {
    return (
        <div
            className={cn(
                'puzzle-token',
                `puzzle-token--${token.type}`,
                draggable && 'puzzle-token--draggable',
            )}
        >
            <span className="puzzle-token__icon">
                <TokenIcon
                    key="token.currency"
                    tokenCurrency={token.currency}
                />
            </span>
            <span className="puzzle-token__amount">{token.amount}</span>
            <span className="puzzle-token__currency"> {token.currency}</span>
        </div>
    );
}
