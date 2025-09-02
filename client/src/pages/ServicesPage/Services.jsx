import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
              <div className="card mb-4 mb-lg-0">
                <div className="card-body">
                  <form action="https://truelysell.dreamstechnologies.com/html/template/search.html">
                    <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                      <h5><i className="ti ti-filter-check me-2" />Filters</h5>
                      <Link to="/javascript:void(0);">Reset Filter</Link>
                    </div>
                    <div className="mb-3 pb-3 border-bottom">
                      <label className="form-label">Search By Keyword</label>
                      <input type="text" className="form-control" placeholder="What are you looking for?" />
                    </div>
                    <div className="accordion border-bottom mb-3">
                      <div className="accordion-item mb-3">
                        <div className="accordion-header" id="accordion-headingThree">
                          <div className="accordion-button p-0 mb-3" data-bs-toggle="collapse" data-bs-target="#accordion-collapseThree" aria-expanded="true" aria-controls="accordion-collapseThree" role="button">
                            Categories
                          </div>
                        </div>
                        <div id="accordion-collapseThree" className="accordion-collapse collapse show" aria-labelledby="accordion-headingThree">
                          <div className="content-list mb-3" id="fill-more">
                            <div className="form-check mb-2">
                              <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" defaultChecked />
                                All Categories
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" />
                                Construction
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" />
                                Car Wash
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" />
                                Electrical
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" />
                                Cleaning
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" />
                                Plumbing
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" />
                                Designing
                              </label>
                            </div>
                          </div>
                          <Link to="/javascript:void(0);" id="more" className="more-view text-primary fs-14">View more <i className="ti ti-chevron-down ms-1" /></Link>
                        </div>
                      </div>
                    </div>
                    <div className="accordion border-bottom mb-3">
                      <div className="accordion-header" id="accordion-headingFour">
                        <div className="accordion-button p-0 mb-3" data-bs-toggle="collapse" data-bs-target="#accordion-collapseFour" aria-expanded="true" aria-controls="accordion-collapseFour" role="button">
                          Sub Category
                        </div>
                      </div>
                      <div id="accordion-collapseFour" className="accordion-collapse collapse show" aria-labelledby="accordion-headingFour">
                        <div className="mb-3">
                          <select className="select">
                            <option selected>Select Sub Category</option>
                            <option>Car Wash</option>
                            <option>Construction</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="accordion border-bottom mb-3">
                      <div className="accordion-header" id="accordion-headingFive">
                        <div className="accordion-button p-0 mb-3" data-bs-toggle="collapse" data-bs-target="#accordion-collapseFive" aria-expanded="true" aria-controls="accordion-collapseFive" role="button">
                          Location
                        </div>
                      </div>
                      <div id="accordion-collapseFive" className="accordion-collapse collapse show" aria-labelledby="accordion-headingFive">
                        <div className="mb-3">
                          <div className="position-relative">
                            <input type="text" className="form-control" placeholder="Select Location" />
                            <span className="icon-addon"><i className="ti ti-map-pin" /></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion border-bottom mb-3">
                      <div className="accordion-header" id="accordion-headingSix">
                        <div className="accordion-button p-0 mb-3" data-bs-toggle="collapse" data-bs-target="#accordion-collapseSix" aria-expanded="true" aria-controls="accordion-collapseSix" role="button">
                          Price Range
                        </div>
                      </div>
                      <div id="accordion-collapseSix" className="accordion-collapse collapse show" aria-labelledby="accordion-headingSix">
                        <div className="filter-range">
                          <input type="text" id="range_03" />
                        </div>
                        <div className="filter-range-amount mb-3">
                          <p className="fs-14">Price: <span>$5 - $210</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion">
                      <div className="accordion-item mb-3">
                        <div className="accordion-header" id="accordion-headingTwo">
                          <div className="accordion-button fs-18 p-0 mb-3" data-bs-toggle="collapse" data-bs-target="#accordion-collapseTwo" aria-expanded="true" aria-controls="accordion-collapseTwo" role="button">
                            Ratings
                          </div>
                        </div>
                        <div id="accordion-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="accordion-headingTwo">
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <label className="form-check-label d-block">
                                <input className="form-check-input" type="checkbox" defaultChecked />
                                <span className="rating">
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" /><span className="float-end">(55)</span>
                                </span>
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <label className="form-check-label d-block">
                                <input className="form-check-input" type="checkbox" />
                                <span className="rating">
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fa-regular fa-star filled" /><span className="float-end">(48)</span>
                                </span>
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <label className="form-check-label d-block">
                                <input className="form-check-input" type="checkbox" />
                                <span className="rating">
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fa-regular fa-star filled" />
                                  <i className="fa-regular fa-star filled" /><span className="float-end">(13)</span>
                                </span>
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <label className="form-check-label d-block">
                                <input className="form-check-input" type="checkbox" />
                                <span className="rating">
                                  <i className="fas fa-star filled" />
                                  <i className="fas fa-star filled" />
                                  <i className="fa-regular fa-star filled" />
                                  <i className="fa-regular fa-star filled" />
                                  <i className="fa-regular fa-star filled" /><span className="float-end">(05)</span>
                                </span>
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <label className="form-check-label d-block">
                                <input className="form-check-input" type="checkbox" />
                                <span className="rating">
                                  <i className="fas fa-star filled" />
                                  <i className="fa-regular fa-star filled" />
                                  <i className="fa-regular fa-star filled" />
                                  <i className="fa-regular fa-star filled" />
                                  <i className="fa-regular fa-star filled" /><span className="float-end">(00)</span>
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-dark w-100">Search</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                <h4>Found <span className="text-primary">11 Services</span></h4>
                <div className="d-flex align-items-center">
                  <span className="text-dark me-2">Sort</span>
                  <div className="dropdown me-2">
                    <Link to="/javascript:void(0);" className="dropdown-toggle bg-light-300 " data-bs-toggle="dropdown">
                      Price Low to High
                    </Link>
                    <div className="dropdown-menu">
                      <Link to="/javascript:void(0);" className="dropdown-item active">Price Low to High</Link>
                      <Link to="/javascript:void(0);" className="dropdown-item">Price High to Low</Link>
                    </div>
                  </div>
                  <Link to="/services-grid.html" className="tags d-flex justify-content-center align-items-center bg-primary rounded me-2"><i className="ti ti-layout-grid" /></Link>
                  <Link to="/services-list.html" className="tags d-flex justify-content-center align-items-center border rounded"><i className="ti ti-list" /></Link>
                </div>
              </div>
              <div className="row justify-content-center align-items-center">
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-13.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Car Wash</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2">
                          <Link to="/service-details">Car Repair Service</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />Maryland City, MD, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.9</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$25.00 <span className="fs-13 text-gray"><del>$30.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-14.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Construction</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2">
                          <Link to="/service-details">Toughened Glass Fitting</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />New Jersey, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.7</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$20.00 <span className="fs-13 text-gray"><del>$25.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-15.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Computer</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2 text-truncate">
                          <Link to="/service-details">Computer Hardware Service</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />California, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.5</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$20.00 <span className="fs-13 text-gray"><del>$35.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-16.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Interior</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2">
                          <Link to="/service-details">Interior Designing</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />Maryland, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.8</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$30.00 <span className="fs-13 text-gray"><del>$35.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-17.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Car Wash</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2">
                          <Link to="/service-details">Steam Car Wash</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />Montana, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.2</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$20.00 <span className="fs-13 text-gray"><del>$25.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-18.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Electrical</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2">
                          <Link to="/service-details">Electric Panel Repairing</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />Texas, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.9</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$40.00 <span className="fs-13 text-gray"><del>$45.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-19.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Cleaning</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2 text-truncate">
                          <Link to="/javascript:void(0);">House Cleaning Services</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />New Jersey, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.6</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$45.00 <span className="fs-13 text-gray"><del>$50.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-20.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Construction</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2">
                          <Link to="/service-details">Commercial Painting </Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />Alabama, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.5</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$40.00 <span className="fs-13 text-gray"><del>$45.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-21.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Appliance</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2">
                          <Link to="/service-details">Air Conditioner Service</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />Washington, DC, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.2</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$20.00 <span className="fs-13 text-gray"><del>$25.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-22.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Construction</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2">
                          <Link to="/service-details">Building Construction</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />Montana, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.0</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$50.00 <span className="fs-13 text-gray"><del>$55.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-23.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Plumber</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2">
                          <Link to="/service-details">Plumbing Services</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />Virginia, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.3</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$45.00 <span className="fs-13 text-gray"><del>$50.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card p-0">
                    <div className="card-body p-0">
                      <div className="img-sec w-100">
                        <Link to="/service-details"><img src="assets/img/providers/provider-24.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                        <div className="image-tag d-flex justify-content-end align-items-center">
                          <span className="trend-tag">Carpentry</span>
                          <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                        </div>
                        <span className="image-logo avatar avatar-md border rounded-circle">
                          <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                        </span>
                      </div>
                      <div className="p-3">
                        <h5 className="mb-2">
                          <Link to="/service-details">Wooden Carpentry Work</Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />Alabama, USA</p>
                          <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.1</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>$25.00 <span className="fs-13 text-gray"><del>$30.00/hr</del></span></h5>
                          <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <nav aria-label="Page navigation">
                <ul className="paginations d-flex justify-content-center align-items-center">
                  <li className="page-item me-3">
                    <Link className="page-link"><i className="ti ti-arrow-left me-2" />Prev</Link>
                  </li>
                  <li className="page-item me-2"><Link className="page-link-1 active d-flex justify-content-center align-items-center " to="/javascript:void(0);">1</Link></li>
                  <li className="page-item me-2"><Link className="page-link-1 d-flex justify-content-center align-items-center " to="/javascript:void(0);">2</Link></li>
                  <li className="page-item me-3"><Link className="page-link-1 d-flex justify-content-center align-items-center " to="/javascript:void(0);">3</Link></li>
                  <li className="page-item ">
                    <Link className="page-link" to="/javascript:void(0);">Next<i className="ti ti-arrow-right ms-2" /></Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;