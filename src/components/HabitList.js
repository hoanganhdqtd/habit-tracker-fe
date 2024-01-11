import * as React from "react";
// import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";

import LoadingScreen from "./LoadingScreen";

import HabitCard from "./HabitCard";

export default function HabitList({ date, isInCalendarPage }) {
  const { currentPageHabits, habitsById, isLoading } = useSelector(
    (state) => state.habit
  );

  const habits = currentPageHabits.map((habitId) => habitsById[habitId]);

  return isLoading ? (
    <LoadingScreen />
  ) : !habits.length ? (
    <Box
      mt={2}
      sx={{
        flex: "1 1 auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">
        {!date ? "No habit found." : "There's no habit on this day."}
      </Typography>
    </Box>
  ) : (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
      {habits.map((habit) => {
        return (
          <HabitCard
            key={habit._id}
            habit={habit}
            isInCalendarPage={isInCalendarPage}
            date={date}
          />
        );
      })}
    </Box>
  );
}
