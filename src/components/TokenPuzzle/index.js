import React from 'react';
import classNames from 'classnames';
import './TokenPuzzle.css';

export default function TokenPuzzle({
    clipped = false,
    balance = 0,
    symbol = '?',
    className,
}) {
    return (
        <div
            className={classNames(
                'TokenPuzzle',
                clipped && 'TokenPuzzle--clipped',
                className,
            )}
        >
            <span className="TokenPuzzle__Label">
                {balance} {symbol}
            </span>
        </div>
    );
}
