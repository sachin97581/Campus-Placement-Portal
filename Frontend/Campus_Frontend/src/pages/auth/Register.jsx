import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await API.post("/register", formData);
      setOtpSent(true);
    } catch (err) {
      alert("Registration failed");
    }
  };

  const verifyOtp = async () => {
    try {
      await API.post("/verify-otp", {
        email: formData.email,
        otp,
      });
      alert("Account Verified Successfully");
      navigate("/login");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        {!otpSent ? (
          <>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
            />

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
              <option value="admin">Admin</option>
              <option value="recruiter">Recruiter</option>
            </select>

            <button onClick={handleRegister}>Send OTP</button>
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
      </div>
    </div>
  );
}

export default Register;
