import React from 'react';
// import cn from "classnames";
import { createBundleDetail } from '../library/bundle';

export default function BundleDetail({ bundle = {} }) {
    // console.log(bundle);
    const detail = createBundleDetail(bundle);
    return (
        <div className="bundle-detail">
            <div className="bundle-detail__line">
                <div className="bundle-detail__label">
                    Accrued long position yield
                </div>
                <div className="bundle-detail__value">
                    {detail.longPositionYield || '-'}
                </div>
            </div>
            <div className="bundle-detail__line">
                <div className="bundle-detail__label">
                    Accrued short position cost
                </div>
                <div className="bundle-detail__value">
                    {detail.shortPositionCost || '-'}
                </div>
            </div>
            <div className="bundle-detail__line">
                <div className="bundle-detail__label">
                    Total cost to unbundle
                </div>
                <div className="bundle-detail__value">
                    {detail.unbundleCost || '-'}
                </div>
            </div>
        </div>
    );
}
