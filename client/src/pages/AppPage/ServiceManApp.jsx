import { FaUserTie, FaSmile, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaApple, FaGooglePlay, FaQrcode, FaMobileAlt, FaShieldAlt, FaBolt, FaHeadset } from "react-icons/fa";
import image from "../../assets/sarvesh_mishra.jpg";
import { Link } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";

const ServiceManApp = () => {


  const { Urls, postData } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const response = await postData({}, Urls.AppUrl, "GET", 0, 1);
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Detail Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }


  return (
    <>
      <BreadCrumb data={{ title: 'Download Partner App' }} />

      {/* Hero Section */}
      <div className="app-hero-section py-5" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 m-auto text-center">
              <div className="app-hero-content">
                <h1 className="display-5 fw-bold mb-4">
                  Download <span className="text-success">Green India Team</span> Partner App
                </h1>
                <p className="lead mb-4">
                  Join our network of skilled service professionals. Get access to service requests, manage appointments, and grow your business with Green India Team.
                </p>

                {/* App Download Buttons */}
                <div className="app-download-buttons mb-1">
                  <h5 className="mb-3">Download Now</h5>
                  <div className="d-flex flex-wrap gap-3 justify-content-center">
                    <a
                      href={data?.serviceman?.android}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-dark btn-lg d-flex align-items-center gap-2 py-3 px-4 shadow"
                      style={{ borderRadius: '12px' }}
                    >
                      <FaGooglePlay size={28} />
                      <div className="d-flex flex-column text-start">
                        <small className="opacity-75">GET IT ON</small>
                        <span className="fw-bold">Google Play</span>
                      </div>
                    </a>

                    {/* <a
                      href={data?.serviceman?.ios}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-dark btn-lg d-flex align-items-center gap-2 py-3 px-4 shadow"
                      style={{ borderRadius: '12px' }}
                    >
                      <FaApple size={28} />
                      <div className="d-flex flex-column text-start">
                        <small className="opacity-75">Download on the</small>
                        <span className="fw-bold">App Store</span>
                      </div>
                    </a> */}
                  </div>
                </div>


              </div>
            </div>


          </div>
        </div>
      </div>


    </>
  );
};

export default ServiceManApp;