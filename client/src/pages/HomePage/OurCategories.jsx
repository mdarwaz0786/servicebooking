import { Link } from "react-router-dom";

const OurCategories = () => {
  return (
    <section className="section category-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-center">
              <h2 className="mb-1">Explore our <span className="text-linear-primary">Categories</span></h2>
              <p className="sub-title">Service categories help organize and structure the offerings on a
                marketplace, making it easier for users to find what they need.</p>
            </div>
          </div>
        </div>
        <div className="row g-4 row-cols-xxl-6 row-cols-xl-6 row-cols-md-4 row-cols-sm-2 row-cols-1 justify-content-center">
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-01.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Construction</h6>
              <p className="fs-14 mb-0">9874 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div>
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-02.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Removals</h6>
              <p className="fs-14 mb-0">787 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div>
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-13.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Cleaning</h6>
              <p className="fs-14 mb-0">2357 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div>
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-04.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Computer Service</h6>
              <p className="fs-14 mb-0">1260 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div>
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-05.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Electrical</h6>
              <p className="fs-14 mb-0">4546 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div>
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-06.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Man &amp; Van</h6>
              <p className="fs-14 mb-0">2546 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div>
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-07.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Deliveries</h6>
              <p className="fs-14 mb-0">4547 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div>
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-08.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Mobile Barber</h6>
              <p className="fs-14 mb-0">4787 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
              <span className="badge bg-success">New</span>
            </div>
          </div>
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-09.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Interior</h6>
              <p className="fs-14 mb-0">1457 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div>
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-10.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Plumbing</h6>
              <p className="fs-14 mb-0">4157 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div>
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-11.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Nail Technicians</h6>
              <p className="fs-14 mb-0">5477 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div>
          <div className="col d-flex">
            <div className="category-item text-center flex-fill wow fadeInUp" data-wow-delay="0.2s">
              <div className="mx-auto mb-3">
                <img src="assets/img/icons/category-12.svg" className="img-fluid" alt="img" />
              </div>
              <h6 className="fs-14 mb-1">Hair Dressers</h6>
              <p className="fs-14 mb-0">7457 Listings</p>
              <Link to="/categories" className="link-primary text-decoration-underline fs-14">View All</Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-center view-all wow fadeInUp" data-wow-delay="0.2s">
              <Link to="/categories" className="btn btn-dark">View All<i className="ti ti-arrow-right ms-2" /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurCategories;