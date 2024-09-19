import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Tile from "../tile/tile";
import { selectTile, initGame, resetTiles } from "../../redux/actions";

const Home = ({ rows, cols, difficulty, timeRemaining }) => {
    const tiles = useSelector((state) => state.tiles);
    const selectedTiles = useSelector((state) => state.selectedTiles);
    const matchedTiles = useSelector((state) => state.matchedTiles);
    const gameOver = useSelector((state) => state.gameOver);
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(timeRemaining);

    useEffect(() => {
        console.log(`Grid Size: ${rows}x${cols}`);
        console.log(`Difficulty: ${difficulty}`);
        console.log(`Time remaining: ${timeRemaining}`);
    }, [rows, cols, difficulty, timeRemaining]);

    useEffect(() => {
        dispatch(initGame(rows)); // Передаем количество строк напрямую
    }, [dispatch, rows]);

    useEffect(() => {
        if (difficulty > 1 && timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [difficulty, timeLeft]);

    useEffect(() => {
        if (selectedTiles.length === 2) {
            const [firstTile, secondTile] = selectedTiles;

            if (tiles[firstTile].color !== tiles[secondTile].color) {
                setTimeout(() => {
                    dispatch(resetTiles());
                }, 1000);
            }
        }
    }, [selectedTiles, dispatch, tiles]);

    return (
        <div className="home">
            {difficulty > 1 && (
                <div className="timer">
                    <div>time</div> <span>{timeLeft}</span>
                </div>
            )}
            <div
                className="tile-container"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
                {tiles.map((tile, index) => (
                    <div key={tile.id} className="tile-wrapper">
                        <Tile
                            color={tile.color}
                            isOpen={tile.isOpen}
                            isMatched={matchedTiles.includes(index)}
                            onClick={() => dispatch(selectTile(index))}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
