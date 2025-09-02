import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock } from "react-icons/fa";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center">
      <div className="signup-card shadow p-4 rounded-4">
        <h3 className="text-center fw-bold mb-4">Create Account ✨</h3>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light border-end-0">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light border-end-0">
              <FaEnvelope />
            </span>
            <input
              type="email"
              className="form-control border-start-0"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light border-end-0">
              <FaPhoneAlt />
            </span>
            <input
              type="tel"
              className="form-control border-start-0"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light border-end-0">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control border-start-0"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button */}
          <Link to="/">
            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill py-2 fw-semibold"
            >
              Sign Up
            </button>
          </Link>
        </form>

        {/* Already have an account */}
        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none text-primary fw-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
