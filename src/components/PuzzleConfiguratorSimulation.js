import React, { useState } from 'react';
// import cn from "classnames";

export default function PuzzleConfiguratorSimulation({
    bundle,
    simulation,
    onSimulationChange,
}) {
    const [values, setValues] = useState(simulation);
    const longToken = bundle.tokens.find(({ type }) => type === 'long');
    const shortToken = bundle.tokens.find(({ type }) => type === 'short');

    const longPriceCurrency = longToken.currency.split('-')[1];
    const shortPriceCurrency = shortToken.currency.split('-')[1];

    const handleValueChange = typeName => ({ target: { value } }) => {
        const simulation = { ...values, [typeName]: Number(value) };
        setValues(simulation);
        onSimulationChange(simulation);
    };
    return (
        <div className="puzzle-configuration-simulation">
            <label>
                <span>Elapsed days</span>
                <input
                    type="number"
                    onChange={handleValueChange('elapsedDays')}
                    value={values.elapsedDays}
                />
            </label>
            <label>
                <span>{longPriceCurrency} price</span>
                <input
                    type="number"
                    onChange={handleValueChange('longTokenPrice')}
                    value={values.longTokenPrice}
                />
            </label>
            <label>
                <span>{shortPriceCurrency} price</span>
                <input
                    type="number"
                    onChange={handleValueChange('shortTokenPrice')}
                    value={values.shortTokenPrice}
                />
            </label>
        </div>
    );
}
