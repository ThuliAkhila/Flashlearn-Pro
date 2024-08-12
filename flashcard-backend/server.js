
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cse', // Replace with your MySQL password
  database: 'flashcardDb'  // Replace with your actual database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Route to handle POST requests for adding flashcards
app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  
  // Ensure question and answer are provided
  if (!question || !answer) {
    return res.status(400).json({ message: 'Question and answer are required' });
  }

  // Insert the flashcard into the database
  const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
  db.query(query, [question, answer], (err, result) => {
    if (err) {
      console.error('Error inserting flashcard:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({ id: result.insertId, question, answer });
  });
});

// Route to handle GET requests for fetching flashcards
app.get('/api/flashcards', (req, res) => {
  const query = 'SELECT * FROM flashcards';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching flashcards:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
});

// Route to handle PUT requests for updating flashcards
app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ message: 'Question and answer are required' });
  }

  const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
  db.query(query, [question, answer, id], (err) => {
    if (err) {
      console.error('Error updating flashcard:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ message: 'Flashcard updated successfully' });
  });
});

// Route to handle DELETE requests for deleting flashcards
app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flashcards WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting flashcard:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ message: 'Flashcard deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






