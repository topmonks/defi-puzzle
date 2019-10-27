import React from 'react';
import Headline from '../components/Headline';
import Button from '../components/Button';
import IconCheck from '../assets/icon-check.svg';
import IconPuzzle from '../assets/icon-puzzle.svg';
import LoaderIndicator from '../components/Loader';

export default function BundleModal({ dispatch, modal: { bundle, tokens } }) {
    const [shortToken, longToken] = [
        tokens.find(({ type }) => type === 'short'),
        tokens.find(({ type }) => type === 'long'),
    ];

    const handleClose = () => {
        dispatch('ChangeModal', null);
    };

    // Means confirm
    if (!bundle && tokens) {
        return <ConfirmState tokens={tokens || bundle.tokens} />;
    }

    // const handleRefresh = () => {};

    return <SuccessState {...{ longToken, shortToken, handleClose }} />;
}

const ConfirmState = ({ tokens }) => (
    <div className="bundle-modal">
        <div className="bundle-modal__icon">
            <IconPuzzle />
        </div>
        <Headline modal>Are you sure you want to bundle this?</Headline>
    </div>
);

const PendingState = ({ txHash, onRefresh }) => (
    <div className="bundle-modal">
        <LoaderIndicator />
        <Headline modal>Waiting for confirmation</Headline>
        <p>
            Awesome! Your bundle is preparing, please wait a few moments. In the
            meanwhile, check your transaction on{' '}
            <a href={`https://etherscan.io/tx/${txHash}`}>
                Etherscan with ID {txHash}
            </a>
            .
        </p>
        <div className="bundle-modal__bottom">
            <Button onClick={onRefresh}>Refresh</Button>
        </div>
    </div>
);

const SuccessState = ({ longToken, shortToken, handleClose }) => (
    <div className="bundle-modal bundle-modal--success">
        <div className="bundle-modal__icon bundle-modal__icon--success">
            <IconCheck width="24px" height="24px" />
        </div>
        <Headline modal>Bundling completed!</Headline>
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
        <div className="bundle-modal__bottom">
            <Button onClick={handleClose} secondary>
                Yaaay
            </Button>
        </div>
    </div>
);
