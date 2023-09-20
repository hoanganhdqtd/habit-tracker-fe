import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";

import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useDispatch, useSelector } from "react-redux";
import { getHabits, changePage } from "../features/habit/habitSlice";
import { getTags } from "../features/tag/tagSlice";

import HabitList from "../components/HabitList";
import { SearchBox } from "../components/SearchBox";
import AddHabitForm from "../components/AddHabitForm";

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
  const [dateValue, setDateValue] = useState(null);
  console.log("addNewHabit:", addNewHabit);
  console.log("dateValue:", dateValue);

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
    // dispatch(getTags());
  }, [page, search, dateValue, dispatch]);

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  return (
    <div>
      <h1>Homepage</h1>
      <SearchBox />
      <button type="button" onClick={() => setAddNewHabit(true)}>
        Add habit
      </button>
      {addNewHabit && (
        <AddHabitForm
          addNewHabit={addNewHabit}
          setAddNewHabit={setAddNewHabit}
          tags={tags}
        />
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Pick date"
          value={dateValue}
          onChange={(newDateValue) => setDateValue(newDateValue)}
        />
      </LocalizationProvider>
      <HabitList />
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
    </div>
  );
}

export default HomePage;
