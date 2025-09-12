import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const BookingSidebar = () => {
  const { steps,toggleStep } = useContext(AppContext);
  return (
    <div className="col-lg-3 theiaStickySidebar">
      <div className="card bg-dark booking-sidebar mb-4 mb-lg-0">
        <div className="card-body">
          {/* Service Details */}
          {/* <h6 className="text-white fs-14 mb-2">Service Details</h6>
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
          </div> */}

          {/* Booking Wizard */}
          <div className="booking-wizard mt-3">
            <h6 className="text-white fs-14 mb-3">Bookings</h6>
            <ul className="wizard-progress" id="bokingwizard">
              <li className={`pb-3 ${steps.location ? "active":""}`}>
                <span>1. Location</span>
              </li>
              {/* <li className={`pb-3 ${steps.additionalservice ? "active":""}`}>
                <span>2. Additional Services</span>
              </li> */}
              <li className={`pb-3 ${steps.datetime ? "active":""}`}>
                <span>2. Date &amp; Time</span>
              </li>
              {/*<li className={`pb-3 ${steps.personalinformation ? "active":""}`}>
                <span>3. Personal Information</span>
              </li> 
              <li className={`pb-3 ${steps.cart ? "active":""}`}>
                <span>4. Cart</span>
              </li>
              */}
              <li className={`pb-3 ${steps.payment ? "active":""}`}>
                <span>3. Payment</span>
              </li>
              <li className={`pb-3 ${steps.confirmation ? "active":""}`}>
                <span>4. Confirmation</span>
              </li>
            </ul>
          </div>

                   
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
