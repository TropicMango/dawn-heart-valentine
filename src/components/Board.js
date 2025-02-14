import React from "react";
import Card from "./Card";
import "../App.css"; // for basic styling

const Board = ({ deck, onCardClick }) => {
  return (
    <div className="board">
      {deck.map((card) => (
        <Card key={card.id} card={card} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

export default Board;
