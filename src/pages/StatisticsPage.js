import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { PieChart } from "@mui/x-charts/PieChart";
import { getHabits } from "../features/habit/habitSlice";

function StatisticsPage() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getSingleHabitProgressList(habitId))
  // }, dispatch);
  // return (
  //   <PieChart
  //     series={[
  //       {
  //         data: [
  //           { id: 0, value: 10, label: "series A" },
  //           { id: 1, value: 15, label: "series B" },
  //           { id: 2, value: 20, label: "series C" },
  //         ],
  //       },
  //     ]}
  //     width={400}
  //     height={200}
  //   />
  // );

  return <div>Statistics Page</div>;
}

export default StatisticsPage;
