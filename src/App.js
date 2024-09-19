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
  const [gridSize, setGridSize] = useState(4); // Размер сетки по умолчанию 4x4
  const [difficulty, setDifficulty] = useState(1); // Уровень сложности по умолчанию 1
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null); // Таймер

  useEffect(() => {
    const animationDuration = 4500; // Длительность анимации в миллисекундах

    const routerTimeout = setTimeout(() => {
      setShowRouter(true);
    }, animationDuration); // Задержка перед показом роутера равна длительности анимации

    return () => {
      clearTimeout(routerTimeout);
    };
  }, []);

  // Установка времени на основе сложности
  useEffect(() => {
    if (difficulty === 2) {
      setTimeRemaining(120); // 2 минуты для уровня сложности 2
    } else if (difficulty === 3) {
      setTimeRemaining(60); // 1 минута для уровня сложности 3
    } else {
      setTimeRemaining(null); // Без таймера для уровня сложности 1
    }
  }, [difficulty]);

  const startGame = () => {
    setIsGameStarted(true);
  };

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
