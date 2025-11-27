import React, { useState, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import ControlPanel from './components/ControlPanel';
import GameOverModal from './components/GameOverModal';
import StartGameModal from './components/StartGameModal';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState('Medium');
  const [gameState, setGameState] = useState('idle'); // idle, playing, finished
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const getSpeed = (diff) => {
    switch (diff) {
      case 'Easy': return 2;
      case 'Medium': return 5;
      case 'Hard': return 10;
      case 'Impossible': return 25;
      default: return 5;
    }
  };

  const startGame = (selectedDifficulty) => {
    if (selectedDifficulty) setDifficulty(selectedDifficulty);
    setScore(0);
    setTimeLeft(60);
    setGameState('playing');
  };

  const endGame = () => {
    setGameState('finished');
  };

  const handleRestartGame = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setScore(0);
    setTimeLeft(60);
    setGameState('playing');
  };

  const handleScore = (points) => {
    if (gameState === 'playing') {
      setScore(prev => prev + points);
    }
  };

  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  return (
    <div className="App" style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <GameCanvas
        ballCount={10}
        ballSize={100}
        ballSpeed={getSpeed(difficulty)}
        isPlaying={gameState === 'playing'}
        onScore={handleScore}
      />
      <ControlPanel
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        gameState={gameState}
        score={score}
        timeLeft={timeLeft}
        onStart={startGame}
      />
      {gameState === 'idle' && (
        <StartGameModal
          onStart={startGame}
          initialDifficulty={difficulty}
        />
      )}
      {gameState === 'finished' && (
        <GameOverModal
          score={score}
          difficulty={difficulty}
          onPlayAgain={handleRestartGame}
        />
      )}
    </div>
  );
}

export default App;
