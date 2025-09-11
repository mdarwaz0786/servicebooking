import React, { useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
const LoginForm = () => {

     
    const { Urls, postData } = useContext(AppContext);

    
    
    
  const [mobile, setmobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpField, setotpField] = useState(false);
  const [mobileField, setmobileField] = useState(true);

  const [sendOtpBtn, setsendOtpBtn] = useState(true);
  const [verifyOtpBtn, setverifyOtpBtn] = useState(false);
  

 
    const handleSendOtp = async () => {
      try {
        const response = await postData({mobile:mobile}, Urls.login, "POST");
        if (response.success) {
          setotpField(true);
          setmobileField(false);
          setsendOtpBtn(false);
          setverifyOtpBtn(true);
        } 
      } catch (error) { 
        console.error("Cart API Error:", error);
      }
    }

 
    const handleVerifyOtp = async () => {
      try {
        const response = await postData({otp:otp,mobile:mobile}, Urls.verifyOtp, "POST");
        if (response.success) {
          
        } 
      } catch (error) { 
        console.error("Cart API Error:", error);
      }
    }

  return (
    <form >
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
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      

      {/* Submit */}
      <div className="mb-3">
        <button type="button" className={`btn btn-lg btn-linear-primary w-100 ${sendOtpBtn?'':'d-none'}`} onClick={handleSendOtp}>
          Send Otp
        </button>

        <button type="button" className={`btn btn-lg btn-linear-primary w-100 ${verifyOtpBtn?'':'d-none'}`} onClick={handleVerifyOtp}>
          Verify Otp
        </button>
      </div>


      

    </form>
  );
};

export default LoginForm;
