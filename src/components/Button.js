import React from 'react';
import cn from 'classnames';

export default function Button({
    primary = true,
    secondary,
    loading = false,
    children,
    onClick,
    className,
}) {
    const handleClick = onClick;
    return (
        <button
            onClick={handleClick}
            className={cn(
                'button',
                primary && 'button--primary',
                secondary && 'button--secondary',
                loading && 'button--loading',
                className,
            )}
        >
            {children}
        </button>
    );
}
