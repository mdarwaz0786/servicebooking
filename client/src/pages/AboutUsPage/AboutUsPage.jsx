import { FaUserTie, FaSmile, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import image from "../../assets/sarvesh_mishra.jpg";
import { Link } from "react-router-dom";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const AboutUsPage = () => {


  const providers = [
    {
      name: "SARVESH KUMAR MISHRA",
      role: "(CEO & FOUNDER)",
      img: "assets/img/profile.jpg",
      description: "Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum.",
    }
  ];


  return (
    <>
        <BreadCrumb data={{title:'About us'}} />
  


      <div className="about-sec">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Image Section */}
            <div className="col-lg-6">
              <div className="about-img d-none d-md-block">
                <div className="about-exp">
                  <span>12+ years of experiences</span>
                </div>
                <div className="abt-img">
                  <img
                    src="assets/img/providers/provider-23.jpg"
                    className="img-fluid"
                    alt="img"
                  />
                </div>
              </div>
            </div>

            {/* Right Content Section */}
            <div className="col-lg-6">
              <div className="about-content">
                <h6>ABOUT OUR COMPANY</h6>
                <h2>Green India Team Services</h2>
                <p>
                  Sarv Laxmi Green India Private Limited and its affiliates (collectively,
                    <strong> GREEN INDIA TEAM </strong>) is focused on revolutionizing the
                    home services industry by combining convenience, quality, and technology.
                    The ability for customers to book services from a variety of categories,
                    all while ensuring a seamless, standardized experience, is a key
                    differentiator. You also place a significant emphasis on empowering
                    service professional Team, providing them with tools and resources to
                    deliver on this promise of quality.
                </p>

                <div className="row">
                  <div className="col-md-6">
                    <ul>
                      <li className="text-truncate">
                        <i className="ti ti-circle-check-filled text-dark me-1"></i>
                        We prioritize quality and reliability
                      </li>
                      <li className="text-truncate">
                        <i className="ti ti-circle-check-filled text-dark me-1"></i>
                        We save your time and effort
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul>
                      <li className="text-truncate">
                        <i className="ti ti-circle-check-filled text-dark me-1"></i>
                        Clear, detailed service listings &amp; reviews
                      </li>
                      <li className="text-truncate">
                        <i className="ti ti-circle-check-filled text-dark me-1"></i>
                        Smooth and satisfactory experience
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
       
      </div>




      <section className="work-section px-0 my-0 work-bg">
      {/* Background Images */}
      <div className="work-bg-2 d-none d-md-block">
        <img src="assets/img/bg/dotted.png" alt="img" className="img-fluid" />
      </div>
      <div className="work-bg-1 d-none d-md-block">
        <img src="assets/img/bg/bg-13.png" alt="img" className="img-fluid" />
      </div>

      <div className="container">
        {/* Section Heading */}
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="section-heading">
              <h2>How It Works</h2>
              <p>
                Straightforward process designed to make your experience seamless
                and hassle-free.
              </p>
            </div>
          </div>
        </div>

        {/* Work Steps */}
        <div className="row">
          {/* Step 1 */}
          <div className="col-md-4 d-flex">
            <div className="card work-box flex-fill">
              <div className="card-body">
                <div className="work-icon">
                  <span>
                    <img
                      src="assets/img/icons/about-hands.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <h5>1. Search and Browse</h5>
                <p>
                  Customers can browse or search for specific products or
                  services using categories, filters, or search bars.
                </p>
                <h4>01</h4>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-md-4 d-flex">
            <div className="card work-box flex-fill">
              <div className="card-body">
                <div className="work-icon">
                  <span>
                    <img
                      src="assets/img/icons/about-documents.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <h5>2. Add to Cart or Book Now</h5>
                <p>
                  Customers can add items to their shopping cart. For services,
                  they may select a service and proceed to book.
                </p>
                <h4>02</h4>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-md-4 d-flex">
            <div className="card work-box flex-fill">
              <div className="card-body">
                <div className="work-icon">
                  <span>
                    <img
                      src="assets/img/icons/about-book.svg"
                      alt="img"
                    />
                  </span>
                </div>
                <h5>3. Amazing Places</h5>
                <p>
                  The customer fulfills the order by either providing the
                  service to the buyer.
                </p>
                <h4>03</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <div className="chooseus-sec">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-md-6">
            <div className="choose-content">
              <h2>Why Choose Us</h2>
              <p>Transforming the way home services are delivered, with cutting-edge technology, expertly trained professionals, and a commitment to excellence, ensuring an experience like never before."</p>

              <div className="accordion" id="faq_accordion">
                {/* Accordion Item 1 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      24/7 Supports
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#faq_accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Access round-the-clock support through our dedicated helpdesk, available 24/7 to address any issues or queries you may have. Whether it’s day or night, our team is here to ensure you receive timely assistance and seamless service.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion Item 2 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
                      Client’s Reviews
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faq_accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Access round-the-clock support through our dedicated helpdesk, available 24/7 to address any issues or queries you may have. Whether it’s day or night, our team is here to ensure you receive timely assistance and seamless service.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion Item 3 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                    >
                      Professional Team
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faq_accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Access round-the-clock support through our dedicated helpdesk, available 24/7 to address any issues or queries you may have. Whether it’s day or night, our team is here to ensure you receive timely assistance and seamless service.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion Item 4 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapse4"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapse4"
                    >
                      Best Services
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapse4"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faq_accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Access round-the-clock support through our dedicated helpdesk, available 24/7 to address any issues or queries you may have. Whether it’s day or night, our team is here to ensure you receive timely assistance and seamless service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-md-6">
            <div className="chooseus-img">
              <img
                src="assets/img/services/service-75.jpg"
                className="img-fluid"
                alt="img"
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="row justify-content-center">
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="choose-icon">
              <img
                src="assets/img/icons/group-stars.svg"
                className="img-fluid"
                alt="img"
              />
              <div className="choose-info">
                <h3>500+</h3>
                <p>Trained Professionals</p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="choose-icon">
              <img
                src="assets/img/icons/expert-team.svg"
                className="img-fluid"
                alt="img"
              />
              <div className="choose-info">
                <h3>5000+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="choose-icon">
              <img
                src="assets/img/icons/about-documents.svg"
                className="img-fluid"
                alt="img"
              />
              <div className="choose-info">
                <h3>6</h3>
                <p>Cities</p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="choose-icon border-0">
              <img
                src="assets/img/icons/expereience.svg"
                className="img-fluid"
                alt="img"
              />
              <div className="choose-info">
                <h3>1</h3>
                <p>Country</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                    
    
    
    <section className="providers-section abt-provider">
      <div className="container">
        <div className="section-heading">
          <div className="row">
            <div className="col-md-6">
              <h2 className="fs-32">Our Leadership Team</h2>
            </div>
          </div>
        </div>

        <div className="row">
          {providers.map((provider, index) => (
            <div className="col-lg-6 col-md-6 col-sm-6 m-auto" key={index}>
              <div className="card providerset p-0 flex-fill">
                <div className="card-body row">
                  <div className="providerset-img col-4">
                    <a href="provider-details.html">
                      <img src={provider.img} alt={provider.name} />
                    </a>
                  </div>

                  <div className="providerset-content col-8">
                    <div className="providerset-price">
                      <div className="d-flex justify-content-between align-items-center flex-fill">
                        <div className="providerset-name">
                          <h4 className="d-flex align-items-center">
                            <a
                              href="provider-details.html"
                              className="me-1 text-truncate"
                            >
                              {provider.name}
                            </a>
                            <i className="ti ti-circle-check-filled text-success"></i>
                          </h4>
                          <span>{provider.role}</span>
                          <p>{provider.description}</p>
                        </div>
                        
                      </div>
                    </div>

                  
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      



      

   
   
    </>
  );
};

export default AboutUsPage;
