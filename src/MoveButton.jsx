import React from 'react';

const moveIcons = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️'
};

function MoveButton({ move, onClick }) {
  return (
    <button className="move-button" onClick={() => onClick(move)}>
      <span className="move-icon">{moveIcons[move]}</span>
      <span className="move-label">{move.charAt(0).toUpperCase() + move.slice(1)}</span>
    </button>
  );
}

export default React.memo(MoveButton);
