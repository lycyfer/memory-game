import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './pages/layout/layout';
import Home from './components/Home/Home';
import LeftBar from './components/LeftBar/LeftBar'; // Импортируем LeftBar
import LogoAnimation from './components/animation/logoAnimation';
import './App.css';

function App() {
  const [showLogoAnimation, setShowLogoAnimation] = useState(true);
  const [showRouter, setShowRouter] = useState(false);
  const [gridSize, setGridSize] = useState(4)
  const [difficulty, setDifficulty] = useState(1)
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const animationDuration = 4500;

    const routerTimeout = setTimeout(() => {
      setShowRouter(true);
    }, animationDuration);

    return () => {
      clearTimeout(routerTimeout);
    };
  }, []);

  useEffect(() => {
    if (difficulty === 2) {
      setTimeRemaining(120);
    } else if (difficulty === 3) {
      setTimeRemaining(60);
    } else {
      setTimeRemaining(null);
    }
  }, [difficulty]);

  const startGame = () => {
    setIsGameStarted(true);
    setGameOver(false)
  };

  const backToMain = () => {
    setIsGameStarted(false);
    setGameOver(true)
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: isGameStarted ? (
            <Home
              rows={gridSize}
              cols={gridSize}
              difficulty={difficulty}
              timeRemaining={timeRemaining}
              onBackToMain={backToMain}
            />
          ) : (
            <div className="game-settings">
              <LeftBar
                onGridSizeChange={setGridSize}
                onDifficultyChange={setDifficulty}
                difficulty={difficulty}
              />
              <button className="play-button" onClick={startGame}>Play</button>
            </div>
          ),
        }
      ]
    }
  ]);

  return (
    <div className='App'>
      {showLogoAnimation && <LogoAnimation />}
      {showRouter && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
