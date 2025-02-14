import React, { useState, useEffect } from "react";

const RevealArea = ({ revealedWords }) => {
  const [finalWords, setFinalWords] = useState(revealedWords);
  const [showTransition, setShowTransition] = useState(false); // Controls fade effect
  const [swapped, setSwapped] = useState(false); // Prevents multiple swaps

  useEffect(() => {
    if (revealedWords.length === 4) {

      if (!swapped) {
        setFinalWords(revealedWords); // Show original order
        // setShowTransition(true); // Start fade-out
        setTimeout(() => {
          setFinalWords(["I", "Fucking", "Love", "You"]); // Swap the order
          // setShowTransition(false); // Fade back in
          setSwapped(true); // Prevent further swaps
        }, 1000); // 1-second delay before swapping
      } else {
        setFinalWords(["I", "Fucking", "Love", "You"]); // Swap the order
      }
    } else {
      setFinalWords(revealedWords); // Normal updates
    }
  }, [revealedWords, swapped]);

  return (
    <div className="reveal-area">
      <h2>My Message So Far:</h2>
      <div className={`revealed-words ${showTransition ? "fade-out" : "fade-in"}`}>
        {finalWords.map((word, index) => (
          <span key={index} className="revealed-word">
            {word}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RevealArea;
