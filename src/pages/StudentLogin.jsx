import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/student/studentLogin",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 caret-transparent">Student Login</h2>
          <div className="mt-2 h-1 w-16 bg-blue-600 mx-auto"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center space-y-2">
          <p 
            onClick={() => navigate("/forgot-password")} 
            className="cursor-pointer text-blue-600 font-medium hover:underline"
          >
            Forgot Password?
          </p>
          <p className="text-gray-600">
            Don't have an account?{" "}
            <span 
              onClick={() => navigate("/studentsignup")} 
              className="cursor-pointer text-blue-600 font-medium hover:underline caret-transparent"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;