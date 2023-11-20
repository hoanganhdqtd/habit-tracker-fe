import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FTextField({ name, required, ...other }) {
  const { control, register } = useFormContext();

  return (
    <Controller
      {...register(name, {
        required: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      })}
      required={required}
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}

export default FTextField;
