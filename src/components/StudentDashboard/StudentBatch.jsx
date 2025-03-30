import React from "react";
import Sidebar from "./Sidebar";

const StudentBatch = () => {
  // Dummy PPT resources list for both batches
  const batchResources = {
    A: [
      { id: 1, title: "Mathematics Basics", link: "/resources/mathematics_basics.pptx" },
      { id: 2, title: "Physics Fundamentals", link: "/resources/physics_fundamentals.pptx" },
      { id: 3, title: "Introduction to Programming", link: "/resources/programming_intro.pptx" },
      { id: 4, title: "Chemistry Essentials", link: "/resources/chemistry_essentials.pptx" },
    ],
    B: [
      { id: 5, title: "Data Structures", link: "/resources/data_structures.pptx" },
      { id: 6, title: "Algorithms Overview", link: "/resources/algorithms_overview.pptx" },
      { id: 7, title: "Operating Systems Basics", link: "/resources/os_basics.pptx" },
      { id: 8, title: "Networking Fundamentals", link: "/resources/networking_fundamentals.pptx" },
    ],
  };

  return (
    <div className="flex h-screen caret-transparent">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-100 space-y-6">
        {/* Section A*/}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Section A</h2>
          <ul className="divide-y divide-gray-300">
            {batchResources.A.map((resource) => (
              <li
                key={resource.id}
                className="py-3 px-4 flex justify-between items-center hover:bg-gray-50 rounded-md transition"
              >
                <span className="text-lg text-gray-800">{resource.title} (.pptx)</span>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Batch B Section */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Section B</h2>
          <ul className="divide-y divide-gray-300">
            {batchResources.B.map((resource) => (
              <li
                key={resource.id}
                className="py-3 px-4 flex justify-between items-center hover:bg-gray-50 rounded-md transition"
              >
                <span className="text-lg text-gray-800">{resource.title} (.pptx)</span>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
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

export default StudentBatch;