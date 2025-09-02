const UserDashboard = () => {
  return (
    <div className="col-xl-9 col-lg-8">
      <h4 className="mb-3">Dashboard</h4>
      <div className="row mb-4">
        <div className="col-xxl-3 col-md-6">
          <div className="card dash-widget">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="dash-icon bg-primary-transparent d-flex justify-content-center align-items-center rounded-circle">
                    <i className="ti ti-shopping-cart" />
                  </span>
                  <div className="ms-2">
                    <span className="fs-14">Total Orders</span>
                    <h5><span className="counter">27</span></h5>
                  </div>
                </div>
                <span className="badge badge-success"><i className="ti ti-circle-arrow-up me-1" />16%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-md-6">
          <div className="card dash-widget">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="dash-icon bg-secondary-transparent d-flex justify-content-center align-items-center rounded-circle">
                    <i className="ti ti-wallet" />
                  </span>
                  <div className="ms-2">
                    <span className="fs-14">Total Spend</span>
                    <h5>$ <span className="counter">2500</span></h5>
                  </div>
                </div>
                <span className="badge badge-danger"><i className="ti ti-circle-arrow-down me-1" />5%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-md-6">
          <div className="card dash-widget">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="dash-icon bg-success-transparent d-flex justify-content-center align-items-center rounded-circle ">
                    <i className="ti ti-cards" />
                  </span>
                  <div className="ms-2">
                    <span className="fs-14">Wallet</span>
                    <h5>$ <span className="counter">200</span></h5>
                  </div>
                </div>
                <span className="badge badge-danger"><i className="ti ti-circle-arrow-down me-1" />5%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-md-6">
          <div className="card dash-widget">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="dash-icon bg-info-transparent d-flex justify-content-center align-items-center rounded-circle">
                    <i className="ti ti-cards" />
                  </span>
                  <div className="ms-2">
                    <span className="fs-14">Total Savings</span>
                    <h5>$ <span className="counter">354</span></h5>
                  </div>
                </div>
                <span className="badge badge-success"><i className="ti ti-circle-arrow-up me-1" />16%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xxl-5 col-lg-5 d-flex">
          <div className="w-100">
            <h5 className="mb-3">Recent Transaction</h5>
            <div className="table-responsive">
              <table className="table mb-0">
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                          <i className="ti ti-devices-2 fs-20 text-dark" />
                        </span>
                        <div>
                          <h6 className="fs-14">Service Booking</h6>
                          <span className="text-gray fs-12">
                            <i className="feather-calendar" />
                            22 Sep 2023
                            <span className="ms-2">
                              <i className="feather-clock" />
                              10:12 AM
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <h6>$280.00</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                          <i className="ti ti-refresh fs-20 text-dark" />
                        </span>
                        <div>
                          <h6 className="fs-14">Service Refund</h6>
                          <span className="text-gray fs-12">
                            <i className="feather-calendar" />
                            15 Oct 2022
                            <span className="ms-2">
                              <i className="ti ti-clock me-1" />
                              14:36 PM
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <h6>$395.00</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                          <i className="ti ti-wallet fs-20 text-dark" />
                        </span>
                        <div>
                          <h6 className="fs-14">Wallet Topup</h6>
                          <span className="text-gray fs-12">
                            <i className="feather-calendar" />
                            18 Oct 2022
                            <span className="ms-2">
                              <i className="ti ti-clock me-1" />
                              15:19 PM
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <h6>$1000.00</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                          <i className="ti ti-devices-2 fs-20 text-dark" />
                        </span>
                        <div>
                          <h6 className="fs-14">Service Booking</h6>
                          <span className="text-gray fs-12">
                            <i className="feather-calendar" />
                            28 Oct 2022
                            <span className="ms-2">
                              <i className="ti ti-clock me-1" />
                              11:17 AM
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <h6>$598.65</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                          <i className="ti ti-devices-2 fs-20 text-dark" />
                        </span>
                        <div>
                          <h6 className="fs-14">Service Booking</h6>
                          <span className="text-gray fs-12">
                            <i className="feather-calendar" />
                            10 Nov 2022
                            <span className="ms-2">
                              <i className="ti ti-clock me-1" />
                              09:13 AM
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <h6>$300.00</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="dash-icon-1 bg-gray d-flex justify-content-center align-items-center rounded-circle avatar avatar-lg me-2">
                          <i className="ti ti-devices-2 fs-20 text-dark" />
                        </span>
                        <div>
                          <h6 className="fs-14">Service Booking</h6>
                          <span className="text-gray fs-12">
                            <i className="feather-calendar" />
                            10 Nov 2022
                            <span className="ms-2">
                              <i className="ti ti-clock me-1" />
                              09:13 AM
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <h6>$300.00</h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xxl-7 col-lg-7 d-flex">
          <div className="w-100">
            <h5 className="mb-3">Recent Booking</h5>
            <div className="table-responsive">
              <table className="table mb-0">
                <tbody>
                  <tr>
                    <td>
                      <a href="booking-details.html" className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/providers/provider-15.jpg" className="img-fluid" alt="img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">Computer Repair</h6>
                            <span className="text-gray fs-12">
                              <i className="feather-calendar me-1" />
                              10 Nov 2022
                            </span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>
                      <a className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/user/user-01.jpg" className="rounded-circle img-fluid" alt="Img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">John Smith</h6>
                            <span className="text-gray fs-14"><span className="__cf_email__" data-cfemail="4d272225230d2a202c2421632e2220">[email&nbsp;protected]</span></span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td className="text-end">
                      <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="booking-details.html" className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/providers/provider-13.jpg" className="img-fluid" alt="Img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">Car Repair </h6>
                            <span className="text-gray fs-12 me-1">
                              <i className="feather-calendar" />
                              15 Oct 2022
                            </span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>
                      <a href="javascript:void(0);" className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/user/user-02.jpg" className="rounded-circle img-fluid" alt="Img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">Timothy</h6>
                            <span className="text-gray fs-14"><span className="__cf_email__" data-cfemail="d3a7babebca7bbaa93b4beb2babffdb0bcbe">[email&nbsp;protected]</span></span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td className="text-end">
                      <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="booking-details.html" className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/providers/provider-16.jpg" className="img-fluid" alt="Img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">Interior Designing </h6>
                            <span className="text-gray fs-12 me-1">
                              <i className="feather-calendar" />
                              18 Oct 2022
                            </span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>
                      <a className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/user/user-03.jpg" className="rounded-circle img-fluid" alt="Img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">Jordan</h6>
                            <span className="text-gray fs-14"><span className="__cf_email__" data-cfemail="670d081503060927000a060e0b4904080a">[email&nbsp;protected]</span></span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td className="text-end">
                      <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="booking-details.html" className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/providers/provider-17.jpg" className="img-fluid" alt="Img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">Steam Car Wash</h6>
                            <span className="text-gray fs-12 me-1">
                              <i className="feather-calendar" />
                              28 Oct 2022
                            </span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>
                      <a href="javascript:void(0);" className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/user/user-05.jpg" className="rounded-circle img-fluid" alt="Img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">Armand</h6>
                            <span className="text-gray fs-14"><span className="__cf_email__" data-cfemail="7716051a16191337101a161e1b5914181a">[email&nbsp;protected]</span></span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td className="text-end">
                      <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="booking-details.html" className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/providers/provider-19.jpg" className="img-fluid" alt="Img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">House Cleaning</h6>
                            <span className="text-gray fs-12 me-1">
                              <i className="feather-calendar" />
                              10 Nov 2022
                            </span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>
                      <a href="javascript:void(0);" className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/user/user-04.jpg" className="rounded-circle img-fluid" alt="Img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">Joseph</h6>
                            <span className="text-gray fs-14"><span className="__cf_email__" data-cfemail="fc96938f998c94bc9b919d9590d29f9391">[email&nbsp;protected]</span></span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td className="text-end">
                      <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="booking-details.html" className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/providers/provider-09.jpg" className="img-fluid" alt="Img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">Car Repair</h6>
                            <span className="text-gray fs-12 me-1">
                              <i className="feather-calendar" />
                              10 Nov 2022
                            </span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>
                      <a href="javascript:void(0);" className="d-flex">
                        <span className="avatar avatar-lg me-2">
                          <img src="assets/img/user/user-06.jpg" className="rounded-circle img-fluid" alt="Img" />
                        </span>
                        <div className="d-flex align-items-center">
                          <div>
                            <h6 className="fs-14">Adrian</h6>
                            <span className="text-gray fs-14"><span className="__cf_email__" data-cfemail="97fdf6f3e5fef6f9d7f0faf6fefbb9f4f8fa">[email&nbsp;protected]</span></span>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td className="text-end">
                      <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;