import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getHabitById, editHabit } from "../features/habit/habitSlice";

import AddReminderForm from "../components/AddReminderForm";
import EditHabitForm from "../components/EditHabitForm";

const weekdaysByIndex = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const getWeekdays = (weekdays) =>
  weekdays.map((weekday) => weekdaysByIndex[weekday]).join(", ");

function HabitDetailPage() {
  const [isAddNewReminder, setIsAddNewReminder] = useState(false);
  const [isHabitEdit, setIsHabitEdit] = useState(false);
  const { habitId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getHabitById(habitId));
  }, [habitId, dispatch]);

  console.log("habitDetail habitId:", habitId);

  const { habitDetail } = useSelector((state) => state.habit);
  console.log("habitDetail:", habitDetail);
  console.log("habitDetail reminders:", habitDetail.reminders);
  const { name, goal, startDate, duration, onWeekdays, reminders } =
    habitDetail;

  const handleHabitEdit = async ({
    habitId,
    name,
    goal,
    startDate,
    duration,
    onWeekdays,
  }) => {
    console.log("handleHabitEdit:");
    console.log(
      "habitId, name, goal, startDate, duration, onWeekdays:",
      habitId,
      name,
      goal,
      startDate,
      duration,
      onWeekdays
    );
    setIsHabitEdit(false);
    dispatch(
      editHabit({ habitId, name, goal, startDate, duration, onWeekdays })
    );
  };

  return (
    <div>
      Habit Detail
      <div>Name: {name}</div>
      <div>Goal: {goal}</div>
      <div>Start date: {new Date(startDate).toDateString()}</div>
      <div>Duration: {duration}</div>
      <div>On weekdays: {getWeekdays(onWeekdays)}</div>
      {/* <div>Name: </div>
      <div>Goal: </div>
      <div>Start date: </div>
      <div>Duration: </div>
      <div>On weekdays: </div> */}
      <div>
        Reminders:{" "}
        {reminders.map((reminder) => (
          <button
            onClick={() =>
              navigate(`/habit/${habitId}/reminder/${reminder._id}`)
            }
          >
            {reminder.time}
          </button>
        ))}
      </div>
      <div>
        <button onClick={() => setIsHabitEdit(true)}>Edit</button>
        {isHabitEdit && (
          <EditHabitForm
            isHabitEdit={isHabitEdit}
            setIsHabitEdit={setIsHabitEdit}
            habitId={habitId}
            handleHabitEdit={handleHabitEdit}
          />
        )}
        <button onClick={() => setIsAddNewReminder(true)}>Add reminders</button>
        {isAddNewReminder && (
          <AddReminderForm
            isAddNewReminder={isAddNewReminder}
            setIsAddNewReminder={setIsAddNewReminder}
            habitId={habitId}
          />
        )}
        <button onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  );
}

export default HabitDetailPage;
