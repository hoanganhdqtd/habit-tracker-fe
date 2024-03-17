import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { changePage, searchQuery } from "../features/habit/habitSlice";

import { InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

export const SearchBox = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const onChange = (e) => {
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
