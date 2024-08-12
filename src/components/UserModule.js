import React, { useState } from 'react';
import { useFlashcards } from '../contexts/FlashcardContext';


function UserModule() {
  const { flashcards } = useFlashcards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="user-module">
      <h1>Flashcard Viewer</h1>
      <div className="flashcard">
        <div className="flashcard-content" onClick={handleFlip}>
          {flipped ? currentCard.answer : currentCard.question}
        </div>
      </div>
      <div className="flashcard-navigation">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default UserModule;





