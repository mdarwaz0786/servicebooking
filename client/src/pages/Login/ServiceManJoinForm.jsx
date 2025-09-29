import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";


const ServiceManJoinForm = () => {
  const { Urls, postData, toggleModa, toast } = useContext(AppContext);

  const [mobile, setmobile] = useState("");
  const [otp, setOtp] = useState("");
  const [formTitle, setformTitle] = useState("Enter Mobile Number");
  const [otpField, setotpField] = useState(false);
  const [mobileField, setmobileField] = useState(true);

  const [sendOtpBtn, setsendOtpBtn] = useState(true);
  const [verifyOtpBtn, setverifyOtpBtn] = useState(false);

  const handleSendOtp = async () => {
    if (!mobile) {
      toast.error("Enter Mobile No.");
      return false;
    }
    try {
      const response = await postData({ mobile }, Urls.serviceManlogin, "POST");
      if (response.success) {
        setformTitle("Enter OTP");
        setotpField(true);
        setmobileField(false);
        setsendOtpBtn(false);
        setverifyOtpBtn(true);
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return false;
    }
    try {
      const response = await postData({ otp, mobile }, Urls.serviceManverifyOtp, "POST");
      if (response.success) {
        setformTitle("Enter Mobile Number");
        setotpField(false);
        setmobileField(true);
        setsendOtpBtn(true);
        setverifyOtpBtn(false);
        setmobile("");
        setOtp("");
        toggleModal("serviceManJoinModal", false);
      }
    } catch (error) {
      console.error("Verify OTP Error:", error);
    }
  };

  const handleEditNumber = () => {
    setformTitle("Edit Mobile Number");
    setotpField(false);
    setmobileField(true);
    setsendOtpBtn(true);
    setverifyOtpBtn(false);
  };

  return (
    
      <div
        className="card shadow-lg border-0 p-4 m-0 rounded-4"
        style={{ width: "100%" }}
      >
        {/* Logo Section */}
        <div className="text-center mb-4">
          <img src="/assets/img/logo.png" alt="Green India Team" style={{ height: "55px" }} />
          <h4 className="mt-3 fw-bold text-success">Join as Service Man</h4>
          <p className="text-muted">{formTitle}</p>
        </div>

        {/* Show Mobile after OTP sent */}
        {verifyOtpBtn && (
          <div className="text-center mb-3 bg-light rounded-3 py-2">
            <h5 className="fw-bold text-dark">{mobile}</h5>
            <div className="d-flex justify-content-center gap-3 mt-2">
              <span className="text-primary cursor-pointer" onClick={handleEditNumber}>
                Edit
              </span>
              <span className="text-success cursor-pointer" onClick={handleSendOtp}>
                Resend
              </span>
            </div>
          </div>
        )}

        {/* Mobile Input */}
        <div className={`mb-3 ${mobileField ? "" : "d-none"}`}>
          <label className="form-label fw-semibold">Mobile Number</label>
          <input
            type="text"
            className="form-control form-control-lg rounded-3"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
          />
        </div>

        {/* OTP Input */}
        <div className={`mb-3 ${otpField ? "" : "d-none"}`}>
          <label className="form-label fw-semibold">OTP</label>
          <input
            type="password"
            className="form-control form-control-lg rounded-3"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="d-grid">
          {sendOtpBtn && (
            <button
              type="button"
              className="btn btn-lg btn-success rounded-3 fw-bold shadow-sm"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          )}
          {verifyOtpBtn && (
            <button
              type="button"
              className="btn btn-lg btn-primary rounded-3 fw-bold shadow-sm"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          )}
        </div>
      </div>

  );
};

export default ServiceManJoinForm;
