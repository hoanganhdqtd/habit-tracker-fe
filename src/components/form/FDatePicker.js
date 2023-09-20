import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function FDatePicker({ dateValue, setDateValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Pick date to start"
        value={dayjs(dateValue)}
        // value={dateValue}
        onChange={(newDateValue) => {
          // setDateValue(dayjs(newDateValue));
          setDateValue(newDateValue);
        }}
      />
    </LocalizationProvider>
  );
}
