import { Link } from "react-router-dom";

const PopularServices = () => {
  return (
    <section className="section popular-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-center mb-4">
              <h2 className="mb-1">Our Popular <span className="text-linear-primary">Services</span></h2>
              <p className="sub-title">Each listing is designed to be clear and concise, providing customers</p>
            </div>
          </div>
        </div>
        <ul className="nav nav-tabs nav-tabs-solid justify-content-center mb-4">
          <li className="nav-item mb-3"><Link className="nav-link active" to="/computer-service" data-bs-toggle="tab">Computer
            Service</Link></li>
          <li className="nav-item mb-3"><Link className="nav-link" to="/removals" data-bs-toggle="tab">Removals</Link></li>
          <li className="nav-item mb-3"><Link className="nav-link" to="/man" data-bs-toggle="tab">Man &amp; Van</Link></li>
          <li className="nav-item mb-3"><Link className="nav-link" to="/furniture" data-bs-toggle="tab">Furniture
            Assembly</Link></li>
          <li className="nav-item mb-3"><Link className="nav-link" to="/electrical" data-bs-toggle="tab">Electrical</Link>
          </li>
          <li className="nav-item mb-3"><Link className="nav-link" to="/construction" data-bs-toggle="tab">Construction</Link>
          </li>
          <li className="nav-item mb-3"><Link className="nav-link" to="/plumbing" data-bs-toggle="tab">Plumbing</Link></li>
          <li className="nav-item mb-3"><Link className="nav-link" to="/more-service" data-bs-toggle="tab">More
            Services</Link></li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade active show" id="computer-service">
            <div className="feature-slider owl-carousel nav-center">
              <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-19.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-08.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-15.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-02.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Backup &amp; Recovery</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254
                      Reviews)</p>
                    <small>From $350</small>
                  </div>
                </div>
              </div>
              <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-20.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-03.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Repairs &amp; Upgrades</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.2 (120
                      Reviews)</p>
                    <small>From $150</small>
                  </div>
                </div>
              </div>
              <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-21.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-04.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Setup &amp; Configuration</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.4 (300
                      Reviews)</p>
                    <small>From $200</small>
                  </div>
                </div>
              </div>
              <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-22.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-05.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Troubleshooting &amp;
                    Diagnostics</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.7 (280
                      Reviews)</p>
                    <small>From $250</small>
                  </div>
                </div>
              </div>
              <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-13.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-14.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-15.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-01.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Server Management</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (260
                      Reviews)</p>
                    <small>From $350</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="removals">
            <div className="feature-slider owl-carousel nav-center">
              <div className="service-item">
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-01.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Backup &amp; Recovery</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254
                      Reviews)</p>
                    <small>From $350</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-01.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Repairs &amp; Upgrades</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.2 (120
                      Reviews)</p>
                    <small>From $150</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-01.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Setup &amp; Configuration</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.4 (300
                      Reviews)</p>
                    <small>From $200</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-01.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Troubleshooting &amp;
                    Diagnostics</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.7 (280
                      Reviews)</p>
                    <small>From $250</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="man">
            <div className="feature-slider owl-carousel nav-center">
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
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
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-01.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-03.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Backup &amp; Recovery</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254
                      Reviews)</p>
                    <small>From $350</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-06.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-05.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-04.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-01.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Repairs &amp; Upgrades</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.2 (120
                      Reviews)</p>
                    <small>From $150</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-09.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-08.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-07.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-05.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Setup &amp; Configuration</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.4 (300
                      Reviews)</p>
                    <small>From $200</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-12.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-11.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-10.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-02.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Troubleshooting &amp;
                    Diagnostics</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.7 (280
                      Reviews)</p>
                    <small>From $250</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="furniture">
            <div className="feature-slider owl-carousel nav-center">
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-03.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
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
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-11.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Backup &amp; Recovery</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254
                      Reviews)</p>
                    <small>From $350</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-05.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-04.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-06.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-12.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Repairs &amp; Upgrades</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.2 (120
                      Reviews)</p>
                    <small>From $150</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-08.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-07.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-09.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-17.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Setup &amp; Configuration</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.4 (300
                      Reviews)</p>
                    <small>From $200</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-11.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-10.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-12.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-01.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Troubleshooting &amp;
                    Diagnostics</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.7 (280
                      Reviews)</p>
                    <small>From $250</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="electrical">
            <div className="feature-slider owl-carousel nav-center">
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-54.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-08.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Backup &amp; Recovery</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254
                      Reviews)</p>
                    <small>From $350</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-56.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-14.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Repairs &amp; Upgrades</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.2 (120
                      Reviews)</p>
                    <small>From $150</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-62.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-16.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Setup &amp; Configuration</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.4 (300
                      Reviews)</p>
                    <small>From $200</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-59.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-19.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Troubleshooting &amp;
                    Diagnostics</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.7 (280
                      Reviews)</p>
                    <small>From $250</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="construction">
            <div className="feature-slider owl-carousel nav-center">
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-01.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Backup &amp; Recovery</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254
                      Reviews)</p>
                    <small>From $350</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-54.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-06.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Residential
                    Construction</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.1 (120
                      Reviews)</p>
                    <small>From $250</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-63.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-04.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Setup &amp; Configuration</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.4 (300
                      Reviews)</p>
                    <small>From $200</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-60.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-15.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Troubleshooting &amp;
                    Diagnostics</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.7 (280
                      Reviews)</p>
                    <small>From $250</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="plumbing">
            <div className="feature-slider owl-carousel nav-center">
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-55.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-13.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Backup &amp; Recovery</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254
                      Reviews)</p>
                    <small>From $350</small>
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-18.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Repairs &amp; Upgrades</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.2 (120
                      Reviews)</p>
                    <small>From $150</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-58.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-14.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Setup &amp; Configuration</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.4 (300
                      Reviews)</p>
                    <small>From $200</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-61.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-01.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Troubleshooting &amp;
                    Diagnostics</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.7 (280
                      Reviews)</p>
                    <small>From $250</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="more-service">
            <div className="feature-slider owl-carousel nav-center">
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-20.jpg" className="img-fluid" alt="img" />
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
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-05.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Repairs &amp; Upgrades</Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.2 (120
                      Reviews)</p>
                    <small>From $150</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-05.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-04.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-06.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-08.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Manicure Services</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.2 (120
                      Reviews)</p>
                    <small>From $150</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-13.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-14.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-15.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-14.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Server Management</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (260
                      Reviews)</p>
                    <small>From $350</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-12.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-11.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-10.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-13.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">House CLeaning</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.7 (280
                      Reviews)</p>
                    <small>From $250</small>
                  </div>
                </div>
              </div>
              <div className="service-item">
                <div className="service-img">
                  <div className="img-slider owl-carousel nav-center">
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-02.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-01.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                    <div className="slide-images">
                      <Link to="/service-details">
                        <img src="assets/img/services/service-03.jpg" className="img-fluid" alt="img" />
                      </Link>
                    </div>
                  </div>
                  <div className="fav-item d-flex align-items-center justify-content-between w-100">
                    <Link to="/javascript:void(0);" className="avatar avatar-md">
                      <img src="assets/img/profiles/avatar-12.jpg" className="rounded-circle" alt="User" />
                    </Link>
                    <Link to="/javascript:void(0);" className="fav-icon">
                      <i className="ti ti-heart" />
                    </Link>
                  </div>
                </div>
                <div className="service-content">
                  <h6 className="mb-1 text-truncate"><Link to="/service-details">Delivery Services</Link></h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.5 (254
                      Reviews)</p>
                    <small>From $100</small>
                  </div>
                </div>
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

export default PopularServices;