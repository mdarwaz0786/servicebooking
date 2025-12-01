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
      description: "Sarvesh Mishra founded Green India Team with a vision to make home appliance repair simple, reliable, and accessible. His strong leadership and commitment to quality have guided the company toward excellence and customer trust.",
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
                {/* <h6>ABOUT OUR COMPANY</h6> */}
                <h6>Sarv Laxmi Green India Private Limited – Delivering Trusted Home Services in Delhi NCR</h6>
                <p>
                  Sarv Laxmi Green India Private Limited is committed to offering reliable, affordable, and expert home services across Delhi NCR. Our mission is to make everyday life easier by bringing skilled professionals straight to your doorstep. With a focus on quality and customer satisfaction, we ensure smooth and stress-free service experiences for every household. 

Green India Team has specialized in the repair and maintenance of home appliances, providing efficient services to households. Our products are quite diverse. We offer Doorstep services like Home Appliance repair services, Cleaning services, Unisex Salon Services, electrician plumber and carpenter, Refrigerators, washing machines, microwaves, etc.


We have a series of skilled technicians in our team with wide experience and know-how to deliver appliances at their optimum performance. We are customer-centric, transparent, and timely with solutions and offer high-quality repairs at reasonable and competitive prices.


In the Green India Team, we have the mission of ensuring that the maintenance of the home appliances is made easy, reliable, and stress-free for all customers.

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
                <h5>1. Book Your Service </h5>
                <p>
                  Choose the service you need, select your preferred time slot, and confirm your booking. The process is quick and requires only a few clicks.
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
                <h5>2. Get a Verified Professional</h5>
                <p>
                  We assign experienced and background-checked professionals for every job. They arrive on time and carry the tools required for the service.
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
                <h5>3. Transparent Payment</h5>
                <p>
                  Once the service is complete, you can pay securely using any preferred payment method. We maintain clear pricing without hidden charges.
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
              <h2 style={{lineHeight: '1',marginBottom: '13px'}}>Why Choose Us - The Smart Choice for Home Services</h2>
              <h6>Skilled and Verified Professionals</h6>
              <p>We work with trained specialists who have expertise in their specific categories. Every professional goes through background verification for customer safety.</p>

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
                      Wide Range of Services
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#faq_accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        From home cleaning to appliance repair, we offer multiple categories under one platform. You can book any service without switching to different providers.
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
                      Quality Assurance
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faq_accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        We follow strict quality standards to ensure consistent service delivery. Our team monitors every job to maintain high customer satisfaction.
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
                      Transparent Pricing
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faq_accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        We provide clear pricing without unexpected charges. Customers always know what they are paying for before the service begins.
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
                      Fast Response and Support
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapse4"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faq_accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Our customer support team responds quickly to queries. We ensure complete guidance throughout the service process.
                      </p>
                    </div>
                  </div>
                </div>


                {/* Accordion Item 5 */}
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
                      Convenient and Reliable
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapse4"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faq_accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        You can book any service at your convenience. We deliver on time and complete every task with professionalism and care.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion Item 6 */}
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
                      Secure and Safe Services
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapse4"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faq_accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        We prioritize safety in all our services. Our professionals follow hygiene protocols and use safe methods while working.
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
