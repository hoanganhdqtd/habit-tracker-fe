import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHabits } from "../features/habit/habitSlice";

import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

import { SearchBox } from "../components/SearchBox";

function OverviewPage() {
  const newDate = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const [dateValue, setDateValue] = useState(newDate);

  const dispatch = useDispatch();
  const { search, page, totalPages } = useSelector((state) => state.habit);
  useEffect(() => {
    dispatch(getHabits({ page, search, date: dateValue }));
  }, [dispatch, page, search, dateValue]);
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
            <Typography variant="h4">Overview</Typography>
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
        </Stack>
      </Container>
    </Box>
  );
}

export default OverviewPage;
