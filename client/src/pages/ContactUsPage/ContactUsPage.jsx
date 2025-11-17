import { useContext, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const ContactUsPage = () => {
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
        // setformTitle("Enter Otp");
        
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <>
    <BreadCrumb data={{title:'Contact us'}} />
    
    <div className="container py-5">
      <div className="contact-details">
        <div className="row justify-content-center">
          {/* Phone Number */}
          <div className="col-md-6 col-lg-4 d-flex">
            <div className="card flex-fill">
              <div className="card-body align-items-center d-flex">
                <div className="d-flex align-items-center">
                  <span className="rounded-circle">
                    <i className="contact-icon ti ti-phone text-primary"></i>
                  </span>
                  <div className="ms-3">
                    <h6 className="fs-18 mb-1">Phone Number</h6>
                    <p className="fs-14 mb-0">+91-80-90-400-401</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div className="col-md-6 col-lg-4 d-flex">
            <div className="card flex-fill">
              <div className="card-body align-items-center d-flex">
                <div className="d-flex align-items-center">
                  <span className="rounded-circle">
                    <i className="contact-icon ti ti-mail text-primary"></i>
                  </span>
                  <div className="ms-3">
                    <h6 className="fs-18 mb-1">Email Address</h6>
                    <p className="fs-14 mb-0">greenindiateam2022@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="col-md-6 col-lg-4 d-flex">
            <div className="card flex-fill">
              <div className="card-body align-items-center d-flex">
                <div className="d-flex align-items-center">
                  <span className="rounded-circle">
                    <i className="contact-icon ti ti-map-pin text-primary"></i>
                  </span>
                  <div className="ms-3">
                    <h6 className="fs-18 mb-1">Address</h6>
                    <p className="fs-14 mb-0">
                      First floor, Lotus building, kh.no.365, Sultanpur, New Delhi, Delhi 110030
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row align-items-start mt-4">
        {/* Left Side - Contact Form */}
        <div className="col-md-6 mb-4">
          <form onSubmit={handleSubmit} >
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-1"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control rounded-1"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-1"
                placeholder="Your Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-1"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control rounded-1"
                rows="4"
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-dark text-uppercase px-4 py-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side - Map & Info */}
        <div className="col-md-6">
          <div className="mb-3">
            <iframe
              title="Green India Team Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2771.3665711897197!2d77.15764397428771!3d28.496384690252437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ffa1978b437%3A0xe38d18a0f1ae45b5!2sGreen%20India%20Team!5e1!3m2!1sen!2sin!4v1761026597772!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUsPage;
