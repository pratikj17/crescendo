import React from "react";
import Sidebar from "./Sidebar";
import { CheckIcon } from "@heroicons/react/24/solid";

const SubmittedAssignments = () => {
  // Dummy submitted assignments data
  const assignments = [
    { id: 1, title: "Math Homework", subject: "Mathematics", date: "March 25, 2025", link: "/uploads/math_homework.pdf" },
    { id: 2, title: "Physics Lab Report", subject: "Physics", date: "March 22, 2025", link: "/uploads/physics_lab.pdf" },
    { id: 3, title: "Programming Assignment", subject: "Computer Science", date: "March 20, 2025", link: "/uploads/programming_assignment.pdf" },
  ];

  return (
    <div className="flex h-screen caret-transparent">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-100">
        <div className="max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Submitted Assignments</h2>
          <p className="text-gray-600 mb-4">Here are the assignments you have submitted:</p>

          <ul className="divide-y divide-gray-300">
            {assignments.map((assignment) => (
              <li key={assignment.id} className="py-4 flex justify-between items-center hover:bg-gray-50 rounded-md transition px-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">{assignment.subject} - Submitted on {assignment.date}</p>
                </div>
                <a
                  href={assignment.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  <CheckIcon className="w-5 h-5 mr-2" />
                  View
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubmittedAssignments