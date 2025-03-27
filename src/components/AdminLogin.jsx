import React, { useState } from "react";
import InputField from "./InputField";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1/admin"; // Adjust as needed

const AdminLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return isSignUp ? (
    <SignUpForm switchToLogin={() => setIsSignUp(false)} />
  ) : (
    <LoginForm switchToSignUp={() => setIsSignUp(true)} />
  );
};

const LoginForm = ({ switchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/adminLogin`, { email, password }, { withCredentials: true });
      alert("Login successful");
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Log In</h2>
      <form onSubmit={handleLogin} className="login-form">
        <InputField type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <a href="#" className="forgot-password-link">Forgot password?</a>
        <button type="submit" className="login-button">Log In</button>
      </form>
      <p className="signup-prompt">
        Don't have an account? {" "}
        <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); switchToSignUp(); }}>
          Sign up
        </a>
      </p>
    </div>
  );
};


const SignUpForm = ({ switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [StaffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data to backend...");
      const res = await axios.post("http://localhost:8000/api/v1/admin/adminRegistration", { 
        username, fullname, email, StaffId, password 
      });
      console.log("Response received:", res.data);
      alert("Registration successful");
      switchToLogin();
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSignUp} className="login-form">
        <InputField type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputField type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        <InputField type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField type="text" placeholder="StaffID" value={StaffId} onChange={(e) => setStaffId(e.target.value)} />
        <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="login-button">Sign Up</button>
      </form>
      <p className="signup-prompt">
        Already have an account? {" "}
        <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); switchToLogin(); }}>
          Log in
        </a>
      </p>
    </div>
  );
};




export default AdminLogin;
