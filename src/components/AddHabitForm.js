import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { alpha, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FormProvider,
  FTextField,
  FMultiCheckbox,
  FDatePicker,
  FTimePicker,
} from "./form";
import { addHabit, getHabits } from "../features/habit/habitSlice";
import { getTags } from "../features/tag/tagSlice";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultValues = {
  name: "",
  goal: "",
  description: "",
  startDate: "",
  time: "",
  duration: "",
  onWeekdays: [],
  tags: [],
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
};

function AddHabitForm({ addNewHabit, setAddNewHabit, tags }) {
  const [dateValue, setDateValue] = useState(dayjs(new Date()));
  const [timeValue, setTimeValue] = useState(dayjs(new Date()));
  const [onWeekdays, setOnWeekdays] = useState([]);
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, goal, duration } = data;
    // dispatch(addHabit(data));
    // startDate: new Date("23-8-2023"),
    console.log("name:", name);
    console.log("goal:", goal);

    console.log("duration:", duration);
    // console.log("time:", time);
    dispatch(
      addHabit({ name, goal, startDate: dateValue, time: timeValue, duration })
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
      >
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FTextField
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
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <FDatePicker dateValue={dateValue} setDateValue={setDateValue} />
              <FTimePicker timeValue={timeValue} setTimeValue={setTimeValue} />

              <FTextField
                name="duration"
                fullWidth
                rows={4}
                placeholder="Duration (hours/day)"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              <FMultiCheckbox name="onWeekdays" options={weekdays} />

              {/* <FMultiCheckbox name="tags" options={tags} /> */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
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

export default AddHabitForm;
