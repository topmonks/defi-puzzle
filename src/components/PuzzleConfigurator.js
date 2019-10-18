import React from 'react';
// import "./PuzzleConfigurator.css";
// import cn from "classnames";
// import PropTypes from "prop-types$";

export const PuzzleButton = ({ onClick }) => (
    <div className="puzzle-button">
        <button onClick={onClick} />
    </div>
);

export const PuzzleInput = ({ label }) => (
    <section className="puzzle-input">
        <div className="puzzle-input__headline">
            <span>{label}</span>
        </div>
        <div className="puzzle-input__droparea">
            <span>Select position</span>
        </div>
    </section>
);

export default function PuzzleConfigurator({ prop }) {
    const handleBundle = () => {};
    return (
        <div className="puzzle-configurator">
            <PuzzleInput label="Long position" />
            <PuzzleButton onClick={handleBundle} />
            <PuzzleInput label="Short position" />
        </div>
    );
}
