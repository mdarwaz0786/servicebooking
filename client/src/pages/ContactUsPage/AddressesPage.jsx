import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddressesPage = () => {
  const { Urls, postData, toast } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mobile) {
      toast.error("Enter Mobile No.");
      return false;
    }
    try {
      const response = await postData(formData, Urls.contactEnquiry, "POST");
      if (response.success) {
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <>
      <BreadCrumb data={{ title: "Office Addresses" }} />

      <div className="container py-5" style={{ maxWidth: 1200 }}>
        

        {/* CONTACT CARDS */}
        <div className="row g-4 mb-5">
          <div className="col-md-4 m-auto">
            <div className="shadow-sm p-4 rounded-3 bg-white text-center h-100 hover-card">
              <div className="icon-box bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: 60, height: 60 }}>
                <FaMapMarkerAlt className="text-primary fs-4" />
              </div>
              <h6 className="fw-semibold">Head office address</h6>
              <p className="text-muted mt-2">First floor, Lotus building, kh.no.365, Sultanpur, New Delhi, 110030</p>
            </div>
          </div>

          <div className="col-md-12 mt-3">
            <div className="shadow-sm rounded-3 overflow-hidden bg-white">
              <iframe
                title="Green India Team Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2771.3665711897197!2d77.15764397428771!3d28.496384690252437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ffa1978b437%3A0xe38d18a0f1ae45b5!2sGreen%20India%20Team!5e1!3m2!1sen!2sin!4v1761026597772!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>


        </div>

        
      </div>

      {/* CSS For Hover Effects */}
      <style>{`
        .hover-card:hover {
          transform: translateY(-5px);
          transition: 0.3s;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1) !important;
        }
          .contact-p {
            font-size: 13px;
            line-height: 1.3;
            margin-top: 8px;
        }
      `}</style>
    </>
  );
};

export default AddressesPage;
