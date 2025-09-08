import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";

const Login = () => {
  const { storeToken } = useAuth();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mobile || !password) {
      toast.error("Please enter both mobile and password");
      return;
    };

    try {
      setLoading(true);
      const response = await axios.post(apis.user.login, { mobile, password });

      if (response.data.success) {
        toast.success("Login successful!");
        await storeToken(response?.data?.token);
        navigate("/");
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed, try again");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0 rounded-4" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4 fw-bold text-primary">Welcome Back</h3>
          <p className="text-muted text-center mb-4">Login with your mobile number and password.</p>

          <form onSubmit={handleSubmit}>
            {/* Mobile Number */}
            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control rounded-pill"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary rounded-pill py-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : null}
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Extra Links */}
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
            <p className="mt-2">
              Don’t have an account?{" "}
              <Link to="/register" className="fw-semibold text-primary text-decoration-none">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
