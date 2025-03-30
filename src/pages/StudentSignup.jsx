import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    RollNo: "",
    Batch: "",
    email: "",
    fullname: "",
    dob: "",
    Number: "",
    Fname: "",
    Fnumber: "",
    Fmail: "",
    Mname: "",
    Mnumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/student/studentRegistration",
        formData
      );

      if (response.status === 201) {
        console.log("Registration successful");
        navigate("/studentlogin"); // Redirect to login after signup
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 py-10">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 caret-transparent">Student Signup</h2>
          <div className="mt-2 h-1 w-16 bg-blue-600 mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="RollNo"
              placeholder="Roll No"
              value={formData.RollNo}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="Batch"
              placeholder="Batch"
              value={formData.Batch}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="Number"
              placeholder="Phone Number"
              value={formData.Number}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2 caret-transparent">Parent Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="Fname"
                placeholder="Father's Name"
                value={formData.Fname}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="text"
                name="Fnumber"
                placeholder="Father's Phone"
                value={formData.Fnumber}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="email"
                name="Fmail"
                placeholder="Father's Email"
                value={formData.Fmail}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="text"
                name="Mname"
                placeholder="Mother's Name"
                value={formData.Mname}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="text"
                name="Mnumber"
                placeholder="Mother's Phone"
                value={formData.Mnumber}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Sign Up
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-600 caret-transparent">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/studentlogin")}
                className="cursor-pointer text-blue-600 font-medium hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
