import * as React from "react";
import { useDispatch } from "react-redux";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { getHabits } from "../features/habit/habitSlice";
import { deleteSingleTag } from "../features/tag/tagSlice";
import Tooltip from "@mui/material/Tooltip";

export default function TagButton({ title, tagId, date, searchTag }) {
  // console.log("TagButton date:", date);
  const [isTagOn, setIsTagOn] = React.useState(false);
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
      onClick={() => {
        if (!isTagOn) {
          if (searchTag) {
            searchTag += `+${title}`;
          } else {
            searchTag += `${title}`;
          }
        } else {
          // searchTag = "";
          const titlePosition = searchTag.indexOf(title);
          if (searchTag.includes("+")) {
            if (titlePosition === 0) {
              // searchTag = searchTag.replace(`${title}+`, "");
              searchTag = searchTag.replace(`${title}+`, "").trim();
              // console.log("searchTag length:", searchTag.length);
            } else {
              searchTag = searchTag.replace(`+${title}`, "").trim();
              // console.log("searchTag length:", searchTag.length);
            }
          } else {
            searchTag = searchTag.replace(`${title}`, "").trim();
            // console.log("searchTag length:", searchTag.length);
          }
        }
        // console.log("TagButton searchTag:", searchTag);
        // dispatch(getHabits({ date, tag: title }));
        dispatch(getHabits({ date, tag: searchTag }));
        setIsTagOn(!isTagOn);
      }}
    >
      <Tooltip
        title={
          isTagOn
            ? "Click on the tag's title to deselect or the 'X' sign to delete the tag"
            : "Click on the tag's title to search by tag or the 'X' sign to delete the tag"
        }
        arrow
      >
        <Chip
          label={`#${title}`}
          onDelete={handleDelete}
          // color={title === searchTag ? "error" : "success"}
          color={isTagOn ? "error" : "success"}
        />
      </Tooltip>

      {/* <Chip label="Deletable" variant="outlined" onDelete={handleDelete} /> */}
    </Stack>
  );
}
