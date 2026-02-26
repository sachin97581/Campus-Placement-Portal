import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      await API.post("/login", formData);
      setOtpSent(true);
    } catch (err) {
      alert("Login failed");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await API.post("/verify-login-otp", {
        email: formData.email,
        otp,
      });
      const userData = response.data.user; // Assuming backend returns user data
      login(userData);
      alert("Login Successful");
      // Redirect based on role
      if (userData.role === 'student') {
        navigate('/student/dashboard');
      } else if (userData.role === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        {!otpSent ? (
          <>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />

            <select name="role" onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>

            <button onClick={handleLogin}>Send OTP</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Verify OTP</button>
          </>
        )}

        <p>
          New here? <a href="/register">Create Account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
