import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  FormProvider,
  FMultiCheckbox,
  FDatePicker,
  FTimePicker,
  FRadioGroup,
} from "./form";
import { getHabitSingleReminder } from "../features/habit/habitSlice";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const editReminderSchema = Yup.object().shape({});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  width: "90%",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  // maxHeight: "600px",
  maxHeight: "90%",
  overflow: "scroll",
  // "@media (max-width: 600px)": {
  //   width: "90%",
  // },
};

function EditReminderForm({
  isReminderEdit,
  setIsReminderEdit,
  handleReminderEdit,
  reminderId,
  // reminder,
}) {
  const dispatch = useDispatch();
  const smScreenUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { onWeekdays, startDate, time, status } = useSelector(
    (state) => state.habit.currentReminder
  );

  const defaultValues = {
    time: time || "",
    onWeekdays: onWeekdays || [],
    status: status || "",
    startDate: startDate || "",
  };

  const [dateValue, setDateValue] = useState(
    dayjs(startDate)
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0)
  );
  const [timeValue, setTimeValue] = useState(dayjs(time));

  const methods = useForm({
    resolver: yupResolver(editReminderSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleClose = () => setIsReminderEdit(false);

  const onSubmit = (data) => {
    const { onWeekdays, status } = data;
    // console.log("onSubmit editReminder:");
    // console.log("data:", data);
    handleReminderEdit({
      reminderId,
      time: timeValue,
      onWeekdays,
      status,
      startDate: dateValue,
    });

    handleClose();
  };

  useEffect(() => {
    dispatch(getHabitSingleReminder(reminderId));
  }, [dispatch, reminderId]);

  return (
    <div>
      <Modal
        open={isReminderEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {smScreenUp ? "Edit reminder" : "Edit"}
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FDatePicker
                dateValue={dayjs(startDate)}
                setDateValue={setDateValue}
              />
              <FTimePicker timeValue={timeValue} setTimeValue={setTimeValue} />

              <Typography variant="inherit">
                On weekdays (pick some days to edit):
              </Typography>
              <FMultiCheckbox name="onWeekdays" options={weekdays} />

              {/* <FMultiCheckbox name="tags" options={tags} /> */}
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
                  sx={{ mr: 2 }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="small"
                  loading={
                    isSubmitting
                    // || isLoading
                  }
                >
                  Edit Reminder
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}

export default EditReminderForm;
