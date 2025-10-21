const GreenIndiaTeamReviewPage = () => {
  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Green India Team Reviews
          </li>
        </ol>
      </nav>

      {/* Title */}
      <h5 className="fw-bold border-bottom pb-2 mb-4 mt-5">
        GREEN INDIA TEAM REVIEWS
      </h5>

      <div className="row mt-5">
        <div className="col-md-6">
          {/* About Us Title */}
          <h5 className="fw-bold">About Us</h5>
        </div>

        <div className="col-md-6">
          {/* Contact Info */}
          <ul className="list-unstyled">
            <li className="mb-2">
              <i className="bi bi-geo-alt-fill me-2"></i>
              123 Street, New York, USA
            </li>
            <li className="mb-2">
              <i className="bi bi-envelope-fill me-2"></i>
              info@example.com
            </li>
            <li>
              <i className="bi bi-telephone-fill me-2"></i>
              +012 345 67890
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GreenIndiaTeamReviewPage;
