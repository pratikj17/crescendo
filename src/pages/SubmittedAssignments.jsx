import React, { useState, useEffect } from "react";
import axios from "axios";
import { AcademicCapIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const SubmittedAssignments = () => {
    const { batch } = useParams(); // Get batch from URL
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAssignments = async () => {
            if (!batch) return;

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/trainer/assignments/${batch}`);
                setAssignments(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch assignments.");
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [batch]);

    const handleDownload = async (fileKey) => {
        try {
            const cleanFileKey = fileKey.replace("uploads/", ""); // Remove 'uploads/' from fileKey
    
            // ✅ Corrected Axios request structure
            const response = await axios.get(`http://localhost:8000/api/v1/files/download/${cleanFileKey}`);
    
            if (response.data.download_url) {
                window.open(response.data.download_url, "_blank"); // Open in new tab
            } else {
                throw new Error("Download URL not received.");
            }
        } catch (error) {
            alert("Failed to open the file!");
        }
    };
    

    if (loading) return <p className="text-gray-500 text-center mt-10">Loading assignments...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

    return (
        <div className="flex">
            <Sidebar />

            <div className="ml-64 flex-1 p-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-5">
                        Submitted Assignments for Batch {batch}
                    </h2>

                    {assignments.length === 0 ? (
                        <p className="text-gray-500">No assignments submitted yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                            {assignments.map((assignment) => (
                                <div key={assignment._id} className="p-4 rounded-lg shadow-lg bg-gray-800 text-white">
                                    <div className="flex items-center space-x-3">
                                        <AcademicCapIcon className="h-10 w-10 text-white bg-gray-700 p-2 rounded-full" />
                                        <h3 className="text-lg font-semibold">{assignment.name}</h3>
                                    </div>
                                    <p className="mt-2">Student: {"N/A"}</p>
                                    <p>Batch: {assignment.batch}</p>
                                    <p>Submitted: {new Date(assignment.createdAt).toLocaleDateString()}</p>

                                    {/* ✅ View Assignment Button */}
                                    <a
                                        href={assignment.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 w-full block text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
                                    >
                                        View Assignment
                                    </a>

                                    {/* ✅ Download Assignment Button */}
                                    <button
                                        onClick={() => handleDownload(assignment.fileKey)}
                                        className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md flex items-center justify-center"
                                    >
                                        <ArrowDownTrayIcon className="h-5 w-5 mr-2" /> Download
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmittedAssignments;
