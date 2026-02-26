import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../style/navbar.css";

function StudentNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/student/dashboard" className="logo">
        Student Portal
      </Link>
      <div className="nav-links">
        <Link to="/student/profile">Profile</Link>
        <Link to="/student/applications">Applications</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default StudentNavbar;