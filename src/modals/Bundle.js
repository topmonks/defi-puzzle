import React from 'react';
import Headline from '../components/Headline';
import Button from '../components/Button';
import IconCheck from '../assets/icon-check.svg';
import IconPuzzle from '../assets/icon-puzzle.svg';
import LoaderIndicator from '../components/Loader';
import cn from 'classnames';
import PuzzleToken from '../components/PuzzleToken';

export default function BundleModal({ dispatch, modal: { bundle, tokens } }) {
    const [shortToken, longToken] = [
        tokens.find(({ type }) => type === 'short'),
        tokens.find(({ type }) => type === 'long'),
    ];

    const closeModal = () => {
        dispatch('ChangeModal', null);
    };

    let [confirm, pending, success] = [!bundle && tokens, false, false];

    const txHash = null;

    // return <SuccessState {...{ longToken, shortToken, handleClose }} />;

    return (
        <div className={cn('bundle-modal', success && 'bundle-modal--success')}>
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

                    {!pending && !success && <IconPuzzle />}
                </div>
            )}

            <Headline modal>
                {confirm && 'Are you sure you want to bundle this?'}
                {pending && 'Waiting for confirmation'}
                {success && 'Bundling is confimed successfully.'}
            </Headline>
            <div className="bundle-modal__tokens">
                <PuzzleToken token={longToken} simple />
                <PuzzleToken token={shortToken} simple />
            </div>
            {pending && (
                <p>
                    Awesome! Your bundle is preparing, please wait a few
                    moments. In the meanwhile, check your transaction on{' '}
                    <a href={`https://etherscan.io/tx/${txHash}`}>
                        Etherscan with ID {txHash}
                    </a>
                    .
                </p>
            )}
            {success && (
                <p>
                    Your bundle is created and saved. <br />
                    You created bundle of{' '}
                    <span className="color-long">
                        {longToken.amount} {longToken.currency}
                    </span>{' '}
                    and{' '}
                    <span className="color-short">
                        {shortToken.amount} {shortToken.currency}
                    </span>
                    .
                </p>
            )}
            {confirm && (
                <div className="bundle-modal__bottom">
                    <Button onClick={closeModal} simple secondary>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            // confirm
                            console.warn('Not implemented yet');
                        }}
                    >
                        Bundle positions
                    </Button>
                </div>
            )}
            {pending && (
                <div className="bundle-modal__bottom">
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
                    <Button onClick={closeModal} secondary>
                        Yaaay
                    </Button>
                </div>
            )}
        </div>
    );
}
