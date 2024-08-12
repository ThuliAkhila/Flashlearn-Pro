import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/loginPage';  // Ensure the correct file name
import UserModule from './components/UserModule'; // Ensure the correct file name
import AdminDashboard from './components/AdminDashboard'; // Ensure the correct file name
import { FlashcardProvider } from './contexts/FlashcardContext';

function App() {
  return (
    <FlashcardProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user-module" element={<UserModule />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </FlashcardProvider>
  );
}

export default App;
