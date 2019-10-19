import React from 'react';
import { PuzzleTokenType } from '../types';
import PuzzleToken from './PuzzleToken';
import PuzzleButton from './PuzzleButton';
// import "./PuzzleConfigurator.css";
// import cn from "classnames";
// import PropTypes from "prop-types$";

export const PuzzleInput = ({ label, token }: { token: PuzzleTokenType }) => {
    return (
        <section className="puzzle-input">
            <div className="puzzle-input__headline">
                <span>{label}</span>
            </div>
            {token ? (
                <PuzzleToken token={token} draggable />
            ) : (
                <div className="puzzle-input__droparea">
                    <span>Select position</span>
                </div>
            )}
        </section>
    );
};

export default function PuzzleConfigurator({ longToken, shortToken, ...pass }) {
    const hasBothTokens = longToken && shortToken;
    const handleBundle = () => {};
    return (
        <div className="puzzle-configurator" {...pass}>
            <PuzzleInput label="Long position" token={longToken} />
            <div className="puzzle-configurator__button">
                <PuzzleButton
                    onClick={handleBundle}
                    disabled={!hasBothTokens}
                />
            </div>
            <PuzzleInput label="Short position" token={shortToken} />
        </div>
    );
}
