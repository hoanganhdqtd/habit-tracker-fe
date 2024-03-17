import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function FTimePicker({ timeValue, setTimeValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Pick time"
        value={dayjs(timeValue)}
        onChange={(newTimeValue) => {
          setTimeValue(newTimeValue);
        }}
      />
    </LocalizationProvider>
  );
}
