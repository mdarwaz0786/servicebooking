import React, { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const LoginForm = () => {
  const { Urls, postData, toast, generateUniqueId, handleHome } = useContext(AppContext);

  const [mobile, setmobile] = useState("");
  const [otp, setOtp] = useState("");
  const [formTitle, setformTitle] = useState("Enter Mobile Number");
  const [otpField, setotpField] = useState(false);
  const [mobileField, setmobileField] = useState(true);

  const [sendOtpBtn, setsendOtpBtn] = useState(true);
  const [verifyOtpBtn, setverifyOtpBtn] = useState(false);

  const otpInputRef = useRef(null);
  const mobileInputRef = useRef(null);

  // 🔥 Resend OTP Timer (NEW)
  const [resendTimer, setResendTimer] = useState(0);

  // Timer Auto decrease
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleSendOtp = async (isResend = null) => {
    if (!mobile) {
      toast.error("Enter Mobile No.");
      return false;
    }
    try {
      const response = await postData({ mobile }, Urls.login, "POST", 0, 1);
      if (response.success) {
        setformTitle("Enter Otp");
        setotpField(true);
        setmobileField(false);
        setsendOtpBtn(false);
        setverifyOtpBtn(true);

        // 🟢 Timer start (30 sec)
        setResendTimer(30);

        setTimeout(() => {
          otpInputRef.current?.focus();
        }, 100);

        if (!isResend) toast.success("Otp send to mobile number");
        else toast.success("OTP resent successfully");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return false;
    }
    try {
      const response = await postData({ otp, mobile, userId: generateUniqueId() }, Urls.verifyOtp, "POST");
      if (response.success) {
        setformTitle("Enter Mobile Number");
        setotpField(false);
        setmobileField(true);
        setsendOtpBtn(true);
        setverifyOtpBtn(false);
        setmobile("");
        setOtp("");
        window.location.reload();
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
    setTimeout(() => {
      mobileInputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="card shadow-lg border-0 m-0 p-4 rounded-4" style={{ width: "100%" }}>

      <div className="text-center mb-1">
        <img src="/assets/img/logo.png" alt="Green India Team" style={{ height: "60px" }} />
      </div>

      {/* Show Mobile for verification */}
      {verifyOtpBtn && (
        <div className="text-center mb-3 bg-light rounded-3 py-2">
          <h5 className="fw-bold text-dark">{mobile}</h5>
          <div className="d-flex justify-content-center gap-3 mt-2">

            {/* EDIT NUMBER */}
            <span className="text-primary cursor-pointer" onClick={handleEditNumber}>
              Edit
            </span>

            {/* 🔥 RESEND OTP WITH TIMER */}
            {resendTimer === 0 ? (
              <span
                className="text-success cursor-pointer"
                onClick={() => handleSendOtp(1)}
              >
                Resend
              </span>
            ) : (
              <span className="text-muted">
                Resend in {resendTimer}s
              </span>
            )}

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
          ref={mobileInputRef}
          onChange={(e) => setmobile(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendOtp();
            }
          }}
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
          ref={otpInputRef}
          onChange={(e) => setOtp(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleVerifyOtp();
            }
          }}
        />
      </div>

      {/* Buttons */}
      <div className="d-grid">
        {sendOtpBtn && (
          <button
            type="button"
            className="btn btn-lg btn-success rounded-3 fw-bold shadow-sm"
            onClick={() => handleSendOtp()}
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

export default LoginForm;
