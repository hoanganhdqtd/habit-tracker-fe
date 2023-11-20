import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

function FMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext();

  const weekdaysIndex = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) => {
          return field.value.includes(weekdaysIndex[option])
            ? field.value.filter((value) => value !== weekdaysIndex[option])
            : [...field.value, weekdaysIndex[option]];
        };

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={field.value.includes(weekdaysIndex[option])}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
      {...other}
    />
  );
}

export default FMultiCheckbox;
