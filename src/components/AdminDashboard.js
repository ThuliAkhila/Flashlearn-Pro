import React, { useState } from 'react';
import { useFlashcards } from '../contexts/FlashcardContext';
import './AdminDashboard.css';

function AdminDashboard() {
  const { flashcards, setFlashcards } = useFlashcards();
  const [form, setForm] = useState({ id: '', question: '', answer: '' });
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (form.question && form.answer) {
      setFlashcards((prev) => [
        ...prev,
        { id: Date.now(), question: form.question, answer: form.answer },
      ]);
      setForm({ id: '', question: '', answer: '' });
    }
  };

  const handleEdit = (id) => {
    const card = flashcards.find((card) => card.id === id);
    setForm(card);
    setEditing(true);
  };

  const handleUpdate = () => {
    if (form.question && form.answer) {
      setFlashcards((prev) =>
        prev.map((card) =>
          card.id === form.id ? { ...card, question: form.question, answer: form.answer } : card
        )
      );
      setForm({ id: '', question: '', answer: '' });
      setEditing(false);
    }
  };

  const handleDelete = (id) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="flashcard-form">
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={form.question}
          onChange={handleChange}
        />
        <input
          type="text"
          name="answer"
          placeholder="Answer"
          value={form.answer}
          onChange={handleChange}
        />
        {editing ? (
          <button onClick={handleUpdate}>Update Flashcard</button>
        ) : (
          <button onClick={handleAdd}>Add Flashcard</button>
        )}
      </div>
      <div className="flashcard-list">
        {flashcards.map((card) => (
          <div key={card.id} className="flashcard-item">
            <div>
              <strong>Q:</strong> {card.question}
            </div>
            <div>
              <strong>A:</strong> {card.answer}
            </div>
            <button onClick={() => handleEdit(card.id)}>Edit</button>
            <button onClick={() => handleDelete(card.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
