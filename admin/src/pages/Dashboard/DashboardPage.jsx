/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useState } from "react";
import axios from "axios";
import apis, { BASE_URL } from "../../apis/apis";
import { useEffect } from "react";
import { formatDate } from "../../helpers/formatDate";

const DashboardPage = () => {
  const { validToken } = useAuth();
  const [loding, setLoading] = useState();
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.dashboard.get, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        setData(response?.data?.data || {});
      };
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchData();
  }, [validToken]);

  return (
    <>
      {
        loding ? (
          <h6>Loding...</h6>
        ) : (
          <div className="page-wrapper">
            <div className="content">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12 d-flex widget-path widget-service">
                  <div className="card">
                    <div className="card-body">
                      <div className="home-user">
                        <div className="home-userhead">
                          <div className="home-usercount">
                            {/* <span><img src="/assets/img/icons/user.svg" alt="img" /></span> */}
                            <h6>User</h6>
                          </div>
                          <div className="home-useraction">
                            <Link className="delete-table bg-white" to="/admins" data-bs-toggle="dropdown" aria-expanded="true">
                              <i className="fa fa-ellipsis-v" aria-hidden="true" />
                            </Link>
                            <ul className="dropdown-menu" data-popper-placement="bottom-end">
                              <li>
                                <Link to="/admins" className="dropdown-item"> View</Link>
                              </li>
                              {/* <li>
                                <Link to="/user-edit" className="dropdown-item"> Edit</Link>
                              </li> */}
                            </ul>
                          </div>
                        </div>
                        <div className="home-usercontent">
                          <div className="home-usercontents">
                            <div className="home-usercontentcount">
                              {/* <img src="/assets/img/icons/arrow-up.svg" alt="img" className="me-2" /> */}
                              <span className="counters">{data?.counts?.users}</span>
                            </div>
                            {/* <h5> Current Month</h5> */}
                          </div>
                          {/* <div className="homegraph">
                            <img src="/assets/img/graph/graph1.png" alt="img" />
                          </div> */}
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
                            {/* <span><img src="/assets/img/icons/user-circle.svg" alt="img" /></span> */}
                            <h6>Provider</h6>
                          </div>
                          <div className="home-useraction">
                            <Link className="delete-table bg-white" to="/providers" data-bs-toggle="dropdown" aria-expanded="true">
                              <i className="fa fa-ellipsis-v" aria-hidden="true" />
                            </Link>
                            <ul className="dropdown-menu" data-popper-placement="bottom-end">
                              <li>
                                <Link to="/providers" className="dropdown-item"> View</Link>
                              </li>
                              {/* <li>
                                <Link to="/edit-provider" className="dropdown-item"> Edit</Link>
                              </li> */}
                            </ul>
                          </div>
                        </div>
                        <div className="home-usercontent">
                          <div className="home-usercontents">
                            <div className="home-usercontentcount">
                              {/* <img src="/assets/img/icons/arrow-up.svg" alt="img" className="me-2" /> */}
                              <span className="counters">{data?.counts?.servicemen}</span>
                            </div>
                            {/* <h5> Current Month</h5> */}
                          </div>
                          {/* <div className="homegraph">
                            <img src="/assets/img/graph/graph2.png" alt="img" />
                          </div> */}
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
                            {/* <span><img src="/assets/img/icons/service.svg" alt="img" /></span> */}
                            <h6 className="text-center">Service</h6>
                          </div>
                          <div className="home-useraction">
                            <Link to="/services" className="delete-table bg-white" data-bs-toggle="dropdown" aria-expanded="true">
                              <i className="fa fa-ellipsis-v" aria-hidden="true" />
                            </Link>
                            <ul className="dropdown-menu" data-popper-placement="bottom-end">
                              <li>
                                <Link to="/services" className="dropdown-item"> View</Link>
                              </li>
                              {/* <li>
                                <Link to="/edit-service" className="dropdown-item"> Edit</Link>
                              </li> */}
                            </ul>
                          </div>
                        </div>
                        <div className="home-usercontent">
                          <div className="home-usercontents">
                            <div className="home-usercontentcount">
                              {/* <img src="/assets/img/icons/arrow-up.svg" alt="img" className="me-2" /> */}
                              <span className="counters text-center">{data?.counts?.services}</span>
                            </div>
                            {/* <h5> Current Month</h5> */}
                          </div>
                          {/* <div className="homegraph">
                            <img src="/assets/img/graph/graph3.png" alt="img" />
                          </div> */}
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
                          {/* <Link to="/services" className="btn btn-viewall">View All<img src="assets/img/icons/arrow-right.svg" className="ms-2" alt="img" /></Link> */}
                        </div>
                        <div className="table-responsive datatable-nofooter">
                          <table className="table datatable">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Service</th>
                                <th>Product</th>
                                <th>Sale Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                data?.topServices?.map((d, i) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>
                                      <div className="table-imgname">
                                        <img src={`${BASE_URL}/${d?.image}`} className="me-2" alt="img" />
                                        <span>{d?.name}</span>
                                      </div>
                                      {/* <Link to="/view-service" className="table-imgname">
                                        <img src={`${BASE_URL}/${d?.image}`} className="me-2" alt="img" />
                                        <span>{d?.name}</span>
                                      </Link> */}
                                    </td>
                                    <td>{d?.category?.name}</td>
                                    <td>₹{d?.salePrice}</td>
                                  </tr>
                                ))
                              }
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
                          {/* <Link to="/providers" className="btn btn-viewall">View All<img src="assets/img/icons/arrow-right.svg" className="ms-2" alt="img" /></Link> */}
                        </div>
                        <div className="table-responsive datatable-nofooter">
                          <table className="table datatable ">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Mobile</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                data?.topServicemen?.map((d, i) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>
                                      <Link to="#" className="table-profileimage">
                                        {/* {d?.profileImage && <img src={`${BASE_URL}/${d?.profileImage}`} className="me-2" alt="image" />} */}
                                        <span>{d?.name}</span>
                                      </Link>
                                    </td>
                                    {/* <td><Link to="/https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="44362b2621363004213c25293428216a272b29">[email&nbsp;protected]</Link></td> */}
                                    <td>{d?.mobile || "-"}</td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
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
                          {/* <Link to="/booking" className="btn btn-viewall">View All<img src="assets/img/icons/arrow-right.svg" className="ms-2" alt="img" /></Link> */}
                        </div>
                        <div className="table-responsive datatable-nofooter">
                          <table className="table datatable">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Booking Id</th>
                                <th>Date</th>
                                {/* <th>Provider</th> */}
                                <th>Customer</th>
                                {/* <th>Service</th> */}
                                <th>Amount</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                data?.recentBookings?.map((d, i) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{d?.bookingId}</td>
                                    <td>{formatDate(d?.createdAt)}</td>
                                    <td>
                                      <span>{d?.user?.name || d?.user?.mobile}</span>
                                      {/* <Link to="#" className="table-profileimage">
                                        <img src={`${BASE_URL}/${d?.user?.profileImage}`} className="me-2" alt="img" />
                                        <span>{d?.user?.name}</span>
                                      </Link> */}
                                    </td>
                                    {/* <td>
                                      <Link to="#" className="table-profileimage">
                                        <img src="assets/img/customer/user-03.jpg" className="me-2" alt="img" />
                                        <span>Sharon</span>
                                      </Link>
                                    </td> */}
                                    {/* <td>
                                      <Link to="/view-service" className="table-imgname">
                                        <img src="assets/img/services/service-03.jpg" className="me-2" alt="img" />
                                        <span>Computer Repair</span>
                                      </Link>
                                    </td> */}
                                    <td>₹{d?.payableAmount?.toFixed(2)}</td>
                                    <td>{d?.status?.charAt(0)?.toUpperCase() + d?.status?.slice(1)}</td>
                                  </tr>
                                ))
                              }
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
        )
      }
    </>
  );
};

export default DashboardPage;