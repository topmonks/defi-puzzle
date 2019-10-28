import React from 'react';
import cn from 'classnames';
import LoaderIndicator from '../components/Loader';
import Headline from '../components/Headline';
import Button from '../components/Button';
import IconCheck from '../assets/icon-check.svg';
import IconPuzzle from '../assets/icon-puzzle.svg';
import BundleDetail from '../components/BundleDetail';
import { createBundleDetail } from '../library/bundle';
import PuzzleToken from '../components/PuzzleToken';

export default function UnbundleModal({
    dispatch,
    configuratorBundleUsed,

    prices,
    compoudRates,
    simulation,
    unbundling,
    lastUnbundled,
}) {
    const bundle = configuratorBundleUsed || lastUnbundled.bundle;

    const [shortToken, longToken] = [
        bundle.tokens.find(({ type }) => type === 'short'),
        bundle.tokens.find(({ type }) => type === 'long'),
    ];

    const [confirm, pending, success] = [
        !unbundling && !lastUnbundled,
        unbundling,
        !unbundling && Boolean(lastUnbundled),
    ];
    const txHash = '';

    const closeModal = () => {
        dispatch('ChangeModal', null);
    };

    const detail = !configuratorBundleUsed
        ? lastUnbundled.detail
        : createBundleDetail({
              bundle,
              simulation,
              compoudRates,
              prices,
          });

    return (
        <div className="bundle-modal">
            <div className="bundle-modal__loader">
                {pending ? (
                    <LoaderIndicator />
                ) : (
                    <div
                        className={cn(
                            'bundle-modal__icon',
                            success && 'bundle-modal__icon--success',
                        )}
                    >
                        {success && <IconCheck width="24px" height="24px" />}
                        {confirm && <IconPuzzle />}
                    </div>
                )}
            </div>
            {confirm && <Headline modal>Waiting for confirmation</Headline>}
            {pending && <Headline modal>Unbundling</Headline>}
            {success && <Headline modal>Unbundle complete!</Headline>}

            <div className="bundle-modal__tokens">
                <PuzzleToken token={longToken} simple />
                <PuzzleToken token={shortToken} simple />
            </div>

            {pending && (
                <p className="bundle-modal__description">
                    Waiting to process unbundle transaction. In the meanwhile,
                    check your transaction on{' '}
                    <a href={`https://etherscan.io/tx/${txHash}`}>
                        Etherscan with ID {txHash}
                    </a>
                    .
                </p>
            )}
            {(confirm || success) && <BundleDetail detail={detail} />}

            {confirm && (
                <div className="bundle-modal__bottom">
                    <Button onClick={closeModal} simple secondary>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch('Unbundle', detail);
                            console.warn('Not yet implemented.');
                        }}
                    >
                        Unbundle and pay {detail.unbundleCost}
                    </Button>
                </div>
            )}
            {pending && (
                <div className="bundle-modal__bottom">
                    <div />
                    <Button
                        onClick={() => {
                            console.warn('Not implemented yet');
                        }}
                    >
                        Refresh
                    </Button>
                </div>
            )}
            {success && (
                <div className="bundle-modal__bottom">
                    <div />
                    <Button secondary onClick={closeModal}>
                        Back to Dashboard
                    </Button>
                </div>
            )}
        </div>
    );
}
