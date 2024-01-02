import { useFormContext, Controller } from "react-hook-form";
import { Switch, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateSingleProgress } from "../../features/progress/progressSlice";

function FSwitch({ name, habitId, date, ...other }) {
  const { control } = useFormContext();
  const dispatch = useDispatch();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <Switch
                {...field}
                checked={field.value}
                onChange={(e) => {
                  field.onChange(!field.value);
                  const status = !field.value ? "completed" : "incomplete";
                  dispatch(updateSingleProgress({ habitId, date, status }));
                }}
              />
            );
          }}
        />
      }
      {...other}
    />
  );
}

export default FSwitch;
