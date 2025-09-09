import React, { useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
const LoginForm = () => {

     
    const { Urls } = useContext(AppContext);
    
    
  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [otpSignin, setOtpSignin] = useState(false);
  const [otpField, setotpField] = useState(false);
  const [mobileField, setmobileField] = useState(true);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      mobile,
      password,
      rememberMe,
      otpSignin,
    });
    // 👉 Call API here (e.g. postData)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center mb-3">
        <h3 className="mb-2">Welcome</h3>
        <p>Enter mobile number</p>
      </div>

      {/* mobile */}
      <div className={`mb-3 ${mobileField?'':'d-none'}`}>
        <label className="form-label">Mobile Number</label>
        <input
          type="text"
          className="form-control"
          value={mobile}
          onChange={(e) => setmobile(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className={`mb-3 ${otpField?'':'d-none'}`}>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <label className="form-label">Otp</label>
        </div>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      

      {/* Submit */}
      <div className="mb-3">
        <button type="submit" className="btn btn-lg btn-linear-primary w-100">
          Continue
        </button>
      </div>


      

    </form>
  );
};

export default LoginForm;
