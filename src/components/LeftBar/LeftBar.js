import React, { useState } from "react";
import "./LeftBar.css";

const LeftBar = ({ onGridSizeChange, onDifficultyChange, difficulty }) => {
    const [hoveredDifficulty, setHoveredDifficulty] = useState(null);
    const [selectedGridSize, setSelectedGridSize] = useState(4);

    const [isGameStarted, setIsGameStarted] = useState(false);

    const startGame = () => {
        setIsGameStarted(true);
    };

    const handleHover = (level) => {
        setHoveredDifficulty(level);
    };

    const handleGridSizeChange = (size) => {
        setSelectedGridSize(size);
        onGridSizeChange(size);
    };

    const difficulties = [
        { level: 1, name: "Easy" },
        { level: 2, name: "Medium" },
        { level: 3, name: "Hard" },
    ];

    return (
        <div className="left-bar">
            <h2>Settings</h2>

            <div className="grid-size">
                <h3>Grid Size</h3>
                <div className="grid-buttons">
                    <button
                        className={selectedGridSize === 4 ? "active" : ""}
                        onClick={() => handleGridSizeChange(4)}
                    >
                        4x4
                    </button>
                    <button
                        className={selectedGridSize === 8 ? "active" : ""}
                        onClick={() => handleGridSizeChange(8)}
                    >
                        8x8
                    </button>
                    {/* <button
                        className={selectedGridSize === 16 ? "active" : ""}
                        onClick={() => handleGridSizeChange(16)}
                    >
                        16x16
                    </button> */}
                    {/* <button
                        className={selectedGridSize === 32 ? "active" : ""}
                        onClick={() => handleGridSizeChange(32)}
                    >
                        32x32
                    </button> */}
                </div>
            </div>

            <div className="difficulty">
                <h3>Difficulty</h3>
                <div className="difficulty-buttons">
                    {difficulties.map((diff) => (
                        <div
                            key={diff.level}
                            className={`difficulty-button ${difficulty === diff.level ? "active" : ""}`}
                            onClick={() => onDifficultyChange(diff.level)}
                            onMouseEnter={() => handleHover(diff.level)}
                            onMouseLeave={() => handleHover(null)}
                        >
                            <span>{diff.level}</span>
                            {hoveredDifficulty === diff.level && (
                                <span className="difficulty-name">{diff.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* <button className="play-button" onClick={startGame}>Play</button> */}
        </div>
    );
};

export default LeftBar;
