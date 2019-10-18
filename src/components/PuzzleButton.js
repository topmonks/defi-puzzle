import React from 'react';

export default function PuzzleButton({ onClick }) {
    return (
        <div className="puzzle-button">
            <button onClick={onClick} />
        </div>
    );
}
