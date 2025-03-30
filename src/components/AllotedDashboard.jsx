import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import TrainerNavbar from "./TrainerNavbar";
import NotAllotted from "./NotAllotted";

const AllotedDashboard = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const teacherUsername = "arinjay0nf3n";

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get(`https://crescendo-1.onrender.com/api/v1/trainer/getBatches?username=${teacherUsername}`);
                setBatches(response.data); 
                console.log(response.data); // Log data to check format
            } catch (error) {
                console.error("Error fetching batches:", error);
                setError("Failed to fetch batches. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBatches();
    }, []);

    if (loading) return <p className="text-gray-500 text-center mt-10">Loading batches...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">No batch allowed  yet</p>;
    if (batches.length === 0) return <NotAllotted />;

    return (
        <>
            <TrainerNavbar />

            <div className="w-full p-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-5">My Batches</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {batches.map((batch, index) => (
                            <div
                                key={index}
                                style={{ backgroundColor: "oklch(0.809 0.105 251.813)" }}
                                className="p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform text-white border-2 border-white"
                            >
                                <div className="flex items-center space-x-3">
                                    <AcademicCapIcon className="h-10 w-10 text-white bg-gray-800 p-2 rounded-full" />
                                    <h3 className="text-lg font-semibold">{batch}</h3>
                                </div>
                                <p className="text-white mt-2">Students: {22 || 0}</p>
                                <a href={`/batch/${batch}`}>
                                    <button 
                                        style={{ backgroundColor: "oklch(0.623 0.214 259.815)" }} 
                                        className="mt-4 w-full text-white py-2 rounded-md hover:bg-gray-700"
                                    >
                                        View Batch
                                    </button>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllotedDashboard;
