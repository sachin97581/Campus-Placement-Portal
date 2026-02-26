import { Link } from "react-router-dom";
import "../style/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        Campus Portal
      </Link>

      <div className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/register" className="register-btn">
          Register
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
