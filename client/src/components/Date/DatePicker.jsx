import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

 const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <label>Select Date:</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        className="form-control mt-2"
      />

      <p className="mt-3">Selected Date: {startDate.toDateString()}</p>
    </div>
  );
}
export default CustomDatePicker;