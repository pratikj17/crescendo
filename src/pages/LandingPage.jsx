import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faChalkboardTeacher,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <h1>Welcome to the Learning Portal</h1>
        <p id="p">
          Your one-stop solution for structured learning and efficient content
          management.
        </p>
        <div className="role-selection">
          <a href="/studentlogin" className="role-icon">
            <FontAwesomeIcon icon={faUserGraduate} size="4x" />
            <p>Student</p>
          </a>
          <a href="/trainerlogin" className="role-icon">
            <FontAwesomeIcon icon={faChalkboardTeacher} size="4x" />
            <p>Teacher</p>
          </a>
          <a href="/adminlogin" className="role-icon">
            <FontAwesomeIcon icon={faUserShield} size="4x" />
            <p>Admin</p>
          </a>
        </div>
        <div className="info-container">
          <div className="features">
            <h2>Features</h2>
            <ul>
              <li>
                <strong>For Students:</strong> Access course materials (PPTs),
                submit assignments, and track your progress.
              </li>
              <li>
                <strong>For Teachers:</strong> Manage course content, assign
                tasks, and monitor student submissions.
              </li>
              <li>
                <strong>For Admins:</strong> Control user access, manage
                trainers and students, and oversee the entire platform.
              </li>
            </ul>
          </div>
          <div className="description">
            <h2>About the Portal</h2>
            <p>
              This portal is designed to facilitate structured learning by
              allowing administrators to control the release of course
              materials dynamically. Students can log in to access their course
              materials, submit assignments, and view their progress. Trainers
              can assign tasks and manage student batches, while administrators
              can oversee the entire system.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>My Web App</h2>
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 My Web App. All rights reserved.</p>
    </footer>
  );
};

export default LandingPage;
