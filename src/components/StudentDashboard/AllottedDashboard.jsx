import React from "react";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import StudentNavbar from "./StudentNavbar";

const AllotedDashboard = () => {
    const myBatches = [
        { id: 1, name: "Batch A" },
        { id: 2, name: "Batch B" },
        { id: 3, name: "Batch C" }
    ];

    return (
        <>
            {/* Navbar */}
            <StudentNavbar />

            {/* Main Content */}
            <div className="w-full p-6 caret-transparent">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-5">
                        My Batches
                    </h2>

                    {myBatches.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myBatches.map((batch) => (
                                <div
                                    key={batch.id}
                                    className="p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform text-white border-2 border-white bg-blue-400"
                                >
                                    <div className="flex items-center space-x-3">
                                        <AcademicCapIcon className="h-10 w-10 text-white bg-gray-800 p-2 rounded-full" />
                                        <h3 className="text-lg font-semibold">{batch.name}</h3>
                                    </div>

                                    <a href={'/studentbatch'}>
                                        <button className="mt-4 w-full text-white py-2 rounded-md bg-blue-800 hover:bg-blue-900 transition">
                                            View Batch
                                        </button>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No batches assigned yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllotedDashboard;