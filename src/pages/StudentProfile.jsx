import React, { useState, useEffect } from "react";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState({
    username: "alexj2023",
    fullname: "Alex Johnson",
    email: "alex.johnson@example.com",
    RollNo: "STU2023145",
    Batch: "2023-2027",
    dob: new Date("2005-03-15"),
    Number: 9876543210,
    Fname: "Robert Johnson",
    Fnumber: 8765432109,
    Fmail: "robert.johnson@example.com",
    Mname: "Laura Johnson",
    Mnumber: 7654321098,
    resume: "resume_alex_johnson.pdf",
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file.name);
      setStudentData((prev) => ({ ...prev, resume: file.name }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 caret-transparent flex justify-center items-center">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="rounded-full bg-blue-200 p-5">
            <svg
              className="w-16 h-16 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-6 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              {studentData.fullname}
            </h1>
            <p className="text-gray-600">{studentData.email}</p>
            <p className="text-gray-500">Username: {studentData.username}</p>
            <p className="text-gray-500">Roll No: {studentData.RollNo}</p>
            <p className="text-gray-500">Batch: {studentData.Batch}</p>
            <p className="text-gray-500">
              Date of Birth: {formatDate(studentData.dob)}
            </p>
            <p className="text-gray-500">Phone: {studentData.Number}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center md:justify-start gap-4">
          <button className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
            Edit Profile
          </button>
          {studentData.resume && (
            <button className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition">
              View Resume
            </button>
          )}
          <label className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition cursor-pointer">
            Upload Resume
            <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
          </label>
        </div>

        {/* Family Information */}
        <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Family Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-medium text-gray-700">Father's Details</h3>
              <p className="text-gray-600">
                <span className="font-medium">Name:</span> {studentData.Fname}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {studentData.Fnumber}
              </p>
              {studentData.Fmail && (
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {studentData.Fmail}
                </p>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Mother's Details</h3>
              <p className="text-gray-600">
                <span className="font-medium">Name:</span> {studentData.Mname}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {studentData.Mnumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;