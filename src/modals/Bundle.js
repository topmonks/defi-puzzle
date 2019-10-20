import React from 'react';
import LoaderIndicator from '../components/Loader';
import Headline from '../components/Headline';
import Button from '../components/Button';
// import "./BundleTransaction.css";
// import cn from "classnames";
// import PropTypes from "prop-types$";

export default function BundleModal({ dispatch }) {
    const transactionId = '1234587'; // should be a hash
    const handleRefresh = () => {
        dispatch('RefreshBundling');
    };
    return (
        <div className="bundle-modal">
            <LoaderIndicator />
            <Headline modal>Waiting for confirmation</Headline>
            <p>
                Awesome! Your bundle is preparing, please wait a few moments. In
                the meanwhile, check your transaction on{' '}
                <a href={`https://etherscan.io/tx/${transactionId}`}>
                    Etherscan with ID {transactionId}
                </a>
                .
            </p>
            <Button onClick={handleRefresh}>Refresh</Button>
        </div>
    );
}
