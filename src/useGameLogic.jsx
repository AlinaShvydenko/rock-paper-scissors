import { useReducer } from 'react';

const MOVES = ['rock', 'paper', 'scissors'];

const initialState = {
  playerMove: null,
  computerMove: null,
  result: null
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'PLAY':
      const player = action.move;
      const computer = MOVES[Math.floor(Math.random() * MOVES.length)];
      const result = determineWinner(player, computer);
      return {
        playerMove: player,
        computerMove: computer,
        result: result
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function determineWinner(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'player';
  } else {
    return 'computer';
  }
}

export function useGameLogic() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const play = (move) => {
    dispatch({ type: 'PLAY', move });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return { state, play, reset };
}
