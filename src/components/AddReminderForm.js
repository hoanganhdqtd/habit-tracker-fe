import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { alpha, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FormProvider,
  FMultiCheckbox,
  FDatePicker,
  FTimePicker,
  FSwitch,
  FRadioGroup,
} from "./form";

import { addHabitReminder } from "../features/habit/habitSlice";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const defaultValues = {
  reminderFrequency: "",
  onWeekdays: [],
  time: "",
  startDate: "",
  status: "ongoing",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "600px",
  overflow: "scroll",
};

function AddReminderForm({ isAddNewReminder, setIsAddNewReminder, habitId }) {
  const newDate = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const [dateValue, setDateValue] = useState(newDate);
  const [timeValue, setTimeValue] = useState(dayjs(new Date()));
  // const [timeValue, setTimeValue] = useState(null);

  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // const { reminderFrequency, onWeekdays, status } = data;
    const { onWeekdays, status } = data;
    // dispatch(addHabit(data));
    // startDate: new Date("23-8-2023"),

    // console.log("reminderFrequency:", reminderFrequency);
    console.log("onWeekdays:", onWeekdays);

    console.log("status:", status);
    console.log("startDate:", dateValue);
    console.log("time:", timeValue);

    handleClose();
    // navigate("/");
    // navigate(0);
    // dispatch(getHabitById(habitId));
    dispatch(
      addHabitReminder({
        habitId,
        // reminderFrequency,
        onWeekdays,
        startDate: dateValue,
        time: timeValue,
        status,
      })
    );
  };

  const handleClose = () => setIsAddNewReminder(false);

  return (
    <div>
      <Modal
        open={isAddNewReminder}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add new reminder
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {/* {"Reminder frequency:"}
              <FRadioGroup
                name="reminderFrequency"
                options={["once", "repeated"]}
                required={true}
              /> */}

              <FTimePicker
                name="time"
                timeValue={timeValue}
                setTimeValue={setTimeValue}
              />

              <FDatePicker
                name="startDate"
                dateValue={dateValue}
                setDateValue={setDateValue}
              />

              {"On weekdays (all selected without any being checked):"}
              <FMultiCheckbox name="onWeekdays" options={weekdays} />

              {"Status:"}
              <FRadioGroup
                name="status"
                options={["ongoing", "pause"]}
                required={true}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={handleClose}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="small"
                  loading={
                    isSubmitting
                    // || isLoading
                  }
                >
                  Add Reminder
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}

export default AddReminderForm;
