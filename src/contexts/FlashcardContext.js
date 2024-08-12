// src/contexts/FlashcardContext.js
import React, { createContext, useState, useContext } from 'react';

const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { id: 2, question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks similar to HTML.' },
    { id: 3, question: 'What is a component?', answer: 'A reusable piece of UI in React.' },
  ]);

  return (
    <FlashcardContext.Provider value={{ flashcards, setFlashcards }}>
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcards = () => useContext(FlashcardContext);
