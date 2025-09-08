import { Link } from "react-router-dom";

const BookingPage = () => {
  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit">
          <h5>Booking List</h5>
          <div className="list-btn">
            <ul>
              <li>
                <div className="filter-sorting">
                  <ul>
                    <li>
                      <Link to="/javascript:void(0);" className="filter-sets"><i className="fe fe-filter me-2" />Filter</Link>
                    </li>
                    <li>
                      <span><img src="assets/img/icons/sort.svg" className="me-2" alt="img" /></span>
                      <div className="review-sort">
                        <select className="select">
                          <option>A -&gt; Z</option>
                          <option>Z -&gt; A</option>
                        </select>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="tab-sets">
              <div className="tab-contents-sets">
                <ul>
                  <li>
                    <Link to="/bookings" className="active">All Booking</Link>
                  </li>
                  <li>
                    <Link to="#">Pending </Link>
                  </li>
                  <li>
                    <Link to="#">Inprogress </Link>
                  </li>
                  <li>
                    <Link to="#">Completed </Link>
                  </li>
                  <li>
                    <Link to="#">Cancelled</Link>
                  </li>
                </ul>
              </div>
              <div className="tab-contents-count">
                <h6>Showing 8-10 of 84 results</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 ">
            <div className="table-resposnive table-div">
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
                    <th>Status</th>
                    <th>Action</th>
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
                      <Link to="/javascript:void(0);" className="table-imgname">
                        <img src="assets/img/services/service-03.jpg" className="me-2" alt="img" />
                        <span>Computer Repair</span>
                      </Link>
                    </td>
                    <td>$80</td>
                    <td><h6 className="badge-pending">Pending</h6></td>
                    <td>07 Oct 2023 11:22:51	</td>
                    <td>
                      <div className="table-select">
                        <div className="form-group mb-0">
                          <select className="select">
                            <option>Select Status</option>
                            <option> Pending</option>
                            <option> Inprogress</option>
                            <option>Completed</option>
                            <option>cancelled</option>
                          </select>
                        </div>
                      </div>
                    </td>
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
                      <Link to="/javascript:void(0);" className="table-imgname">
                        <img src="assets/img/services/service-02.jpg" className="me-2" alt="img" />
                        <span>Car Repair Services</span>
                      </Link>
                    </td>
                    <td>$50</td>
                    <td><h6 className="badge-active">Completed</h6></td>
                    <td>07 Oct 2023 11:22:51</td>
                    <td>
                      <div className="table-select">
                        <div className="form-group mb-0">
                          <select className="select">
                            <option>Select Status</option>
                            <option> Pending</option>
                            <option> Inprogress</option>
                            <option>Completed</option>
                            <option>cancelled</option>
                          </select>
                        </div>
                      </div>
                    </td>
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
                      <Link to="/javascript:void(0);" className="table-imgname">
                        <img src="assets/img/services/service-04.jpg" className="me-2" alt="img" />
                        <span>Steam Car Wash</span>
                      </Link>
                    </td>
                    <td>$50</td>
                    <td><h6 className="badge-inactive">Inprogress</h6></td>
                    <td>07 Oct 2023 11:22:51</td>
                    <td>
                      <div className="table-select">
                        <div className="form-group mb-0">
                          <select className="select">
                            <option>Select Status</option>
                            <option> Pending</option>
                            <option> Inprogress</option>
                            <option>Completed</option>
                            <option>cancelled</option>
                          </select>
                        </div>
                      </div>
                    </td>
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
                      <Link to="/javascript:void(0);" className="table-imgname">
                        <img src="assets/img/services/service-09.jpg" className="me-2" alt="img" />
                        <span>House Cleaning </span>
                      </Link>
                    </td>
                    <td>$50</td>
                    <td><h6 className="badge-delete">Cancelled</h6></td>
                    <td>07 Oct 2023 11:22:51</td>
                    <td>
                      <div className="table-select">
                        <div className="form-group mb-0">
                          <select className="select">
                            <option>Select Status</option>
                            <option> Pending</option>
                            <option> Inprogress</option>
                            <option>Completed</option>
                            <option>cancelled</option>
                          </select>
                        </div>
                      </div>
                    </td>
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
                      <Link to="/javascript:void(0);" className="table-imgname">
                        <img src="assets/img/services/service-03.jpg" className="me-2" alt="img" />
                        <span>Computer Repair</span>
                      </Link>
                    </td>
                    <td>$80</td>
                    <td><h6 className="badge-pending">Pending</h6></td>
                    <td>07 Oct 2023 11:22:51	</td>
                    <td>
                      <div className="table-select">
                        <div className="form-group mb-0">
                          <select className="select">
                            <option>Select Status</option>
                            <option> Pending</option>
                            <option> Inprogress</option>
                            <option>Completed</option>
                            <option>cancelled</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
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
                      <Link to="/javascript:void(0);" className="table-imgname">
                        <img src="assets/img/services/service-02.jpg" className="me-2" alt="img" />
                        <span>Car Repair Services</span>
                      </Link>
                    </td>
                    <td>$50</td>
                    <td><h6 className="badge-active">Completed</h6></td>
                    <td>07 Oct 2023 11:22:51</td>
                    <td>
                      <div className="table-select">
                        <div className="form-group mb-0">
                          <select className="select">
                            <option>Select Status</option>
                            <option> Pending</option>
                            <option> Inprogress</option>
                            <option>Completed</option>
                            <option>cancelled</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
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
                      <Link to="/javascript:void(0);" className="table-imgname">
                        <img src="assets/img/services/service-04.jpg" className="me-2" alt="img" />
                        <span>Steam Car Wash</span>
                      </Link>
                    </td>
                    <td>$50</td>
                    <td><h6 className="badge-inactive">Inprogress</h6></td>
                    <td>07 Oct 2023 11:22:51</td>
                    <td>
                      <div className="table-select">
                        <div className="form-group mb-0">
                          <select className="select">
                            <option>Select Status</option>
                            <option> Pending</option>
                            <option> Inprogress</option>
                            <option>Completed</option>
                            <option>cancelled</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
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
                      <Link to="/javascript:void(0);" className="table-imgname">
                        <img src="assets/img/services/service-09.jpg" className="me-2" alt="img" />
                        <span>House Cleaning </span>
                      </Link>
                    </td>
                    <td>$50</td>
                    <td><h6 className="badge-delete">Cancelled</h6></td>
                    <td>07 Oct 2023 11:22:51</td>
                    <td>
                      <div className="table-select">
                        <div className="form-group mb-0">
                          <select className="select">
                            <option>Select Status</option>
                            <option> Pending</option>
                            <option> Inprogress</option>
                            <option>Completed</option>
                            <option>cancelled</option>
                          </select>
                        </div>
                      </div>
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

export default BookingPage;