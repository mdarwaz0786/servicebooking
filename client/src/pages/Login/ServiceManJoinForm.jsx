import React, { useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
const ServiceManJoinForm = () => {

     
    const { Urls, postData, toggleModal } = useContext(AppContext);

    
    
    
  const [mobile, setmobile] = useState("");
  const [otp, setOtp] = useState("");
  const [formTitle, setformTitle] = useState("Enter Mobile Number");
  const [otpField, setotpField] = useState(false);
  const [mobileField, setmobileField] = useState(true);

  const [sendOtpBtn, setsendOtpBtn] = useState(true);
  const [verifyOtpBtn, setverifyOtpBtn] = useState(false);
  

 
    const handleSendOtp = async () => {
      try {
        const response = await postData({mobile:mobile}, Urls.serviceManlogin, "POST");
        if (response.success) {
          setformTitle("Enter Otp")
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
        const response = await postData({otp:otp,mobile:mobile}, Urls.serviceManverifyOtp, "POST");
        if (response.success) {
          setformTitle("Enter Mobile Number")
          setotpField(false);
          setmobileField(true);
          setsendOtpBtn(true);
          setverifyOtpBtn(false);
          setmobile('')
          setOtp('')
          toggleModal("serviceManJoinModal", false)
        } 
      } catch (error) { 
        console.error("Cart API Error:", error);
      }
    }

    const handleEditNumber = async ()=> {
      setformTitle("Edit Mobile Number")
      setotpField(false);
      setmobileField(true);
      setsendOtpBtn(true);
      setverifyOtpBtn(false);
    }

  return (
    <form >
      <div className="text-center mb-3">
        <h3 className="mb-2">Welcome</h3>
        <p>{formTitle}</p>

        {(verifyOtpBtn)?(
          <div className="login-form-number-show">
            <h2>{mobile}</h2>
            <div className="login-form-btn-lr">
              <span onClick={handleEditNumber}>Edit</span>
              <span onClick={handleSendOtp}>Resend</span>
            </div>
          </div>
        ):(null)}

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

export default ServiceManJoinForm;
