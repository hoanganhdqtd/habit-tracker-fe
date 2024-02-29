import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  Stack,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import { getSingleHabitProgressList } from "../features/habit/habitSlice";

function StatisticsPage() {
  const smScreenUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { habitId } = useParams();
  const { isLoading } = useSelector((state) => state.habit);
  const { name, progressList, startDate, onWeekdays } = useSelector(
    (state) => state.habit.habitDetail
  );
  const completedCount = progressList.filter(
    (progress) => progress.status === "completed"
  ).length;

  // const incompleteCount = progressList.length - completedCount;

  // const lastWeekStatuses = progressList.slice(-7);

  useEffect(() => {
    dispatch(getSingleHabitProgressList(habitId));
  }, [dispatch, habitId]);

  const countWeekdaysBetween = (startDate, endDate, onWeekdays) => {
    let count = 0;
    const currentDate = new Date(startDate.getTime());
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (onWeekdays.includes(dayOfWeek)) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
  };

  const numberOfWeekdaysBetween = countWeekdaysBetween(
    new Date(startDate),
    new Date().setHours(0, 0, 0, 0),
    onWeekdays
  );
  const incompleteCount = numberOfWeekdaysBetween - completedCount;

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        // py: 8,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Typography
            variant="h4"
            sx={{ mb: 3 }}
          >{`${name} status statistics`}</Typography>

          <Grid
            container
            // direction={smScreenUp ? "row" : "column"}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Card sx={{ backgroundColor: "#f5f5f5" }}>
              <CardHeader title={`${name} status pie chart`} />
              <CardContent>
                <PieChart
                  series={[
                    {
                      // arcLabel: (item) => `${item.label} (${item.value})`,
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
                          label: smScreenUp
                            ? `Number of days\non which the habit\nis completed`
                            : "",
                          color: "rgb(54, 162, 235)",
                        },
                        {
                          id: 1,
                          value: incompleteCount,
                          label: smScreenUp
                            ? `Number of days\non which the habit\nis not completed`
                            : "",
                          color: "rgb(255, 99, 132)",
                        },
                        // { id: 0, value: 10, label: "series A" },
                        // { id: 1, value: 15, label: "series B" },
                        // { id: 2, value: 20, label: "series C" },
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
                      Number of days on which the habit is completed
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
                      Number of days on which the habit is not completed
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
        </Stack>
      </Container>
    </Box>
  );
}

export default StatisticsPage;
