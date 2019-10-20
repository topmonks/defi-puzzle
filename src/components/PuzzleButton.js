import React from 'react';
import cn from 'classnames';
import icon from '../assets/icon-puzzle.svg';

export default function PuzzleButton({ onClick, disabled, active }) {
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
            <img src={icon} alt="puzzle" />
        </button>
    );
}
