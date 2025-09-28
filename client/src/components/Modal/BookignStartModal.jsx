import React, { useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import { AppContext } from "../../context/AppContext";

const BookignStartModal = ({ bookingId }) => {
  const { modals, toggleModal, Urls, postData } = useContext(AppContext);

  const webcamRef = useRef(null);
  const [selfie, setSelfie] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Take selfie from webcam
  const captureSelfie = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelfie(imageSrc);
  };

  // Submit selfie and request OTP
  const handleSubmitSelfie = async () => {
    if (!selfie) return alert("Please capture a selfie first");
    setLoading(true);
    try {
      const response = await postData(
        { selfie },
        `${Urls.serviceManBookingOtp}/${bookingId}`,
        "POST",
        0,
        0
      );
      setOtpSent(true);
    } catch (error) {
      console.error("OTP Request Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP + selfie
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Please enter OTP");
    setLoading(true);
    try {
      const response = await postData(
        { selfie, otp },
        `${Urls.serviceManBookingOtpVerify}/${bookingId}`,
        "POST",
        0,
        0
      );
      toggleModal("BookignStartModal", false);
    } catch (error) {
      console.error("Verify Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Inline CSS for round selfie */}
      <style>{`
        .selfie-round {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          object-fit: cover;
          overflow: hidden;
          border: 3px solid #00bfa5; /* optional border */
          display: block;
          margin: 0 auto;
        }
      `}</style>

      <div
        className={`modal fade ${modals.BookignStartModal ? "show" : ""}`}
        id="provider"
        style={{ display: modals.BookignStartModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between">
              <h5>Booking Start Verification</h5>
              <a
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => toggleModal("BookignStartModal", false)}
              >
                <i className="ti ti-circle-x-filled fs-20"></i>
              </a>
            </div>

            <div className="wizard-fieldset p-4 text-center">
              {!otpSent ? (
                <>
                  {/* Webcam for capturing selfie */}
                  {!selfie ? (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={300}
                        videoConstraints={{ facingMode: "user" }}
                        className="selfie-round"  // ✅ round webcam
                      />
                      
                        <button
                          className="btn btn-primary mt-3 w-25"
                          onClick={captureSelfie}
                        >
                          Capture Selfie
                        </button>
                      
                    </>
                  ) : (
                    <>
                      <img
                        src={selfie}
                        alt="Selfie Preview"
                        className="img-fluid selfie-round" // ✅ round captured image
                      />
                      <button
                        className="btn btn-secondary mt-3"
                        onClick={() => setSelfie(null)}
                      >
                        Retake
                      </button>
                      <button
                        className="btn btn-success mt-3 w-25"
                        onClick={handleSubmitSelfie}
                        disabled={!selfie || loading}
                      >
                        {loading ? "Sending OTP..." : "Submit & Send OTP"}
                      </button>
                    </>
                  )}

                  
                </>
              ) : (
                <>
                  <img
                    src={selfie}
                    alt="Selfie Preview"
                    className="img-fluid selfie-round mb-3" // ✅ round preview in OTP step
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    className="btn btn-success"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookignStartModal;
