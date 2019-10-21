import React from 'react';
import { BundleType, BundleTemplateType } from '../types';
import TokenIcon from './TokenIcon';

import cn from 'classnames';
// import PropTypes from "prop-types";

const hack = fn => setTimeout(fn, 0);

export default function PuzzleBundle({
    bundle: { tokens },
    template,
}: {
    bundle: BundleType | BundleTemplateType,
}) {
    const draggable = template;
    const handleDragStart = ({ dataTransfer, target }) => {
        const serializedBundle = JSON.stringify({ tokens });

        dataTransfer.setData('bundle', serializedBundle);
        dataTransfer.setData('template', template);

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
            draggable={draggable && 'true'}
            onDragStart={draggable && handleDragStart}
            onDragEnd={draggable && handleDragEnd}
            className={cn(
                'puzzle-bundle',
                draggable && 'puzzle-bundle--draggable',
            )}
        >
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
