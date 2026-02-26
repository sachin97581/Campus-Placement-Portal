import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfile from "./pages/student/Profile";
import StudentApplications from "./pages/student/Applications";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import RecruiterPostJob from "./pages/recruiter/PostJob";
import RecruiterApplicants from "./pages/recruiter/Applicants";
import AddJob from "./pages/admin/AddJob";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAnalytics from "./pages/admin/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import JobDetails from "./pages/JobDetails";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job/:id" element={<JobDetails />} />

        {/* Protected Routes */}
        <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/profile" element={ <ProtectedRoute role="student"><StudentProfile /></ProtectedRoute>}/>
        <Route path="/student/applications" element={ <ProtectedRoute role="student"><StudentApplications /> </ProtectedRoute>}/>
        <Route path="/recruiter/dashboard" element={<ProtectedRoute role="recruiter">  <RecruiterDashboard /></ProtectedRoute> } />
        <Route path="/recruiter/post-job" element={<ProtectedRoute role="recruiter"> <RecruiterPostJob /></ProtectedRoute>} />
        <Route path="/recruiter/applicants" element={ <ProtectedRoute role="recruiter"><RecruiterApplicants /></ProtectedRoute> }/>
        <Route path="/admin/addjob" element={ <ProtectedRoute role="admin"> <AddJob/></ProtectedRoute>}/>
        <Route path="/admin/dashboard"element={<ProtectedRoute role="admin"> <AdminDashboard /></ProtectedRoute>}/>
        <Route path="/admin/analytics" element={ <ProtectedRoute role="admin"> <AdminAnalytics /></ProtectedRoute>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

