import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getHabitById } from "../features/habit/habitSlice";

function HabitDetailPage() {
  const { habitId } = useParams();
  const dispatch = useDispatch();

  // const { name, goal, startDate, duration } = useSelector(
  //   (state) => state.habit.habit
  // );

  const { habit, habitDetail } = useSelector((state) => state.habit);
  // const { name, goal, startDate, duration } = habit;

  useEffect(() => {
    dispatch(getHabitById(habitId));
  }, [habitId, dispatch]);

  return (
    <div>
      Habit Detail
      {/* <div>Name: {habit.name}</div>
      <div>Goal: {habit.goal}</div>
      <div>Start date: {habit.startDate}</div>
      <div>Duration: {habit.duration}</div> */}
      {/* <div>Name: {name}</div>
      <div>Goal: {goal}</div>
      <div>Start date: {startDate}</div>
      <div>Duration: {duration}</div> */}
      <div>Name: {habitDetail.name}</div>
      <div>Goal: {habitDetail.goal}</div>
      <div>Start date: {habitDetail.startDate}</div>
      <div>Time: {habitDetail.time}</div>
      <div>Duration: {habitDetail.duration}</div>
      <div>
        <button>Edit</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}

export default HabitDetailPage;
