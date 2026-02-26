import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../style/navbar.css";

function RecruiterNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/recruiter/dashboard" className="logo">
        Recruiter Portal
      </Link>
      <div className="nav-links">
        <Link to="/recruiter/post-job">Post Job</Link>
        <Link to="/recruiter/applicants">Applicants</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default RecruiterNavbar;