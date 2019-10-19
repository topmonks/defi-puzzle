import React from 'react';
import { PuzzleTokenType } from '../types';
import PuzzleToken from './PuzzleToken';
import PuzzleButton from './PuzzleButton';
// import "./PuzzleConfigurator.css";
// import cn from "classnames";
// import PropTypes from "prop-types$";

export const PuzzleInput = ({
    label,
    token,
    onTokenRemove,
}: {
    token: PuzzleTokenType,
}) => {
    const handleRemove = () => {
        onTokenRemove(token);
    };
    return (
        <section className="puzzle-input">
            <div className="puzzle-input__headline">
                <span className="puzzle-input__headline__label">{label}</span>
                <div className="puzzle-input__headline__remove">
                    <button onClick={handleRemove} disabled={!token}>
                        remove
                    </button>
                </div>
            </div>
            {token ? (
                <PuzzleToken token={token} />
            ) : (
                <div className="puzzle-input__droparea">
                    <span>Select position</span>
                </div>
            )}
        </section>
    );
};

export default function PuzzleConfigurator({
    longToken,
    shortToken,
    onTokenRemove,
    ...pass
}) {
    const hasBothTokens = longToken && shortToken;
    const handleBundle = () => {};
    return (
        <div className="puzzle-configurator" {...pass}>
            <PuzzleInput
                label="Long position"
                token={longToken}
                onTokenRemove={onTokenRemove}
            />
            <div className="puzzle-configurator__button">
                <PuzzleButton
                    onClick={handleBundle}
                    disabled={!hasBothTokens}
                />
            </div>
            <PuzzleInput
                label="Short position"
                token={shortToken}
                onTokenRemove={onTokenRemove}
            />
        </div>
    );
}
