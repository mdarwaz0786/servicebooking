import { Link } from "react-router-dom";

const FeaturedServices = () => {
  return (
    <section className="section service-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-center">
              <h2 className="mb-1">Our Featured <span className="text-linear-primary">Services</span></h2>
              <p className="sub-title">Each listing is designed to be clear and concise, providing customers</p>
            </div>
          </div>
        </div>
        <div className="service-slider owl-carousel nav-center">
          <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-01.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-02.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-03.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
              </div>
              <div className="trend-icon">
                <span className="bg-success">
                  <i className="feather-trending-up" />
                </span>
              </div>
              <div className="fav-item">
                <Link to="/javascript:void(0);" className="fav-icon">
                  <i className="ti ti-heart" />
                </Link>
              </div>
            </div>
            <div className="service-content">
              <h6 className="text-truncate mb-1"><Link to="/service-details">Professional Delivery Services</Link>
              </h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fw-medium fs-14 mb-0">Service starts at $40</p>
                <span className="d-inline-flex align-items-center fs-14"><i className="ti ti-star-filled text-warning me-1" />4.5</span>
              </div>
            </div>
          </div>
          <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-04.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-05.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-06.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
              </div>
              <div className="trend-icon">
                <span className="bg-success">
                  <i className="feather-trending-up" />
                </span>
              </div>
              <div className="fav-item">
                <Link to="/javascript:void(0);" className="fav-icon">
                  <i className="ti ti-heart" />
                </Link>
              </div>
            </div>
            <div className="service-content">
              <h6 className="text-truncate mb-1"><Link to="/service-details">Classic Manicure &amp; Set of
                Nails</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fw-medium fs-14 mb-0">Service starts at $20</p>
                <span className="d-inline-flex align-items-center fs-14"><i className="ti ti-star-filled text-warning me-1" />4.4</span>
              </div>
            </div>
          </div>
          <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-07.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-08.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-09.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
              </div>
              <div className="fav-item">
                <Link to="/javascript:void(0);" className="fav-icon">
                  <i className="ti ti-heart" />
                </Link>
              </div>
            </div>
            <div className="service-content">
              <h6 className="text-truncate mb-1"><Link to="/service-details">Water Heater Installation</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fw-medium fs-14 mb-0">Service starts at $65</p>
                <span className="d-inline-flex align-items-center fs-14"><i className="ti ti-star-filled text-warning me-1" />4.2</span>
              </div>
            </div>
          </div>
          <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-10.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-11.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-12.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
              </div>
              <div className="fav-item">
                <Link to="/javascript:void(0);" className="fav-icon">
                  <i className="ti ti-heart" />
                </Link>
              </div>
            </div>
            <div className="service-content">
              <h6 className="text-truncate mb-1"><Link to="/service-details">General House &amp; Carpet Clean</Link>
              </h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fw-medium fs-14 mb-0">Service starts at $95</p>
                <span className="d-inline-flex align-items-center fs-14"><i className="ti ti-star-filled text-warning me-1" />4.7</span>
              </div>
            </div>
          </div>
          <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-16.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-17.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-18.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
              </div>
              <div className="fav-item">
                <Link to="/javascript:void(0);" className="fav-icon">
                  <i className="ti ti-heart" />
                </Link>
              </div>
            </div>
            <div className="service-content">
              <h6 className="text-truncate mb-1"><Link to="/service-details">Custom PC Builds</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fw-medium fs-14 mb-0">Service starts at $85</p>
                <span className="d-inline-flex align-items-center fs-14"><i className="ti ti-star-filled text-warning me-1" />4.8</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-center wow fadeInUp" data-wow-delay="0.2s">
              <Link to="/services" className="btn btn-dark">View All<i className="ti ti-arrow-right ms-2" /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;