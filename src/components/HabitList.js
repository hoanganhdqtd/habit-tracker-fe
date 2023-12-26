import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingScreen from "./LoadingScreen";
import EditHabitForm from "./EditHabitForm";
import DeleteHabitConfirm from "./DeleteHabitConfirm";

import {
  deleteHabit,
  editHabit,
  changePage,
  getHabits,
} from "../features/habit/habitSlice";
import HabitCard from "./HabitCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: 400,
}));

export default function HabitList({ date, isInCalendarPage }) {
  const { currentPageHabits, habitsById, isLoading, search } = useSelector(
    (state) => state.habit
  );

  const habits = currentPageHabits.map((habitId) => habitsById[habitId]);

  return isLoading ? (
    <LoadingScreen />
  ) : !habits.length ? (
    !date ? (
      <Typography variant="h4">No habit found.</Typography>
    ) : (
      <Typography variant="h4">There's no habit on this day.</Typography>
    )
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
