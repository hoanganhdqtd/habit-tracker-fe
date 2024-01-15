import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getHabitById,
  editHabit,
  deleteHabit,
  getSingleHabitProgressList,
} from "../features/habit/habitSlice";

import AddReminderForm from "../components/AddReminderForm";
import EditHabitForm from "../components/EditHabitForm";
import DeleteHabitConfirm from "../components/DeleteHabitConfirm";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import CreateTagForm from "../components/CreateTagForm";
// import AddTagForm from "../components/AddTagForm";

const weekdaysByIndex = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getWeekdays = (weekdays) =>
  weekdays.map((weekday) => weekdaysByIndex[weekday]).join(", ");

function HabitDetailPage() {
  const [isAddNewReminder, setIsAddNewReminder] = useState(false);
  const [addNewTag, setAddNewTag] = useState(false);
  const [isHabitEdit, setIsHabitEdit] = useState(false);
  const [isHabitDelete, setIsHabitDelete] = useState(false);
  const { habitId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getHabitById(habitId));
    dispatch(getSingleHabitProgressList(habitId));
    // dispatch(getTagsByHabitId(habitId));
  }, [habitId, dispatch]);

  const { habitDetail } = useSelector((state) => state.habit);

  const {
    name,
    description,
    goal,
    startDate,
    duration,
    onWeekdays,
    reminders,
    tags,
  } = habitDetail;

  console.log("onWeekdays:", onWeekdays);
  console.log("tags:", tags);

  const handleHabitEdit = async ({
    habitId,
    name,
    description,
    goal,

    startDate,
    duration,
    onWeekdays,
  }) => {
    console.log("handleHabitEdit:");
    console.log(
      "habitId, name, description, goal, startDate, duration, onWeekdays:",
      habitId,
      name,
      description,
      goal,
      startDate,
      duration,
      onWeekdays
    );
    setIsHabitEdit(false);
    dispatch(
      editHabit({
        habitId,
        name,
        description,
        goal,
        startDate,
        duration,
        onWeekdays,
      })
    );
  };

  const handleHabitDelete = async (habitId) => {
    setIsHabitDelete(false);
    dispatch(deleteHabit({ habitId }));
    navigate("/", { replace: true });
  };

  // const newDate = dayjs()
  //   .set("hour", 0)
  //   .set("minute", 0)
  //   .set("second", 0)
  //   .set("millisecond", 0);
  // const [dateValue, setDateValue] = useState(newDate);

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
            <Typography variant="h4">Habit detail</Typography>
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
                {/* <Typography variant="h4">{name} detail</Typography> */}
                <CardHeader title={`${name}`} detail sx={{ pb: 0 }} />
                <CardContent sx={{ py: 0, px: 2 }}>
                  <Box sx={{ m: 2 }}>
                    <Stack>
                      <Grid spacing={3}>
                        <Grid sx={{ my: 2 }}>
                          <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            required
                            value={name || "Name"}
                          />
                        </Grid>

                        <Grid sx={{ my: 2 }}>
                          <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={description || "No description"}
                          />
                        </Grid>

                        <Grid sx={{ my: 2 }}>
                          <TextField
                            fullWidth
                            label="Goal"
                            name="goal"
                            required
                            value={goal || "Goal"}
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
                            label="Duration"
                            name="duration"
                            required
                            value={duration || "Duration"}
                          />
                        </Grid>

                        <Grid sx={{ my: 2 }}>
                          <TextField
                            fullWidth
                            label="On weekdays"
                            name="onWeekdays"
                            required
                            value={
                              onWeekdays.length
                                ? getWeekdays(onWeekdays)
                                : "No weekdays"
                            }
                          />
                        </Grid>

                        <Grid sx={{ my: 2 }}>
                          <Typography
                            variant="inherit"
                            sx={{ fontWeight: "bold" }}
                          >
                            Reminders:{" "}
                          </Typography>
                          <Stack direction="row" spacing={2}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                              }}
                            >
                              {!reminders.length ? (
                                <Typography>No reminder</Typography>
                              ) : (
                                reminders.map((reminder) => (
                                  <Tooltip
                                    title="Click to view the reminder's detail"
                                    arrow
                                    key={reminder._id}
                                  >
                                    <Button
                                      variant="contained"
                                      key={reminder._id}
                                      size="small"
                                      sx={{
                                        mr: 1,
                                        mt: 1,
                                        backgroundColor: "#03a9f4",
                                        "&:hover": {
                                          backgroundColor: "#0288d1",
                                        },
                                      }}
                                      onClick={() =>
                                        navigate(
                                          `/habit/${habitId}/reminder/${reminder._id}`
                                        )
                                      }
                                    >
                                      {dayjs(reminder.time).format("LT")}
                                    </Button>
                                  </Tooltip>
                                ))
                              )}
                            </Box>
                          </Stack>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",

                              // justifyContent: "flex-end",

                              mt: 1,
                            }}
                          >
                            <Tooltip title="Click to add a new reminder" arrow>
                              {" "}
                              <Button
                                variant="contained"
                                onClick={() => setIsAddNewReminder(true)}
                              >
                                Add new reminder
                              </Button>
                            </Tooltip>
                          </Box>
                        </Grid>

                        <Grid sx={{ my: 2 }}>
                          <Typography
                            variant="inherit"
                            sx={{ fontWeight: "bold" }}
                          >
                            Tags:{" "}
                          </Typography>
                          <Stack direction="row" spacing={2}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                              }}
                            >
                              {!tags?.length ? (
                                <Typography>No tag</Typography>
                              ) : (
                                tags?.map((tag) => (
                                  <Tooltip
                                    key={tag._id}
                                    title="Click to find by tag"
                                    arrow
                                  >
                                    <Button
                                      variant="contained"
                                      color="success"
                                      key={tag._id}
                                      size="small"
                                      sx={{
                                        mr: 1,
                                        mt: 1,
                                      }}
                                      // onClick={() => {
                                      //   navigate("/", {
                                      //     state: { tagToSearch: tag.title },
                                      //   });
                                      // }}
                                    >
                                      {/* {dayjs(reminder.time).format("LT")} */}
                                      <Link
                                        to="/"
                                        style={{
                                          textDecoration: "none",
                                          color: "white",
                                        }}
                                        state={{ tagToSearch: tag.title }}
                                      >
                                        {`#${tag.title}`}
                                      </Link>
                                    </Button>
                                  </Tooltip>
                                ))
                              )}
                            </Box>
                          </Stack>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",

                              // justifyContent: "flex-end",

                              mt: 1,
                            }}
                          >
                            <Tooltip
                              title="Click to add a new tag to the habit"
                              arrow
                            >
                              <Button
                                variant="contained"
                                // color="secondary"
                                onClick={() => setAddNewTag(true)}
                                sx={{
                                  backgroundColor: "#009688",
                                  "&:hover": {
                                    backgroundColor: "#00796b",
                                  },
                                }}
                              >
                                Add new tag
                              </Button>
                            </Tooltip>
                          </Box>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Box>
                </CardContent>

                <Divider />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Tooltip title="Click to edit the habit" arrow>
                    <Button
                      variant="contained"
                      color="secondary"
                      size={smScreenDown ? "small" : "medium"}
                      onClick={() => setIsHabitEdit(true)}
                    >
                      {smScreenDown ? "Edit" : "Edit habit"}
                    </Button>
                  </Tooltip>
                  <Tooltip title="Click to delete the habit" arrow>
                    <Button
                      variant="contained"
                      color="error"
                      size={smScreenDown ? "small" : "medium"}
                      onClick={() => setIsHabitDelete(true)}
                    >
                      Delete
                    </Button>
                  </Tooltip>

                  <Tooltip title="Back to the previous page" arrow>
                    <Button
                      color="success"
                      variant="outlined"
                      size={smScreenDown ? "small" : "medium"}
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </Button>
                  </Tooltip>

                  {isHabitEdit && (
                    <EditHabitForm
                      isHabitEdit={isHabitEdit}
                      setIsHabitEdit={setIsHabitEdit}
                      handleHabitEdit={handleHabitEdit}
                      habitId={habitId}
                    />
                  )}

                  {isHabitDelete && (
                    <DeleteHabitConfirm
                      habitId={habitId}
                      setIsHabitDelete={setIsHabitDelete}
                      handleHabitDelete={handleHabitDelete}
                    />
                  )}

                  {isAddNewReminder && (
                    <AddReminderForm
                      isAddNewReminder={isAddNewReminder}
                      setIsAddNewReminder={setIsAddNewReminder}
                      habitId={habitId}
                    />
                  )}

                  {addNewTag && (
                    <CreateTagForm
                      habitId={habitId}
                      createNewTag={addNewTag}
                      setCreateNewTag={setAddNewTag}
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

export default HabitDetailPage;
