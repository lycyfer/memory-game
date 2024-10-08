import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Tile from "../tile/tile";
import { selectTile, initGame, resetTiles } from "../../redux/actions";

const Home = ({ rows, cols, difficulty, timeRemaining, onBackToMain }) => {
    const tiles = useSelector((state) => state.tiles);
    const selectedTiles = useSelector((state) => state.selectedTiles);
    const matchedTiles = useSelector((state) => state.matchedTiles);
    const dispatch = useDispatch();

    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timeRemaining);
    const [showVictory, setShowVictory] = useState(false);
    const [showDefeat, setShowDefeat] = useState(false);
    const [isComparing, setIsComparing] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);

    // Инициализация игры
    useEffect(() => {
        dispatch(initGame(rows));
        setShowVictory(false);
        setShowDefeat(false);
        setNotificationVisible(false);
    }, [dispatch, rows]);

    // Таймер для игры
    useEffect(() => {
        if (difficulty > 1 && timeLeft > 0 && !gameOver) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else if (timeLeft === 0 && !gameOver) {
            setShowDefeat(true);
            setGameOver(true);
            setTimeout(() => setNotificationVisible(true), 100);
        }
    }, [difficulty, timeLeft, gameOver]);

    // Обработка выбора плиток
    useEffect(() => {
        if (selectedTiles.length === 2 && !isComparing) {
            setIsComparing(true);
            const [firstTile, secondTile] = selectedTiles;

            if (tiles[firstTile].color !== tiles[secondTile].color) {
                setTimeout(() => {
                    dispatch(resetTiles());
                    setIsComparing(false);
                }, 1000);
            } else {
                setIsComparing(false);
            }
        }
    }, [selectedTiles, dispatch, tiles, isComparing]);

    // Проверка на завершение игры (все плитки найдены)
    useEffect(() => {
        if (matchedTiles.length === tiles.length && tiles.length > 0) {
            setShowVictory(true);
            setGameOver(true);
            setTimeout(() => setNotificationVisible(true), 100);
        }
    }, [matchedTiles, tiles]);

    // Обработчик для новой игры
    const handleNewGame = () => {
        setShowVictory(false);
        setShowDefeat(false);
        setGameOver(false);
        setNotificationVisible(false);
        onBackToMain(); // Возвращаем пользователя на главный экран
    };

    return (
        <div className={`home-container ${showVictory || showDefeat ? "game-over" : ""}`}>
            {showVictory && (
                <div className={`notification victory ${notificationVisible ? 'show' : ''}`}>
                    <p>Victory! You matched all the tiles!</p>
                </div>
            )}
            {showDefeat && (
                <div className={`notification defeat ${notificationVisible ? 'show' : ''}`}>
                    <p>Time's up! You lost the game.</p>
                </div>
            )}

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
                                onClick={() => !isComparing && dispatch(selectTile(index))}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {(gameOver || showVictory || showDefeat) && (
                <button className="new-game-btn" onClick={handleNewGame}>
                    New Game
                </button>
            )}
        </div>
    );
};

export default Home;
