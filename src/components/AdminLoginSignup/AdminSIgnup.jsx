import React, { useState } from 'react';
import './AdminLoginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [staffId, setStaffId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleStaffIdChange = (e) => setStaffId(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFullnameChange = (e) => setFullname(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      const response = await axios.post('http://localhost:8000/api/v1/admin/adminRegistration', {
        username,
        staffId,
        email,
        fullname,
        password,
      });

      if (response.status === 200) {
        console.log("Registration successful");
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error("Error:", error);
      setError('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <div className='main'>
      <div className='container'>
        <div className="header">
          <div className="text">Register</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit} className="inputs">
          <div className="input">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Staff ID"
              value={staffId}
              onChange={handleStaffIdChange}
              required
            />
          </div>
          <div className="input">
            <input
              type="email"
              placeholder="Email ID"
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
          <div className="input">
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={handleFullnameChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit">Register</button>
        </form>
      </div>
      <div className="image-container">
        {/* <img src={image} alt="Signup illustration" className="signup-image" /> */}
      </div>
    </div>
  );
}

export default Register;