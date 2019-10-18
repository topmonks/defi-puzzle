import React from 'react';
import { PuzzleTokenType } from '../types';
// import "./PuzzleToken.css";
import cn from 'classnames';
import TokenIcon from './TokenIcon';
// import PropTypes from "prop-types$";

const hack = fn => setTimeout(fn, 0);

export default function PuzzleToken({
    token,
    draggable,
    deletable,
    ...pass
}: {
    token: PuzzleTokenType,
}) {
    const handleDragStart = ({ dataTransfer, target }) => {
        const serializedToken = JSON.stringify(token);
        dataTransfer.setData('token', serializedToken);
        target.classList.add('puzzle-token--dragging');

        hack(() => {
            target.style.opacity = 0.6;
            (target.querySelector('.puzzle-token__amount') || {}).innerText = 0;
        });
    };
    const handleDragEnd = ({ target }) => {
        target.classList.remove('puzzle-token--dragging');
        hack(() => {
            target.style.opacity = 1;
            (target.querySelector('.puzzle-token__amount') || {}).innerText =
                token.amount;
        });
    };
    return (
        <div
            draggable={draggable && 'true'}
            onDragStart={draggable && handleDragStart}
            onDragEnd={draggable && handleDragEnd}
            className={cn(
                'puzzle-token',
                `puzzle-token--${token.type}`,
                draggable && 'puzzle-token--draggable',
                deletable && 'puzzle-token--deletable',
                pass.className,
            )}
            {...pass}
        >
            <span className="puzzle-token__icon">
                <TokenIcon
                    key="token.currency"
                    tokenCurrency={token.currency}
                />
            </span>
            <span className="puzzle-token__amount">{token.amount}</span>
            <span className="puzzle-token__currency">{token.currency}</span>
        </div>
    );
}
