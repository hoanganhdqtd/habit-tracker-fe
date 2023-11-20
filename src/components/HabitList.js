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
  const [isHabitEdit, setIsHabitEdit] = useState(false);
  const [isHabitDelete, setIsHabitDelete] = useState(false);

  const dispatch = useDispatch();
  const handleHabitDelete = async (habitId) => {
    setIsHabitDelete(false);
    dispatch(deleteHabit({ habitId }));
  };

  const handleHabitEdit = async ({
    habitId,
    name,
    goal,
    startDate,
    duration,
    onWeekdays,
  }) => {
    console.log(
      "habitId, name, goal, startDate, duration, onWeekdays:",
      habitId,
      name,
      goal,
      startDate,
      duration,
      onWeekdays
    );
    setIsHabitEdit(false);
    dispatch(
      editHabit({ habitId, name, goal, startDate, duration, onWeekdays })
    );
  };

  const { currentPageHabits, habitsById, isLoading, search } = useSelector(
    (state) => state.habit
  );

  const habits = currentPageHabits.map((habitId) => habitsById[habitId]);

  console.log("HabitList habits:", habits);

  const navigate = useNavigate();

  const handleChangePage = () => {
    dispatch(changePage());
  };

  return isLoading ? (
    <LoadingScreen />
  ) : !habits.length ? (
    !date ? (
      <h1>No habit found.</h1>
    ) : (
      <h1>There's no habit on this day.</h1>
    )
  ) : (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
      {habits.map((habit) => {
        {
          /* <Item
            key={habit._id}
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
              cursor: "pointer",
            }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <Avatar onClick={() => navigate("/account")}>A</Avatar>
              <Typography
                noWrap
                onClick={() => {
                  console.log("habit._id:", habit._id);
                  navigate(`/habit/${habit._id}`);
                }}
              >
                {habit.name}
              </Typography>
              <Typography>{"tags"}</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("Edit form");
                  setIsHabitEdit(true);
                }}
              >
                Edit
              </Button>
              {isHabitEdit && (
                <EditHabitForm
                  isHabitEdit={isHabitEdit}
                  setIsHabitEdit={setIsHabitEdit}
                  handleHabitEdit={handleHabitEdit}
                  habitId={habit._id}
                />
              )}
              <Button
                variant="contained"
                onClick={() => setIsHabitDelete(true)}
              >
                Delete
              </Button>
              {isHabitDelete && (
                <DeleteHabitConfirm
                  handleHabitDelete={handleHabitDelete}
                  setIsHabitDelete={setIsHabitDelete}
                  habitId={habit._id}
                />
              )}
            </Stack>
          </Item> */
        }
        return (
          <HabitCard
            key={habit._id}
            habit={habit}
            isInCalendarPage={isInCalendarPage}
          />
        );
      })}
    </Box>
  );
}
