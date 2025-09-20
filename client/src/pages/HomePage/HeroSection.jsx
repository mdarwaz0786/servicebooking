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
                </div>
                <div className="card card-body  shadow-none bg-transparent">
                  <div className="row hero-category">
                      <>
                        <CategoryMiniCard3 data={categoryData} handleSubCategory={handleSubCategory} className={'col-md-4 hero-category'} />
                      </>                    
                  </div>
                </div>
               
                <div className="d-flex align-items-center flex-wrap banner-info">
                  <div className="d-flex align-items-center me-4 mt-4">
                    <img src="assets/img/icons/success-01.svg" alt="icon" />
                    <div className="ms-2">
                      <h6>215,292 +</h6>
                      <p>Customers </p>
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
            <div className="col-md-6" data-wow-duration="1s" data-wow-delay=".25s">
              <div className="row hero-images">
                <div className="col-md-6">
                  <img src="/assets/img/home/hero/img1.jpg"/>
                </div>
                <div className="col-md-6">
                  <img src="/assets/img/home/hero/img2.jpg"/>
                </div>
                <div className="col-md-6">
                  <img src="/assets/img/home/hero/img3.jpg"/>
                </div>
                <div className="col-md-6">
                  <img src="/assets/img/home/hero/img4.jpg"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
