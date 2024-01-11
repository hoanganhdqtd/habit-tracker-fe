import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Container,
  Stack,
  useMediaQuery,
} from "@mui/material";

import dayjs from "dayjs";
import { startOfWeek } from "date-fns";

import HabitList from "../components/HabitList";
import { getHabits } from "../features/habit/habitSlice";
import { getTags } from "../features/tag/tagSlice";
import { SearchBox } from "../components/SearchBox";
import TagButton from "../components/TagButton";
import { getCurrentUserProfile } from "../features/user/userSlice";

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
  const { tags } = useSelector((state) => state.tag);
  const { search, tag } = useSelector((state) => state.habit);
  const { currentUser } = useSelector((state) => state.user);

  // const { tagToSearch } = navigate.state;
  const { state } = useLocation();
  let tagToSearch = state?.tagToSearch;
  // let tag;
  // if (state) {
  //   tag = state.tagToSearch;
  // }

  const mdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const { date } = useSelector((state) => state.habit);
  // console.log("date:", date);
  const newDate = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  // console.log("newDate:", newDate);

  // const [dateValue, setDateValue] = useState(dayjs(new Date()));
  const [dateValue, setDateValue] = useState(date ? dayjs(date) : newDate);

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
    // dispatch(getHabits({ date: newDateValue }));
  };

  useEffect(() => {
    dispatch(getHabits({ search, date: dateValue, tag }));

    if (!currentUser.avatarUrl) {
      dispatch(getCurrentUserProfile());
    }
    // dispatch(getCurrentUserProfile());

    if (!tags.length) {
      dispatch(getTags());
    }
  }, [search, dateValue, tag, currentUser, tags, dispatch]);
  // console.log("dateValue instanceof Date:", dateValue instanceof Date);
  // console.log("dateValue:", dateValue);

  // clear location state
  // window.history.replaceState({}, document.title);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3} mb={2}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Calendar</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <SearchBox />
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
          </Stack>
        </Stack>
        {tags.length !== 0 && (
          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {/* {tags.map((tag) => (
                  <Button
                    variant="contained"
                    color="success"
                    key={tag._id}
                    size="small"
                    sx={{ mr: 1, mt: 1 }}
                    // onClick={() =>
                    //   navigate(`/habit/${habitId}/reminder/${reminder._id}`)
                    // }
                    onClick={() => {
                      dispatch(getHabits({ tag: tag.title }));
                    }}
                  >
                    {`#${tag.title}`}
                  </Button>
                ))} */}
              {tags.map((tag) => (
                <TagButton
                  key={tag._id}
                  tagId={tag._id}
                  title={tag.title}
                  onClick={() =>
                    dispatch(getHabits({ tag: tag.title, date: dateValue }))
                  }
                />
              ))}
            </Box>
          </Stack>
        )}
        <Box sx={{ width: "100%", mt: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={currentTabIndex} onChange={handleTabChange} centered>
              {weekday.map((day) => (
                <Tab
                  key={day}
                  wrapped
                  label={
                    mdScreen
                      ? `${weekDate[day]}`.slice(0, 10)
                      : `${weekDate[day]}`.slice(4, 10)
                  }
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
      </Container>
    </Box>
  );
}

export default CalendarPage;
