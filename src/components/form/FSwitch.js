import { useFormContext, Controller } from "react-hook-form";
import { Switch, FormControlLabel } from "@mui/material";
import { boolean } from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleProgress,
  updateSingleProgress,
} from "../../features/progress/progressSlice";
import { getHabitById } from "../../features/habit/habitSlice";
import { useEffect, useState } from "react";

function FSwitch({ name, habitId, date, ...other }) {
  const { control } = useFormContext();
  const dispatch = useDispatch();
  const { progress } = useSelector((state) => state.progress);
  const { status } = progress;
  console.log("status:", status);

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <Switch
                {...field}
                checked={field.value}
                onChange={(e) => {
                  field.onChange(!field.value);
                  console.log("field.value:", !field.value);
                  const status = !field.value ? "completed" : "incomplete";
                  console.log("status:", status);
                  dispatch(updateSingleProgress({ habitId, date, status }));
                  // dispatch(getHabitById(habitId));
                  dispatch(getSingleProgress(progress._id));
                }}
              />
            );
          }}
        />
      }
      {...other}
    />
  );
}

export default FSwitch;
