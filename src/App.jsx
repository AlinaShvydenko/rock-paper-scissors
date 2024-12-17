import React, { Suspense, lazy, useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { ScoreProvider, useScore } from './ScoreContext';
import { useGameLogic } from './useGameLogic';
import MoveButton from './MoveButton';
import './App.css';

const Stats = lazy(() => import('./Stats'));

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const { dispatch } = useScore();
  const { state, play, reset } = useGameLogic();
  const [showStats, setShowStats] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const moveIcons = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
  };

  useEffect(() => {
    if (!state.result) return;
    if (state.result === 'player') {
      dispatch({ type: 'PLAYER_WIN' });
    } else if (state.result === 'computer') {
      dispatch({ type: 'COMPUTER_WIN' });
    } else if (state.result === 'draw') {
      dispatch({ type: 'DRAW' });
    }
  }, [state.result, dispatch]);

  const handlePlay = (move) => {
    if (state.result) {
      reset();
      setAnimationKey(prev => prev + 1);
    }
    play(move);
  };

  return (
    <div className={`app-container ${theme}-mode`}>
      <div className="card">
        <h1 className="app-title">Rock-Paper-Scissors</h1>
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>

        <h2 className="subtitle">Make Your Move</h2>
        <div className="moves">
          <MoveButton move="rock" onClick={handlePlay} />
          <MoveButton move="paper" onClick={handlePlay} />
          <MoveButton move="scissors" onClick={handlePlay} />
        </div>

        {state.result && (
          <div 
            key={animationKey} 
            className={`result-banner result-${state.result} animate`}
          >
            {state.result === 'player' && <h3 className="result-text">🎉 You Win! 🎉</h3>}
            {state.result === 'computer' && <h3 className="result-text">😢 You Lose! 😢</h3>}
            {state.result === 'draw' && <h3 className="result-text">🤝 It’s a Draw! 🤝</h3>}
          </div>
        )}

        {(state.playerMove || state.computerMove) && (
          <div className="chosen-lines">
            {state.playerMove && (
              <p>👱 picked {moveIcons[state.playerMove]}</p>
            )}
            {state.computerMove && (
              <p>💻 picked {moveIcons[state.computerMove]}</p>
            )}
          </div>
        )}

        <button className="show-stats-button" onClick={() => setShowStats(s => !s)}>
          {showStats ? 'Hide Stats' : 'Show Stats'}
        </button>

        {showStats && (
          <Suspense fallback={<div className="loading">Loading stats...</div>}>
            <Stats />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ScoreProvider>
        <AppContent />
      </ScoreProvider>
    </ThemeProvider>
  );
}
