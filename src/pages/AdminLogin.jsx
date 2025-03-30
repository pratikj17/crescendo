import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    try {
      const response = await axios.post(
        "https://crescendo-1.onrender.com/api/v1/admin/adminLogin",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        console.log("Login successful");
        navigate("/"); // Redirect on successful login
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 caret-transparent">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#1A73E8] className=caret-transparent">Login</h2>
          <div className="mt-1 h-1 w-12 bg-[#1A73E8] mx-auto"></div>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full rounded-md border border-gray-300 p-2 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full rounded-md border border-gray-300 p-2 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full rounded-md bg-[#1A73E8] px-4 py-2 text-white transition duration-200 hover:bg-[#005BB5]"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p
            onClick={() => navigate("/forgot-password")}
            className="cursor-pointer text-[#1A73E8] hover:underline"
          >
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;