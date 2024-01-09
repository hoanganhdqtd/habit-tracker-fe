import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Typography,
  Button,
  SvgIcon,
  Box,
  Container,
  Pagination,
  Stack,
  Tooltip,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { FSelect } from "../components/form";

import HabitList from "../components/HabitList";
import { SearchBox } from "../components/SearchBox";
import AddHabitForm from "../components/AddHabitForm";
import CreateTagForm from "../components/CreateTagForm";
import TagButton from "../components/TagButton";

import { getHabits, changePage } from "../features/habit/habitSlice";
import { getTags } from "../features/tag/tagSlice";
import { getCurrentUserProfile } from "../features/user/userSlice";

const CenterPagination = styled(Pagination)(({ theme }) => ({
  ul: {
    justifyContent: "center",
    // "& .MuiPaginationItem-root": {
    //   color: "#fff",
    // },
    // // "& .MuiTouchRipple-root": {
    // //   color: "#d74742",
    // // },
    // "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
    //   backgroundColor: "#d74742",
    // },
  },
}));

function HomePage() {
  const [addNewHabit, setAddNewHabit] = useState(false);
  const [createNewTag, setCreateNewTag] = useState(false);
  // const [dateValue, setDateValue] = useState(null);
  const [sort, setSort] = useState("latest");

  const [pageNum, setPageNum] = useState(1);
  const handlePageChange = (event, value) => {
    setPageNum(value);
    dispatch(changePage(value));
  };

  const { search, page, date, totalPages } = useSelector(
    (state) => state.habit
  );
  // const { tags: habitTags } = useSelector((state) => state.habit.habitDetail);
  const { tags } = useSelector((state) => state.tag);

  // const { tagToSearch } = navigate.state;
  // const { state } = useLocation();
  // let tag;
  // if (state) {
  //   tag = state.tagToSearch;
  // }
  const [dateValue, setDateValue] = useState(date ? dayjs(date) : null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserProfile());
    if (dateValue) {
      dispatch(getHabits({ page, search, date: dateValue, sort }));
    } else {
      dispatch(getHabits({ page, search, sort }));
    }
    if (!tags.length) {
      dispatch(getTags());
    }
  }, [page, search, dateValue, tags, dispatch]);

  // clear location state
  window.history.replaceState({}, document.title);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Typography variant="h4">Habits</Typography>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Tooltip title="Create a new tag" arrow>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  // color="success"
                  sx={{
                    backgroundColor: "#009688",
                    "&:hover": {
                      backgroundColor: "#00796b",
                    },
                  }}
                  onClick={() => setCreateNewTag(true)}
                >
                  Create new tag
                </Button>
              </Tooltip>

              <Tooltip title="Create a new habit" arrow>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => setAddNewHabit(true)}
                >
                  Add Habit
                </Button>
              </Tooltip>

              {createNewTag && (
                <CreateTagForm
                  createNewTag={createNewTag}
                  setCreateNewTag={setCreateNewTag}
                />
              )}

              {addNewHabit && (
                <AddHabitForm
                  addNewHabit={addNewHabit}
                  setAddNewHabit={setAddNewHabit}
                  dateValue={dateValue}
                  tags={tags}
                />
              )}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Grid>
              <Stack direction="row" spacing={2}>
                <Grid>
                  <SearchBox />
                </Grid>
                <Grid>
                  <FSelect sort={sort} setSort={setSort} />
                </Grid>
              </Stack>
            </Grid>

            <Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Pick date"
                  value={dateValue}
                  onChange={
                    (newDateValue) => {
                      console.log("newDateValue:", newDateValue);
                      setDateValue(
                        dayjs(newDateValue)
                          .set("hour", 0)
                          .set("minute", 0)
                          .set("second", 0)
                      );
                    }
                    // setDateValue(
                    //   dayjs(newDateValue)
                    //     .set("hour", 0)
                    //     .set("minute", 0)
                    //     .set("second", 0)
                    // )
                  }
                />
              </LocalizationProvider>
            </Grid>
          </Stack>

          {tags.length !== 0 && (
            <Stack direction="row" spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {/* {tags.map((tag) => (
                  <Button
                    variant="contained"
                    color="success"
                    key={tag._id}
                    size="small"
                    sx={{ mr: 1, mt: 1 }}
                    // onClick={() =>
                    //   navigate(`/habit/${habitId}/reminder/${reminder._id}`)
                    // }
                    onClick={() => {
                      dispatch(getHabits({ tag: tag.title }));
                    }}
                  >
                    {`#${tag.title}`}
                  </Button>
                ))} */}
                {tags.map((tag) => (
                  <TagButton
                    key={tag._id}
                    tagId={tag._id}
                    title={tag.title}
                    date={dateValue}
                  />
                ))}
              </Box>
            </Stack>
          )}
          <HabitList date={dateValue} />
          {totalPages ? (
            <CenterPagination
              sx={{
                marginTop: "15px",
                // "Button.MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
                //   backgroundColor: "#d74742",
                // },
              }}
              count={totalPages}
              color="primary"
              page={pageNum}
              onChange={handlePageChange}
            />
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}

export default HomePage;
