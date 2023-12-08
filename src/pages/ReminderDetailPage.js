// import axios from "axios";
import apiService from "../app/apiService";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EditReminderForm from "../components/EditReminderForm";
import { useDispatch } from "react-redux";
import DeleteReminderConfirm from "../components/DeleteReminderConfirm";

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
  const [isReminderEdit, setIsReminderEdit] = useState(false);
  const [isReminderDelete, setIsReminderDelete] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { reminderId, habitId } = useParams();
  console.log("reminderId:", reminderId);
  console.log("habitId:", habitId);

  const handleReminderEdit = async () => {};

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
      <button onClick={() => setIsReminderEdit(true)}>Edit</button>
      <button onClick={() => setIsReminderDelete(true)}>Delete</button>
      {isReminderEdit && (
        <EditReminderForm
          isReminderEdit={isReminderEdit}
          setIsReminderEdit={setIsReminderEdit}
          reminderId={reminderId}
          handleReminderEdit={handleReminderEdit}
        />
      )}
      {isReminderDelete && (
        <DeleteReminderConfirm
          setIsReminderDelete={setIsReminderDelete}
          habitId={habitId}
          reminderId={reminderId}
        />
      )}
    </div>
  );
}

export default ReminderDetailPage;
