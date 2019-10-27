import React from 'react';
import cn from 'classnames';
import icon from '../assets/icon-puzzle.svg';
import unbundleIcon from '../assets/icon-puzzle-unbundle.svg';

export default function PuzzleButton({
    onClick,
    disabled,
    active,
    unbundle = false,
}) {
    return (
        <button
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            className={cn(
                'puzzle-button',
                disabled && 'puzzle-button--disabled',
                active && 'puzzle-button--active',
            )}
        >
            <img src={unbundle ? unbundleIcon : icon} alt="puzzle" />
        </button>
    );
}
