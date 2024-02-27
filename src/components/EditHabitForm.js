import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

const editHabitSchema = Yup.object().shape({
  duration: Yup.number(),
});

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

function EditHabitForm({
  isHabitEdit,
  setIsHabitEdit,
  handleHabitEdit,
  habitId,
}) {
  const { habitsById } = useSelector((state) => state.habit);
  const defaultValues = {
    name: habitsById[habitId]?.name || "",
    goal: habitsById[habitId]?.goal || "",
    description: habitsById[habitId]?.description || "",
    startDate: habitsById[habitId]?.startDate || "",
    duration: habitsById[habitId]?.duration || "",
    onWeekdays: habitsById[habitId]?.onWeekdays || [],
    tags: [],
  };

  // const { search, page, totalPages } = useSelector((state) => state.habit);

  const newDate = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const [dateValue, setDateValue] = useState(
    defaultValues.startDate || newDate
  );
  // const [timeValue, setTimeValue] = useState(dayjs(new Date()));

  const methods = useForm({
    resolver: yupResolver(editHabitSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, goal, duration, onWeekdays, description } = data;

    handleHabitEdit({
      habitId,
      name,
      description,
      goal,
      startDate: dateValue,
      duration,
      onWeekdays,
    });

    handleClose();
    // navigate("/");
    // navigate(`/habit/${habitId}`);
    navigate(0);
  };

  const handleClose = () => setIsHabitEdit(false);

  // useEffect(() => {
  //   if (onWeekdays && onWeekdays.length) {
  //     methods.setValue("onWeekdays", onWeekdays);
  //   }
  // }, [onWeekdays]);

  return (
    <div>
      <Modal
        open={isHabitEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit habit
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FTextField
                name="name"
                label="Name"
                fullWidth
                rows={4}
                required={false}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <FTextField
                name="description"
                label="Description"
                fullWidth
                rows={4}
                required={false}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <FTextField
                name="goal"
                label="Goal"
                fullWidth
                rows={4}
                required={false}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <FDatePicker
                // dateValue={dayjs(startDate)}
                dateValue={dayjs(dateValue)}
                setDateValue={setDateValue}
              />
              {/* <FTimePicker timeValue={timeValue} setTimeValue={setTimeValue} /> */}

              <FTextField
                name="duration"
                label="Duration (hours/day)"
                fullWidth
                rows={4}
                required={false}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <Typography variant="inherit">
                On weekdays (pick some days to edit):
              </Typography>
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
                  color="secondary"
                  variant="contained"
                  size="small"
                  loading={
                    isSubmitting
                    // || isLoading
                  }
                >
                  Edit Habit
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}

export default EditHabitForm;
