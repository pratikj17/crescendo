import React, { useState } from "react";
import InputField from "./InputField";
import './StudentLogin.css'

const StudentLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return isSignUp ? (
    <SignUpForm switchToLogin={() => setIsSignUp(false)} />
  ) : (
    <LoginForm switchToSignUp={() => setIsSignUp(true)} />
  );
};

const LoginForm = ({ switchToSignUp }) => {
  return (
    <div className="login-container">
      <h2 className="form-title">Log In</h2>
      <form action="#" className="login-form">
        <InputField type="email" placeholder="Email address" />
        <InputField type="password" placeholder="Password" />
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
  return (
    <div className="login-container">
      <h2 className="form-title">Sign Up</h2>
      <form action="#" className="login-form">
        <InputField type="text" placeholder="Username" />
        <InputField type="text" placeholder="Full Name" />
        <InputField type="text" placeholder="Roll Number" />
        <InputField type="text" placeholder="Batch" />
        <InputField type="email" placeholder="Email address" />
        <InputField type="date" placeholder="Date of Birth" />
        <InputField type="number" placeholder="Phone Number" />
        <InputField type="text" placeholder="Father's Name" />
        <InputField type="number" placeholder="Father's Phone Number" />
        <InputField type="email" placeholder="Father's Email (optional)" />
        <InputField type="text" placeholder="Mother's Name" />
        <InputField type="number" placeholder="Mother's Phone Number" />
        <InputField type="password" placeholder="Password" />
        <InputField type="password" placeholder="Confirm Password" />
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

export default StudentLogin;
