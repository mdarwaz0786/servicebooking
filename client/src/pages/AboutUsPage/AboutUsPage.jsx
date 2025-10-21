import { FaUserTie, FaSmile, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import image from "../../assets/sarvesh_mishra.jpg";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <div className="container py-5">
      {/* About Us Section */}
      <div className="mb-5">
        <h4 className="fw-bold mb-3">About us</h4>
        <p className="text-muted">
          Sarv Laxmi Green India Private Limited and its affiliates (collectively,
          <strong> GREEN INDIA TEAM </strong>) is focused on revolutionizing the
          home services industry by combining convenience, quality, and technology.
          The ability for customers to book services from a variety of categories,
          all while ensuring a seamless, standardized experience, is a key
          differentiator. You also place a significant emphasis on empowering
          service professional Team, providing them with tools and resources to
          deliver on this promise of quality.
        </p>
      </div>

      {/* Vision Section */}
      <div className="mb-5">
        <h4 className="fw-bold mb-3">Our Vision</h4>
        <p className="text-muted">
          Transforming the way home services are delivered, with cutting-edge
          technology, expertly trained professionals, and a commitment to
          excellence, ensuring an experience like never before."
        </p>

        <div className="row text-center mt-4">
          <div className="col-md-3 col-6 mb-3">
            <FaUserTie size={28} className="mb-2" />
            <h6 className="fw-bold">500+</h6>
            <p className="text-muted mb-0">Trained Professionals</p>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <FaSmile size={28} className="mb-2" />
            <h6 className="fw-bold">5000+</h6>
            <p className="text-muted mb-0">Happy Customers</p>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <FaMapMarkerAlt size={28} className="mb-2" />
            <h6 className="fw-bold">6</h6>
            <p className="text-muted mb-0">Cities</p>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <FaGlobe size={28} className="mb-2" />
            <h6 className="fw-bold">1</h6>
            <p className="text-muted mb-0">Country</p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div>
        <h4 className="fw-bold mb-4">Our Leadership Team</h4>
        <div className="row">
          {/* Leader Card 1 */}
          <div className="col-md-6 mb-4 d-flex">
            <div className="card border-0 flex-row align-items-center shadow-sm p-3 rounded-3 w-100">
              <img
                src={image}
                alt="leader"
                className="rounded-3 me-3"
                style={{ width: "150px", height: "auto", objectFit: "cover" }}
              />
              <div>
                <h6 className="fw-bold mb-1">SARVESH KUMAR MISHRA</h6>
                <p className="text-muted mb-2">(CEO & FOUNDER)</p>
                <p className="text-muted small mb-2">
                  Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum
                  ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum.
                </p>
                <div>
                  <Link to="#" className="text-dark me-2">
                    <FaLinkedin />
                  </Link>
                  <Link to="#" className="text-dark">
                    <FaInstagram />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Leader Card 2 */}
          <div className="col-md-6 mb-4 d-flex">
            <div className="card border-0 flex-row align-items-center shadow-sm p-3 rounded-3 w-100">
              <img
                src={image}
                alt="leader"
                className="rounded-3 me-3"
                style={{ width: "150px", height: "auto", objectFit: "cover" }}
              />
              <div>
                <h6 className="fw-bold mb-1">SARVESH KUMAR MISHRA</h6>
                <p className="text-muted mb-2">(CEO & FOUNDER)</p>
                <p className="text-muted small mb-2">
                  Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum
                  ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum.
                </p>
                <div>
                  <Link to="#" className="text-dark me-2">
                    <FaLinkedin />
                  </Link>
                  <Link to="#" className="text-dark">
                    <FaInstagram />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
