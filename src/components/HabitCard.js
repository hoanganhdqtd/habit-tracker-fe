import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";

import {
  Avatar,
  Paper,
  Stack,
  Button,
  Typography,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { ThumbUp, SentimentVeryDissatisfied } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BarChartIcon from "@mui/icons-material/BarChart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

// import { red } from "@mui/material/colors";
import dayjs from "dayjs";

import { useForm } from "react-hook-form";
import { FSwitch, FormProvider } from "./form";
import { deleteHabit, editHabit } from "../features/habit/habitSlice";

// import { getSingleHabitProgressList } from "../features/progress/progressSlice";

import DeleteHabitConfirm from "./DeleteHabitConfirm";
import EditHabitForm from "./EditHabitForm";

const options = ["Statistics", "Edit", "Delete"];

const ITEM_HEIGHT = 48;

function HabitCard({ habit, isInCalendarPage, date }) {
  const smScreenUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // maxWidth: isInCalendarPage ? 600 : 500,
    maxWidth: 600,
  }));

  const [isHabitEdit, setIsHabitEdit] = useState(false);
  const [isHabitDelete, setIsHabitDelete] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { avatarUrl } = currentUser;

  // const { progress } = useSelector((state) => state.progress);
  // const { status } = progress;

  const { habitsById } = useSelector((state) => state.habit);

  const { progressList } = habitsById[habit._id];

  // find progress with {date, habit._id}
  const progressToFind = progressList.find(
    (progress) =>
      dayjs(progress.date).isSame(date) && progress.habit === habit._id
  );

  // console.log("progressToFind:", progressToFind);
  // let status;
  // if (progressToFind) {
  //   status = progressToFind.status;
  // }
  const status = progressToFind?.status;

  // const { status } = progressToFind;

  const isCompleted = status === "completed" ? true : false;

  const defaultValues = { isCompleted };
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log("Fswitch onSubmit data:", data);
    const { completed } = data;

    console.log("completed:", completed);
  };

  const handleHabitDelete = async (habitId) => {
    setIsHabitDelete(false);
    dispatch(deleteHabit({ habitId }));
  };

  const handleHabitEdit = async ({
    habitId,
    name,
    goal,
    startDate,
    duration,
    onWeekdays,
  }) => {
    // console.log(
    //   "habitId, name, goal, startDate, duration, onWeekdays:",
    //   habitId,
    //   name,
    //   goal,
    //   startDate,
    //   duration,
    //   onWeekdays
    // );
    setIsHabitEdit(false);
    dispatch(
      editHabit({ habitId, name, goal, startDate, duration, onWeekdays })
    );
  };

  // const switchLabel = useMediaQuery(theme.breakpoints.up("sm"))
  //   ? "Completed"
  //   : "";

  const switchLabel = useMediaQuery((theme) => theme.breakpoints.up("md"))
    ? isCompleted
      ? "Completed"
      : "Incomplete"
    : "";

  const LongMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={() => {
                if (option === "Statistics") {
                  navigate(`/statistics/${habit._id}`);
                } else if (option === "Edit") {
                  setIsHabitEdit(true);
                } else {
                  setIsHabitDelete(true);
                }
              }}
            >
              <Stack direction="row" spacing={1}>
                {option === "Statistics" ? (
                  <BarChartIcon />
                ) : option === "Edit" ? (
                  <EditIcon />
                ) : (
                  <DeleteIcon />
                )}
                <Typography variant="inherit">{option}</Typography>
              </Stack>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  return (
    <Item
      // key={habit._id}
      sx={{
        my: 1,
        mx: "auto",
        px: smScreenUp ? 2 : 0.5,
        py: 2,
        cursor: "pointer",
      }}
    >
      <Stack
        spacing={1}
        sx={{ justifyContent: "space-between" }}
        direction="row"
        alignItems="center"
      >
        <Stack direction="row" spacing={smScreenUp ? 2 : 1} alignItems="center">
          <Tooltip title="Click on the avatar to view the user's profile" arrow>
            <Avatar src={avatarUrl} onClick={() => navigate("/account")} />
          </Tooltip>

          <Tooltip
            title={
              !smScreenUp
                ? `${habit.name} - Click on the habit's name to view the habit's detail`
                : "Click on the habit's name to view the habit's detail"
            }
            arrow
          >
            <Typography
              noWrap
              onClick={() => {
                navigate(`/habit/${habit._id}`);
              }}
              sx={{
                width: smScreenUp ? "inherit" : "50px",
              }}
            >
              {habit.name}
            </Typography>
          </Tooltip>
        </Stack>
        {isInCalendarPage && (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FSwitch
              name="isCompleted"
              // label="Completed"
              label={switchLabel}
              habitId={habit._id}
              value={isCompleted}
              date={date}
            />
          </FormProvider>
        )}

        {isInCalendarPage && isCompleted && (
          <Tooltip title="Good job! You completed the task." arrow>
            <ThumbUp color="success" />
          </Tooltip>
        )}

        {isInCalendarPage && !isCompleted && dayjs().isAfter(date, "day") && (
          <Tooltip title="You missed it. Please try your best." arrow>
            <SentimentVeryDissatisfied color="error" />
          </Tooltip>
        )}

        {smScreenUp ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip
              title="Click to view the habit's count of being completed"
              arrow
            >
              <Button
                variant="contained"
                onClick={() => {
                  navigate(`/statistics/${habit._id}`);
                }}
                sx={{
                  backgroundColor: "#00bcd4",
                  "&:hover": {
                    backgroundColor: "#0097a7",
                  },
                }}
              >
                Statistics
              </Button>
            </Tooltip>
            {!isInCalendarPage && (
              <Tooltip title="Click to edit the habit" arrow>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setIsHabitEdit(true);
                  }}
                >
                  Edit
                </Button>
              </Tooltip>
            )}
            {!isInCalendarPage && (
              <Tooltip title="Click to delete the habit" arrow>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setIsHabitDelete(true)}
                >
                  Delete
                </Button>
              </Tooltip>
            )}
            {isHabitEdit && (
              <EditHabitForm
                isHabitEdit={isHabitEdit}
                setIsHabitEdit={setIsHabitEdit}
                handleHabitEdit={handleHabitEdit}
                habitId={habit._id}
              />
            )}
            {isHabitDelete && (
              <DeleteHabitConfirm
                handleHabitDelete={handleHabitDelete}
                setIsHabitDelete={setIsHabitDelete}
                habitId={habit._id}
              />
            )}
          </Stack>
        ) : (
          <LongMenu />
        )}
      </Stack>
    </Item>
  );
}

export default HabitCard;
