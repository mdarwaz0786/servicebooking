import { Link } from "react-router-dom";

const BookingPage = () => {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container">
          {/* Booking */}
          <div className="row">
            <div className="col-xxl-10 col-xl-11 mx-auto">
              <div className="card border-0 mb-0">
                <div className="card-body p-3 fieldset-wizard">
                  <div className="row">
                    {/* Booking Sidebar */}
                    <div className="col-lg-3 theiaStickySidebar">
                      <div className="card bg-dark booking-sidebar mb-4 mb-lg-0">
                        <div className="card-body">
                          <h6 className="text-white fs-14 mb-2">Service Details</h6>
                          <div className="service-info d-flex align-items-center">
                            <span className="avatar avatar-md me-2 flex-shrink-0">
                              <img src="assets/img/services/service-02.jpg" alt="img" />
                            </span>
                            <div>
                              <p className="fs-12 text-white fw-medium mb-1">Spark Services</p>
                              <span className="fs-10"><i className="ti ti-star-filled text-warning me-1" />4.9 (255
                                reviews)</span>
                            </div>
                          </div>
                          <div className="booking-wizard">
                            <h6 className="text-white fs-14 mb-3">Bookings</h6>
                            <ul className="wizard-progress" id="bokingwizard">
                              <li className="active pb-3">
                                <span>1. Location</span>
                              </li>
                              <li className="pb-3">
                                <span>2. Staffs</span>
                              </li>
                              <li className="pb-3">
                                <span>3. Additional Services</span>
                              </li>
                              <li className="pb-3">
                                <span>4. Date &amp; Time</span>
                              </li>
                              <li className="pb-3">
                                <span>5. Personal Information</span>
                              </li>
                              <li className="pb-3">
                                <span>6. Cart</span>
                              </li>
                              <li className="pb-3">
                                <span>7. Payment</span>
                              </li>
                              <li>
                                <span>8. Confirmation</span>
                              </li>
                            </ul>
                          </div>
                          <div className="status-report">
                            <h6 className="text-white fs-14 mb-2 pb-2">Bookings</h6>
                            <p className="fs-10">0% complete</p>
                          </div>
                          <div className="text-center">
                            <p className="fs-10 text-white">Already have an account? <Link to="/login" className="link-primary">Login</Link></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Booking Sidebar */}
                    <div className="col-lg-9">
                      {/* Location */}
                      <fieldset className="booking-content" id="first-field">
                        <div className="book-card">
                          <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
                            <div className="d-flex align-items-center mb-2">
                              <h6 className="fs-16 me-2 mb-2">Select Location</h6>
                              <span className="badge badge-info-transparent mb-2">Total : 05</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="dropdown loc-dropdown me-2 mb-2">
                                <Link to="/javascript:void(0);" className="dropdown-toggle bg-light-500" data-bs-toggle="dropdown">
                                  All Locations
                                </Link>
                                <ul className="dropdown-menu">
                                  <li><Link className="dropdown-item" to="/javascript:void(0);">1052 Edsel Road LA</Link></li>
                                  <li><Link className="dropdown-item" to="/javascript:void(0);">1197 Tennessee Avenue</Link></li>
                                  <li><Link className="dropdown-item" to="/javascript:void(0);">1214 Rich land Avenue</Link></li>
                                </ul>
                              </div>
                              <div className="dropdown me-2 mb-2">
                                <Link to="/javascript:void(0);" className="bg-light-500 d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                  <i className="ti ti-shopping-cart me-1" />Cart<span className="bg-primary num-count ms-1">1</span>
                                </Link>
                                <div className="dropdown-menu dropdown-sm p-3">
                                  <h6 className="fs-13 mb-3">Added In Cart (02)</h6>
                                  <div className="d-flex align-items-center p-2 bg-light rounded mb-3">
                                    <span className="avatar avatar-lg">
                                      <img src="assets/img/services/addservice-05.jpg" alt="img" />
                                    </span>
                                    <div className="ms-2">
                                      <h6 className="mb-1">Lighting Services</h6>
                                      <p className="fs-12"><i className="ti ti-star-filled text-warning me-1" /><span className="text-gray-9">4.9</span> (255 reviews)</p>
                                    </div>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Lighting Services</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$457</h6>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Outlets &amp; Wiring</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$200</h6>
                                  </div>
                                  <div className="mb-0 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Switches Changes</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$100</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                                    <div>
                                      <h6 className="fw-medium">Total</h6>
                                    </div>
                                    <h6 className="fw-medium">$757</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row g-3">
                            <div className="col-lg-4 col-md-6">
                              <div className="card location-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <div className="trend-icon">
                                    <span className="bg-info">
                                      <img src="assets/img/icons/loc-icon.svg" alt="icon" />
                                    </span>
                                  </div>
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/icons/service-01.svg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Lighting Services - California Shop</h6>
                                  <p className="d-flex align-items-center justify-content-center mb-2"><i className="ti ti-map-pin-check me-1" />1052 Edsel Road LA</p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />12 Staffs</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />5.0</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card location-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <div className="trend-icon">
                                    <span className="bg-info">
                                      <img src="assets/img/icons/loc-icon.svg" alt="icon" />
                                    </span>
                                  </div>
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/icons/service-02.svg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Lighting Services - California Shop</h6>
                                  <p className="d-flex align-items-center justify-content-center mb-2"><i className="ti ti-map-pin-check me-1" />1052 Edsel Road LA</p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />15 Staffs</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.9</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card location-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/icons/service-03.svg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Lighting Services -Texas Shop</h6>
                                  <p className="d-flex align-items-center justify-content-center mb-2"><i className="ti ti-map-pin-check me-1" />1214 Rich land Avenue</p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />16 Staffs</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.0</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card location-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/icons/service-04.svg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Lighting Services - New York Shop</h6>
                                  <p className="d-flex align-items-center justify-content-center mb-2"><i className="ti ti-map-pin-check me-1" />4127 Small Street</p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />16 Staffs</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.5</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card location-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/icons/service-05.svg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Lighting Services - New Jersy Shop</h6>
                                  <p className="d-flex align-items-center justify-content-center mb-2"><i className="ti ti-map-pin-check me-1" />3527 Saint James Drive</p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />21 Staffs</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.5</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="booking-footer d-flex align-items-center justify-content-end">
                          <Link to="/javascript:void(0);" className="btn btn-sm btn-dark d-inline-flex align-items-center next_btn">Next<i className="ti ti-arrow-right ms-1" /></Link>
                        </div>
                      </fieldset>
                      {/* /Location */}
                      {/* Staffs */}
                      <fieldset className="booking-content">
                        <div className="book-card">
                          <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
                            <div className="d-flex align-items-center mb-2">
                              <h6 className="fs-16 me-2 mb-2">Select Staffs</h6>
                              <span className="badge badge-info-transparent mb-2">Total : 09</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="dropdown loc-dropdown me-2 mb-2">
                                <Link to="/javascript:void(0);" className="dropdown-toggle bg-light-500" data-bs-toggle="dropdown">
                                  All Ratings
                                </Link>
                                <ul className="dropdown-menu">
                                  <li><Link className="dropdown-item" to="/javascript:void(0);">5 Ratings</Link></li>
                                  <li><Link className="dropdown-item" to="/javascript:void(0);">4 Ratings</Link></li>
                                  <li><Link className="dropdown-item" to="/javascript:void(0);">3 Ratings</Link></li>
                                  <li><Link className="dropdown-item" to="/javascript:void(0);">2 Ratings</Link></li>
                                  <li><Link className="dropdown-item" to="/javascript:void(0);">1 Ratings</Link></li>
                                </ul>
                              </div>
                              <div className="dropdown me-2 mb-2">
                                <Link to="/javascript:void(0);" className="bg-light-500 d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                  <i className="ti ti-shopping-cart me-1" />Cart<span className="bg-primary num-count ms-1">1</span>
                                </Link>
                                <div className="dropdown-menu dropdown-sm p-3">
                                  <h6 className="fs-13 mb-3">Added In Cart (02)</h6>
                                  <div className="d-flex align-items-center p-2 bg-light rounded mb-3">
                                    <span className="avatar avatar-lg">
                                      <img src="assets/img/services/addservice-05.jpg" alt="img" />
                                    </span>
                                    <div className="ms-2">
                                      <h6 className="mb-1">Lighting Services</h6>
                                      <p className="fs-12"><i className="ti ti-star-filled text-warning me-1" /><span className="text-gray-9">4.9</span> (255 reviews)</p>
                                    </div>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Lighting Services</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$457</h6>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Outlets &amp; Wiring</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$200</h6>
                                  </div>
                                  <div className="mb-0 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Switches Changes</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$100</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                                    <div>
                                      <h6 className="fw-medium">Total</h6>
                                    </div>
                                    <h6 className="fw-medium">$757</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row g-3">
                            <div className="col-lg-4 col-md-6">
                              <div className="card staff-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/profiles/avatar-01.jpg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Jeff Fitch</h6>
                                  <p className="mb-2"><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="abcdc2dfc3c8c39f9d9cebced3cac6dbc7ce85c8c4c6">[email&nbsp;protected]</Link>
                                  </p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />08 Servicess</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.9</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card staff-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/profiles/avatar-17.jpg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Jacob Kline</h6>
                                  <p className="mb-2"><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="761c1d44454336130e171b061a135815191b">[email&nbsp;protected]</Link></p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />07 Services</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.8</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card staff-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/profiles/avatar-25.jpg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Patricia Durham</h6>
                                  <p className="mb-2"><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="d6a6b7a4b5b3a2e3e096b3aeb7bba6bab3f8b5b9bb">[email&nbsp;protected]</Link>
                                  </p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />06 Services</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.0</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card staff-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/profiles/avatar-14.jpg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">David Kauffman</h6>
                                  <p className="d-flex align-items-center justify-content-center mb-2"><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="167277607f727361232256736e777b667a733875797b">[email&nbsp;protected]</Link>
                                  </p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />05 Services</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.5</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card staff-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/profiles/avatar-26.jpg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Kara Coble</h6>
                                  <p className="d-flex align-items-center justify-content-center mb-2"><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="6803091a090c0d5b5c5d280d10090518040d460b0705">[email&nbsp;protected]</Link>
                                  </p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />02 Services</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.5</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card staff-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/profiles/avatar-26.jpg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Marcela Garcia</h6>
                                  <p className="d-flex align-items-center justify-content-center mb-2"><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="563b37243565626016332e373b263a337835393b">[email&nbsp;protected]</Link>
                                  </p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />04 Services</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.8</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card staff-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/profiles/avatar-22.jpg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Bill Andrus</h6>
                                  <p className="d-flex align-items-center justify-content-center mb-2"><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="6d0f0401095e585b5a2d08150c001d0108430e0200">[email&nbsp;protected]</Link>
                                  </p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />04 Services</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.7</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card staff-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/profiles/avatar-04.jpg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Travis Machado</h6>
                                  <p className="d-flex align-items-center justify-content-center mb-2"><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="96e2e4f5a5a0a1d6f3eef7fbe6faf3b8f5f9fb">[email&nbsp;protected]</Link></p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />06 Services</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.0</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="card staff-card mb-0">
                                <div className="card-body p-3 text-center">
                                  <span className="avatar avatar-lg mx-auto mb-2">
                                    <img src="assets/img/profiles/avatar-24.jpg" alt="img" />
                                  </span>
                                  <h6 className="mb-2 fw-medium">Darrell Dolezal</h6>
                                  <p className="d-flex align-items-center justify-content-center mb-2"><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="9efaffece8aaaba8defbe6fff3eef2fbb0fdf1f3">[email&nbsp;protected]</Link>
                                  </p>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-circle-check-filled text-danger fs-5 me-1" />02 Services</p>
                                    <p className="mb-0 d-flex align-items-center"><i className="ti ti-star-filled text-warning me-1" />4.5</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="booking-footer d-flex align-items-center justify-content-between flex-wrap">
                          <div className="form-check d-inline-flex align-items-center ps-0 me-3 mt-3">
                            <input className="form-check-input ms-0 mt-0" name="service1" type="checkbox" id="service" defaultChecked />
                            <label className="form-check-label ms-2 text-black" htmlFor="service">
                              Select Anyone for this Booking
                            </label>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link to="/javascript:void(0);" className="btn btn-sm btn-light d-inline-flex align-items-center prev_btn me-2"><i className="ti ti-arrow-left me-1" />Prev</Link>
                            <Link to="/javascript:void(0);" className="btn btn-sm btn-dark d-inline-flex align-items-center next_btn">Next<i className="ti ti-arrow-right ms-1" /></Link>
                          </div>
                        </div>
                      </fieldset>
                      {/* /Staffs */}
                      {/* Additional Service */}
                      <fieldset className="booking-content">
                        <div className="book-card">
                          <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
                            <div className="d-flex align-items-center mb-2">
                              <h6 className="fs-16 me-2 mb-2">Select Additional Service</h6>
                              <span className="badge badge-info-transparent mb-2">Total : 05</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="dropdown me-2 mb-2">
                                <Link to="/javascript:void(0);" className="bg-light-500 d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                  <i className="ti ti-shopping-cart me-1" />Cart<span className="bg-primary num-count ms-1">1</span>
                                </Link>
                                <div className="dropdown-menu dropdown-sm p-3">
                                  <h6 className="fs-13 mb-3">Added In Cart (02)</h6>
                                  <div className="d-flex align-items-center p-2 bg-light rounded mb-3">
                                    <span className="avatar avatar-lg">
                                      <img src="assets/img/services/addservice-05.jpg" alt="img" />
                                    </span>
                                    <div className="ms-2">
                                      <h6 className="mb-1">Lighting Services</h6>
                                      <p className="fs-12"><i className="ti ti-star-filled text-warning me-1" /><span className="text-gray-9">4.9</span> (255 reviews)</p>
                                    </div>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Lighting Services</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$457</h6>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Outlets &amp; Wiring</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$200</h6>
                                  </div>
                                  <div className="mb-0 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Switches Changes</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$100</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                                    <div>
                                      <h6 className="fw-medium">Total</h6>
                                    </div>
                                    <h6 className="fw-medium">$757</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <div className="select-item d-flex align-items-center justify-content-between flex-wrap border p-2 pb-0 mb-0">
                                <div className="d-flex align-items-center pb-2">
                                  <span className="avatar avatar-lg">
                                    <img src="assets/img/services/addservice-01.jpg" alt="img" className="br-5" />
                                  </span>
                                  <div className="ms-2">
                                    <h6 className="mb-1 fs-12 fw-medium">Ceiling Fans Repairs</h6>
                                    <p className="fs-10"><span className="fs-12 text-gray-9 fw-medium">$400</span> / 30 min</p>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center pb-2">
                                  <p className="mb-0 d-flex align-items-center fs-12 me-2"><i className="ti ti-star-filled text-warning me-1" />4.9</p>
                                  <Link to="/javascript:void(0);" className="btn btn-light btn-sm btn-addon d-inline-flex align-items-center"><i className="feather-plus-circle me-1" />Add</Link>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="select-item d-flex align-items-center justify-content-between flex-wrap border p-2 pb-0 mb-0">
                                <div className="d-flex align-items-center pb-2">
                                  <span className="avatar avatar-lg">
                                    <img src="assets/img/services/addservice-02.jpg" alt="img" className="br-5" />
                                  </span>
                                  <div className="ms-2">
                                    <h6 className="mb-1 fs-12 fw-medium">Switches Changes</h6>
                                    <p className="fs-10"><span className="fs-12 text-gray-9 fw-medium">$250</span> / 30 min</p>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center pb-2">
                                  <p className="mb-0 d-flex align-items-center fs-12 me-2"><i className="ti ti-star-filled text-warning me-1" />4.9</p>
                                  <Link to="/javascript:void(0);" className="btn btn-light btn-sm btn-addon d-inline-flex align-items-center"><i className="feather-plus-circle me-1" />Add</Link>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="select-item d-flex align-items-center justify-content-between flex-wrap border p-2 pb-0 mb-0">
                                <div className="d-flex align-items-center pb-2">
                                  <span className="avatar avatar-lg">
                                    <img src="assets/img/services/addservice-03.jpg" alt="img" className="br-5" />
                                  </span>
                                  <div className="ms-2">
                                    <h6 className="mb-1 fs-12 fw-medium">Outlets &amp; Wiring </h6>
                                    <p className="fs-10"><span className="fs-12 text-gray-9 fw-medium">$300</span> / 30 min</p>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center pb-2">
                                  <p className="mb-0 d-flex align-items-center fs-12 me-2"><i className="ti ti-star-filled text-warning me-1" />4.9</p>
                                  <Link to="/javascript:void(0);" className="btn btn-light btn-sm btn-addon d-inline-flex align-items-center active"><i className="feather-check-circle me-1" />Added</Link>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="select-item d-flex align-items-center justify-content-between flex-wrap border p-2 pb-0 mb-0">
                                <div className="d-flex align-items-center pb-2">
                                  <span className="avatar avatar-lg">
                                    <img src="assets/img/services/addservice-04.jpg" alt="img" className="br-5" />
                                  </span>
                                  <div className="ms-2">
                                    <h6 className="mb-1 fs-12 fw-medium">Fixing Faulty Wiring</h6>
                                    <p className="fs-10"><span className="fs-12 text-gray-9 fw-medium">$300</span> / 30 min</p>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center pb-2">
                                  <p className="mb-0 d-flex align-items-center fs-12 me-2"><i className="ti ti-star-filled text-warning me-1" />4.5</p>
                                  <Link to="/javascript:void(0);" className="btn btn-light btn-sm btn-addon d-inline-flex align-items-center"><i className="feather-plus-circle me-1" />Add</Link>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="select-item d-flex align-items-center justify-content-between flex-wrap border p-2 pb-0 mb-0">
                                <div className="d-flex align-items-center pb-2">
                                  <span className="avatar avatar-lg">
                                    <img src="assets/img/services/addservice-05.jpg" alt="img" className="br-5" />
                                  </span>
                                  <div className="ms-2">
                                    <h6 className="mb-1 fs-12 fw-medium">Lighting Fixtures</h6>
                                    <p className="fs-10"><span className="fs-12 text-gray-9 fw-medium">$1500</span> / 20 min</p>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center pb-2">
                                  <p className="mb-0 d-flex align-items-center fs-12 me-2"><i className="ti ti-star-filled text-warning me-1" />4.9</p>
                                  <Link to="/javascript:void(0);" className="btn btn-light btn-sm btn-addon d-inline-flex align-items-center"><i className="feather-plus-circle me-1" />Add</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="booking-footer d-flex align-items-center justify-content-end">
                          <div className="d-flex align-items-center">
                            <Link to="/javascript:void(0);" className="btn btn-sm btn-light d-inline-flex align-items-center prev_btn me-2"><i className="ti ti-arrow-left me-1" />Prev</Link>
                            <Link to="/javascript:void(0);" className="btn btn-sm btn-dark d-inline-flex align-items-center next_btn">Next<i className="ti ti-arrow-right ms-1" /></Link>
                          </div>
                        </div>
                      </fieldset>
                      {/* /Additional Service */}
                      {/* Date & Time */}
                      <fieldset className="booking-content">
                        <div className="book-card">
                          <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
                            <div className="d-flex align-items-center mb-2">
                              <h6 className="fs-16 me-2 mb-2">Select Date &amp; Time</h6>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="dropdown mb-2">
                                <Link to="/javascript:void(0);" className="bg-light-500 d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                  <i className="ti ti-shopping-cart me-1" />Cart<span className="bg-primary num-count ms-1">1</span>
                                </Link>
                                <div className="dropdown-menu dropdown-sm p-3">
                                  <h6 className="fs-13 mb-3">Added In Cart (02)</h6>
                                  <div className="d-flex align-items-center p-2 bg-light rounded mb-3">
                                    <span className="avatar avatar-lg">
                                      <img src="assets/img/services/addservice-05.jpg" alt="img" />
                                    </span>
                                    <div className="ms-2">
                                      <h6 className="mb-1">Lighting Services</h6>
                                      <p className="fs-12"><i className="ti ti-star-filled text-warning me-1" /><span className="text-gray-9">4.9</span> (255 reviews)</p>
                                    </div>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Lighting Services</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$457</h6>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Outlets &amp; Wiring</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$200</h6>
                                  </div>
                                  <div className="mb-0 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Switches Changes</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$100</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                                    <div>
                                      <h6 className="fw-medium">Total</h6>
                                    </div>
                                    <h6 className="fw-medium">$757</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row g-3">
                            <div className="col-md-5">
                              <h6 className="fs-13 fw-medium mb-2">Select date</h6>
                              <div className="card border mb-0">
                                <div className="card-body p-3">
                                  <div className="datepic" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-7">
                              <h6 className="fs-13 fw-medium mb-2">Select Time</h6>
                              <div className="row g-2">
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item disable">
                                    <h6 className="fs-12 fw-medium">07:00 - 07:30</h6>
                                    <p className="fs-10">2 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item disable">
                                    <h6 className="fs-12 fw-medium">07:30 - 08:00</h6>
                                    <p className="fs-10">4 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item disable">
                                    <h6 className="fs-12 fw-medium">08:00 - 08:30</h6>
                                    <p className="fs-10">2 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item disable">
                                    <h6 className="fs-12 fw-medium">08:30 - 09:00</h6>
                                    <p className="fs-10">3 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">09:00 - 09:30</h6>
                                    <p className="fs-10">2 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">09:30 - 10:00</h6>
                                    <p className="fs-10">5 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">10:00 - 10:30</h6>
                                    <p className="fs-10">3 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">10:30 - 11:00</h6>
                                    <p className="fs-10">2 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">11:00 - 11:30</h6>
                                    <p className="fs-10">2 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">11:30 - 12:00</h6>
                                    <p className="fs-10">5 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">12:00 - 12:30</h6>
                                    <p className="fs-10">4 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">12:30 - 13:00</h6>
                                    <p className="fs-10">6 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">13:00 - 13:30</h6>
                                    <p className="fs-10">2 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">13:30 - 14:00</h6>
                                    <p className="fs-10">1 Slot</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">14:00 - 14:30</h6>
                                    <p className="fs-10">2 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">14:30 - 15:00</h6>
                                    <p className="fs-10">3 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">15:00 - 15:30</h6>
                                    <p className="fs-10">2 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">15:30 - 16:00</h6>
                                    <p className="fs-10">4 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">16:00 - 16:30</h6>
                                    <p className="fs-10">3 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">16:30 - 17:00</h6>
                                    <p className="fs-10">1 Slots</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="time-item">
                                    <h6 className="fs-12 fw-medium">17:00 - 17:30</h6>
                                    <p className="fs-10">3 Slots</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="booking-footer d-flex align-items-center justify-content-end">
                          <div className="d-flex align-items-center">
                            <Link to="/javascript:void(0);" className="btn btn-sm btn-light d-inline-flex align-items-center prev_btn me-2"><i className="ti ti-arrow-left me-1" />Prev</Link>
                            <Link to="/javascript:void(0);" className="btn btn-sm btn-dark d-inline-flex align-items-center next_btn">Next<i className="ti ti-arrow-right ms-1" /></Link>
                          </div>
                        </div>
                      </fieldset>
                      {/* /Date & Time */}
                      {/* Personal Information */}
                      <fieldset className="booking-content">
                        <div className="book-card">
                          <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
                            <div className="d-flex align-items-center mb-2">
                              <h6 className="fs-16 me-2 mb-2">Add Personal Information</h6>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="dropdown me-2 mb-2">
                                <Link to="/javascript:void(0);" className="bg-light-500 d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                  <i className="ti ti-shopping-cart me-1" />Cart<span className="bg-primary num-count ms-1">1</span>
                                </Link>
                                <div className="dropdown-menu dropdown-sm p-3">
                                  <h6 className="fs-13 mb-3">Added In Cart (02)</h6>
                                  <div className="d-flex align-items-center p-2 bg-light rounded mb-3">
                                    <span className="avatar avatar-lg">
                                      <img src="assets/img/services/addservice-05.jpg" alt="img" />
                                    </span>
                                    <div className="ms-2">
                                      <h6 className="mb-1">Lighting Services</h6>
                                      <p className="fs-12"><i className="ti ti-star-filled text-warning me-1" /><span className="text-gray-9">4.9</span> (255 reviews)</p>
                                    </div>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Lighting Services</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$457</h6>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Outlets &amp; Wiring</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$200</h6>
                                  </div>
                                  <div className="mb-0 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Switches Changes</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$100</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                                    <div>
                                      <h6 className="fw-medium">Total</h6>
                                    </div>
                                    <h6 className="fw-medium">$757</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row g-3">
                            <div className="col-md-5">
                              <div className="cart-info-wrap">
                                <div className="mb-2 d-flex align-items-center justify-content-between">
                                  <div>
                                    <h6 className="fw-medium">Lighting Services</h6>
                                    <p className="fs-10">30 Min</p>
                                  </div>
                                  <h6 className="fs-12 fw-medium">$457</h6>
                                </div>
                                <div className="mb-2 d-flex align-items-center justify-content-between">
                                  <div>
                                    <h6 className="fw-medium">Outlets &amp; Wiring</h6>
                                    <p className="fs-10">30 Min</p>
                                  </div>
                                  <h6 className="fs-12 fw-medium">$200</h6>
                                </div>
                                <div className="mb-0 d-flex align-items-center justify-content-between">
                                  <div>
                                    <h6 className="fw-medium">Switches Changes</h6>
                                    <p className="fs-10">30 Min</p>
                                  </div>
                                  <h6 className="fs-12 fw-medium">$100</h6>
                                </div>
                                <div className="border-top pt-3 mt-3">
                                  <h6 className="mb-2">Location</h6>
                                  <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-lg">
                                      <img src="assets/img/icons/service-02.svg" alt="img" />
                                    </span>
                                    <div className="ms-2">
                                      <h6 className="fw-medium mb-1">Lighting Services -California Shop</h6>
                                    </div>
                                  </div>
                                </div>
                                <div className="border-top pt-3">
                                  <h6 className="mb-2">Staff</h6>
                                  <div className="d-flex align-items-center mb-3">
                                    <span className="avatar avatar-lg">
                                      <img src="assets/img/profiles/avatar-04.jpg" alt="img" />
                                    </span>
                                    <div className="ms-2">
                                      <h6 className="fw-medium mb-1">Travis Machado</h6>
                                    </div>
                                  </div>
                                </div>
                                <div className="border-top pt-3 mt-3">
                                  <h6 className="mb-2">Date &amp; Time</h6>
                                  <p className="mb-2 text-gray-9 fw-medium d-flex align-items-center"><i className="feather-calendar me-2" />Fri, 12 Aug 2024</p>
                                  <p className="text-gray-9 fw-medium d-flex align-items-center"><i className="feather-clock me-2" />08:30 AM - 09:00 AM</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-7">
                              <div className="row g-2">
                                <div className="col-md-6">
                                  <div>
                                    <label className="form-label fs-12">First Name</label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div>
                                    <label className="form-label fs-12">Last Name</label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div>
                                    <label className="form-label fs-12">Email</label>
                                    <input type="email" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div>
                                    <label className="form-label fs-12">Phone Number</label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div>
                                    <label className="form-label fs-12">Street Address</label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div>
                                    <label className="form-label fs-12">City</label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div>
                                    <label className="form-label fs-12">State</label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div>
                                    <label className="form-label fs-12">Postal Code</label>
                                    <input type="text" className="form-control" />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div>
                                    <label className="form-label fs-12">Add booking notes</label>
                                    <textarea className="form-control" rows={4} defaultValue={""} />
                                  </div>
                                </div>
                              </div>
                              <div className="border-top pt-3 mt-3">
                                <h6 className="fs-13 fw-medium mb-1">Cancellation policy</h6>
                                <p>Cancel for free anytime in advance, otherwise you will be charged 100% of the service
                                  price for not showing up.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="booking-footer d-flex align-items-center justify-content-end">
                          <div className="d-flex align-items-center">
                            <Link to="/javascript:void(0);" className="btn btn-sm btn-light d-inline-flex align-items-center prev_btn me-2"><i className="ti ti-arrow-left me-1" />Prev</Link>
                            <Link to="/javascript:void(0);" className="btn btn-sm btn-dark d-inline-flex align-items-center next_btn">Next<i className="ti ti-arrow-right ms-1" /></Link>
                          </div>
                        </div>
                      </fieldset>
                      {/* /Personal Information */}
                      {/* Cart */}
                      <fieldset className="booking-content">
                        <div className="book-card">
                          <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
                            <div className="d-flex align-items-center mb-2">
                              <h6 className="fs-16 me-2 mb-2">Cart</h6>
                            </div>
                            <div className="d-flex align-items-center flex-wrap mb-2">
                              <Link to="/javascript:void(0);" className="btn btn-sm btn-secondary d-inline-flex align-items-center prev_btn fs-10 mb-2 me-2"><i className="ti ti-circle-plus me-1" />Add New Booking</Link>
                              <div className="dropdown mb-2">
                                <Link to="/javascript:void(0);" className="bg-light-500 d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                  <i className="ti ti-shopping-cart me-1" />Cart<span className="bg-primary num-count ms-1">1</span>
                                </Link>
                                <div className="dropdown-menu dropdown-sm p-3">
                                  <h6 className="fs-13 mb-3">Added In Cart (02)</h6>
                                  <div className="d-flex align-items-center p-2 bg-light rounded mb-3">
                                    <span className="avatar avatar-lg">
                                      <img src="assets/img/services/addservice-05.jpg" alt="img" />
                                    </span>
                                    <div className="ms-2">
                                      <h6 className="mb-1">Lighting Services</h6>
                                      <p className="fs-12"><i className="ti ti-star-filled text-warning me-1" /><span className="text-gray-9">4.9</span> (255 reviews)</p>
                                    </div>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Lighting Services</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$457</h6>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Outlets &amp; Wiring</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$200</h6>
                                  </div>
                                  <div className="mb-0 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Switches Changes</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$100</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                                    <div>
                                      <h6 className="fw-medium">Total</h6>
                                    </div>
                                    <h6 className="fw-medium">$757</h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row g-3">
                            <div className="col-md-6 d-flex">
                              <div className="card flex-fill">
                                <div className="card-body p-3 d-flex justify-content-between flex-column">
                                  <div>
                                    <div className="d-flex align-items-center p-3 bg-light-400 rounded mb-2">
                                      <span className="avatar avatar-lg">
                                        <img src="assets/img/services/addservice-05.jpg" alt="img" />
                                      </span>
                                      <div className="ms-2">
                                        <h6 className="fs-14 fw-medium mb-1">Lighting Services</h6>
                                        <p>30 Minutes</p>
                                      </div>
                                    </div>
                                    <div className="mb-2">
                                      <h6 className="fw-medium mb-1">Additional Service</h6>
                                      <p>Outlets &amp; Wiring, Switches Changes</p>
                                    </div>
                                    <div className="mb-2">
                                      <h6 className="fw-medium mb-1">Location</h6>
                                      <p>Spark Electrical Services - California Shop</p>
                                    </div>
                                    <div className="mb-2">
                                      <h6 className="fw-medium mb-1">Employee</h6>
                                      <p>Carl Newman</p>
                                    </div>
                                    <div className="mb-2">
                                      <h6 className="fw-medium mb-1">Date &amp; Time</h6>
                                      <p>Sun 16 July 2023 at 5:00pm</p>
                                    </div>
                                    <div className="mb-0">
                                      <h6 className="fw-medium mb-1">Amount</h6>
                                      <span className="badge badge-dark">$757</span>
                                    </div>
                                  </div>
                                  <div className="text-center border-top pt-3 mt-3">
                                    <Link to="/javascript:void(0);" className="d-inline-flex align-items-center link-danger fs-12"><i className="ti ti-trash me-1" />Remove</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 d-flex">
                              <div className="card flex-fill">
                                <div className="card-body p-3 d-flex justify-content-between flex-column">
                                  <div>
                                    <div className="d-flex align-items-center p-3 bg-light-400 rounded mb-2">
                                      <span className="avatar avatar-lg">
                                        <img src="assets/img/services/addservice-05.jpg" alt="img" />
                                      </span>
                                      <div className="ms-2">
                                        <h6 className="fs-14 fw-medium mb-1">Lighting Services</h6>
                                        <p>30 Minutes</p>
                                      </div>
                                    </div>
                                    <div className="mb-2">
                                      <h6 className="fw-medium mb-1">Location</h6>
                                      <p>Spark Electrical Services - California Shop</p>
                                    </div>
                                    <div className="mb-2">
                                      <h6 className="fw-medium mb-1">Employee</h6>
                                      <p>Carl Newman</p>
                                    </div>
                                    <div className="mb-2">
                                      <h6 className="fw-medium mb-1">Date &amp; Time</h6>
                                      <p>Sun 16 July 2023 at 5:00pm</p>
                                    </div>
                                    <div className="mb-0">
                                      <h6 className="fw-medium mb-1">Amount</h6>
                                      <span className="badge badge-dark">$757</span>
                                    </div>
                                  </div>
                                  <div className="text-center border-top pt-3 mt-3">
                                    <Link to="/javascript:void(0);" className="d-inline-flex align-items-center link-danger fs-12"><i className="ti ti-trash me-1" />Remove</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="booking-footer d-flex align-items-center justify-content-end">
                          <div className="d-flex align-items-center">
                            <Link to="/javascript:void(0);" className="btn btn-sm btn-light d-inline-flex align-items-center prev_btn me-2"><i className="ti ti-arrow-left me-1" />Prev</Link>
                            <Link to="/javascript:void(0);" className="btn btn-sm btn-dark d-inline-flex align-items-center next_btn">Next<i className="ti ti-arrow-right ms-1" /></Link>
                          </div>
                        </div>
                      </fieldset>
                      {/* /Cart */}
                      {/* Payment Method */}
                      <fieldset className="booking-content">
                        <div className="book-card">
                          <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
                            <div className="d-flex align-items-center mb-2">
                              <h6 className="fs-16 me-2 mb-2">Payment Method</h6>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <Link to="/javascript:void(0);" className="btn btn-sm btn-secondary d-inline-flex align-items-center prev_btn mb-2"><i className="ti ti-caret-left-filled me-1" />Back to Cart</Link>
                            </div>
                          </div>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <h6 className="fs-13 mb-3">Payment Types</h6>
                              <div className="payment-item d-flex align-items-center justify-content-between mb-2">
                                <div className="form-check d-flex align-items-center ps-0">
                                  <input className="form-check-input ms-0 mt-0" name="payment" type="radio" id="payment1" />
                                  <label className="form-check-label ms-2" htmlFor="payment1">
                                    Stripe
                                  </label>
                                </div>
                                <div>
                                  <img src="assets/img/icons/payment1.svg" alt="payment" />
                                </div>
                              </div>
                              <div className="payment-item d-flex align-items-center justify-content-between mb-2">
                                <div className="form-check d-flex align-items-center ps-0">
                                  <input className="form-check-input ms-0 mt-0" name="payment" type="radio" id="payment2" />
                                  <label className="form-check-label ms-2" htmlFor="payment2">
                                    Paypal
                                  </label>
                                </div>
                                <div>
                                  <img src="assets/img/icons/payment2.svg" alt="payment" />
                                </div>
                              </div>
                              <div className="payment-item d-flex align-items-center justify-content-between mb-2">
                                <div className="form-check d-flex align-items-center ps-0">
                                  <input className="form-check-input ms-0 mt-0" name="payment" type="radio" id="payment3" />
                                  <label className="form-check-label ms-2" htmlFor="payment3">
                                    Razorpay
                                  </label>
                                </div>
                                <div>
                                  <img src="assets/img/icons/razor-pay.svg" alt="payment" />
                                </div>
                              </div>
                              <div className="payment-item d-flex align-items-center justify-content-between mb-2">
                                <div className="form-check d-flex align-items-center ps-0">
                                  <input className="form-check-input ms-0 mt-0" name="payment" type="radio" id="payment4" />
                                  <label className="form-check-label ms-2" htmlFor="payment4">
                                    PaySolution
                                  </label>
                                </div>
                                <div>
                                  <img src="assets/img/icons/pay-solution.svg" alt="payment" />
                                </div>
                              </div>
                              <div className="payment-item d-flex align-items-center justify-content-between mb-0">
                                <div className="form-check d-flex align-items-center ps-0">
                                  <input className="form-check-input ms-0 mt-0" name="payment" type="radio" id="payment5" />
                                  <label className="form-check-label ms-2" htmlFor="payment5">
                                    Square
                                  </label>
                                </div>
                                <div>
                                  <img src="assets/img/icons/square.svg" alt="payment" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="card total-card">
                                <div className="card-body p-3 d-flex justify-content-between flex-column">
                                  <div>
                                    <div className="mb-2 d-flex align-items-center justify-content-between">
                                      <div>
                                        <h6 className="fw-medium">Lighting Services</h6>
                                        <p className="fs-10">30 Min</p>
                                      </div>
                                      <h6 className="fs-12 fw-medium">$457</h6>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center justify-content-between">
                                      <div>
                                        <h6 className="fw-medium">Outlets &amp; Wiring</h6>
                                        <p className="fs-10">30 Min</p>
                                      </div>
                                      <h6 className="fs-12 fw-medium">$200</h6>
                                    </div>
                                    <div className="mb-0 d-flex align-items-center justify-content-between">
                                      <div>
                                        <h6 className="fw-medium">Switches Changes</h6>
                                        <p className="fs-10">30 Min</p>
                                      </div>
                                      <h6 className="fs-12 fw-medium">$100</h6>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="total-wrap">
                                      <div className="mb-2 d-flex align-items-center justify-content-between">
                                        <h6 className="fw-medium">Sub Total</h6>
                                        <p className="text-gray-9">$757</p>
                                      </div>
                                      <div className="mb-2 d-flex align-items-center justify-content-between">
                                        <h6 className="fw-medium">Tax <span className="text-default fw-normal">(GST 5%)</span>
                                        </h6>
                                        <p className="text-gray-9">$60</p>
                                      </div>
                                      <div className="mb-2 d-flex align-items-center justify-content-between">
                                        <h6 className="fw-medium">Discount <span className="text-default fw-normal">15%</span>
                                        </h6>
                                        <p className="text-gray-9">$757</p>
                                      </div>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <h6 className="fs-14">Total</h6>
                                        <h6 className="fs-14">$757</h6>
                                      </div>
                                    </div>
                                    <Link to="/javascript:void(0);" id="pay-btn" className="btn btn-light w-100 next_btn">Pay
                                      $757</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      {/* /Payment Method */}
                      {/* Confirmation */}
                      <fieldset className="booking-content">
                        <div className="book-card">
                          <h6 className="fs-16 me-2 mb-3">Payment Method</h6>
                          <div className="card">
                            <div className="card-body">
                              <h6 className="fs-14 fw-medium mb-3">Your Booking is Successful on Sun 16 July 2024at 5:00pm
                              </h6>
                              <div className="card shadow-none mb-0">
                                <div className="card-body p-3">
                                  <div className="d-flex align-items-center justify-content-between flex-wrap p-2 bg-light-300 rounded mb-3">
                                    <div className="d-flex align-items-center pb-2">
                                      <span className="avatar avatar-xl flex-shrink-0">
                                        <img src="assets/img/services/addservice-05.jpg" alt="img" />
                                      </span>
                                      <div className="ms-2">
                                        <h6 className="mb-1">Lighting Services</h6>
                                        <p>Booking ref. <span className="text-primary">#65742695</span></p>
                                      </div>
                                    </div>
                                    <span className="badge badge-success"><i className="ti ti-circle-check-filled me-1" />Confirmed</span>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Lighting Services</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$457</h6>
                                  </div>
                                  <div className="mb-2 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Outlets &amp; Wiring</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$200</h6>
                                  </div>
                                  <div className="mb-0 d-flex align-items-center justify-content-between">
                                    <div>
                                      <h6 className="fw-medium">Switches Changes</h6>
                                      <p className="fs-10">30 Min</p>
                                    </div>
                                    <h6 className="fs-12 fw-medium">$100</h6>
                                  </div>
                                  <div className="border-top pt-2">
                                    <div className="mb-2 d-flex align-items-center justify-content-between">
                                      <h6 className="fw-medium">Sub Total</h6>
                                      <p>$757</p>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center justify-content-between">
                                      <h6 className="fw-medium">Tax</h6>
                                      <p>$60</p>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center justify-content-between">
                                      <h6 className="fw-medium">Discount</h6>
                                      <p>$757</p>
                                    </div>
                                  </div>
                                  <div className="border-top pt-2 d-flex align-items-center justify-content-between">
                                    <h6 className="fs-14">Total</h6>
                                    <h6 className="fs-14">$757</h6>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-center flex-wrap">
                                <Link to="/javascript:void(0);" className="btn btn-sm btn-info d-inline-flex align-items-center me-3 mt-3"><i className="ti ti-calendar me-1" />Add to Calendar</Link>
                                <Link to="/booking" className="btn btn-sm btn-primary d-inline-flex align-items-center mt-3"><i className="ti ti-circle-plus me-1" />Start New Booking</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      {/* /Confirmation */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Booking */}
        </div>
      </div>
    </div>

  );
};

export default BookingPage;