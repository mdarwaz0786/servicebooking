import { Link } from "react-router-dom";

const PreferredServices = () => {
  return (
    <section className="section pt-0 pb-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 text-center wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-center">
              <h2 className="mb-1">Most <span className="text-linear-primary">Preferred Services</span></h2>
              <p className="sub-title">Each listing is designed to be clear and concise, providing customers</p>
            </div>
          </div>
        </div>
        <div className="popular-slider-3 owl-carousel nav-center">
          <div className="service-item">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
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
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to="/provider-details" className="d-flex align-items-center mb-2 service-pro-info">
                  <span className="avatar avatar-sm me-2">
                    <img src="assets/img/profiles/avatar-05.jpg" alt="img" className="img-fluid rounded-circle" />
                  </span>
                  <p className="fs-14">Trivala Anderson</p>
                </Link>
                <small className="mb-2">From $350</small>
              </div>
              <h6 className="mb-2"><Link to="/javascript:void(0);">Cabinet Installation</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254 Reviews)
                </p>
                <span className="badge badge-dark-transparent fw-medium p-2">3K Bookings</span>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-24.jpg" className="img-fluid" alt="img" />
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
              <div className="fav-item">
                <Link to="/javascript:void(0);" className="fav-icon">
                  <i className="ti ti-heart" />
                </Link>
              </div>
            </div>
            <div className="service-content">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to="/provider-details" className="d-flex align-items-center mb-2 service-pro-info">
                  <span className="avatar avatar-sm me-2">
                    <img src="assets/img/profiles/avatar-17.jpg" alt="img" className="img-fluid rounded-circle" />
                  </span>
                  <p className="fs-14">William Tichenor</p>
                </Link>
                <small className="mb-2">From $350</small>
              </div>
              <h6 className="mb-2"><Link to="/javascript:void(0);">Express Car Wash</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.6 (214 Reviews)
                </p>
                <span className="badge badge-dark-transparent fw-medium p-2">2K Bookings</span>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-25.jpg" className="img-fluid" alt="img" />
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
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to="/provider-details" className="d-flex align-items-center mb-2 service-pro-info">
                  <span className="avatar avatar-sm me-2">
                    <img src="assets/img/profiles/avatar-16.jpg" alt="img" className="img-fluid rounded-circle" />
                  </span>
                  <p className="fs-14">Edwin Murphy</p>
                </Link>
                <small className="mb-2">From $280</small>
              </div>
              <h6 className="mb-2"><Link to="/javascript:void(0);">Haircut and Styling</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.7 (230 Reviews)
                </p>
                <span className="badge badge-dark-transparent fw-medium p-2">2K Bookings</span>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-50.jpg" className="img-fluid" alt="img" />
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
                <Link to="/javascript:void(0);" className="avatar avatar-md">
                  <img src="assets/img/profiles/avatar-01.jpg" className="rounded-circle" alt="User" />
                </Link>
                <Link to="/javascript:void(0);" className="fav-icon">
                  <i className="ti ti-heart" />
                </Link>
              </div>
            </div>
            <div className="service-content">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to="/provider-details" className="d-flex align-items-center mb-2 service-pro-info">
                  <span className="avatar avatar-sm me-2">
                    <img src="assets/img/profiles/avatar-06.jpg" alt="img" className="img-fluid rounded-circle" />
                  </span>
                  <p className="fs-14">Wesley McClure</p>
                </Link>
                <small className="mb-2">From $400</small>
              </div>
              <h6 className="mb-2"><Link to="/javascript:void(0);">Roofing Services</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.4 (123 Reviews)
                </p>
                <span className="badge badge-dark-transparent fw-medium p-2">4K Bookings</span>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-47.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-48.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-49.jpg" className="img-fluid" alt="img" />
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
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to="/provider-details" className="d-flex align-items-center mb-2 service-pro-info">
                  <span className="avatar avatar-sm me-2">
                    <img src="assets/img/profiles/avatar-09.jpg" alt="img" className="img-fluid rounded-circle" />
                  </span>
                  <p className="fs-14">James Reese</p>
                </Link>
                <small className="mb-2">From $180</small>
              </div>
              <h6 className="mb-2"><Link to="/service-details">Pure Home Cleaning</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.2 (300 Reviews)
                </p>
                <span className="badge badge-dark-transparent fw-medium p-2">1K Bookings</span>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-51.jpg" className="img-fluid" alt="img" />
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
              <div className="fav-item">
                <Link to="/javascript:void(0);" className="fav-icon">
                  <i className="ti ti-heart" />
                </Link>
              </div>
            </div>
            <div className="service-content">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to="/provider-details" className="d-flex align-items-center mb-2 service-pro-info">
                  <span className="avatar avatar-sm me-2">
                    <img src="assets/img/profiles/avatar-25.jpg" alt="img" className="img-fluid rounded-circle" />
                  </span>
                  <p className="fs-14">Kimberly Carey</p>
                </Link>
                <small className="mb-2">From $120</small>
              </div>
              <h6 className="mb-2"><Link to="/service-details">Crystal Shine Manicure</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.4 (270 Reviews)
                </p>
                <span className="badge badge-dark-transparent fw-medium p-2">2K Bookings</span>
              </div>
            </div>
          </div>
        </div>
        <div className="popular-slider-3 owl-carousel nav-center">
          <div className="service-item">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
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
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to="/provider-details" className="d-flex align-items-center mb-2 service-pro-info">
                  <span className="avatar avatar-sm me-2">
                    <img src="assets/img/profiles/avatar-05.jpg" alt="img" className="img-fluid rounded-circle" />
                  </span>
                  <p className="fs-14">Trivala Anderson</p>
                </Link>
                <small className="mb-2">From $350</small>
              </div>
              <h6 className="mb-2"><Link to="/javascript:void(0);">Cabinet Installation</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254 Reviews)
                </p>
                <span className="badge badge-dark-transparent fw-medium p-2">3K Bookings</span>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
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
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to="/provider-details" className="d-flex align-items-center mb-2 service-pro-info">
                  <span className="avatar avatar-sm me-2">
                    <img src="assets/img/profiles/avatar-05.jpg" alt="img" className="img-fluid rounded-circle" />
                  </span>
                  <p className="fs-14">Trivala Anderson</p>
                </Link>
                <small className="mb-2">From $350</small>
              </div>
              <h6 className="mb-2"><Link to="/javascript:void(0);">Cabinet Installation</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254 Reviews)
                </p>
                <span className="badge badge-dark-transparent fw-medium p-2">3K Bookings</span>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
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
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to="/provider-details" className="d-flex align-items-center mb-2 service-pro-info">
                  <span className="avatar avatar-sm me-2">
                    <img src="assets/img/profiles/avatar-05.jpg" alt="img" className="img-fluid rounded-circle" />
                  </span>
                  <p className="fs-14">Trivala Anderson</p>
                </Link>
                <small className="mb-2">From $350</small>
              </div>
              <h6 className="mb-2"><Link to="/javascript:void(0);">Cabinet Installation</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254 Reviews)
                </p>
                <span className="badge badge-dark-transparent fw-medium p-2">3K Bookings</span>
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-img">
              <div className="img-slider owl-carousel nav-center">
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
                  </Link>
                </div>
                <div className="slide-images">
                  <Link to="/service-details">
                    <img src="assets/img/services/service-23.jpg" className="img-fluid" alt="img" />
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
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Link to="/provider-details" className="d-flex align-items-center mb-2 service-pro-info">
                  <span className="avatar avatar-sm me-2">
                    <img src="assets/img/profiles/avatar-05.jpg" alt="img" className="img-fluid rounded-circle" />
                  </span>
                  <p className="fs-14">Trivala Anderson</p>
                </Link>
                <small className="mb-2">From $350</small>
              </div>
              <h6 className="mb-2"><Link to="/javascript:void(0);">Cabinet Installation</Link></h6>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254 Reviews)
                </p>
                <span className="badge badge-dark-transparent fw-medium p-2">3K Bookings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreferredServices;