import { useState } from 'react'
import TrainerDashboard from './pages/TrainerDashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Batch from './pages/Batch'
import UploadAssignment from './pages/UploadAssignment';
import StudentProfile from './pages/StudentProfile'
import SubmittedAssignments from './pages/SubmittedAssignments';
import StudentSignup from './pages/StudentSignup';
import StudentLogin from './pages/StudentLogin';
import ManageStudents from './pages/ManageStudents';
import LandingPage from './pages/LandingPage'
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import StudentBatch from './components/StudentDashboard/StudentBatch';
import Assignments from './components/StudentDashboard/Assignment';
import SubmittedAssignmentsStudents from './components/StudentDashboard/SubmittedAssignmentStudents';
import AdminLogin from './pages/AdminLogin'
import TrainerSignup from './pages/TrainerSignup';
import TrainerLogin from './pages/TrainerLogin';
import UploadForm from './components/UploadForm';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/*Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/*Student */}
        <Route path="/studentsignup" element={<StudentSignup />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/studentprofile" element={<StudentProfile/>}/>
        <Route path='/studentdashboard' element={<StudentDashboard />}/>
        <Route path='/studentbatch' element={<StudentBatch />}/>
        <Route path='/submittedassignmentsstudents' element={<SubmittedAssignmentsStudents />}/>
        <Route path='/assignments' element={<Assignments />}/>
        
        {/*Trainer */}
        <Route path="/trainersignup" element={<TrainerSignup/>}/>
        <Route path="/trainerlogin" element={<TrainerLogin/>}/>
        <Route path='/trainerdashboard' element={<TrainerDashboard />}/>
        <Route path='/batch/:batchName' element={<Batch />}/> 
        <Route path='/batch/:batch/submitted' element={<SubmittedAssignments />}/> 

        <Route path="/adminlogin" element={<AdminLogin />} />
        
        {/*Upload */}
        <Route path="/upload" element={<UploadForm />}/>
        <Route path='/uploadassignment' element={<UploadAssignment />}/>
        <Route path="/managestudents" element={<ManageStudents />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
