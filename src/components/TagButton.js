import * as React from "react";
import { useDispatch } from "react-redux";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { getHabits } from "../features/habit/habitSlice";
import { deleteSingleTag } from "../features/tag/tagSlice";
import Tooltip from "@mui/material/Tooltip";

export default function TagButton({ title, tagId, date }) {
  // console.log("TagButton date:", date);
  const dispatch = useDispatch();

  const handleDelete = () => {
    // console.info("You clicked the delete icon.");
    dispatch(deleteSingleTag(tagId));
    // dispatch(getHabits());
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ mr: 1, mt: 1 }}
      onClick={() => dispatch(getHabits({ date, tag: title }))}
    >
      <Tooltip
        title="Click on the tag's title to search by tag or the 'X' sign to delete the tag"
        arrow
      >
        <Chip label={`#${title}`} onDelete={handleDelete} color="success" />
      </Tooltip>

      {/* <Chip label="Deletable" variant="outlined" onDelete={handleDelete} /> */}
    </Stack>
  );
}
