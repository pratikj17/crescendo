import React, { useState } from 'react';
import axios from 'axios';
import './AdminLoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      const response = await axios.post('http://localhost:8000/api/v1/admin/adminLogin', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful');
        navigate('/'); // Redirect on successful login
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='main'>
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit} className="inputs">
          <div className="input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit">Login</button>
        </form> <div className="auth-links">
        <p onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer', color: '#007bff' }}>Forgot Password?</p>
        <p onClick={() => navigate('/adminSignup')} style={{ cursor: 'pointer', color: '#007bff' }}><span style={{color: "black"}}>Don't have an account?</span> Sign Up</p>
      </div>

      </div>
      <div className="image-container">
        {/* <img src={image} alt="Signup illustration" className="signup-image" /> */}
      </div>
    </div>
  );
};

export default Login;