import React from "react";

const RevealArea = ({ revealedWords }) => {
  return (
    <div className="reveal-area">
      <h2>My Message So Far:</h2>
      <div className="revealed-words">
        {revealedWords.map((word, index) => (
          <span key={index} className="revealed-word">
            {word}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RevealArea;
