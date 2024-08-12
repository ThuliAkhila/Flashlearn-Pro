import React, { useState, useEffect } from 'react';
import './FlashcardViewer.css';

function FlashcardViewer() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/flashcards')
      .then(response => response.json())
      .then(data => setFlashcards(data));
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  if (flashcards.length === 0) {
    return <div className="no-flashcards">No flashcards available</div>;
  }

  return (
    <div className="flashcard-viewer-container">
      <header className="flashcard-header">
        <h1>Flashcard Fun!</h1>
      </header>
      <div className="flashcard-viewer">
        <div className="flashcard" onClick={handleFlip}>
          <div className={`flashcard-content ${isFlipped ? 'flipped' : ''}`}>
            <div className="front">{flashcards[currentIndex].question}</div>
            <div className="back">{flashcards[currentIndex].answer}</div>
          </div>
        </div>
        <div className="flashcard-navigation">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default FlashcardViewer;
