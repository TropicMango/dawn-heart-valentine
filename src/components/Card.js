import React from "react";
import "./Card.css"; // New CSS file for card-specific styles

const Card = ({ card, onCardClick }) => {
  return (
    <div className={`card ${card.isFlipped || card.isMatched ? "flipped" : ""}`} onClick={() => onCardClick(card.id)}>
      <div className="card-inner">
        <div className="card-front">
          {/* Front side (hidden side) */}
          ?
        </div>
        <div className="card-back">
          {/* Back side (revealed side) */}
          {card.type}
        </div>
      </div>
    </div>
  );
};

export default Card;
