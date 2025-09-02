import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-card shadow p-4 rounded-4">
        <h3 className="text-center fw-bold mb-4">Welcome Back 👋</h3>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light border-end-0">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
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
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Forgot password */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input type="checkbox" id="remember" className="me-2" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="#" className="text-decoration-none text-primary">
              Forgot Password?
            </Link>
          </div>

          {/* Submit button */}
          <Link to="/">
            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill py-2 fw-semibold"
            >
              Login
            </button>
          </Link>
        </form>

        {/* Register link */}
        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link to="/register" className="text-decoration-none text-primary fw-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
