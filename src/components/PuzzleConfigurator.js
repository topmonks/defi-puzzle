import React from 'react';
import { PuzzleTokenType } from '../types';
import PuzzleToken from './PuzzleToken';
import PuzzleButton from './PuzzleButton';
import cn from 'classnames';
// import PropTypes from "prop-types$";

export const PuzzleInput = ({
    label,
    token,
    onTokenRemove,
    onTokenChange,
    disabled,
    highlight,
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
                <div
                    className={cn(
                        'puzzle-input__headline__remove',
                        !token && 'input__headline__remove--inactive',
                    )}
                >
                    <button onClick={handleRemove} disabled={!token}>
                        remove
                    </button>
                </div>
            </div>
            <div
                className={cn(
                    'puzzle-input__droparea',
                    highlight && 'puzzle-input__droparea--highlighted',
                )}
            >
                {token ? (
                    <PuzzleToken
                        token={token}
                        onTokenChange={onTokenChange}
                        editable
                        fixed={disabled}
                    />
                ) : (
                    <span>Select position</span>
                )}
            </div>
        </section>
    );
};

export default function PuzzleConfigurator({
    longToken,
    shortToken,
    onTokenRemove,
    onSubmit,
    onTokenChange,
    fromTemplate,
    fromBundle,
    highlightedInputs,
    ...pass
}) {
    const hasBothTokens = longToken && shortToken;
    const longDisabled =
        (fromTemplate && longToken?.assetType === 'stable') || fromBundle;
    const shortDisabled =
        (fromTemplate && shortToken?.assetType === 'stable') || fromBundle;

    return (
        <div className="puzzle-configurator" {...pass}>
            <PuzzleInput
                label="Long position"
                token={longToken}
                onTokenRemove={onTokenRemove}
                onTokenChange={onTokenChange}
                disabled={longDisabled}
                highlight={highlightedInputs.long}
            />
            <div className="puzzle-configurator__button">
                <PuzzleButton
                    onClick={onSubmit}
                    disabled={!hasBothTokens}
                    unbundle={fromBundle}
                />
            </div>
            <PuzzleInput
                label="Short position"
                token={shortToken}
                onTokenRemove={onTokenRemove}
                onTokenChange={onTokenChange}
                disabled={shortDisabled}
                highlight={highlightedInputs.short}
            />
        </div>
    );
}
