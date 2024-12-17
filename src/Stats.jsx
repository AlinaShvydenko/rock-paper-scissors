import React from 'react';
import { useScore } from './ScoreContext';

export default function Stats() {
  const { score } = useScore();

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Player Wins</h3>
        <div className="stat-icon">🏆</div>
        <p>{score.playerWins}</p>
      </div>
      <div className="stat-card">
        <h3>Computer Wins</h3>
        <div className="stat-icon">💻</div>
        <p>{score.computerWins}</p>
      </div>
      <div className="stat-card">
        <h3>Draws</h3>
        <div className="stat-icon">🤝</div>
        <p>{score.draws}</p>
      </div>
    </div>
  );
}
