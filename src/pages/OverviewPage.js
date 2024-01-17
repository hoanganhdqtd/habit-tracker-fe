import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHabits } from "../features/habit/habitSlice";

// import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
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
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

// import { SearchBox } from "../components/SearchBox";

function OverviewPage() {
  const smScreenUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { search, page, date, habitsById, currentPageHabits } = useSelector(
    (state) => state.habit
  );

  const newDate = dayjs()
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .set("millisecond", 0);
  const [dateValue, setDateValue] = useState(date ? dayjs(date) : newDate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          {currentPageHabits.length ? (
            <Grid
              container
              // direction={smScreenUp ? "row" : "column"}
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Card>
                <CardHeader title={`Habits' status overview by date`} />
                <CardContent>
                  <PieChart
                    series={[
                      {
                        arcLabel: (item) => `${item.value}`,
                        arcLabelMinAngle: 45,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                        data: [
                          {
                            id: 0,
                            value: completedCount,
                            label: smScreenUp
                              ? `Number of \ncompleted habits \non the date`
                              : "",

                            color: "rgb(54, 162, 235)",
                          },
                          {
                            id: 1,
                            value: incompleteCount,
                            label: smScreenUp
                              ? `Number of \nincomplete habits \non the date`
                              : "",
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
                    width={smScreenUp ? 500 : 250}
                    height={200}
                  />
                </CardContent>
                {!smScreenUp && (
                  <Stack direction="column" spacing={2} sx={{ ml: 4, mb: 4 }}>
                    <Stack direction="row" spacing={1}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: "rgb(54, 162, 235)",
                          // display: "inline-block",
                        }}
                      />
                      <Typography>
                        Number of completed habits on the date
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: "rgb(255, 99, 132)",
                        }}
                      />
                      <Typography>
                        Number of completed habits on the date
                      </Typography>
                    </Stack>
                  </Stack>
                )}
                <Divider />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Tooltip title="Back to the previous page" arrow>
                    <Button
                      color="success"
                      variant="outlined"
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ) : (
            <Box
              mt={2}
              sx={{
                flex: "1 1 auto",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">
                {!date ? "No habit found." : "There's no habit on this day."}
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default OverviewPage;
