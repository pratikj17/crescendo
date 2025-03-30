import React, { useState, useEffect } from 'react';

const LoginDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Add click outside handler to close dropdown when clicking elsewhere
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e) => {
        if (!e.target.closest('.dropdown-container')) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative dropdown-container caret-transparent">
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        onClick={toggleDropdown}
      >
        Login
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-35 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          <ul className="py-1">
            <li>
              <a href="/studentlogin">
                <button className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                  <img 
                    src="student.png" 
                    alt="Student" 
                    className="mr-2 h-5 w-5 flex-shrink-0"
                  />
                  <span>Student</span>
                </button>
              </a>
            </li>
            <li>
              <a href="/trainerlogin">
                <button className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                  <img 
                    src="trainer.png" 
                    alt="Trainer" 
                    className="mr-2 h-5 w-5 flex-shrink-0"
                  />
                  <span>Trainer</span>
                </button>
              </a>
            </li>
            <li>
              <a href="/adminlogin">
                <button className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">
                  <img 
                    src="admin.png" 
                    alt="Admin" 
                    className="mr-2 h-5 w-5 flex-shrink-0"
                  />
                  <span>Admin</span>
                </button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;