import { Link } from 'react-router-dom';

const RecentBlog = () => {
  return (
    <section className="section blog-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-center">
              <h2 className="mb-1">Checkout our Recent <span className="text-linear-primary">Blogs</span></h2>
              <p className="sub-title">Each listing is designed to be clear and concise, providing customers</p>
            </div>
          </div>
        </div>
        <div className="blog-slider owl-carousel nav-center nav-center">
          <div className="blog-item wow fadeInUp" data-wow-delay="0.2s">
            <div className="blog-img">
              <Link to="/blog-details">
                <img src="assets/img/blogs/blog-01.jpg" className="img-fluid" alt="img" />
              </Link>
            </div>
            <div className="blog-content">
              <p className="fs-14 fw-meium text-gray-9 d-inline-flex align-items-center mb-2">Admin<i className="ti ti-circle-filled fs-6 mx-1" />1 Jan 2023</p>
              <h6 className="text-truncate mb-2"><Link to="/blog-details">Bill Walsh leadership lessons</Link>
              </h6>
              <p className="two-line-ellipsis mb-3">Like to know the secrets of transforming a 2-14</p>
              <div className="d-flex align-items-center flex-wrap">
                <span className="badge badge-info-transparent me-2">Leadership</span>
                <span className="badge badge-dark-transparent">Management</span>
              </div>
            </div>
          </div>
          <div className="blog-item wow fadeInUp" data-wow-delay="0.2s">
            <div className="blog-img">
              <Link to="/blog-details">
                <img src="assets/img/blogs/blog-02.jpg" className="img-fluid" alt="img" />
              </Link>
            </div>
            <div className="blog-content">
              <p className="fs-14 fw-meium text-gray-9 d-inline-flex align-items-center mb-2">Admin<i className="ti ti-circle-filled fs-6 mx-1" />18 Jan 2023</p>
              <h6 className="text-truncate mb-2"><Link to="/blog-details">Transform Your Space</Link></h6>
              <p className="two-line-ellipsis mb-3">Find out how we can help you create the perfect environment.
              </p>
              <div className="d-flex align-items-center flex-wrap">
                <span className="badge badge-info-transparent me-2">Remodeling</span>
                <span className="badge badge-dark-transparent">Transformation</span>
              </div>
            </div>
          </div>
          <div className="blog-item wow fadeInUp" data-wow-delay="0.2s">
            <div className="blog-img">
              <Link to="/blog-details">
                <img src="assets/img/blogs/blog-03.jpg" className="img-fluid" alt="img" />
              </Link>
            </div>
            <div className="blog-content">
              <p className="fs-14 fw-meium text-gray-9 d-inline-flex align-items-center mb-2">Admin<i className="ti ti-circle-filled fs-6 mx-1" />08 Feb 2023</p>
              <h6 className="text-truncate mb-2"><Link to="/blog-details">Top Tips for Service Success</Link></h6>
              <p className="two-line-ellipsis mb-3">Learn key tips to make the most out of our services.</p>
              <div className="d-flex align-items-center flex-wrap">
                <span className="badge badge-info-transparent me-2">Success</span>
                <span className="badge badge-dark-transparent">Advice</span>
              </div>
            </div>
          </div>
          <div className="blog-item wow fadeInUp" data-wow-delay="0.2s">
            <div className="blog-img">
              <Link to="/blog-details">
                <img src="assets/img/blogs/blog-04.jpg" className="img-fluid" alt="img" />
              </Link>
            </div>
            <div className="blog-content">
              <p className="fs-14 fw-meium text-gray-9 d-inline-flex align-items-center mb-2">Admin<i className="ti ti-circle-filled fs-6 mx-1" />10 Feb 2023</p>
              <h6 className="text-truncate mb-2"><Link to="/blog-details">Service Innovations</Link></h6>
              <p className="two-line-ellipsis mb-3">Explore the latest advancements in our field.</p>
              <div className="d-flex align-items-center flex-wrap">
                <span className="badge badge-info-transparent me-2">Innovations</span>
                <span className="badge badge-dark-transparent">Latest Trends</span>
              </div>
            </div>
          </div>
          <div className="blog-item wow fadeInUp" data-wow-delay="0.2s">
            <div className="blog-img">
              <Link to="/blog-details">
                <img src="assets/img/blogs/blog-05.jpg" className="img-fluid" alt="img" />
              </Link>
            </div>
            <div className="blog-content">
              <p className="fs-14 fw-meium text-gray-9 d-inline-flex align-items-center mb-2">Admin<i className="ti ti-circle-filled fs-6 mx-1" />1 Jan 2023</p>
              <h6 className="text-truncate mb-2"><Link to="/blog-details">Revamp Your Home</Link></h6>
              <p className="two-line-ellipsis mb-3">Explore how our services can refresh and upgrade.</p>
              <div className="d-flex align-items-center flex-wrap">
                <span className="badge badge-info-transparent me-2">Innovations</span>
                <span className="badge badge-dark-transparent">Latest Trends</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center wow fadeInUp" data-wow-delay="0.2s">
          <Link to="#" className="btn btn-dark">View All<i className="ti ti-arrow-right ms-2" /></Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlog;