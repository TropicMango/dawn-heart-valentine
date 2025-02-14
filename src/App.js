import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import RevealArea from "./components/RevealArea";

// Define the four words (each corresponds to a card type)
const cardTypes = ["🍌", "🥭", "🍓", "🍒"]; // Symbols instead of words
const revealedMessage = ["I", "Love", "You", "Fucking"]; // The words to be revealed

const cardsPerType = 4; // 4 cards per type

// Helper function to create and shuffle the deck
const createDeck = () => {
  let deck = [];
  cardTypes.forEach((type) => {
    for (let i = 0; i < cardsPerType; i++) {
      deck.push({
        id: `${type}-${i}-${Math.random()}`,
        type,
        isFlipped: false,
        isMatched: false,
      });
    }
  });
  // return deck;
  return deck.sort(() => Math.random() - 0.5);
};

function App() {
  const [deck, setDeck] = useState([]);
  const [revealedWords, setRevealedWords] = useState([]);

  // Initialize the deck on component mount
  useEffect(() => {
    setDeck(createDeck());
  }, []);

  // Handler for card clicks
  const onCardClick = (cardId) => {
    // Prevent further clicks if 4 unmatched cards are already flipped (waiting to reset)
    const flippedUnmatched = deck.filter(card => card.isFlipped && !card.isMatched);
    if (flippedUnmatched.length === 4) return;

    const newDeck = deck.map((card) => {
      if (card.id === cardId && !card.isFlipped && !card.isMatched) {
        return { ...card, isFlipped: true };
      }
      return card;
    });
    setDeck(newDeck);
  };

  // Use effect to monitor the deck and handle matching/reset logic
  useEffect(() => {
    const flippedUnmatched = deck.filter(card => card.isFlipped && !card.isMatched);
    if (flippedUnmatched.length === 4) {
      const firstType = flippedUnmatched[0].type;
      const allSame = flippedUnmatched.every(card => card.type === firstType);
  
      if (allSame) {
        // Mark all these cards as matched
        const updatedDeck = deck.map(card =>
          card.type === firstType ? { ...card, isMatched: true } : card
        );
        setDeck(updatedDeck);
  
        // Reveal the next word in sequence
        if (revealedWords.length < revealedMessage.length) {
          setRevealedWords(prev => {
            const newReveals = [...prev, revealedMessage[prev.length]]; // Reveal the next word
        
            // If "Fucking" is revealed, insert it correctly
            if (newReveals.includes("Fucking")) {
              let orderedReveals = newReveals.filter(word => word !== "Fucking"); // Remove "Fucking"
              const loveIndex = orderedReveals.indexOf("Love");
              orderedReveals.splice(loveIndex + 1, 0, "Fucking"); // Insert after "Love"
              return orderedReveals;
            }
        
            return newReveals;
          });
        }
      } else {
        // Not a match: reset flipped cards
        setTimeout(() => {
          const resetDeck = deck.map(card =>
            card.isFlipped && !card.isMatched ? { ...card, isFlipped: false } : card
          );
          setDeck(resetDeck);
        }, 1000);
      }
    }
  }, [deck, revealedWords]);  

  return (
    <div className="game">
      <h1>Match the Cards to Reveal My Message!</h1>
      <Board deck={deck} onCardClick={onCardClick} />
      <RevealArea revealedWords={revealedWords} />
    </div>
  );
}

export default App;
