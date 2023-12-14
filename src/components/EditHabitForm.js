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
} from "./form";
import { getHabitById } from "../features/habit/habitSlice";
import { getTags } from "../features/tag/tagSlice";

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

const editHabitSchema = Yup.object().shape({
  duration: Yup.number(),
});

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

function EditHabitForm({
  isHabitEdit,
  setIsHabitEdit,
  handleHabitEdit,
  habitId,
}) {
  const dispatch = useDispatch();
  const { habitDetail } = useSelector((state) => state.habit);
  const { name, description, goal, onWeekdays, startDate, duration } =
    habitDetail;

  // useEffect(() => {
  //   dispatch(getHabitById(habitId));
  // }, [dispatch, habitId]);

  // const { search, page, totalPages } = useSelector((state) => state.habit);

  const newDate = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const [dateValue, setDateValue] = useState(newDate);
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
    const { name, goal, duration, onWeekdays } = data;

    handleHabitEdit({
      habitId,
      name,
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

  useEffect(() => {
    if (onWeekdays && onWeekdays.length) {
      methods.setValue("onWeekdays", onWeekdays);
    }
  }, [onWeekdays]);

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
              {/* <FTextField
                name="name"
                fullWidth
                rows={4}
                placeholder="Name"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              /> */}
              {"Name"}
              <FTextField
                name="name"
                fullWidth
                rows={4}
                // placeholder="Name"
                value={name}
                required={false}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              {"Description"}
              <FTextField
                name="description"
                fullWidth
                rows={4}
                // placeholder="Description"
                value={description}
                required={false}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              {"Goal"}
              <FTextField
                name="goal"
                fullWidth
                rows={4}
                // placeholder="Goal"
                value={goal}
                required={false}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <FDatePicker
                dateValue={dayjs(startDate)}
                setDateValue={setDateValue}
              />
              {/* <FTimePicker timeValue={timeValue} setTimeValue={setTimeValue} /> */}

              {"Duration (hours/day)"}
              <FTextField
                name="duration"
                fullWidth
                rows={4}
                // placeholder="Duration (hours/day)"
                value={duration}
                required={false}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
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

// <form>
//   <label for="name">Name:</label>
//   <input id="name" type="text" />
//   <br />
//   <label for="description">Description:</label>
//   <input type="text" />
//   <br />
//   <label>Goal:</label>
//   <input type="text" />
//   <br />
//   <label>Start date:</label>
//   <input type="date" />
//   <br />
//   <label>Time:</label>
//   <input type="time" />
//   <br />
//   <label>Duration:</label>
//   <input type="number" />
//   <br />
//   <label for="weekdays">On weekdays:</label>
//   <select name="weekdays" id="weekdays" multiple>
//     <option value="monday">Monday</option>
//     <option value="tuesday">Tuesday</option>
//     <option value="wednesday">Wednesday</option>
//     <option value="thursday">Thursday</option>
//     <option value="friday">Friday</option>
//     <option value="saturday">Saturday</option>
//     <option value="sunday">Sunday</option>
//   </select>
//   <input type="submit" value="Submit" />
// </form>;

export default EditHabitForm;
