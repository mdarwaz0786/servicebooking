import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

import CustomDatePicker from "../../components/Date/DatePicker";
import InlineCalendar from "../../components/Date/InlineCalendar";

const BookingDateTime = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMyDate, setSelectedMyDate] = useState(null);
  const [timeSlots, settimeSlots] = useState([]);
  const { steps,toggleStep, postData, Urls, toast, setbookingDate, setbookingTime, bookingDate, bookingTime } = useContext(AppContext);
  


    const fetchTimeSlot = async () => {
      try {
          const response = await postData({date:selectedMyDate}, Urls.timeSlot, "GET");
          if(response.success)
          {
            settimeSlots(response.data)
          }          
      } catch (error) { 
        console.error("Cart API Error:", error);
      }
    } 
      
  useEffect(() => {  
    fetchTimeSlot(); 
    setbookingDate(selectedMyDate)
  }, [selectedMyDate]);  









  const handleNext = () => {
    if(!bookingDate)
    {
      toast.error("Select Date")
      return false;
    }
    if(!bookingTime)
    {
      toast.error("Select Time")
      return false;
    }
    toggleStep('payment',true)
    toggleStep('datetime',false)
  }

  const handlePre = () => {
    toggleStep('datetime',false)
    // toggleStep('additionalservice',true)
    toggleStep('location',true)
  }

  return (
    <fieldset className={`booking-content ${steps.datetime ? "d-flex" : "d-none"}`}>
      <div className="book-card">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
          <div className="d-flex align-items-center mb-2">
            <h6 className="fs-16 me-2 mb-2">Select Date & Time</h6>
          </div>

          
        </div>

        {/* Date & Time */}
        <div className="row g-3">
          {/* Date Picker */}
          <div className="col-md-5">
            <h6 className="fs-13 fw-medium mb-2">Select date</h6>
            <div className="mb-0">
              <div className=" p-0">
                {/* Replace this with a React datepicker library */}
                <InlineCalendar setSelectedMyDate={setSelectedMyDate}/>
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
                    onClick={() => {setSelectedTime(slot.time);setbookingTime(slot.time)}}
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
          <button className="btn btn-sm btn-light d-inline-flex align-items-center prev_btn me-2"
          onClick={handlePre}
          >
            <i className="ti ti-arrow-left me-1"></i>Prev
          </button>
          <button className="btn btn-sm btn-dark d-inline-flex align-items-center next_btn"
          onClick={handleNext}
          >

            Next<i className="ti ti-arrow-right ms-1"></i>
          </button>
        </div>
      </div>
    </fieldset>
  );
};

export default BookingDateTime;
