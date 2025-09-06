import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-12 d-flex widget-path widget-service">
            <div className="card">
              <div className="card-body">
                <div className="home-user">
                  <div className="home-userhead">
                    <div className="home-usercount">
                      <span><img src="assets/img/icons/user.svg" alt="img" /></span>
                      <h6>User</h6>
                    </div>
                    <div className="home-useraction">
                      <Link className="delete-table bg-white" to="/javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="true">
                        <i className="fa fa-ellipsis-v" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu" data-popper-placement="bottom-end">
                        <li>
                          <Link to="/user-list" className="dropdown-item"> View</Link>
                        </li>
                        <li>
                          <Link to="/edit-user" className="dropdown-item"> Edit</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="home-usercontent">
                    <div className="home-usercontents">
                      <div className="home-usercontentcount">
                        <img src="assets/img/icons/arrow-up.svg" alt="img" className="me-2" />
                        <span className="counters" data-count={30}>30</span>
                      </div>
                      <h5> Current Month</h5>
                    </div>
                    <div className="homegraph">
                      <img src="assets/img/graph/graph1.png" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12 d-flex widget-path widget-service">
            <div className="card">
              <div className="card-body">
                <div className="home-user home-provider">
                  <div className="home-userhead">
                    <div className="home-usercount">
                      <span><img src="assets/img/icons/user-circle.svg" alt="img" /></span>
                      <h6>Providers</h6>
                    </div>
                    <div className="home-useraction">
                      <Link className="delete-table bg-white" to="/javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="true">
                        <i className="fa fa-ellipsis-v" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu" data-popper-placement="bottom-end">
                        <li>
                          <Link to="/providers" className="dropdown-item"> View</Link>
                        </li>
                        <li>
                          <Link to="/edit-provider" className="dropdown-item"> Edit</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="home-usercontent">
                    <div className="home-usercontents">
                      <div className="home-usercontentcount">
                        <img src="assets/img/icons/arrow-up.svg" alt="img" className="me-2" />
                        <span className="counters" data-count={25}>25</span>
                      </div>
                      <h5> Current Month</h5>
                    </div>
                    <div className="homegraph">
                      <img src="assets/img/graph/graph2.png" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12 d-flex widget-path widget-service">
            <div className="card">
              <div className="card-body">
                <div className="home-user home-service">
                  <div className="home-userhead">
                    <div className="home-usercount">
                      <span><img src="assets/img/icons/service.svg" alt="img" /></span>
                      <h6>Service</h6>
                    </div>
                    <div className="home-useraction">
                      <Link className="delete-table bg-white" to="/javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="true">
                        <i className="fa fa-ellipsis-v" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu" data-popper-placement="bottom-end">
                        <li>
                          <Link to="/services" className="dropdown-item"> View</Link>
                        </li>
                        <li>
                          <Link to="/edit-service" className="dropdown-item"> Edit</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="home-usercontent">
                    <div className="home-usercontents">
                      <div className="home-usercontentcount">
                        <img src="assets/img/icons/arrow-up.svg" alt="img" className="me-2" />
                        <span className="counters" data-count={18}>18</span>
                      </div>
                      <h5> Current Month</h5>
                    </div>
                    <div className="homegraph">
                      <img src="assets/img/graph/graph3.png" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12 d-flex widget-path widget-service">
            <div className="card">
              <div className="card-body">
                <div className="home-user home-subscription">
                  <div className="home-userhead">
                    <div className="home-usercount">
                      <span><img src="assets/img/icons/money.svg" alt="img" /></span>
                      <h6>Subscription</h6>
                    </div>
                    <div className="home-useraction">
                      <Link className="delete-table bg-white" to="/javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="true">
                        <i className="fa fa-ellipsis-v" aria-hidden="true" />
                      </Link>
                      <ul className="dropdown-menu" data-popper-placement="bottom-end">
                        <li>
                          <Link to="/membership" className="dropdown-item"> View</Link>
                        </li>
                        <li>
                          <Link to="/javascript:void(0);" className="dropdown-item"> Edit</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="home-usercontent">
                    <div className="home-usercontents">
                      <div className="home-usercontentcount">
                        <img src="assets/img/icons/arrow-up.svg" alt="img" className="me-2" />
                        <span className="counters" data-count={650}>$650</span>
                      </div>
                      <h5> Current Month</h5>
                    </div>
                    <div className="homegraph">
                      <img src="assets/img/graph/graph4.png" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-6 col-12 d-flex  widget-path">
            <div className="card">
              <div className="card-body">
                <div className="home-user">
                  <div className="home-head-user">
                    <h2>Revenue</h2>
                    <div className="home-select">
                      <div className="dropdown">
                        <button className="btn btn-action btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Monthly
                        </button>
                        <ul className="dropdown-menu" data-popper-placement="bottom-end">
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item">Weekly</Link>
                          </li>
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item">Monthly</Link>
                          </li>
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item">Yearly</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown">
                        <Link className="delete-table bg-white" to="/javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="true">
                          <i className="fa fa-ellipsis-v" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu" data-popper-placement="bottom-end">
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item"> View</Link>
                          </li>
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item"> Edit</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="chartgraph">
                    <div id="chart-view" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-6 col-12 d-flex  widget-path">
            <div className="card">
              <div className="card-body">
                <div className="home-user">
                  <div className="home-head-user">
                    <h2>Booking Summary</h2>
                    <div className="home-select">
                      <div className="dropdown">
                        <button className="btn btn-action btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Monthly
                        </button>
                        <ul className="dropdown-menu" data-popper-placement="bottom-end">
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item">Weekly</Link>
                          </li>
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item">Monthly</Link>
                          </li>
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item">Yearly</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown">
                        <Link className="delete-table bg-white" to="/javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="true">
                          <i className="fa fa-ellipsis-v" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu" data-popper-placement="bottom-end">
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item"> View</Link>
                          </li>
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item"> Edit</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="chartgraph">
                    <div id="chart-booking" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-12 d-flex widget-path">
            <div className="card">
              <div className="card-body">
                <div className="home-user">
                  <div className="home-head-user home-graph-header">
                    <h2>Top Services</h2>
                    <Link to="/services" className="btn btn-viewall">View All<img src="assets/img/icons/arrow-right.svg" className="ms-2" alt="img" /></Link>
                  </div>
                  <div className="table-responsive datatable-nofooter">
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Service</th>
                          <th>Category</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <Link to="/view-service" className="table-imgname">
                              <img src="assets/img/services/service-03.jpg" className="me-2" alt="img" />
                              <span>Computer Repair</span>
                            </Link>
                          </td>
                          <td>Computer</td>
                          <td>$80</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <Link to="/view-service" className="table-imgname">
                              <img src="assets/img/services/service-02.jpg" className="me-2" alt="img" />
                              <span>Car Repair Services</span>
                            </Link>
                          </td>
                          <td>Automobile</td>
                          <td>$50</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <Link to="/view-service" className="table-imgname">
                              <img src="assets/img/services/service-04.jpg" className="me-2" alt="img" />
                              <span>Car Wash</span>
                            </Link>
                          </td>
                          <td>Automobile</td>
                          <td>$14</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <Link to="/view-service" className="table-imgname">
                              <img src="assets/img/services/service-09.jpg" className="me-2" alt="img" />
                              <span>House Cleaning </span>
                            </Link>
                          </td>
                          <td>Cleaning</td>
                          <td>$100</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>
                            <Link to="/view-service" className="table-imgname">
                              <img src="assets/img/services/service-10.jpg" className="me-2" alt="img" />
                              <span>Interior </span>
                            </Link>
                          </td>
                          <td>Cleaning</td>
                          <td>$50</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 d-flex widget-path">
            <div className="card">
              <div className="card-body">
                <div className="home-user">
                  <div className="home-head-user home-graph-header">
                    <h2>Top Providers</h2>
                    <Link to="/providers" className="btn btn-viewall">View All<img src="assets/img/icons/arrow-right.svg" className="ms-2" alt="img" /></Link>
                  </div>
                  <div className="table-responsive datatable-nofooter">
                    <table className="table datatable ">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Provider Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-06.jpg" className="me-2" alt="img" />
                              <span>Robert</span>
                            </Link>
                          </td>
                          <td><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="44362b2621363004213c25293428216a272b29">[email&nbsp;protected]</Link></td>
                          <td>+1 347-679-8275</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-09.jpg" className="me-2" alt="img" />
                              <span>Sharonda</span>
                            </Link>
                          </td>
                          <td><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="cfbca7aebda0a1abae8faab7aea2bfa3aae1aca0a2">[email&nbsp;protected]</Link></td>
                          <td>+1 570-621-248</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-01.jpg" className="me-2" alt="img" />
                              <span>John Smith</span>
                            </Link>
                          </td>
                          <td><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="fb919493958896928f93bb9e839a968b979ed5989496">[email&nbsp;protected]</Link></td>
                          <td>+1 646-957-0004</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-05.jpg" className="me-2" alt="img" />
                              <span>Pricilla</span>
                            </Link>
                          </td>
                          <td><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="3242405b515b5e5e5372574a535f425e571c515d5f">[email&nbsp;protected]</Link></td>
                          <td>+1 614-915-8101</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-09.jpg" className="me-2" alt="img" />
                              <span>James</span>
                            </Link>
                          </td>
                          <td><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="214b404c4452614459404c514d440f424e4c">[email&nbsp;protected]</Link></td>
                          <td>+1 918-543-3702</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-sm-12 d-flex widget-path">
            <div className="card">
              <div className="card-body">
                <div className="home-user">
                  <div className="home-head-user home-graph-header">
                    <h2>Top Countries</h2>
                    <div className="home-select">
                      <div className="dropdown">
                        <button className="btn btn-action btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Monthly
                        </button>
                        <ul className="dropdown-menu" data-popper-placement="bottom-end">
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item">Weekly</Link>
                          </li>
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item">Monthly</Link>
                          </li>
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item">Yearly</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="dropdown">
                        <Link className="delete-table bg-white" to="/javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="true">
                          <i className="fa fa-ellipsis-v" aria-hidden="true" />
                        </Link>
                        <ul className="dropdown-menu" data-popper-placement="bottom-end">
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item"> View</Link>
                          </li>
                          <li>
                            <Link to="/javascript:void(0);" className="dropdown-item"> Edit</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="chartgraph">
                    <div className="row align-items-center">
                      <div className="col-lg-7">
                        <div id="world_map" style={{ height: 150 }} />
                      </div>
                      <div className="col-lg-5">
                        <div className="bookingmap">
                          <ul>
                            <li>
                              <span><img src="assets/img/flags/us.png" alt="img" className="me-2" />United State</span>
                              <h6>60%</h6>
                            </li>
                            <li>
                              <span><img src="assets/img/flags/in.png" alt="img" className="me-2" />India</span>
                              <h6>80%</h6>
                            </li>
                            <li>
                              <span><img src="assets/img/flags/ca.png" alt="img" className="me-2" />Canada</span>
                              <h6>50%</h6>
                            </li>
                            <li>
                              <span><img src="assets/img/flags/au.png" alt="img" className="me-2" />Australia</span>
                              <h6>75%</h6>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12 d-flex widget-path">
            <div className="card">
              <div className="card-body">
                <div className="home-user">
                  <div className="home-head-user home-graph-header">
                    <h2>Booking Statistics</h2>
                    <Link to="/booking" className="btn btn-viewall">View All<img src="assets/img/icons/arrow-right.svg" className="ms-2" alt="img" /></Link>
                  </div>
                  <div className="chartgraph">
                    <div className="row align-items-center">
                      <div className="col-lg-7 col-sm-6">
                        <div id="chart-bar" />
                      </div>
                      <div className="col-lg-5 col-sm-6">
                        <div className="bookingstatus">
                          <ul>
                            <li>
                              <span />
                              <h6>Completed</h6>
                            </li>
                            <li className="process-status">
                              <span />
                              <h6>Process</h6>
                            </li>
                            <li className="process-pending">
                              <span />
                              <h6>Pending</h6>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 widget-path">
            <div className="card mb-0">
              <div className="card-body">
                <div className="home-user">
                  <div className="home-head-user home-graph-header">
                    <h2>Recent Booking</h2>
                    <Link to="/booking" className="btn btn-viewall">View All<img src="assets/img/icons/arrow-right.svg" className="ms-2" alt="img" /></Link>
                  </div>
                  <div className="table-responsive datatable-nofooter">
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Booking Time</th>
                          <th>Provider</th>
                          <th>User</th>
                          <th>Service</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>28 Sep 2023</td>
                          <td>10:00:00 - 11:00:00</td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-01.jpg" className="me-2" alt="img" />
                              <span>John Smith</span>
                            </Link>
                          </td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-03.jpg" className="me-2" alt="img" />
                              <span>Sharon</span>
                            </Link></td>
                          <td>
                            <Link to="/view-service" className="table-imgname">
                              <img src="assets/img/services/service-03.jpg" className="me-2" alt="img" />
                              <span>Computer Repair</span>
                            </Link>
                          </td>
                          <td>$80</td>
                          <td><h6 className="badge-pending">Pending</h6></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>10 Sep 2023</td>
                          <td>18:00:00 - 19:00:00	 </td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-04.jpg" className="me-2" alt="img" />
                              <span>Johnny</span>
                            </Link>
                          </td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-05.jpg" className="me-2" alt="img" />
                              <span>Pricilla</span>
                            </Link>
                          </td>
                          <td>
                            <Link to="/view-service" className="table-imgname">
                              <img src="assets/img/services/service-02.jpg" className="me-2" alt="img" />
                              <span>Car Repair Services</span>
                            </Link>
                          </td>
                          <td>$50</td>
                          <td><h6 className="badge-active">Completed</h6></td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>25 Sep 2023</td>
                          <td>12:00:00 - 13:00:00</td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-06.jpg" className="me-2" alt="img" />
                              <span>Robert</span>
                            </Link>
                          </td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-02.jpg" className="me-2" alt="img" />
                              <span>Amanda</span>
                            </Link>
                          </td>
                          <td>
                            <Link to="/view-service" className="table-imgname">
                              <img src="assets/img/services/service-04.jpg" className="me-2" alt="img" />
                              <span>Steam Car Wash</span>
                            </Link>
                          </td>
                          <td>$50</td>
                          <td><h6 className="badge-inactive">Inprogress</h6></td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>08 Sep 2023</td>
                          <td>07 Oct 2023 11:22:51</td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-09.jpg" className="me-2" alt="img" />
                              <span>Sharonda</span>
                            </Link>
                          </td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-01.jpg" className="me-2" alt="img" />
                              <span>James</span>
                            </Link>
                          </td>
                          <td>
                            <Link to="/view-service" className="table-imgname">
                              <img src="assets/img/services/service-09.jpg" className="me-2" alt="img" />
                              <span>House Cleaning </span>
                            </Link>
                          </td>
                          <td>$50</td>
                          <td><h6 className="badge-delete">Cancelled</h6></td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>28 Sep 2023</td>
                          <td>10:00:00 - 11:00:00</td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-01.jpg" className="me-2" alt="img" />
                              <span>John Smith</span>
                            </Link>
                          </td>
                          <td>
                            <Link to="/javascript:void(0);" className="table-profileimage">
                              <img src="assets/img/customer/user-03.jpg" className="me-2" alt="img" />
                              <span>Sharon</span>
                            </Link></td>
                          <td>
                            <Link to="/view-service" className="table-imgname">
                              <img src="assets/img/services/service-03.jpg" className="me-2" alt="img" />
                              <span>Computer Repair</span>
                            </Link>
                          </td>
                          <td>$80</td>
                          <td><h6 className="badge-pending">Pending</h6></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;