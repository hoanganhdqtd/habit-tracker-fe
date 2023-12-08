import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { alpha, Button, Stack } from "@mui/material";
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
} from "./form";

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
};

function EditReminderForm({
  isReminderEdit,
  setIsReminderEdit,
  handleReminderEdit,
  reminderId,
}) {
  const newDate = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const [dateValue, setDateValue] = useState(newDate);
  const [timeValue, setTimeValue] = useState(dayjs(new Date()));

  const methods = useForm({
    resolver: yupResolver(editReminderSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const navigate = useNavigate();
  const handleClose = () => setIsReminderEdit(false);

  const onSubmit = (data) => {
    const { reminderFrequency, time, onWeekdays, status } = data;

    console.log("onSubmit editReminder:");
    handleReminderEdit({
      reminderId,
      reminderFrequency,
      time,
      onWeekdays,
      status,
      startDate: dateValue,
    });

    handleClose();
  };

  return (
    <div>
      <Modal
        open={isReminderEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FDatePicker dateValue={dateValue} setDateValue={setDateValue} />
              <FTimePicker timeValue={timeValue} setTimeValue={setTimeValue} />

              {"On weekdays:"}
              <FMultiCheckbox name="onWeekdays" options={weekdays} />

              {/* <FMultiCheckbox name="tags" options={tags} /> */}

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
