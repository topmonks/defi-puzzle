import React from 'react';
import cn from 'classnames';
import IconPuzzle from '../assets/icon-puzzle.svg';
import IconPuzzleUnbundle from '../assets/icon-puzzle-unbundle.svg';

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
            {unbundle ? (
                <IconPuzzleUnbundle className="puzzle-button__icon" />
            ) : (
                <IconPuzzle className="puzzle-button__icon" />
            )}
        </button>
    );
}
