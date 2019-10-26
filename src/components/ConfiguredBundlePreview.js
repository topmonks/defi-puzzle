import React, { useMemo } from 'react';
import Headline from './Headline';
// import cn from "classnames";
import { createBundlePreview } from '../library/bundle';

const lines = [
    { label: 'Position', key: 'position' },
    { label: 'Leverage', key: 'leverage' },
    { label: 'Net value of the bundle', key: 'netValue' },
    {
        label: 'Collateralization ratio (this bundle)',
        key: 'bundleCollatRatio',
    },
    {
        label: 'Collateralization ratio (account total)',
        key: 'walletCollatRatio',
    },
    { label: 'Required collateralization ratio', key: 'collatRequired' },
    { label: 'Long position yield', key: 'longYield' },
    { label: 'Short position cost', key: 'shortCost' },
];

export default function ConfiguredBundlePreview({
    bundleTokens,
    walletTokens,
    prices,
    pricesCurrency,
    compoudRates,
}) {
    const detail = useMemo(() => {
        return createBundlePreview(
            { bundleTokens, walletTokens },
            { prices, pricesCurrency, compoudRates },
        );
    }, [bundleTokens, walletTokens, prices, pricesCurrency, compoudRates]);

    return (
        <div className="configured-bundle-preview">
            <Headline>This bundle represents</Headline>
            <table>
                <tbody>
                    {lines.map(({ label, key }) => (
                        <tr key={key}>
                            <th>{label}</th>
                            <td>{detail?.[key] || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
