import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/solid";

const AssignmentsDashboard = () => {
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/student/studentAssignment`,
          { withCredentials: true }
        );
        console.log(response.data);
        setCompletedAssignments(response.data.completedAssignments);
        setPendingAssignments(response.data.pendingAssignments);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch assignments.");
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="flex h-screen caret-transparent">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-600">Loading assignments...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              {/* Submitted Assignments Section */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  📌 Submitted Assignments
                </h2>
                {completedAssignments.length === 0 ? (
                  <p className="text-gray-600">No assignments submitted yet.</p>
                ) : (
                  <ul className="divide-y divide-gray-300">
                    {completedAssignments.map((title, index) => (
                      <li
                        key={index}
                        className="py-4 flex justify-between items-center hover:bg-gray-50 rounded-md transition px-4"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Status: Submitted
                          </p>
                        </div>
                        <span className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md">
                          <CheckIcon className="w-5 h-5 mr-2" />
                          Completed
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Pending Assignments Section */}
              {/* Pending Assignments Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  ⏳ Pending Assignments
                </h2>
                {pendingAssignments.length === 0 ? (
                  <p className="text-gray-600">No pending assignments.</p>
                ) : (
                  <ul className="divide-y divide-gray-300">
                    {pendingAssignments.map(
                      (
                        title,
                        index // ✅ Corrected this part
                      ) => (
                        <li
                          key={index}
                          className="py-4 flex justify-between items-center hover:bg-gray-50 rounded-md transition px-4"
                        >
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {title}
                            </h3>{" "}
                            {/* ✅ Use `title` instead of `name` */}
                            <p className="text-sm text-gray-600">
                              Status: Pending
                            </p>
                          </div>
                          <span className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-md">
                            <ClockIcon className="w-5 h-5 mr-2" />
                            Pending
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsDashboard;
