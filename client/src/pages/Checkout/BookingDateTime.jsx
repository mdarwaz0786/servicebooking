import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

import InlineCalendar from "../../components/Date/InlineCalendar";
import { Link } from "react-router-dom";

const BookingDateTime = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMyDate, setSelectedMyDate] = useState(new Date().toISOString().split("T")[0]);
  const [timeSlots, settimeSlots] = useState([]);
  const {
    steps,
    toggleStep,
    postData,
    Urls,
    toast,
    setbookingDate,
    setbookingTime,
    bookingDate,
    bookingTime,
  } = useContext(AppContext);

  const fetchTimeSlot = async () => {
    try {
      const response = await postData({ date: selectedMyDate }, Urls.timeSlot, "GET", 0, 1);
      if (response.success) settimeSlots(response.data);
    } catch (error) {
      console.error("TimeSlot API Error:", error);
    }
  };

  useEffect(() => {
    fetchTimeSlot();
    setbookingDate(selectedMyDate);
  }, [selectedMyDate]);

  const handleNext = () => {
    if (!bookingDate) return toast.error("Select Date");
    if (!bookingTime) return toast.error("Select Time");
    toggleStep("datetime", false);
    toggleStep("payment", true);
  };

  const handlePre = () => {
    toggleStep("datetime", false);
    toggleStep("location", true);
  };

  return (
    <fieldset className={`booking-content ${steps.datetime ? "d-flex flex-column" : "d-none"}`}>
      <div className="book-card p-3 shadow-sm rounded-4">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-bold text-success">Select Date & Time</h5>
        </div>

        {/* Date & Time */}
        <div className="row g-4">
          {/* Date Picker */}
          <div className="col-md-12">
            <InlineCalendar setSelectedMyDate={setSelectedMyDate} />
          </div>

          {/* Time Slots */}
          <div className="col-md-7">
            <h6 className="fs-13 fw-medium mb-2">Select Time</h6>
            <div className="row g-2">
              {timeSlots.map((slot, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                  <div
                    className={`time-item p-2 text-center rounded-3 shadow-sm ${slot.disabled ? "bg-light text-muted" : "bg-white cursor-pointer"
                      } ${selectedTime === slot.time ? "border border-3 border-success bg-success text-white" : ""}`}
                    onClick={() => {
                      if (!slot.disabled) {
                        setSelectedTime(slot.time);
                        setbookingTime(slot.time);
                      }
                    }}
                    style={{ cursor: slot.disabled ? "not-allowed" : "pointer" }}
                  >
                    <p className="fs-12 fw-medium mb-0">{slot.time}</p>
                    {/* <p className="fs-10 mb-0">{slot.slots} Slots</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="booking-footer d-flex justify-content-end mt-3">
        <Link className="btn btn-light btn-sm me-2" onClick={handlePre}>
          <i className="ti ti-arrow-left me-1"></i> Prev
        </Link>
        <Link className="btn btn-success btn-sm" onClick={handleNext}>
          Next <i className="ti ti-arrow-right ms-1"></i>
        </Link>
      </div>
    </fieldset>
  );
};

export default BookingDateTime;
