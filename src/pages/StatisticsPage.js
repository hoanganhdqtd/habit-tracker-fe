import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import Typography from "@mui/material/Typography";
import { getSingleHabitProgressList } from "../features/habit/habitSlice";
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
  Tooltip,
} from "@mui/material";

function StatisticsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { habitId } = useParams();
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

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Typography
            variant="h4"
            sx={{ mb: 3 }}
          >{`${name} status statistics`}</Typography>

          <Card>
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
                        label: `Number of days\non which the habit\nis completed`,
                        color: "rgb(54, 162, 235)",
                      },
                      {
                        id: 1,
                        value: incompleteCount,
                        label: `Number of days\non which the habit\nis incomplete`,
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
                width={500}
                height={200}
              />
            </CardContent>
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
        </Stack>
      </Container>
    </Box>
  );
}

export default StatisticsPage;
