import React from "react";

const BookingSidebar = () => {
  return (
    <div className="col-lg-3 theiaStickySidebar">
      <div className="card bg-dark booking-sidebar mb-4 mb-lg-0">
        <div className="card-body">
          {/* Service Details */}
          <h6 className="text-white fs-14 mb-2">Service Details</h6>
          <div className="service-info d-flex align-items-center">
            <span className="avatar avatar-md me-2 flex-shrink-0">
              <img src="assets/img/services/service-02.jpg" alt="img" />
            </span>
            <div>
              <p className="fs-12 text-white fw-medium mb-1">Spark Services</p>
              <span className="fs-10">
                <i className="ti ti-star-filled text-warning me-1"></i>4.9 (255
                reviews)
              </span>
            </div>
          </div>

          {/* Booking Wizard */}
          <div className="booking-wizard mt-3">
            <h6 className="text-white fs-14 mb-3">Bookings</h6>
            <ul className="wizard-progress" id="bokingwizard">
              <li className="active pb-3">
                <span>1. Location</span>
              </li>
              <li className="pb-3">
                <span>2. Staffs</span>
              </li>
              <li className="pb-3">
                <span>3. Additional Services</span>
              </li>
              <li className="pb-3">
                <span>4. Date &amp; Time</span>
              </li>
              <li className="pb-3">
                <span>5. Personal Information</span>
              </li>
              <li className="pb-3">
                <span>6. Cart</span>
              </li>
              <li className="pb-3">
                <span>7. Payment</span>
              </li>
              <li>
                <span>8. Confirmation</span>
              </li>
            </ul>
          </div>

          {/* Status Report */}
          <div className="status-report mt-3">
            <h6 className="text-white fs-14 mb-2 pb-2">Bookings</h6>
            <p className="fs-10">0% complete</p>
          </div>

          {/* Login Message */}
          <div className="text-center mt-3">
            <p className="fs-10 text-white">
              Already have an account?{" "}
              <a href="login.html" className="link-primary">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
