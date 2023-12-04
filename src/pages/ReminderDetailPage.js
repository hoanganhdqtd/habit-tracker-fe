// import axios from "axios";
import apiService from "../app/apiService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const weekdaysByIndex = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const getWeekdays = (weekdays) => {
  if (weekdays) {
    return weekdays
      .sort((a, b) => a - b)
      .map((weekday) => weekdaysByIndex[weekday])
      .join(", ");
  }
  return "No weekdays";
};

function ReminderDetailPage() {
  const [reminder, setReminder] = useState({});
  const [isEditReminder, setIsEditReminder] = useState(false);
  const [isDeleteReminder, setIsDeleteReminder] = useState(false);

  const { reminderId } = useParams();
  console.log("reminderId:", reminderId);

  useEffect(() => {
    const getReminder = async () => {
      try {
        // const response = await axios.get(
        //   `${process.env.REACT_APP_BACKEND_API}/reminders/${reminderId}`
        // );
        const response = await apiService.get(`/reminders/${reminderId}`);
        console.log("getReminder response:", response);

        setReminder(response.data);
        return response.data;
      } catch (err) {
        console.log("getReminder err:", err);
      }
    };
    getReminder();
  }, [reminderId]);

  // console.log("reminderFrequency, time, startDate, onWeekdays, status:");
  // console.log(reminderFrequency, time, startDate, onWeekdays, status);

  return (
    <div>
      Reminder detail
      <div>On: {getWeekdays(reminder.onWeekdays)}</div>
      <div>At: {reminder.time}</div>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}

export default ReminderDetailPage;
