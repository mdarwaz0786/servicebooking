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
    <div className="main-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 mx-auto">
            <form action="index.html">
              <div className="d-flex flex-column justify-content-center">
                <div className="card p-sm-4 my-5">
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <h3 className="mb-2">Welcome</h3>
                      <p>Enter your mobile to access your account</p>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Mobile</label>
                      <input type="number" className="form-control" />
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <label className="form-label">Otp</label>
                      </div>
                      <input type="password" className="form-control" />
                    </div>


                    <div className="mb-3">
                      <button
                        type="submit"
                        className="btn btn-lg btn-linear-primary w-100"
                      >
                        Sign In
                      </button>
                    </div>

                    

                  

                    <div className="d-flex justify-content-center">
                      <p>
                        Don’t have a account?{" "}
                        <a href="register.html" className="text-primary">
                          Join us Today
                        </a>
                      </p>
                    </div>
                  </div>

                  <div>
                    <img
                      src="assets/img/bg/authentication-bg.png"
                      className="bg-left-top"
                      alt="Background"
                    />
                    <img
                      src="assets/img/bg/authentication-bg.png"
                      className="bg-right-bottom"
                      alt="Background"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
