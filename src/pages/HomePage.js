import React, { useEffect, useState } from "react";
import { Typography, Button, SvgIcon, Box, Container } from "@mui/material";

import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";
import { getHabits, changePage } from "../features/habit/habitSlice";
import { getTags } from "../features/tag/tagSlice";

import HabitList from "../components/HabitList";
import { SearchBox } from "../components/SearchBox";
import AddHabitForm from "../components/AddHabitForm";
import CreateTagForm from "../components/CreateTagForm";

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
  const [dateValue, setDateValue] = useState(null);

  const [pageNum, setPageNum] = useState(1);
  const handlePageChange = (event, value) => {
    setPageNum(value);
    dispatch(changePage(value));
  };

  const { search, page, totalPages } = useSelector((state) => state.habit);
  const { tags } = useSelector((state) => state.tag);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHabits({ page, search, date: dateValue }));
    dispatch(getTags());
  }, [page, search, dateValue, dispatch]);

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

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
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                color="secondary"
                onClick={() => setCreateNewTag(true)}
              >
                Create new tag
              </Button>

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

          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <SearchBox />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Pick date"
                value={dateValue}
                onChange={(newDateValue) =>
                  setDateValue(
                    dayjs(newDateValue)
                      .set("hour", 0)
                      .set("minute", 0)
                      .set("second", 0)
                  )
                }
              />
            </LocalizationProvider>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {!tags.length ? (
                <Typography>No tag</Typography>
              ) : (
                tags.map((tag) => (
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
                ))
              )}
            </Box>
          </Stack>

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
