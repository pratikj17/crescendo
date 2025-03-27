import React, { useState } from 'react';
import './TrainerLoginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrainerSignup = () => {
  const [username, setUsername] = useState('');
  const [staffId, setStaffId] = useState('');
  const [batches, setBatches] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/v1/trainer/signup', {
        username,
        staffId,
        batches,
        email,
        fullname,
        password,
      });

      if (response.status === 201) {
        console.log("Registration successful");
        navigate('/login'); // Redirect to login after successful signup
      }
    } catch (error) {
      console.error("Error:", error);
      setError('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <div className='auth-container'>
      <h2>Trainer Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="text" placeholder="Staff ID" value={staffId} onChange={(e) => setStaffId(e.target.value)} required />
        <input type="text" placeholder="Batches" value={batches} onChange={(e) => setBatches(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default TrainerSignup;