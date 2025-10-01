import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const BookingSidebar = () => {
  const { steps } = useContext(AppContext);

  return (
    <div className="col-lg-3 theiaStickySidebar">
      <div className="card bg-success text-white booking-sidebar mb-4 mb-lg-0 rounded-4 shadow-sm">
        <div className="card-body">
          
          {/* Logo */}
          <div className="text-center mb-4">
            <img 
              src="/assets/img/logo.png" 
              alt="Green India Logo" 
              style={{ height: "60px" }} 
            />
          </div>

          {/* Booking Wizard */}
          <div className="booking-wizard mt-3">
            <h6 className="fs-14 mb-3 fw-bold text-white">Booking Steps</h6>
            <ul className="wizard-progress list-unstyled ps-0">
              <li className={`pb-3 ${steps.location ? "active" : ""}`}>
                <span className={`d-block px-3 py-2 rounded ${steps.location ? "bg-white text-success fw-bold" : "text-white"}`}>
                  1. Location
                </span>
              </li>
              <li className={`pb-3 ${steps.datetime ? "active" : ""}`}>
                <span className={`d-block px-3 py-2 rounded ${steps.datetime ? "bg-white text-success fw-bold" : "text-white"}`}>
                  2. Date &amp; Time
                </span>
              </li>
              <li className={`pb-3 ${steps.payment ? "active" : ""}`}>
                <span className={`d-block px-3 py-2 rounded ${steps.payment ? "bg-white text-success fw-bold" : "text-white"}`}>
                  3. Payment
                </span>
              </li>
              <li className={`pb-3 ${steps.confirmation ? "active" : ""}`}>
                <span className={`d-block px-3 py-2 rounded ${steps.confirmation ? "bg-white text-success fw-bold" : "text-white"}`}>
                  4. Confirmation
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
