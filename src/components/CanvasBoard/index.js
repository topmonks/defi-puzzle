import React from 'react';
import './CanvasBoard.css';
import { isBundle } from '../../library/puzzle';
import TokenPuzzle from '../TokenPuzzle';
import BundlePuzzle from '../BundlePuzzle';

export default function CanvasBoard({ contents = [] }) {
    return (
        <div className="CanvasBoard">
            {contents.map(item =>
                isBundle(item) ? (
                    <BundlePuzzle
                        key={item.id}
                        {...item}
                        className="CanvasBoard__Puzzle"
                    />
                ) : (
                    <TokenPuzzle
                        key={item.id}
                        {...item}
                        className="CanvasBoard__Puzzle"
                    />
                ),
            )}
        </div>
    );
}
