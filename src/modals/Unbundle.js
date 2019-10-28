import React from 'react';
import cn from 'classnames';
import LoaderIndicator from '../components/Loader';
import Headline from '../components/Headline';
import Button from '../components/Button';
import IconCheck from '../assets/icon-check.svg';
import IconPuzzle from '../assets/icon-puzzle.svg';
import BundleDetail from '../components/BundleDetail';
import {createBundleDetail} from "../library/bundle";

export default function UnbundleModal({
    dispatch,
    configuratorBundleUsed,
    prices,
    compoudRates,
    simulation,
}) {
    const [confirm, pending, success] = [true, false, false];

    const closeModal = () => {
        dispatch('ChangeModal', null);
    };

    const detail = createBundleDetail({
      bundle: configuratorBundleUsed,
      simulation,
      compoudRates,
      prices,
    });

    return (
        <div className="bundle-modal">
            <div className="bundle-modal__loader">
                {pending && <LoaderIndicator />}
                <div
                    className={cn(
                        'bundle-modal__icon',
                        success && 'bundle-modal__icon--success',
                    )}
                >
                    {success && <IconCheck width="24px" height="24px" />}
                    {confirm && <IconPuzzle />}
                </div>
            </div>
            <Headline modal>Waiting for confirmation</Headline>
            <p className="bundle-modal__description">Not yet implemented.</p>
            <BundleDetail
                detail={detail}
            />
            <div className="bundle-modal__bottom">
                <Button onClick={closeModal} simple secondary>
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        // dispatch
                        console.warn('Not yet implemented.');
                    }}
                >
                    Unbundle and pay {detail.unbundleCost}
                </Button>
            </div>
        </div>
    );
}
