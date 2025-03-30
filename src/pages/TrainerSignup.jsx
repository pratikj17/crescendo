import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TrainerSignup = () => {
  const [username, setUsername] = useState("");
  const [staffId, setStaffId] = useState("");
  const [batches, setBatches] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/trainer/signup",
        { username, staffId, batches, email, fullname, password },
        { withCredentials: true }
      );

      if (response.status === 201) {
        console.log("Registration successful");
        navigate("/trainerlogin");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 caret-transparent">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Trainer Signup</h2>
          <div className="mt-2 h-1 w-16 bg-blue-600 mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Staff ID"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p
            onClick={() => navigate("/trainerlogin")}
            className="cursor-pointer text-blue-600 font-medium hover:underline"
          >
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainerSignup;