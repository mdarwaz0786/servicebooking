import React, { useState, useEffect } from "react";

export default function InlineCalendar({
  initialDate = new Date(),
  onChange = () => {},
  minDate = null,
  maxDate = null,
  setSelectedMyDate,
}) {
  const [selectedDate, setSelectedDate] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate())
  );

  // 🧠 Helpers
  const isSameDay = (a, b) =>
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isBefore = (a, b) => a && b && a.getTime() < b.getTime();
  const isAfter = (a, b) => a && b && a.getTime() > b.getTime();

  const canSelect = (date) => {
    if (!date) return false;
    if (minDate && isBefore(date, minDate)) return false;
    if (maxDate && isAfter(date, maxDate)) return false;
    return true;
  };

  const formatYMD = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSelect = (date) => {
    if (!date) return;
    if (!canSelect(date)) return;
    setSelectedDate(date);
    setSelectedMyDate(formatYMD(date));
    onChange(formatYMD(date));
  };

  // 🔹 Generate next 5 days (including today)
  const upcomingDates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  // 💅 Inject CSS only once
  useEffect(() => {
    const id = "urban-style-calendar";
    if (document.getElementById(id)) return;
    const css = `
      .uc-wrapper {
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        width: 100%;
        background: #fff;
        border-radius: 10px;
        padding: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      }

      .uc-header {
        font-weight: 600;
        margin-bottom: 10px;
        color: #111827;
      }

      .uc-date-row {
        display: flex;
        overflow-x: auto;
        gap: 10px;
        padding-bottom: 5px;
        scrollbar-width: none; /* Firefox */
      }
      .uc-date-row::-webkit-scrollbar { display: none; }

      .uc-date {
        flex: 0 0 auto;
        text-align: center;
        padding: 8px 14px;
        border-radius: 20px;
        border: 1px solid #e5e7eb;
        cursor: pointer;
        color: #374151;
        background: #fff;
        transition: all 0.2s ease;
        min-width: 70px;
      }

      .uc-date:hover:not(.disabled) {
        background: #006b37;
        color: white;
      }

      .uc-date.selected {
        background: #006b37;
        color: white;
        font-weight: 600;
        border-color: #006b37;
      }

      .uc-date.disabled {
        color: #bdbdbd;
        cursor: not-allowed;
        background: #f9fafb;
      }

      .uc-date .day {
        font-size: 13px;
      }

      .uc-date .date {
        font-size: 16px;
        font-weight: 600;
      }

      .uc-footer {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        color: #374151;
      }

      .uc-clear {
        background: none;
        border: 1px solid #e5e7eb;
        padding: 6px 8px;
        border-radius: 6px;
        cursor: pointer;
      }

      .uc-clear:hover {
        background: #f3f4f6;
      }
    `;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = css;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="uc-wrapper" role="application">
      {/* <div className="uc-header">Select Date</div> */}

      {/* 🔹 Horizontal Date Row */}
      <div className="uc-date-row">
        {upcomingDates.map((date, idx) => {
          const classes = ["uc-date"];
          if (!canSelect(date)) classes.push("disabled");
          if (isSameDay(date, selectedDate)) classes.push("selected");

          const dayLabel =
            idx === 0
              ? "Today"
              : idx === 1
              ? "Tomorrow"
              : date.toLocaleDateString(undefined, { weekday: "short" });

          return (
            <div
              key={idx}
              className={classes.join(" ")}
              onClick={() => handleSelect(date)}
            >
              <div className="day">{dayLabel}</div>
              <div className="date">{date.getDate()}</div>
            </div>
          );
        })}
      </div>

      <div className="uc-footer d-none">
        <div>
          Selected: {selectedDate ? formatYMD(selectedDate) : "—"}
        </div>
        <button
          type="button"
          className="uc-clear"
          onClick={() => {
            setSelectedDate(null);
            onChange(null);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
