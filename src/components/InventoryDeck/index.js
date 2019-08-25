import React from 'react';
import './InventoryDeck.css';
import { isBundle } from '../../library/puzzle';
import TokenPuzzle from '../TokenPuzzle';
import BundlePuzzle from '../BundlePuzzle';

export default function InventoryDeck({ inventory = [] }) {
    console.log(inventory);
    return (
        <div className="InventoryDeck">
            {inventory.map(item =>
                isBundle(item) ? (
                    <BundlePuzzle
                        key={item.id}
                        {...item}
                        className="InventoryDeck__Puzzle"
                    />
                ) : (
                    <TokenPuzzle
                        key={item.id}
                        {...item}
                        className="InventoryDeck__Puzzle"
                    />
                ),
            )}
        </div>
    );
}
