// File: InlineCalendar.jsx
import React, { useState, useEffect } from "react";

/**
 * InlineCalendar
 * - No external libs
 * - Props:
 *    initialDate: Date (optional) - default: today
 *    onChange: function(Date) (optional) - called when user selects a date
 *    minDate / maxDate: Date (optional) - disable selection outside range
 */
export default function InlineCalendar({
  initialDate = new Date(),
  onChange = () => {},
  minDate = null,
  maxDate = null,
  setSelectedMyDate
}) {
  const [viewDate, setViewDate] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate())
  );

  // Helpers
  const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
  const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const isSameDay = (a, b) =>
    a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const isBefore = (a, b) => a && b && a.getTime() < b.getTime();
  const isAfter = (a, b) => a && b && a.getTime() > b.getTime();

  // Produce calendar grid for current viewDate
  const buildCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = startOfMonth(viewDate).getDay(); // 0 (Sun) - 6 (Sat)
    const totalDays = daysInMonth(year, month);
    const prevMonthDays = []; // optional show prev month (disabled)
    const weeks = [];
    let dayCounter = 1;
    // We will build 6 rows x 7 cols (always) to keep consistent layout
    for (let week = 0; week < 6; week++) {
      const days = [];
      for (let weekday = 0; weekday < 7; weekday++) {
        const cellIndex = week * 7 + weekday;
        const dateNumber = cellIndex - firstDay + 1;
        if (dateNumber <= 0 || dateNumber > totalDays) {
          // empty / out-of-month cell
          days.push(null);
        } else {
          days.push(new Date(year, month, dateNumber));
        }
      }
      weeks.push(days);
    }
    return weeks;
  };

  const weeks = buildCalendar();
  const monthName = viewDate.toLocaleString(undefined, { month: "long" });
  const yearNum = viewDate.getFullYear();

  const canSelect = (date) => {
    if (!date) return false;
    if (minDate && isBefore(date, minDate)) return false;
    if (maxDate && isAfter(date, maxDate)) return false;
    return true;
  };

  const handlePrev = () => {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };
  const handleNext = () => {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
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
        setSelectedMyDate(formatYMD(date))
        onChange(formatYMD(date)); // Pass yyyy-mm-dd instead of Date object
    };

  // Inject light CSS once
  useEffect(() => {
    const id = "inline-calendar-styles";
    if (document.getElementById(id)) return;
    const css = `
      .ic-wrapper { font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; width: 100%; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; background: white; box-shadow: 0 4px 10px rgba(0,0,0,0.03); }
      .ic-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
      .ic-title { font-weight:600; }
      .ic-nav button { background:none; border:none; padding:6px 8px; cursor:pointer; border-radius:6px; }
      .ic-nav button:hover { background:#f2f2f2; }
      .ic-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:6px; text-align:center; }
      .ic-weekday { font-size:12px; color:#6b7280; padding:4px 0; }
      .ic-day { padding:8px 6px; border-radius:6px; cursor:pointer; }
      .ic-day.disabled { color:#bdbdbd; cursor:not-allowed; background:transparent; }
      .ic-day:hover:not(.disabled) { background:#f5f7ff; }
      .ic-day.selected { background:#2563eb; color:white; font-weight:600; }
      .ic-day.today { border:1px solid #c7d2fe; }
      .ic-footer { margin-top:10px; display:flex; justify-content:space-between; align-items:center; font-size:13px; color:#374151; }
      .ic-clear { background:none; border:1px solid #e5e7eb; padding:6px 8px; border-radius:6px; cursor:pointer; }
    `;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = css;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="ic-wrapper" role="application" aria-label="Calendar">
      <div className="ic-header">
        <div className="ic-title">
          {monthName} {yearNum}
        </div>
        <div className="ic-nav">
          <button aria-label="Previous month" onClick={handlePrev}>&lt;</button>
          <button aria-label="Next month" onClick={handleNext}>&gt;</button>
        </div>
      </div>

      <div className="ic-grid" aria-hidden={false}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="ic-weekday">{d}</div>
        ))}

        {weeks.flat().map((date, idx) => {
          const classes = ["ic-day"];
          if (!date) classes.push("disabled");
          else {
            if (!canSelect(date)) classes.push("disabled");
            if (isSameDay(date, selectedDate)) classes.push("selected");
            const today = new Date();
            if (isSameDay(date, today)) classes.push("today");
          }
          return (
            <div
              key={idx}
              className={classes.join(" ")}
              onClick={() => handleSelect(date)}
              aria-disabled={!date || !canSelect(date)}
            >
              {date ? date.getDate() : ""}
            </div>
          );
        })}
      </div>

      <div className="ic-footer">
        <div>
          Selected:{" "}
          {selectedDate ? formatYMD(selectedDate) : "—"}
        </div>
        <div>
          <button
            type="button"
            className="ic-clear"
            onClick={() => {
              setSelectedDate(null);
              onChange(null);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
