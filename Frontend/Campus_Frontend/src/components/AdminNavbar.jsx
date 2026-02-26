import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../style/navbar.css";

function AdminNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/admin/dashboard" className="logo">
        Admin Portal
      </Link>
      <div className="nav-links">
        <Link to="/admin/analytics">Analytics</Link>
        <Link to="/admin/manage-users">Manage Users</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default AdminNavbar;