// import axios from "axios";
import dayjs from "dayjs";

import apiService from "../app/apiService";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EditReminderForm from "../components/EditReminderForm";
import { useDispatch, useSelector } from "react-redux";
import DeleteReminderConfirm from "../components/DeleteReminderConfirm";

import {
  editHabitSingleReminder,
  getHabitSingleReminder,
} from "../features/habit/habitSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

const weekdaysByIndex = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const getWeekdays = (weekdays) => {
  if (weekdays) {
    const copiedWeekdays = [...weekdays];
    return copiedWeekdays
      .sort((a, b) => a - b)
      .map((weekday) => weekdaysByIndex[weekday])
      .join(", ");
  }
  return "No weekdays";
};

function ReminderDetailPage() {
  // const [reminder, setReminder] = useState({});
  const [isReminderEdit, setIsReminderEdit] = useState(false);
  const [isReminderDelete, setIsReminderDelete] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { reminderFrequency, time, onWeekdays, startDate, status } =
  //   useSelector((state) => state.habit.currentReminder);
  const { time, onWeekdays, startDate, status } = useSelector(
    (state) => state.habit.currentReminder
  );

  const { reminderId, habitId } = useParams();

  const handleReminderEdit = async ({
    reminderId,
    // reminderFrequency,
    time,
    onWeekdays,
    startDate,
    status,
  }) => {
    console.log("handleReminderEdit:");
    console.log(
      `reminderId: ${reminderId}`,
      // reminderFrequency,
      `time: ${time}`,
      `onWeekdays: ${onWeekdays}`,
      `startDate: ${startDate}`,
      `status: ${status}`
    );
    setIsReminderEdit(false);
    // dispatch(
    //   editHabit({ habitId, name, goal, startDate, duration, onWeekdays })
    // );
    dispatch(
      editHabitSingleReminder({
        reminderId,
        // reminderFrequency,
        time,
        onWeekdays,
        startDate,
        status,
      })
    );
    dispatch(getHabitSingleReminder(reminderId));
  };

  useEffect(() => {
    // const getReminder = async (reminderId) => {
    //   try {
    //     // const response = await axios.get(
    //     //   `${process.env.REACT_APP_BACKEND_API}/reminders/${reminderId}`
    //     // );
    //     const response = await apiService.get(`/reminders/${reminderId}`);
    //     console.log("getReminder response:", response);

    //     setReminder(response.data);
    //     return response.data;
    //   } catch (err) {
    //     console.log("getReminder err:", err);
    //   }
    // };
    // getReminder(reminderId);
    dispatch(getHabitSingleReminder(reminderId));
  }, [reminderId, dispatch]);

  // console.log("time, startDate, onWeekdays, status:");
  // console.log(time, startDate, onWeekdays, status);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <div>
            <Typography variant="h4">Reminder detail</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={8}>
                <Card>
                  {/* <CardHeader title="Habit detail" /> */}
                  <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: 2 }}>
                      <Stack>
                        <Grid spacing={3}>
                          <Grid sx={{ my: 2 }}>
                            <TextField
                              fullWidth
                              label="On weekdays"
                              name="onWeekdays"
                              required
                              value={getWeekdays(onWeekdays)}
                            />
                          </Grid>
                          <Grid sx={{ my: 2 }}>
                            <TextField
                              fullWidth
                              label="Start date"
                              name="startDate"
                              required
                              value={new Date(startDate).toDateString()}
                            />
                          </Grid>
                          <Grid sx={{ my: 2 }}>
                            <TextField
                              fullWidth
                              label="At time"
                              name="time"
                              required
                              value={dayjs(time).format("LT")}
                            />
                          </Grid>
                          <Grid sx={{ my: 2 }}>
                            <TextField
                              fullWidth
                              label="Status"
                              name="status"
                              required
                              value={status}
                            />
                          </Grid>
                        </Grid>
                      </Stack>
                    </Box>
                  </CardContent>

                  <Divider />
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Tooltip title="Click to edit reminder" arrow>
                      <Button
                        variant="contained"
                        onClick={() => setIsReminderEdit(true)}
                      >
                        Edit reminder
                      </Button>
                    </Tooltip>
                    <Tooltip title="Click to delete reminder" arrow>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setIsReminderDelete(true)}
                      >
                        Delete
                      </Button>
                    </Tooltip>

                    <Tooltip title="Click to back to the previous page" arrow>
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </Button>
                    </Tooltip>

                    {isReminderEdit && (
                      <EditReminderForm
                        isReminderEdit={isReminderEdit}
                        setIsReminderEdit={setIsReminderEdit}
                        reminderId={reminderId}
                        handleReminderEdit={handleReminderEdit}
                      />
                    )}

                    {isReminderDelete && (
                      <DeleteReminderConfirm
                        setIsReminderDelete={setIsReminderDelete}
                        habitId={habitId}
                        reminderId={reminderId}
                      />
                    )}
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  );
}

export default ReminderDetailPage;
