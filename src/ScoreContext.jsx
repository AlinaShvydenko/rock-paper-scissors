import React, { createContext, useReducer, useContext, useEffect } from 'react';

const ScoreContext = createContext();

function scoreReducer(state, action) {
  switch (action.type) {
    case 'PLAYER_WIN':
      return { ...state, playerWins: state.playerWins + 1 };
    case 'COMPUTER_WIN':
      return { ...state, computerWins: state.computerWins + 1 };
    case 'DRAW':
      return { ...state, draws: state.draws + 1 };
    default:
      return state;
  }
}

const initialState = { playerWins: 0, computerWins: 0, draws: 0 };

export function ScoreProvider({ children }) {
  const [score, dispatch] = useReducer(scoreReducer, initialState, init => {
    const saved = localStorage.getItem('rps_score');
    return saved ? JSON.parse(saved) : init;
  });

  useEffect(() => {
    localStorage.setItem('rps_score', JSON.stringify(score));
  }, [score]);

  return (
    <ScoreContext.Provider value={{ score, dispatch }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  return useContext(ScoreContext);
}
