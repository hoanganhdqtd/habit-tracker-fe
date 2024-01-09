// import * as React from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { useDispatch } from "react-redux";
// import { getHabits } from "../../features/habit/habitSlice";

// export default function FSelect({ sort, setSort }) {
//   // const [sort, setSort] = React.useState("latest");
//   const dispatch = useDispatch();

//   const handleChange = (event) => {
//     setSort(event.target.value);

//     dispatch(getHabits({ sort: sort === "latest" ? "name" : "latest" }));
//   };

//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Sort</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={sort}
//           label="Sort"
//           onChange={handleChange}
//         >
//           <MenuItem value="latest">Latest</MenuItem>
//           <MenuItem value="name">Name</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { getHabits } from "../../features/habit/habitSlice";

export default function FSelect({ sort, setSort }) {
  // const [sort, setSort] = React.useState("latest");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSort(event.target.value);
    dispatch(getHabits({ sort: sort === "latest" ? "name" : "latest" }));
  };

  return (
    <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Sort by</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={sort}
        onChange={handleChange}
        label="Sort"
      >
        <MenuItem value="latest">Latest</MenuItem>
        <MenuItem value="name">Name</MenuItem>
      </Select>
    </FormControl>
  );
}
