import { Link } from "react-router-dom";

const PopularProviders = () => {
  return (
    <>
      <section className="section pt-0">
        <div className="container">
          <div className="provider-sec">
            <div className="row justify-content-center">
              <div className="col-lg-12 text-center wow fadeInUp" data-wow-delay="0.2s">
                <div className="section-header text-center">
                  <h2 className="mb-1">Popular <span className="text-linear-primary">Providers</span></h2>
                  <p className="sub-title">Each listing is designed to be clear and concise, providing customers
                  </p>
                </div>
              </div>
            </div>
            <div className="row gx-0">
              <div className="col-xl-3 col-lg-4 col-md-6 d-flex">
                <div className="provider-item flex-fill">
                  <div className="d-flex align-items-center">
                    <Link to="/provider-details" className="avatar avatar-xl me-2">
                      <img src="assets/img/profiles/avatar-18.jpg" alt="img" className="rounded-circle" />
                    </Link>
                    <div>
                      <h6><Link to="/provider-details">Hendry Thompson</Link></h6>
                      <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.4 (123
                        Reviews)</p>
                      <p className="mb-0">46 Services, From <span className="text-gray-9">$60</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 d-flex">
                <div className="provider-item flex-fill">
                  <div className="d-flex align-items-center">
                    <Link to="/provider-details" className="avatar avatar-xl me-2">
                      <img src="assets/img/profiles/avatar-07.jpg" alt="img" className="rounded-circle" />
                    </Link>
                    <div>
                      <h6><Link to="/provider-details">William Patterson</Link></h6>
                      <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.8 (200
                        Reviews)</p>
                      <p className="mb-0">40 Services, From <span className="text-gray-9">$70</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 d-flex">
                <div className="provider-item flex-fill">
                  <div className="d-flex align-items-center">
                    <Link to="/provider-details" className="avatar avatar-xl me-2">
                      <img src="assets/img/profiles/avatar-08.jpg" alt="img" className="rounded-circle" />
                    </Link>
                    <div>
                      <h6><Link to="/provider-details">Lorenzo Verduzco</Link></h6>
                      <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.6 (270
                        Reviews)</p>
                      <p className="mb-0">52 Services, From <span className="text-gray-9">$55</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 d-flex">
                <div className="provider-item flex-fill">
                  <div className="d-flex align-items-center">
                    <Link to="/provider-details" className="avatar avatar-xl me-2">
                      <img src="assets/img/profiles/avatar-09.jpg" alt="img" className="rounded-circle" />
                    </Link>
                    <div>
                      <h6><Link to="/provider-details">Rafael Smith</Link></h6>
                      <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.8 (300
                        Reviews)</p>
                      <p className="mb-0">40 Services, From <span className="text-gray-9">$05</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 d-flex">
                <div className="provider-item flex-fill">
                  <div className="d-flex align-items-center">
                    <Link to="/provider-details" className="avatar avatar-xl me-2">
                      <img src="assets/img/profiles/avatar-08.jpg" alt="img" className="rounded-circle" />
                    </Link>
                    <div>
                      <h6><Link to="/provider-details">Robert Boyd</Link></h6>
                      <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.8 (300
                        Reviews)</p>
                      <p className="mb-0">40 Services, From <span className="text-gray-9">$70</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 d-flex">
                <div className="provider-item flex-fill">
                  <div className="d-flex align-items-center">
                    <Link to="/provider-details" className="avatar avatar-xl me-2">
                      <img src="assets/img/profiles/avatar-19.jpg" alt="img" className="rounded-circle" />
                    </Link>
                    <div>
                      <h6><Link to="/provider-details">Joe Fletcher</Link></h6>
                      <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.9 (370
                        Reviews)</p>
                      <p className="mb-0">65 Services, From <span className="text-gray-9">$50</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 d-flex">
                <div className="provider-item flex-fill">
                  <div className="d-flex align-items-center">
                    <Link to="/provider-details" className="avatar avatar-xl me-2">
                      <img src="assets/img/profiles/avatar-11.jpg" alt="img" className="rounded-circle" />
                    </Link>
                    <div>
                      <h6><Link to="/provider-details">Benjamin Wade</Link></h6>
                      <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.2 (220
                        Reviews)</p>
                      <p className="mb-0">30 Services, From <span className="text-gray-9">$40</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 d-flex">
                <div className="provider-item flex-fill">
                  <div className="d-flex align-items-center">
                    <Link to="/provider-details" className="avatar avatar-xl me-2">
                      <img src="assets/img/profiles/avatar-12.jpg" alt="img" className="rounded-circle" />
                    </Link>
                    <div>
                      <h6><Link to="/provider-details">William Hughes</Link></h6>
                      <p className="fs-14 mb-0"><i className="ti ti-star-filled text-warning me-1" />4.3 (280
                        Reviews)</p>
                      <p className="mb-0">35 Services, From <span className="text-gray-9">$45</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center view-all wow fadeInUp" data-wow-delay="0.2s">
              <Link to="/providers" className="btn btn-dark">View All<i className="ti ti-arrow-right ms-2" /></Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default PopularProviders;