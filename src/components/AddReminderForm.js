import React, { useState } from "react";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
  FormProvider,
  FMultiCheckbox,
  FDatePicker,
  FTimePicker,
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
  width: "90%",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90%",
  overflow: "scroll",
  // "@media (max-width: 600px)": {
  //   width: "90%",
  // },
};

function AddReminderForm({ isAddNewReminder, setIsAddNewReminder, habitId }) {
  const newDate = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const [dateValue, setDateValue] = useState(newDate);
  const [timeValue, setTimeValue] = useState(dayjs(new Date()));

  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { onWeekdays, status } = data;
    handleClose();
    dispatch(
      addHabitReminder({
        habitId,
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

              <Typography variant="inherit">
                On weekdays (all selected without any being checked):
              </Typography>
              <FMultiCheckbox name="onWeekdays" options={weekdays} />

              <Typography variant="inherit">Status:</Typography>
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
                  color="success"
                  variant="outlined"
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
