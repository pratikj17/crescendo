import React, { useState } from 'react';
import './student.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentSignup = () => {
  const [username, setUsername] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [batch, setBatch] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [dob, setDob] = useState('');
  const [number, setNumber] = useState('');
  const [fname, setFname] = useState('');
  const [fnumber, setFnumber] = useState('');
  const [fmail, setFmail] = useState('');
  const [mname, setMname] = useState('');
  const [mnumber, setMnumber] = useState('');
  const [resume, setResume] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('username', username);
    formData.append('RollNo', rollNo);
    formData.append('Batch', batch);
    formData.append('email', email);
    formData.append('fullname', fullname);
    formData.append('dob', dob);
    formData.append('Number', number);
    formData.append('Fname', fname);
    formData.append('Fnumber', fnumber);
    formData.append('Fmail', fmail);
    formData.append('Mname', mname);
    formData.append('Mnumber', mnumber);
    formData.append('resume', resume);
    formData.append('password', password);

    try {
      const response = await axios.post('localhost:8000/api/v1/student/studentRegistration', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
      <h2>Student Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="text" placeholder="Roll No" value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
        <input type="text" placeholder="Batch" value={batch} onChange={(e) => setBatch(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
        <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required />
        <input type="text" placeholder="Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} required />
        <input type="text" placeholder="Father's Name" value={fname} onChange={(e) => setFname(e.target.value)} required />
        <input type="text" placeholder="Father's Phone" value={fnumber} onChange={(e) => setFnumber(e.target.value)} required />
        <input type="email" placeholder="Father's Email" value={fmail} onChange={(e) => setFmail(e.target.value)} required />
        <input type="text" placeholder="Mother's Name" value={mname} onChange={(e) => setMname(e.target.value)} required />
        <input type="text" placeholder="Mother's Phone" value={mnumber} onChange={(e) => setMnumber(e.target.value)} required />
        <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} required />
        < input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default StudentSignup;