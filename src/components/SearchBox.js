// import { SearchOutlined } from "@mui/icons-material";
// import { Stack, Container, Grid, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { changePage, searchQuery } from "../features/habit/habitSlice";
// import { FormProvider, FTextField } from "./form";

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

// export const SearchBox = () => {
//   const methods = useForm(defaultValues);
//   const { handleSubmit } = methods;
//   const dispatch = useDispatch();

//   const onSubmit = (data) => {
//     console.log(data);
//     dispatch(searchQuery(data.search));
//     dispatch(changePage(1));
//   };

//   return (
//     <Container maxWidth="lg" sx={styles.container}>
//       <Grid
//         container
//         maxWidth="md"
//         sx={{ paddingY: "2rem" }}
//         spacing={{ xs: 2, md: 4 }}
//         columns={{ xs: 12, sm: 12, md: 12 }}
//       >
//         <Grid item xs={12} sm={12} md={6} sx={styles.center}>
//           <Stack sx={{ width: { xs: "90%", md: "100%" } }}>
//             <Typography variant="h5">Search habits</Typography>
//             <FormProvider
//               methods={methods}
//               onSubmit={handleSubmit(onSubmit)}
//               placeholder="Search habits by name or tags"
//             >
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <FTextField name="search" sx={styles.inputText} />
//                 <SearchOutlined sx={styles.icon} />
//               </Stack>
//             </FormProvider>
//             <Typography></Typography>
//           </Stack>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { changePage, searchQuery } from "../features/habit/habitSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const defaultValues = {
  search: "",
};

export const SearchBox = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const onChange = (e) => {
    setQuery(e.target.value);
    dispatch(searchQuery(query));
    dispatch(changePage(1));
  };

  return (
    <OutlinedInput
      defaultValue=""
      onChange={onChange}
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
    />
  );
};
