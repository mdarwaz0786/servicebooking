import { Link } from "react-router-dom";
import CategoryMiniCard3 from "../../components/Category/CategoryMiniCard3";

const HeroSection = ({categoryData, handleSubCategory}) => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content position-relative overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".25s">
                <h1 className="mb-2">Connect with Nearby Top-rated Professional <span className="typed" data-type-text="Carpenters" /></h1>

                <div className="banner-form bg-white border mb-3">
                  <form action="#">
                    <div className="d-md-flex align-items-center">
                      <div className="input-group mb-2">
                        <span className="input-group-text px-1"><i className="ti ti-search" /></span>
                        <input type="text" className="form-control" placeholder="Search for Service" />
                      </div>
                      <div className="input-group mb-2">
                        <span className="input-group-text px-1"><i className="ti ti-map-pin" /></span>
                        <input type="text" className="form-control" placeholder="Enter Location" />
                      </div>
                      <div className="mb-2">
                        <Link to="/search" className="btn btn-linear-primary d-inline-flex align-items-center w-100">
                          <i className="feather-search me-2" />
                          Search
                        </Link>
                      </div>
                    </div>
                  </form>
                  <img src="assets/img/bg/bg-06.svg" alt="img" className="shape-06 round-animate" />
                </div>
                <div className="card card-body">
                  <div className="row">
                      <>
                        <CategoryMiniCard3 data={categoryData} handleSubCategory={handleSubCategory} />
                      </>                    
                  </div>
                </div>
               
                <div className="d-flex align-items-center flex-wrap banner-info">
                  <div className="d-flex align-items-center me-4 mt-4">
                    <img src="assets/img/icons/success-01.svg" alt="icon" />
                    <div className="ms-2">
                      <h6>215,292 +</h6>
                      <p>Verified Providers</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center me-4 mt-4">
                    <img src="assets/img/icons/success-02.svg" alt="icon" />
                    <div className="ms-2">
                      <h6>90,000+</h6>
                      <p>Services Completed</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center me-4 mt-4">
                    <img src="assets/img/icons/success-03.svg" alt="icon" />
                    <div className="ms-2">
                      <h6>2,390,968 </h6>
                      <p>Reviews Globally</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner-img wow fadeInUp" data-wow-duration="1s" data-wow-delay=".25s">
              <img src="assets/img/banner.png" alt="img" className="img-fluid animation-float" />
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="d-inline-flex bg-white p-2 rounded align-items-center shape-01 floating-x">
            <span className="avatar avatar-md bg-warning rounded-circle me-2"><i className="ti ti-star-filled" /></span>
            <span>4.9 / 5<small className="d-block">(255 reviews)</small></span>
            <i className="border-edge" />
          </div>
          <div className="d-inline-flex bg-white p-2 rounded align-items-center shape-02 floating-x">
            <span className="me-2"><img src="assets/img/icons/tick-banner.svg" alt /></span>
            <p className="fs-12 text-dark mb-0">300 Booking Completed</p>
            <i className="border-edge" />
          </div>
          <img src="assets/img/bg/bg-03.svg" alt="img" className="shape-03" />
          <img src="assets/img/bg/bg-04.svg" alt="img" className="shape-04" />
          <img src="assets/img/bg/bg-05.svg" alt="img" className="shape-05" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
