import React, { useEffect } from 'react';
import cn from 'classnames';

export function Modal({ children, open, onClose }) {
    // Handle esc keypress
    useEffect(() => {
        const handler = ({ key }) => {
            if (key === 'Escape') onClose();
        };

        if (open) {
            window.addEventListener('keyup', handler);
        } else {
            window.removeEventListener('keyup', handler);
        }
    }, [onClose, open]);

    return (
        <div className={cn('modal', open && 'modal--open')}>
            <div className="modal__overlay" onClick={onClose} />
            <div className="modal__content">{children}</div>
        </div>
    );
}
