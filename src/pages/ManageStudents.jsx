import React, { useState } from "react";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/solid";
import TrainerNavbar from "../components/TrainerNavbar";

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState("");

    const addStudent = () => {
        if (newStudent.trim() !== "") {
            setStudents([...students, newStudent]);
            setNewStudent("");
        }
    };

    const removeStudent = (index) => {
        setStudents(students.filter((_, i) => i !== index));
    };

    return (
        <>
            {/* Navbar */}
            <TrainerNavbar />

            {/* Main Content */}
            <div className="w-full p-8 caret-transparent">
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Manage Students
                    </h2>

                    {/* Input Section */}
                    <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                        <input
                            type="text"
                            value={newStudent}
                            onChange={(e) => setNewStudent(e.target.value)}
                            placeholder="Enter student name"
                            className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />
                        <button
                            onClick={addStudent}
                            className="ml-4 flex items-center bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition duration-300 shadow-md"
                        >
                            <UserPlusIcon className="w-5 h-5 mr-2" />
                            Add Student
                        </button>
                    </div>

                    {/* Student List */}
                    {students.length === 0 ? (
                        <p className="text-gray-500 text-center text-lg">
                            No students added yet.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {students.map((student, index) => (
                                <div
                                    key={index}
                                    className="p-5 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 flex justify-between items-center transform transition duration-300 hover:scale-105"
                                >
                                    <span className="text-lg font-semibold">{student}</span>
                                    <button
                                        onClick={() => removeStudent(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-300"
                                    >
                                        <UserMinusIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ManageStudents;
