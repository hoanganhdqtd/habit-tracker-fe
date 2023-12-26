import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePage, searchQuery } from "../features/habit/habitSlice";
// import { FormProvider, FTextField } from "./form";

import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

// const styles = {
//   container: {
//     // padding: '0!important',
//     color: "white",
//     backgroundColor: "black",
//     display: "flex",
//     justifyContent: "center",
//   },
//   center: {
//     display: "flex",
//     justifyContent: "center",
//   },
//   inputText: {
//     backgroundColor: "white",
//     borderRadius: 1,
//     color: "white",
//     width: "85%",
//     "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
//       border: "3px solid blue",
//       borderRadius: 1,
//     },
//     "& .MuiOutlinedInput-input": {
//       border: "3px solid gray",
//       padding: "0.5rem",
//       borderRadius: 1,
//     },
//   },
//   icon: {
//     backgroundColor: "#ee6b2f",
//     height: "2.5rem",
//     width: "2.5rem",
//     padding: 0.1,
//     borderRadius: 1,
//   },
//   boxRight: {
//     padding: 2,
//     backgroundColor: "green",
//     borderRadius: 2,
//     width: { xs: "90%", md: "100%" },
//   },
// };

// const defaultValues = {
//   search: "",
// };

export const SearchBox = () => {
  const [query, setQuery] = useState("");

  // const methods = useForm(defaultValues);
  // const { handleSubmit } = methods;
  const dispatch = useDispatch();

  // const onSubmit = (data) => {
  //   console.log(data);
  //   dispatch(searchQuery(data.search));
  //   dispatch(changePage(1));
  // };

  const onChange = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
    dispatch(searchQuery(e.target.value));
    dispatch(changePage(1));
  };

  return (
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search habits"
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500, px: 2 }}
      onChange={onChange}
    />
  );
};
