import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminLogin from "./components/AdminLoginSignup/AdminLogin.jsx";
import AdminSignup from "./components/AdminLoginSignup/AdminSIgnup.jsx"
import TrainerLogin from "./components/TrainerLoginSignup/TrainerLogin.jsx"
import TrainerSignup from "./components/TrainerLoginSignup/TrainerSignup.jsx"
import StudentLogin from "./components/StudentLoginSignup/studentLogin"
import StudentSignup from "./components/StudentLoginSignup/studentSignup.jsx"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/studentsignup" element={<StudentSignup />} />
        {/* <Route path="/teacherlogin" element={<TeacherLogin />} /> */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/trainerlogin" element={<TrainerLogin/>}/>
        <Route path="/trainersignup" element={<TrainerSignup/>}/>
      </Routes>
    </Router>
  );
};

export default App;
