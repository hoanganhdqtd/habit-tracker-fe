// import axios from "axios";
import dayjs from "dayjs";

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
  useMediaQuery,
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
    // console.log("handleReminderEdit:");
    // console.log(
    //   `reminderId: ${reminderId}`,
    //   // reminderFrequency,
    //   `time: ${time}`,
    //   `onWeekdays: ${onWeekdays}`,
    //   `startDate: ${startDate}`,
    //   `status: ${status}`
    // );
    setIsReminderEdit(false);

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
    dispatch(getHabitSingleReminder(reminderId));
  }, [reminderId, dispatch]);

  const smScreenDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4}>
          <div>
            <Typography variant="h4">Reminder detail</Typography>
          </div>
          <Grid
            // container
            spacing={3}
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <Grid xs={12} md={6} lg={8}>
              <Card>
                {/* <CardHeader title="Habit detail" /> */}
                {/* <CardContent sx={{ pt: 0 }}> */}
                <CardContent sx={{ py: 0, px: 1 }}>
                  <Box sx={{ m: 2 }}>
                    <Stack>
                      <Grid spacing={3}>
                        <Grid sx={{ my: 4 }}>
                          <TextField
                            fullWidth
                            label="On weekdays"
                            name="onWeekdays"
                            required
                            value={getWeekdays(onWeekdays)}
                          />
                        </Grid>
                        <Grid sx={{ my: 4 }}>
                          <TextField
                            fullWidth
                            label="Start date"
                            name="startDate"
                            required
                            value={new Date(startDate).toDateString()}
                          />
                        </Grid>
                        <Grid sx={{ my: 4 }}>
                          <TextField
                            fullWidth
                            label="At time"
                            name="time"
                            required
                            value={dayjs(time).format("LT")}
                          />
                        </Grid>
                        <Grid sx={{ my: 4 }}>
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
                      color="secondary"
                      size={smScreenDown ? "small" : "medium"}
                      onClick={() => setIsReminderEdit(true)}
                    >
                      {smScreenDown ? "Edit" : "Edit reminder"}
                    </Button>
                  </Tooltip>
                  <Tooltip title="Click to delete reminder" arrow>
                    <Button
                      variant="contained"
                      color="error"
                      size={smScreenDown ? "small" : "medium"}
                      onClick={() => setIsReminderDelete(true)}
                    >
                      Delete
                    </Button>
                  </Tooltip>

                  <Tooltip title="Click to back to the previous page" arrow>
                    <Button
                      color="success"
                      variant="outlined"
                      // variant="contained"
                      size={smScreenDown ? "small" : "medium"}
                      onClick={() => navigate(-1)}
                    >
                      Back
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
        </Stack>
      </Container>
    </Box>
  );
}

export default ReminderDetailPage;
