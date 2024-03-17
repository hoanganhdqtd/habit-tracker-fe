import React, { useState } from "react";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { alpha, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FormProvider, FTextField, FMultiCheckbox, FDatePicker } from "./form";
import { addHabit, getHabits } from "../features/habit/habitSlice";

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
  name: "",
  goal: "",
  description: "",
  startDate: "",
  duration: "",
  onWeekdays: [],
  tags: [],
};

const addHabitSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  goal: Yup.string().required("Goal is required"),
  duration: Yup.number().required("This field is required"),
});

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
  "@media (max-width: 600px)": {
    width: "90%",
  },
};

function AddHabitForm({ addNewHabit, setAddNewHabit, dateValue, tags }) {
  const newDate = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const [startDateValue, setStartDateValue] = useState(newDate);
  const smScreenUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  style.width = smScreenUp ? "400" : "fullWidth";

  const methods = useForm({
    resolver: yupResolver(addHabitSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, description, goal, duration, onWeekdays } = data;
    dispatch(
      addHabit({
        name,
        description,
        goal,
        startDate: startDateValue,
        duration,
        onWeekdays,
      })
    );

    handleClose();
    navigate("/");
    dispatch(getHabits({ date: dateValue }));
  };

  const handleClose = () => setAddNewHabit(false);

  return (
    <div>
      <Modal
        open={addNewHabit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // fullWidth
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add new habit
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FTextField
                name="name"
                fullWidth
                rows={4}
                placeholder="Name"
                required={true}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              <FTextField
                name="description"
                fullWidth
                rows={4}
                placeholder="Description"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <FTextField
                name="goal"
                fullWidth
                rows={4}
                placeholder="Goal"
                required={true}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <FDatePicker
                dateValue={startDateValue}
                setDateValue={setStartDateValue}
              />

              <FTextField
                name="duration"
                fullWidth
                rows={4}
                placeholder="Duration (hours/day)"
                required={true}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <Typography variant="inherit">
                On weekdays (all selected without any being checked):
              </Typography>
              <FMultiCheckbox name="onWeekdays" options={weekdays} />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  // color="primary"
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
                  Create Habit
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}

export default AddHabitForm;
