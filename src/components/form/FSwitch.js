import { useFormContext, Controller } from "react-hook-form";
import { Switch, FormControlLabel } from "@mui/material";
import { boolean } from "yup";

function FSwitch({ name, ...other }) {
  const { control } = useFormContext();

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
                  console.log("field.value:", !field.value);
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
