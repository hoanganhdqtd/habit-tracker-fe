import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { styled, useTheme } from "@mui/material/styles";

import {
  Avatar,
  Paper,
  Stack,
  Button,
  Typography,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
// import { red } from "@mui/material/colors";

import { FSwitch, FormProvider } from "./form";
import { useForm } from "react-hook-form";

import { deleteHabit, editHabit } from "../features/habit/habitSlice";

import DeleteHabitConfirm from "./DeleteHabitConfirm";
import EditHabitForm from "./EditHabitForm";
import dayjs from "dayjs";

function HabitCard({ habit, isInCalendarPage, date }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // maxWidth: isInCalendarPage ? 600 : 500,
    maxWidth: 600,
  }));
  const theme = useTheme();
  const [isHabitEdit, setIsHabitEdit] = useState(false);
  const [isHabitDelete, setIsHabitDelete] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { progress } = useSelector((state) => state.progress);
  // const { status } = progress;

  const { habitsById } = useSelector((state) => state.habit);

  const { progressList } = habitsById[habit._id];

  // find progress with {date, habit._id}
  const progressToFind = progressList.find(
    (progress) =>
      dayjs(progress.date).isSame(date) && progress.habit === habit._id
  );

  // console.log("progressToFind:", progressToFind);
  // let status;
  // if (progressToFind) {
  //   status = progressToFind.status;
  // }
  const status = progressToFind?.status;

  // const { status } = progressToFind;

  const isCompleted = status === "completed" ? true : false;

  const defaultValues = { isCompleted };
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log("Fswitch onSubmit data:", data);
    const { completed } = data;

    console.log("completed:", completed);
  };

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

  // const switchLabel = useMediaQuery(theme.breakpoints.up("sm"))
  //   ? "Completed"
  //   : "";

  const switchLabel = useMediaQuery(theme.breakpoints.up("md"))
    ? "Completed"
    : "";

  return (
    <Item
      // key={habit._id}
      sx={{
        my: 1,
        mx: "auto",
        p: 2,
        cursor: "pointer",
      }}
    >
      <Stack
        spacing={1}
        sx={{ justifyContent: "space-between" }}
        direction="row"
        alignItems="center"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Tooltip title="Click on the avatar to view the user's profile" arrow>
            <Avatar onClick={() => navigate("/account")}>A</Avatar>
          </Tooltip>

          <Tooltip
            title="Click on the habit's name to view the habit's detail"
            arrow
          >
            <Typography
              noWrap
              onClick={() => {
                navigate(`/habit/${habit._id}`);
              }}
            >
              {habit.name}
            </Typography>
          </Tooltip>
        </Stack>
        {isInCalendarPage && (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FSwitch
              name="isCompleted"
              // label="Completed"
              label={switchLabel}
              habitId={habit._id}
              value={isCompleted}
              date={date}
            />
          </FormProvider>
        )}

        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip
            title="Click to view the habit's count of being completed"
            arrow
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate(`statistics/${habit._id}`);
              }}
            >
              Statistics
            </Button>
          </Tooltip>
          {!isInCalendarPage && (
            <Tooltip title="Click to edit the habit" arrow>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setIsHabitEdit(true);
                }}
              >
                Edit
              </Button>
            </Tooltip>
          )}
          {!isInCalendarPage && (
            <Tooltip title="Click to delete the habit" arrow>
              <Button
                variant="contained"
                color="error"
                onClick={() => setIsHabitDelete(true)}
              >
                Delete
              </Button>
            </Tooltip>
          )}
          {isHabitEdit && (
            <EditHabitForm
              isHabitEdit={isHabitEdit}
              setIsHabitEdit={setIsHabitEdit}
              handleHabitEdit={handleHabitEdit}
              habitId={habit._id}
            />
          )}
          {isHabitDelete && (
            <DeleteHabitConfirm
              handleHabitDelete={handleHabitDelete}
              setIsHabitDelete={setIsHabitDelete}
              habitId={habit._id}
            />
          )}
        </Stack>
      </Stack>
    </Item>
  );
}

export default HabitCard;
