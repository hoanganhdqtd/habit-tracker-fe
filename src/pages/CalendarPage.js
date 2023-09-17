import React, { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getWeekday = (date) => {
  return weekday[date.getDay()];
};

const getWeekFromDate = (date) => {
  // const firstDay = date.getDate() - date.getDay();
  // const lastDay = firstDay + 6;
  let newDate;
  if (!date) {
    newDate = newDate(date);
  } else {
    newDate = new Date();
  }

  // let dateOfWeekday = startOfWeek(date); // starts with Sunday
  // const firstDay = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  // const lastDay = endOfWeek(date); // Saturday

  let dateOfWeekday = startOfWeek(newDate);

  const weekDate = {};

  for (let index in weekday) {
    weekDate[weekday[index]] = new Date(dateOfWeekday);
    dateOfWeekday.setDate(dateOfWeekday.getDate() + 1);
  }

  return weekDate;
};

function CalendarPage() {
  const [dateValue, setDateValue] = useState(null);
  const newDate = new Date();
  const weekDate = getWeekFromDate(newDate);

  console.log("weekDate:", weekDate);

  console.log(weekDate["Tuesday"].toString());
  console.log("newDate:", newDate.toString());

  return (
    <div>
      <h1>Calendar</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Pick date"
          value={dateValue}
          onChange={(newDateValue) => setDateValue(newDateValue)}
        />
      </LocalizationProvider>
      <div>
        {weekday.map((day) => (
          <div
            key={day}
            style={
              weekDate[day].toString().slice(0, 15) ===
              newDate.toString().slice(0, 15)
                ? { color: "red" }
                : {}
            }
          >
            {`${weekDate[day]}`.slice(0, 15)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarPage;
