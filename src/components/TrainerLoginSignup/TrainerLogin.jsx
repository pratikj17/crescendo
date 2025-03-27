import React, { useState } from 'react';
import './TrainerLoginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrainerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/v1/trainer/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful");
        navigate('/dashboard'); // Redirect to dashboard after successful login
      }
    } catch (error) {
      console.error("Error:", error);
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className='auth-container'>
      <h2>Trainer Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default TrainerLogin;