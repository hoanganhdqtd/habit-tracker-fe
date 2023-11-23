import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormProvider } from "./form";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteHabit, editHabit } from "../features/habit/habitSlice";
import EditHabitForm from "./EditHabitForm";
import DeleteHabitConfirm from "./DeleteHabitConfirm";
import { FSwitch } from "./form";
import { useForm } from "react-hook-form";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: 500,
}));

function HabitCard({ key, habit, isInCalendarPage }) {
  const [isHabitEdit, setIsHabitEdit] = useState(false);
  const [isHabitDelete, setIsHabitDelete] = useState(false);

  console.log("isInCalendarPage:", isInCalendarPage);

  const defaultValues = { status: "incomplete" };
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log("data:", data);
    const { completed } = data;

    console.log("completed:", completed);

    // dispatch(
    //   editHabit({ name, goal, startDate: startDateValue, duration, onWeekdays })
    // );

    // dispatch(getHabits({ date: dateValue }));
  };

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

  const navigate = useNavigate();
  return (
    <Item
      key={key}
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

        {isInCalendarPage && (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FSwitch name="completed" label="Completed?" />
          </FormProvider>
        )}

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
  );
}

export default HabitCard;
