import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHabits } from "../features/habit/habitSlice";

// import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

// import { SearchBox } from "../components/SearchBox";

function OverviewPage() {
  const { search, page, totalPages, date, habitsById, currentPageHabits } =
    useSelector((state) => state.habit);

  const newDate = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const [dateValue, setDateValue] = useState(date ? dayjs(date) : newDate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHabits({ page, search, date: dateValue }));
  }, [dispatch, page, search, dateValue]);

  let completedCount = 0;
  let incompleteCount = 0;
  currentPageHabits.forEach((habitId) => {
    const habitProgress = habitsById[habitId].progressList.find((progress) =>
      dayjs(progress.date).isSame(dateValue)
    );
    if (habitProgress?.status === "completed") {
      completedCount += 1;
    } else {
      incompleteCount += 1;
    }
  });

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
            {/* <SearchBox /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Pick date to view progress"
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
          <Card>
            <CardHeader title={`Habits' status overview by date`} />
            <CardContent>
              <PieChart
                series={[
                  {
                    arcLabel: (item) => `${item.value}`,
                    arcLabelMinAngle: 45,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                    data: [
                      {
                        id: 0,
                        value: completedCount,
                        label: `Number of \ncompleted habits \non the date`,
                        color: "rgb(54, 162, 235)",
                      },
                      {
                        id: 1,
                        value: incompleteCount,
                        label: `Number of \nincomplete habits \non the date`,
                        color: "rgb(255, 99, 132)",
                      },
                    ],
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "white",
                    fontWeight: "bold",
                  },
                }}
                width={500}
                height={200}
              />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}

export default OverviewPage;
