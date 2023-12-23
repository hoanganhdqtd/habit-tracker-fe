import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { alpha, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  FormProvider,
  FTextField,
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

const defaultValues = {
  reminderFrequency: "",
  time: "",
  onWeekdays: [],
  status: "",
  startDate: "",
};

const editReminderSchema = Yup.object().shape({});

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

function EditReminderForm({
  isReminderEdit,
  setIsReminderEdit,
  handleReminderEdit,
  reminderId,
  // reminder,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { reminderFrequency, onWeekdays, startDate, time, status } =
  //   useSelector((state) =>
  //     state.habit.habitDetail.reminders.filter(
  //       (reminder) => reminder._id === reminderId
  //     )
  //   );
  // const { reminderFrequency, onWeekdays, startDate, time, status } = reminder;
  // const { onWeekdays, startDate, time, status } = reminder;
  const { onWeekdays, startDate, time, status } = useSelector(
    (state) => state.habit.currentReminder
  );
  console.log("reminder onWeekdays:", onWeekdays);
  console.log("reminder startDate:", startDate);
  console.log("reminder time:", time);
  console.log("reminder status:", status);
  defaultValues.status = status;

  // const newDate = dayjs()
  //   .set("hour", 0)
  //   .set("minute", 0)
  //   .set("second", 0)
  //   .set("millisecond", 0);
  // const [dateValue, setDateValue] = useState(newDate);
  // const [timeValue, setTimeValue] = useState(dayjs(new Date()));

  const [dateValue, setDateValue] = useState(
    dayjs(startDate)
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0)
  );
  const [timeValue, setTimeValue] = useState(dayjs(time));

  // const [reminderFreq, setReminderFreq] = useState(reminderFrequency);
  // const [onWeekdaysValue, setOnWeekdaysValue] = useState(onWeekdays);

  if (onWeekdays.length) {
    defaultValues.onWeekdays = onWeekdays;
  }

  console.log("status:", status);

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
    // const { reminderFrequency, onWeekdays, status } = data;
    const { onWeekdays, status } = data;

    console.log("onSubmit editReminder:");
    console.log("data:", data);
    handleReminderEdit({
      reminderId,
      // reminderFrequency,
      time: timeValue,
      onWeekdays,
      status,
      startDate: dateValue,
    });

    handleClose();
  };

  // useEffect(() => {
  //   if (onWeekdays && onWeekdays.length) {
  //     methods.setValue("onWeekdays", onWeekdays);
  //   }
  //   if (status) {
  //     methods.setValue("status", status);
  //   }
  //   methods.setValue("time", timeValue);
  //   methods.setValue("date", dateValue);
  // }, [onWeekdays, status, timeValue, dateValue]);

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
            Edit reminder
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {/* {"Reminder frequency:"}
              <FRadioGroup
                name="reminderFrequency"
                options={["once", "repeated"]}
                // required={true}
                value={reminderFreq}
                onChange={(e) => {
                  setReminderFreq(e.target.value);
                }}
              /> */}
              <FDatePicker
                dateValue={dayjs(startDate)}
                setDateValue={setDateValue}
              />
              <FTimePicker timeValue={timeValue} setTimeValue={setTimeValue} />

              {"On weekdays:"}
              <FMultiCheckbox
                name="onWeekdays"
                options={weekdays}
                // value={onWeekdaysValue}
              />

              {/* <FMultiCheckbox name="tags" options={tags} /> */}
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
                  color="primary"
                  variant="contained"
                  size="small"
                  sx={{ mr: 2 }}
                  onClick={handleClose}
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
