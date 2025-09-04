import React, { useState } from "react";

const BookingDateTime = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    { time: "07:00 - 07:30", slots: 2, disabled: true },
    { time: "07:30 - 08:00", slots: 4, disabled: true },
    { time: "08:00 - 08:30", slots: 2, disabled: true },
    { time: "08:30 - 09:00", slots: 3, disabled: true },
    { time: "09:00 - 09:30", slots: 2 },
    { time: "09:30 - 10:00", slots: 5 },
    { time: "10:00 - 10:30", slots: 3 },
    { time: "10:30 - 11:00", slots: 2 },
    { time: "11:00 - 11:30", slots: 2 },
    { time: "11:30 - 12:00", slots: 5 },
    { time: "12:00 - 12:30", slots: 4 },
    { time: "12:30 - 13:00", slots: 6 },
    { time: "13:00 - 13:30", slots: 2 },
    { time: "13:30 - 14:00", slots: 1 },
    { time: "14:00 - 14:30", slots: 2 },
    { time: "14:30 - 15:00", slots: 3 },
    { time: "15:00 - 15:30", slots: 2 },
    { time: "15:30 - 16:00", slots: 4 },
    { time: "16:00 - 16:30", slots: 3 },
    { time: "16:30 - 17:00", slots: 1 },
    { time: "17:00 - 17:30", slots: 3 },
  ];

  return (
    <fieldset className="booking-content">
      <div className="book-card">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
          <div className="d-flex align-items-center mb-2">
            <h6 className="fs-16 me-2 mb-2">Select Date & Time</h6>
          </div>

          {/* Cart Dropdown */}
          <div className="d-flex align-items-center mb-2">
            <div className="dropdown mb-2">
              <a
                href="#"
                className="bg-light-500 d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="ti ti-shopping-cart me-1"></i>
                Cart<span className="bg-primary num-count ms-1">1</span>
              </a>
              <div className="dropdown-menu dropdown-sm p-3">
                <h6 className="fs-13 mb-3">Added In Cart (02)</h6>
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
                <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                  <div>
                    <h6 className="fw-medium">Total</h6>
                  </div>
                  <h6 className="fw-medium">$757</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="row g-3">
          {/* Date Picker */}
          <div className="col-md-5">
            <h6 className="fs-13 fw-medium mb-2">Select date</h6>
            <div className="card border mb-0">
              <div className="card-body p-3">
                {/* Replace this with a React datepicker library */}
                <div className="datepic">📅 Date Picker</div>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="col-md-7">
            <h6 className="fs-13 fw-medium mb-2">Select Time</h6>
            <div className="row g-2">
              {timeSlots.map((slot, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div
                    className={`time-item ${
                      slot.disabled ? "disable" : ""
                    } ${selectedTime === slot.time ? "active" : ""}`}
                    onClick={() => !slot.disabled && setSelectedTime(slot.time)}
                    style={{ cursor: slot.disabled ? "not-allowed" : "pointer" }}
                  >
                    <h6 className="fs-12 fw-medium">{slot.time}</h6>
                    <p className="fs-10">{slot.slots} Slots</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="booking-footer d-flex align-items-center justify-content-end">
        <div className="d-flex align-items-center">
          <button className="btn btn-sm btn-light d-inline-flex align-items-center prev_btn me-2">
            <i className="ti ti-arrow-left me-1"></i>Prev
          </button>
          <button className="btn btn-sm btn-dark d-inline-flex align-items-center next_btn">
            Next<i className="ti ti-arrow-right ms-1"></i>
          </button>
        </div>
      </div>
    </fieldset>
  );
};

export default BookingDateTime;
