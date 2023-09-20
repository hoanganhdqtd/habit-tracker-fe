import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../features/habit/habitSlice";
import LoadingScreen from "./LoadingScreen";
import EditHabitForm from "./EditHabitForm";
import DeleteHabitConfirm from "./DeleteHabitConfirm";

import { deleteHabit } from "../features/habit/habitSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: 400,
}));

export default function HabitList() {
  const [isHabitEdit, setIsHabitEdit] = useState(false);
  const [isHabitDelete, setIsHabitDelete] = useState(false);

  const dispatch = useDispatch();
  const handleHabitDelete = async (habitId) => {
    setIsHabitDelete(false);
    dispatch(deleteHabit({ habitId }));
  };

  const { currentPageHabits, habitById, isLoading, search, date } = useSelector(
    (state) => state.habit
  );

  const habits = currentPageHabits.map((habitId) => habitById[habitId]);

  const navigate = useNavigate();

  const handleChangePage = () => {
    dispatch(changePage());
  };

  return isLoading ? (
    <LoadingScreen />
  ) : !habits.length ? (
    search || date ? (
      <h1>No habit found.</h1>
    ) : (
      <h1>There's no habit yet</h1>
    )
  ) : (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
      {habits.map((habit) => (
        <Item
          key={habit._id}
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
            cursor: "pointer",
          }}
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar>A</Avatar>
            <Typography
              noWrap
              onClick={() => {
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
            <Button variant="contained" onClick={() => setIsHabitDelete(true)}>
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
        </Item>
      ))}
    </Box>
  );
}
