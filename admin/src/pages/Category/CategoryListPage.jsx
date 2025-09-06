import { Link } from "react-router-dom";

const CategoryListPage = () => {
  return (
    <>
      <div className="page-wrapper page-settings">
        <div className="content">
          <div className="content-page-header content-page-headersplit mb-0">
            <h5>Categories</h5>
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
                  <Link to="/add-category">
                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#add-category"><i className="fa fa-plus me-2" />Add Category</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-12 ">
              <div className="table-resposnive table-div">
                <table className="table datatable">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Category Slug</th>
                      <th>Date</th>
                      <th>Featured</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <div className="table-imgname">
                          <img src="assets/img/services/service-03.jpg" className="me-2" alt="img" />
                          <span>Construction</span>
                        </div>
                      </td>
                      <td>construction</td>
                      <td>28 Sep 2023</td>
                      <td>
                        <div className="active-switch">
                          <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="sliders round" />
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="table-actions d-flex">
                          <button className="btn delete-table me-2" type="button" data-bs-toggle="modal" data-bs-target="#edit-category">
                            <i className="fe fe-edit" />
                          </button>
                          <button className="btn delete-table" type="button" data-bs-toggle="modal" data-bs-target="#delete-category">
                            <i className="fe fe-trash-2" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <div className="table-imgname">
                          <img src="assets/img/services/service-02.jpg" className="me-2" alt="img" />
                          <span>Car Wash</span>
                        </div>
                      </td>
                      <td>car-wash</td>
                      <td>17 Sep 2023</td>
                      <td>
                        <div className="active-switch">
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="sliders round" />
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="table-actions d-flex">
                          <button className="btn delete-table me-2" type="button" data-bs-toggle="modal" data-bs-target="#edit-category">
                            <i className="fe fe-edit" />
                          </button>
                          <button className="btn delete-table" type="button" data-bs-toggle="modal" data-bs-target="#delete-category">
                            <i className="fe fe-trash-2" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <div className="table-imgname">
                          <img src="assets/img/services/service-04.jpg" className="me-2" alt="img" />
                          <span>Computer</span>
                        </div>
                      </td>
                      <td>computer</td>
                      <td>13 Sep 2023</td>
                      <td>
                        <div className="active-switch">
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="sliders round" />
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="table-actions d-flex">
                          <button className="btn delete-table me-2" type="button" data-bs-toggle="modal" data-bs-target="#edit-category">
                            <i className="fe fe-edit" />
                          </button>
                          <button className="btn delete-table" type="button" data-bs-toggle="modal" data-bs-target="#delete-category">
                            <i className="fe fe-trash-2" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>
                        <div className="table-imgname">
                          <img src="assets/img/services/service-09.jpg" className="me-2" alt="img" />
                          <span>Electrical</span>
                        </div>
                      </td>
                      <td>electrical</td>
                      <td>07 Sep 2023</td>
                      <td>
                        <div className="active-switch">
                          <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="sliders round" />
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="table-actions d-flex">
                          <button className="btn delete-table me-2" type="button" data-bs-toggle="modal" data-bs-target="#edit-category">
                            <i className="fe fe-edit" />
                          </button>
                          <button className="btn delete-table" type="button" data-bs-toggle="modal" data-bs-target="#delete-category">
                            <i className="fe fe-trash-2" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>
                        <div className="table-imgname">
                          <img src="assets/img/services/service-08.jpg" className="me-2" alt="img" />
                          <span>Cleaning</span>
                        </div>
                      </td>
                      <td>cleaning</td>
                      <td>07 Sep 2023</td>
                      <td>
                        <div className="active-switch">
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="sliders round" />
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="table-actions d-flex">
                          <button className="btn delete-table me-2" type="button" data-bs-toggle="modal" data-bs-target="#edit-category">
                            <i className="fe fe-edit" />
                          </button>
                          <button className="btn delete-table" type="button" data-bs-toggle="modal" data-bs-target="#delete-category">
                            <i className="fe fe-trash-2" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>
                        <div className="table-imgname">
                          <img src="assets/img/services/service-07.jpg" className="me-2" alt="img" />
                          <span>Interior</span>
                        </div>
                      </td>
                      <td>interior</td>
                      <td>07 Sep 2023</td>
                      <td>
                        <div className="active-switch">
                          <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="sliders round" />
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="table-actions d-flex">
                          <button className="btn delete-table me-2" type="button" data-bs-toggle="modal" data-bs-target="#edit-category">
                            <i className="fe fe-edit" />
                          </button>
                          <button className="btn delete-table" type="button" data-bs-toggle="modal" data-bs-target="#delete-category">
                            <i className="fe fe-trash-2" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>
                        <div className="table-imgname">
                          <img src="assets/img/services/service-09.jpg" className="me-2" alt="img" />
                          <span>Carpentry</span>
                        </div>
                      </td>
                      <td>carpentry</td>
                      <td>22 Aug 2023</td>
                      <td>
                        <div className="active-switch">
                          <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="sliders round" />
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="table-actions d-flex">
                          <button className="btn delete-table me-2" type="button" data-bs-toggle="modal" data-bs-target="#edit-category">
                            <i className="fe fe-edit" />
                          </button>
                          <button className="btn delete-table" type="button" data-bs-toggle="modal" data-bs-target="#delete-category">
                            <i className="fe fe-trash-2" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>
                        <div className="table-imgname">
                          <img src="assets/img/services/service-12.jpg" className="me-2" alt="img" />
                          <span>Plumbing</span>
                        </div>
                      </td>
                      <td>plumbing</td>
                      <td>15 Aug 2023</td>
                      <td>
                        <div className="active-switch">
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="sliders round" />
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="table-actions d-flex">
                          <button className="btn delete-table me-2" type="button" data-bs-toggle="modal" data-bs-target="#edit-category">
                            <i className="fe fe-edit" />
                          </button>
                          <button className="btn delete-table" type="button" data-bs-toggle="modal" data-bs-target="#delete-category">
                            <i className="fe fe-trash-2" />
                          </button>
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
    </>
  );
};

export default CategoryListPage;