import { Link } from "react-router-dom";

const ServiceListPage = () => {
  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit">
          <h5>All Services</h5>
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
              <li>
                <Link className="btn btn-primary" to="/add-service"><i className="fa fa-plus me-2" />Create Service </Link>
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
                    <Link to="/services" className="active">All Services</Link>
                  </li>
                  <li>
                    <Link to="/active-services">Active</Link>
                  </li>
                  <li>
                    <Link to="/pending-services">Pending </Link>
                  </li>
                  <li>
                    <Link to="/inactive-services">Inactive </Link>
                  </li>
                  <li>
                    <Link to="/deleted-services">Deleted </Link>
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
          <div className="col-12">
            <div className="table-resposnive table-div">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service</th>
                    <th>Category</th>
                    <th>Sub Category</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Created By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <div className="table-imgname">
                        <Link to="/view-service">
                          <img src="assets/img/services/service-03.jpg" className="me-2" alt="img" />
                          <span>Computer Repair</span>
                        </Link>
                      </div>
                    </td>
                    <td>Computer</td>
                    <td>Other</td>
                    <td>$80</td>
                    <td>10:00</td>
                    <td><h6 className="badge-pending">Pending</h6></td>
                    <td>
                      <Link to="/javascript:void(0);" className="table-profileimage">
                        <img src="assets/img/customer/user-01.jpg" className="me-2" alt="img" />
                        <span>John Smith</span>
                      </Link>
                    </td>
                    <td>
                      <div className="action-language">
                        <Link className="table-edit" to="/edit-service">
                          <i className="fa-regular fa-pen-to-square" /><span>Edit</span>
                        </Link>
                        <Link className="table-delete" to="/javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete-item">
                          <i className="fa-solid fa-trash-can" /><span>Delete</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <div className="table-imgname">
                        <Link to="/view-service">
                          <img src="assets/img/services/service-02.jpg" className="me-2" alt="img" />
                          <span>Car Repair Services</span>
                        </Link>
                      </div>
                    </td>
                    <td>Automobile</td>
                    <td>Other</td>
                    <td>$50</td>
                    <td>12:45</td>
                    <td><h6 className="badge-active">Active</h6></td>
                    <td>
                      <Link to="/javascript:void(0);" className="table-profileimage">
                        <img src="assets/img/customer/user-02.jpg" className="me-2" alt="img" />
                        <span>Sharon</span>
                      </Link>
                    </td>
                    <td>
                      <div className="action-language">
                        <Link className="table-edit" to="/edit-service">
                          <i className="fa-regular fa-pen-to-square" /><span>Edit</span>
                        </Link>
                        <Link className="table-delete" to="/javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete-item">
                          <i className="fa-solid fa-trash-can" /><span>Delete</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <div className="table-imgname">
                        <Link to="/view-service">
                          <img src="assets/img/services/service-04.jpg" className="me-2" alt="img" />
                          <span>Steam Car Wash</span>
                        </Link>
                      </div>
                    </td>
                    <td>Car Wash</td>
                    <td>Other</td>
                    <td>$14</td>
                    <td>04:45</td>
                    <td><h6 className="badge-inactive">Inactive</h6></td>
                    <td>
                      <Link to="/javascript:void(0);" className="table-profileimage">
                        <img src="assets/img/customer/user-03.jpg" className="me-2" alt="img" />
                        <span>Amanda</span>
                      </Link>
                    </td>
                    <td>
                      <div className="action-language">
                        <Link className="table-edit" to="/edit-service">
                          <i className="fa-regular fa-pen-to-square" /><span>Edit</span>
                        </Link>
                        <Link className="table-delete" to="/javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete-item">
                          <i className="fa-solid fa-trash-can" /><span>Delete</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <div className="table-imgname">
                        <Link to="/view-service">
                          <img src="assets/img/services/service-09.jpg" className="me-2" alt="img" />
                          <span>House Cleaning </span>
                        </Link>
                      </div>
                    </td>
                    <td>Cleaning</td>
                    <td>Other</td>
                    <td>$100</td>
                    <td>08:32</td>
                    <td><h6 className="badge-delete">Delete</h6></td>
                    <td>
                      <Link to="/javascript:void(0);" className="table-profileimage">
                        <img src="assets/img/customer/user-04.jpg" className="me-2" alt="img" />
                        <span>Sharonda</span>
                      </Link>
                    </td>
                    <td>
                      <div className="action-language">
                        <Link className="table-edit" to="/edit-service">
                          <i className="fa-regular fa-pen-to-square" /><span>Edit</span>
                        </Link>
                        <Link className="table-delete" to="/javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete-item">
                          <i className="fa-solid fa-trash-can" /><span>Delete</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>
                      <div className="table-imgname">
                        <Link to="/view-service">
                          <img src="assets/img/services/service-08.jpg" className="me-2" alt="img" />
                          <span>Building Construction</span>
                        </Link>
                      </div>
                    </td>
                    <td>Cleaning</td>
                    <td>Other</td>
                    <td>$100</td>
                    <td>06:34</td>
                    <td><h6 className="badge-delete">Delete</h6></td>
                    <td>
                      <Link to="/javascript:void(0);" className="table-profileimage">
                        <img src="assets/img/customer/user-01.jpg" className="me-2" alt="img" />
                        <span>John Smith</span>
                      </Link>
                    </td>
                    <td>
                      <div className="action-language">
                        <Link className="table-edit" to="/edit-service">
                          <i className="fa-regular fa-pen-to-square" /><span>Edit</span>
                        </Link>
                        <Link className="table-delete" to="/javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete-item">
                          <i className="fa-solid fa-trash-can" /><span>Delete</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>
                      <div className="table-imgname">
                        <Link to="/view-service">
                          <img src="assets/img/services/service-07.jpg" className="me-2" alt="img" />
                          <span>Interior Designing</span>
                        </Link>
                      </div>
                    </td>
                    <td>Interior</td>
                    <td>Other</td>
                    <td>$100</td>
                    <td>07:21</td>
                    <td><h6 className="badge-pending">Pending</h6></td>
                    <td>
                      <Link to="/javascript:void(0);" className="table-profileimage">
                        <img src="assets/img/customer/user-03.jpg" className="me-2" alt="img" />
                        <span>Amanda</span>
                      </Link>
                    </td>
                    <td>
                      <div className="action-language">
                        <Link className="table-edit" to="/edit-service">
                          <i className="fa-regular fa-pen-to-square" /><span>Edit</span>
                        </Link>
                        <Link className="table-delete" to="/javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete-item">
                          <i className="fa-solid fa-trash-can" /><span>Delete</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>
                      <div className="table-imgname">
                        <Link to="/view-service">
                          <img src="assets/img/services/service-09.jpg" className="me-2" alt="img" />
                          <span>Commercial Painting </span>
                        </Link>
                      </div>
                    </td>
                    <td>Painting</td>
                    <td>Other</td>
                    <td>$500</td>
                    <td>05:33</td>
                    <td><h6 className="badge-inactive">Inactive</h6></td>
                    <td>
                      <Link to="/javascript:void(0);" className="table-profileimage">
                        <img src="assets/img/customer/user-02.jpg" className="me-2" alt="img" />
                        <span>Sharon</span>
                      </Link>
                    </td>
                    <td>
                      <div className="action-language">
                        <Link className="table-edit" to="/edit-service">
                          <i className="fa-regular fa-pen-to-square" /><span>Edit</span>
                        </Link>
                        <Link className="table-delete" to="/javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete-item">
                          <i className="fa-solid fa-trash-can" /><span>Delete</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>
                      <div className="table-imgname">
                        <Link to="/view-service">
                          <img src="assets/img/services/service-12.jpg" className="me-2" alt="img" />
                          <span>Plumbing Services</span>
                        </Link>
                      </div>
                    </td>
                    <td>Plumbing</td>
                    <td>Other</td>
                    <td>$150</td>
                    <td>02:45</td>
                    <td><h6 className="badge-delete">Delete</h6></td>
                    <td>
                      <Link to="/javascript:void(0);" className="table-profileimage">
                        <img src="assets/img/customer/user-01.jpg" className="me-2" alt="img" />
                        <span>John Smith</span>
                      </Link>
                    </td>
                    <td>
                      <div className="action-language">
                        <Link className="table-edit" to="/edit-service">
                          <i className="fa-regular fa-pen-to-square" /><span>Edit</span>
                        </Link>
                        <Link className="table-delete" to="/javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete-item">
                          <i className="fa-solid fa-trash-can" /><span>Delete</span>
                        </Link>
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

export default ServiceListPage;