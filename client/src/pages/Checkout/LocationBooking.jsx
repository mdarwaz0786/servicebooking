import React from "react";

const LocationBooking = () => {
  return (
    <fieldset className="booking-content wizard-fieldset" id="first-field">
      <div className="book-card">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
          <div className="d-flex align-items-center mb-2">
            <h6 className="fs-16 me-2 mb-2">Select Location</h6>
            <span className="badge badge-info-transparent mb-2">Total : 05</span>
          </div>

          <div className="d-flex align-items-center mb-2">
            {/* Location Dropdown */}
            <div className="dropdown loc-dropdown me-2 mb-2">
              <a
                href="#"
                className="dropdown-toggle bg-light-500"
                data-bs-toggle="dropdown"
              >
                All Locations
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    1052 Edsel Road LA
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    1197 Tennessee Avenue
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    1214 Rich land Avenue
                  </a>
                </li>
              </ul>
            </div>

            {/* Cart Dropdown */}
            <div className="dropdown me-2 mb-2">
              <a
                href="#"
                className="bg-light-500 d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="ti ti-shopping-cart me-1"></i>
                Cart
                <span className="bg-primary num-count ms-1">1</span>
              </a>

              <div className="dropdown-menu dropdown-sm p-3">
                <h6 className="fs-13 mb-3">Added In Cart (02)</h6>

                {/* Cart Items */}
                <div className="d-flex align-items-center p-2 bg-light rounded mb-3">
                  <span className="avatar avatar-lg">
                    <img src="assets/img/services/addservice-05.jpg" alt="img" />
                  </span>
                  <div className="ms-2">
                    <h6 className="mb-1">Lighting Services</h6>
                    <p className="fs-12">
                      <i className="ti ti-star-filled text-warning me-1"></i>
                      <span className="text-gray-9">4.9</span> (255 reviews)
                    </p>
                  </div>
                </div>

                {/* Price Rows */}
                <div className="mb-2 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="fw-medium">Lighting Services</h6>
                    <p className="fs-10">30 Min</p>
                  </div>
                  <h6 className="fs-12 fw-medium">$457</h6>
                </div>

                <div className="mb-2 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="fw-medium">Outlets & Wiring</h6>
                    <p className="fs-10">30 Min</p>
                  </div>
                  <h6 className="fs-12 fw-medium">$200</h6>
                </div>

                <div className="mb-0 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="fw-medium">Switches Changes</h6>
                    <p className="fs-10">30 Min</p>
                  </div>
                  <h6 className="fs-12 fw-medium">$100</h6>
                </div>

                {/* Total */}
                <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                  <h6 className="fw-medium">Total</h6>
                  <h6 className="fw-medium">$757</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="row g-3">
          <div className="col-lg-4 col-md-6">
            <div className="card location-card mb-0">
              <div className="card-body p-3 text-center">
                <div className="trend-icon">
                  <span className="bg-info">
                    <img src="assets/img/icons/loc-icon.svg" alt="icon" />
                  </span>
                </div>
                <span className="avatar avatar-lg mx-auto mb-2">
                  <img src="assets/img/icons/service-01.svg" alt="img" />
                </span>
                <h6 className="mb-2 fw-medium">
                  Lighting Services - California Shop
                </h6>
                <p className="d-flex align-items-center justify-content-center mb-2">
                  <i className="ti ti-map-pin-check me-1"></i>1052 Edsel Road LA
                </p>
                <div className="d-flex align-items-center justify-content-between border-top pt-2">
                  <p className="mb-0 d-flex align-items-center">
                    <i className="ti ti-circle-check-filled text-danger fs-5 me-1"></i>
                    12 Staffs
                  </p>
                  <p className="mb-0 d-flex align-items-center">
                    <i className="ti ti-star-filled text-warning me-1"></i>5.0
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Repeat same for other locations... */}
        </div>
      </div>

      {/* Footer */}
      <div className="booking-footer d-flex align-items-center justify-content-end">
        <a
          href="#"
          className="btn btn-sm btn-dark d-inline-flex align-items-center next_btn"
        >
          Next <i className="ti ti-arrow-right ms-1"></i>
        </a>
      </div>
    </fieldset>
  );
};

export default LocationBooking;
