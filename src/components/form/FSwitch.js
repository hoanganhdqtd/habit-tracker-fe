import { useFormContext, Controller } from "react-hook-form";
import { Switch, FormControlLabel } from "@mui/material";

function FSwitch({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            console.log("FSwitch field:", field);
            return <Switch {...field} checked={field.value} />;
          }}
        />
      }
      {...other}
    />
  );
}

export default FSwitch;
