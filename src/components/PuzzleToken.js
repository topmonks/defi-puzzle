import React, { useState, useEffect } from 'react';
import { PuzzleTokenType } from '../types';
// import "./PuzzleToken.css";
import cn from 'classnames';
import TokenIcon from './TokenIcon';

const hack = fn => setTimeout(fn, 0);

export default function PuzzleToken({
    token,
    draggable,
    deletable,
    onTokenChange,
    editable = Boolean(onTokenChange),
    fixed,
    onHoverChange = isHovered => {},
    ...pass
}: {
    token: PuzzleTokenType,
}) {
    const [amount, setAmount] = useState(token.usedAmount);

    // Update value based on type of token change (token.currency)
    useEffect(() => {
        if (editable) setAmount(token.usedAmount);
    }, [editable, token, token.currency, token.usedAmount]);

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
                token.amount - token.usedAmount;
        });
    };

    const handleAmountChange = ({ target: { value } }) => {
        setAmount(value);
    };

    const handleTokenUpdate = () => {
        const amountAsFloat = parseFloat(amount);

        if (isNaN(amountAsFloat)) {
            setAmount(token.amount);
        } else if (amountAsFloat < 0) {
            setAmount('0');
        } else {
            onTokenChange({ ...token, usedAmount: amountAsFloat });
        }
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
            onMouseEnter={() => {
                onHoverChange(true);
            }}
            onMouseLeave={() => {
                onHoverChange(false);
            }}
        >
            <span className="puzzle-token__icon">
                <TokenIcon
                    key="token.currency"
                    tokenCurrency={token.currency}
                />
            </span>
            {editable && !fixed ? (
                <span className="puzzle-token__amount">
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={amount}
                        onChange={handleAmountChange}
                        onBlur={handleTokenUpdate}
                    />
                </span>
            ) : (
                <span className="puzzle-token__amount">
                    {fixed
                        ? token.usedAmount
                        : (token.amount - token.usedAmount).toFixed(2)}
                </span>
            )}

            <span className="puzzle-token__currency">{token.currency}</span>
        </div>
    );
}
