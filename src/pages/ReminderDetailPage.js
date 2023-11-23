import React from "react";
import { useParams } from "react-router-dom";

function ReminderDetailPage() {
  const { reminderId } = useParams();
  console.log("reminderId:", reminderId);
  return <div>ReminderDetailPage</div>;
}

export default ReminderDetailPage;
