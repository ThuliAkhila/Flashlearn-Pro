// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For React Router v6
// import { useHistory } from 'react-router-dom'; // For React Router v5
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use navigate for React Router v6
  // const history = useHistory(); // Use history for React Router v5

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin123') {
      navigate('/admin-dashboard'); // Use navigate for React Router v6
      // history.push('/admin-dashboard'); // Use history for React Router v5
    } else if (username === 'user' && password === 'user123') {
      navigate('/user-dashboard'); // Use navigate for React Router v6
      // history.push('/user-dashboard'); // Use history for React Router v5
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Have Fun..!</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
