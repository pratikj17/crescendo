import React from 'react';
import {
    HomeIcon,
    ClipboardDocumentListIcon,
    CloudArrowUpIcon,
    ArrowRightOnRectangleIcon,
    UserGroupIcon
} from "@heroicons/react/24/solid";

const Sidebar = () => {
    return (
        <div className='caret-transparent'>
            <nav className="fixed top-0 z-50">
                <div className="px-5 py-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-white">
                            Trainer Dashboard
                        </span>
                    </div>
                </div>
            </nav>
            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-gray-900 text-white"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4">
                    <ul className="space-y-4">
                        <li>
                            <a href="/trainerdashboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                                <HomeIcon className="w-6 h-6 text-blue-400" />
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/uploadassignment" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                                <CloudArrowUpIcon className="w-6 h-6 text-green-400" />
                                <span className="ml-3">Upload Assignments</span>
                            </a>
                        </li>
                        <li>
                            <a href="http://localhost:5173/batch/N4/submitted" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                                <ClipboardDocumentListIcon className="w-6 h-6 text-yellow-400" />
                                <span className="ml-3">Submitted Assignments</span>
                            </a>
                        </li>
                        <li>
                            <a href="/managestudents" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                                <UserGroupIcon className="w-6 h-6 text-purple-400" />
                                <span className="ml-3">Manage Students</span>
                            </a>
                        </li>
                        <li>
                            <a href="/logout" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
                                <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-400" />
                                <span className="ml-3">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar;