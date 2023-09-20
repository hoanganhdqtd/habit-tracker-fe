import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";

import HabitList from "../components/HabitList";
import { getHabits } from "../features/habit/habitSlice";

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

  const newDate = date ? new Date(date) : new Date();

  // let dateOfWeekday = startOfWeek(date); // starts with Sunday
  // const firstDay = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  // const lastDay = endOfWeek(date); // Saturday

  let dateOfWeekday = startOfWeek(newDate);

  console.log("dateOfWeekday:", dateOfWeekday);

  const weekDate = {};

  for (let index in weekday) {
    weekDate[weekday[index]] = new Date(dateOfWeekday);
    dateOfWeekday.setDate(dateOfWeekday.getDate() + 1);
  }

  return weekDate;
};

function CalendarPage() {
  const [dateValue, setDateValue] = useState(dayjs(new Date()));

  console.log("instanceof dateValue:", dateValue instanceof Date);
  console.log("dateValue:", dateValue);

  let weekDate = getWeekFromDate(dateValue);
  console.log("weekDate:", weekDate);

  const today = getWeekday(new Date());
  // const weekdayToPick = getWeekday(dateValue);

  console.log("today:", today);
  // console.log("weekdayToPick:", weekdayToPick);

  const dispatch = useDispatch();
  const handleDateChange = (newDateValue) => {
    console.log("newDateValue:", newDateValue);
    setDateValue(newDateValue);
    weekDate = getWeekFromDate(dateValue);
    // console.log("weekDate:", weekDate);
    dispatch(getHabits({ date: newDateValue }));
  };
  useEffect(() => {
    dispatch(getHabits({ date: dateValue }));
    // dispatch(getTags());
  }, [dateValue, dispatch]);
  console.log("dateValue instanceof Date:", dateValue instanceof Date);
  console.log("dateValue:", dateValue);

  return (
    <div>
      <h1>Calendar</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Pick date"
          value={dayjs(dateValue)}
          // onChange={(newDateValue) => {
          //   setDateValue(newDateValue);
          //   weekDate = getWeekFromDate(dateValue);
          //   dispatch(getHabits({ date: newDateValue }));
          // }}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <div>
        {weekday.map((day) => {
          console.log("", dayjs(weekDate[day]).toString().slice(0, 15));
          console.log("", dayjs(dateValue).toString().slice(0, 15));
          console.log(
            dayjs(weekDate[day]).toString().slice(0, 15) ===
              dayjs(dateValue).toString().slice(0, 15)
          );
          return (
            <div
              key={day}
              style={
                dayjs(weekDate[day]).toString().slice(0, 15) ===
                dayjs(dateValue).toString().slice(0, 15)
                  ? { color: "red", cursor: "pointer" }
                  : { cursor: "pointer" }
              }
              onClick={() => {
                // setDateValue(dayjs(weekDate[day]));
                setDateValue(weekDate[day]);
                dispatch(getHabits({ date: weekDate[day] }));
              }}
            >
              {/* {dayjs(weekDate[day]).toString()} {dayjs(dateValue).toString()}{" "} */}
              {`${weekDate[day]}`.slice(0, 15)}
            </div>
          );
        })}
        <HabitList />
      </div>
    </div>
  );
}

export default CalendarPage;
