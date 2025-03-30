import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Get batch name from URL
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";

const Batch = () => {
  const { batchName } = useParams(); // Get batch name from route param
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/trainer/getAbatch?batch=${batchName}`
        );

        // Check if the response contains students
        if (response.data && response.data.length > 0) {
          setStudents(response.data);
        } else {
          setError("No students found in this batch.");
        }
      } catch (err) {
        setError("Failed to load students.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [batchName]);

  if (loading) return <p className="text-gray-500 text-center mt-10">Loading students...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar batchName={batchName} /> {/* Pass batchName as a prop */}
      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Students in <span className="text-blue-600">{batchName}</span>
        </h2>

        {students.length === 0 ? (
          <p className="text-gray-500 text-center">No students found in this batch.</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">Full Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Roll No</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-100 transition duration-200">
                    <td className="border border-gray-300 px-4 py-3">{student.fullname}</td>
                    <td className="border border-gray-300 px-4 py-3">{student.username}</td>
                    <td className="border border-gray-300 px-4 py-3">{student.RollNo}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Batch;