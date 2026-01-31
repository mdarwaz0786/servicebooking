import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import logo from "../../assets/logo.png";

const LoginPage = () => {
  const { storeToken } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.error("Username is required");
      return;
    };

    if (!password) {
      toast.error("Password is required");
      return;
    };

    try {
      setLoading(true);
      const response = await axios.post(apis.auth.login, { username, password });
      if (response?.data?.token) {
        toast.success("Login successful");
        await storeToken(response?.data?.token);
        navigate("/");
      } else {
        toast.error("Something went wrong");
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0 rounded-4" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="Logo"
              style={{ maxWidth: "200px" }}
            />
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control rounded-pill"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary rounded-pill py-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
