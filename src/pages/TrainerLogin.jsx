import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TrainerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://crescendo-1.onrender.com/api/v1/trainer/login",
        { email, password },
        { withCredentials: true } // Ensures cookies (if any) are sent with the request
      );

      if (response.status === 200) {
        console.log("Login successful");
        navigate("/dashboard"); // Redirect to trainer dashboard
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 caret-transparent">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Trainer Login</h2>
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
              onClick={() => navigate("/trainersignup")}
              className="cursor-pointer text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainerLogin;