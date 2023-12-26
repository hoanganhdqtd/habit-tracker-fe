import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Tabs, Tab, Typography } from "@mui/material";

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

// const getWeekday = (date) => {
//   return weekday[date.getDay()];
// };

const getWeekFromDate = (date) => {
  // const firstDay = date.getDate() - date.getDay();
  // const lastDay = firstDay + 6;

  const newDate = date ? new Date(date) : new Date();

  // let dateOfWeekday = startOfWeek(date); // starts with Sunday
  // const firstDay = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  // const lastDay = endOfWeek(date); // Saturday

  let startDateOfWeek = startOfWeek(newDate);

  // console.log("startDateOfWeek:", startDateOfWeek);

  const weekDate = {};

  for (let index in weekday) {
    weekDate[weekday[index]] = new Date(startDateOfWeek);
    startDateOfWeek.setDate(startDateOfWeek.getDate() + 1);
  }

  return weekDate;
};

function CalendarPage() {
  const newDate = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  // console.log("newDate:", newDate);

  // const [dateValue, setDateValue] = useState(dayjs(new Date()));
  const [dateValue, setDateValue] = useState(newDate);

  const [currentTabIndex, setCurrentTabIndex] = useState(
    dayjs(dateValue).get("day")
  );

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  // console.log("instanceof dateValue:", dateValue instanceof Date);
  // console.log("dateValue:", dateValue);

  let weekDate = getWeekFromDate(dateValue);
  // console.log("weekDate:", weekDate);

  // const today = getWeekday(new Date());
  // const weekdayToPick = getWeekday(dateValue);

  // console.log("today:", today);
  // console.log("weekdayToPick:", weekdayToPick);

  const dispatch = useDispatch();
  const handleDateChange = (newDateValue) => {
    // console.log("newDateValue:", newDateValue);
    setDateValue(dayjs(newDateValue));
    weekDate = getWeekFromDate(dateValue);
    // console.log("weekDate:", weekDate);
    setCurrentTabIndex(dayjs(newDateValue).get("day"));
    dispatch(getHabits({ date: newDateValue }));
  };

  useEffect(() => {
    dispatch(getHabits({ date: dateValue }));
    // dispatch(getTags());
  }, [dateValue, dispatch]);
  // console.log("dateValue instanceof Date:", dateValue instanceof Date);
  // console.log("dateValue:", dateValue);

  return (
    <div>
      {/* <h1>Calendar</h1> */}
      <Typography variant="h4">Calendar</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Pick date"
          value={dayjs(dateValue)
            .set("hour", 0)
            .set("minute", 0)
            .set("second", 0)
            .set("millisecond", 0)}
          // onChange={(newDateValue) => {
          //   setDateValue(newDateValue);
          //   weekDate = getWeekFromDate(dateValue);
          //   dispatch(getHabits({ date: newDateValue }));
          // }}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={currentTabIndex} onChange={handleTabChange} centered>
            {/* {weekday.map((day) => (
                <Tab key={day} label={`${weekDate[day]}`.slice(0, 15)}>
                  {`${weekDate[day]}`.slice(0, 15)}
                </Tab>
              ))} */}
            {weekday.map((day) => (
              <Tab
                key={day}
                wrapped
                label={`${weekDate[day]}`.slice(0, 10)}
                onClick={() => {
                  // setDateValue(dayjs(weekDate[day]));
                  setDateValue(weekDate[day]);
                  dispatch(getHabits({ date: weekDate[day] }));
                }}
              >
                {`${weekDate[day]}`.slice(0, 15)}
              </Tab>
            ))}
          </Tabs>
        </Box>
      </Box>
      <HabitList date={dateValue} isInCalendarPage={true} />
    </div>
  );
}

export default CalendarPage;
