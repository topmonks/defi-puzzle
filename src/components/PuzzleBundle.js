import React from 'react';
import { BundleType, BundleTemplateType } from '../types';
import TokenIcon from './TokenIcon';

import cn from 'classnames';
import PuzzleButton from './PuzzleButton';
// import PropTypes from "prop-types";

const hack = fn => setTimeout(fn, 0);

export default function PuzzleBundle({
    bundle: { tokens },
    template,
    onHoverChange = () => {},
    draggable,
    onButtonClick,
    onClick,
}: {
    bundle: BundleType | BundleTemplateType,
}) {
    if (template) draggable = true;

    const handleDragStart = ({ dataTransfer, target }) => {
        const serializedBundle = JSON.stringify({ tokens });

        dataTransfer.setData('bundle', serializedBundle);
        if (template) dataTransfer.setData('template', template);

        target.classList.add('puzzle-bundle--dragging');

        hack(() => {
            target.style.opacity = 0.6;
        });
    };
    const handleDragEnd = ({ target }) => {
        target.classList.remove('puzzle-bundle--dragging');
        hack(() => {
            target.style.opacity = 1;
        });
    };
    return (
        <div
            onClick={onClick}
            draggable={draggable && 'true'}
            onDragStart={draggable && handleDragStart}
            onDragEnd={draggable && handleDragEnd}
            className={cn(
                'puzzle-bundle',
                draggable && 'puzzle-bundle--draggable',
                template && 'puzzle-bundle--template',
            )}
            onMouseEnter={() => {
                onHoverChange(true);
            }}
            onMouseLeave={() => {
                onHoverChange(false);
            }}
        >
            <div className="puzzle-bundle__tokens">
                {tokens.map(token => (
                    <div className="puzzle-bundle__token" key={token.currency}>
                        <TokenIcon tokenCurrency={token.currency} />
                        <span className="puzzle-bundle__token__amount">
                            {template
                                ? token.usedAmount.toFixed(2)
                                : (token.amount - token.usedAmount).toFixed(2)}
                        </span>
                        <span className="puzzle-bundle__token__currency">
                            {token.currency}
                        </span>
                    </div>
                ))}
            </div>
            {!template && <PuzzleButton active onClick={onButtonClick} />}
        </div>
    );
}
