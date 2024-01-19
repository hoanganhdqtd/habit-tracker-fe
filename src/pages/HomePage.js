import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Typography,
  Button,
  SvgIcon,
  Box,
  Container,
  Pagination,
  Stack,
  Tooltip,
  Grid,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

// import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TagIcon from "@mui/icons-material/Tag";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { FSelect } from "../components/form";

import HabitList from "../components/HabitList";
import { SearchBox } from "../components/SearchBox";
import AddHabitForm from "../components/AddHabitForm";
import CreateTagForm from "../components/CreateTagForm";
import TagButton from "../components/TagButton";

import { getHabits, changePage } from "../features/habit/habitSlice";
import { getTags } from "../features/tag/tagSlice";
import { getCurrentUserProfile } from "../features/user/userSlice";

const CenterPagination = styled(Pagination)(({ theme }) => ({
  ul: {
    justifyContent: "center",
    // "& .MuiPaginationItem-root": {
    //   color: "#fff",
    // },
    // // "& .MuiTouchRipple-root": {
    // //   color: "#d74742",
    // // },
    // "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
    //   backgroundColor: "#d74742",
    // },
  },
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const CustomizedMenus = ({ setAddNewHabit, setCreateNewTag }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            console.log("addNewHabit");
            setAddNewHabit(true);
            handleClose();
          }}
          disableRipple
        >
          <AddIcon />
          Add new habit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setCreateNewTag(true);
            handleClose();
          }}
          disableRipple
        >
          <TagIcon />
          Add new tag
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

function HomePage() {
  const smScreenUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [addNewHabit, setAddNewHabit] = useState(false);
  const [createNewTag, setCreateNewTag] = useState(false);
  // const [dateValue, setDateValue] = useState(null);
  const [sort, setSort] = useState("latest");

  const [pageNum, setPageNum] = useState(1);
  const handlePageChange = (event, value) => {
    setPageNum(value);
    dispatch(changePage(value));
  };

  const { search, page, date, totalPages, searchTag } = useSelector(
    (state) => state.habit
  );

  const { tags } = useSelector((state) => state.tag);

  // const { tagToSearch } = navigate.state;
  // const { state } = useLocation();
  // let tag;
  // if (state) {
  //   tag = state.tagToSearch;
  // }
  const [dateValue, setDateValue] = useState(date ? dayjs(date) : null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserProfile());
    dispatch(
      getHabits({ page, search, tag: searchTag, date: dateValue, sort })
    );
    if (!tags.length) {
      dispatch(getTags());
    }
  }, [page, search, searchTag, dateValue, tags, sort, dispatch]);

  // clear location state
  window.history.replaceState({}, document.title);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Typography variant="h4">Habits</Typography>
            {smScreenUp && (
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Tooltip title="Create a new tag" arrow>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    // color="success"
                    sx={{
                      backgroundColor: "#009688",
                      "&:hover": {
                        backgroundColor: "#00796b",
                      },
                    }}
                    onClick={() => setCreateNewTag(true)}
                  >
                    Create new tag
                  </Button>
                </Tooltip>

                <Tooltip title="Create a new habit" arrow>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                    onClick={() => setAddNewHabit(true)}
                  >
                    Add Habit
                  </Button>
                </Tooltip>

                {createNewTag && (
                  <CreateTagForm
                    createNewTag={createNewTag}
                    setCreateNewTag={setCreateNewTag}
                  />
                )}

                {addNewHabit && (
                  <AddHabitForm
                    addNewHabit={addNewHabit}
                    setAddNewHabit={setAddNewHabit}
                    dateValue={dateValue}
                    tags={tags}
                  />
                )}
              </Stack>
            )}
            {!smScreenUp && (
              <>
                <CustomizedMenus
                  setAddNewHabit={setAddNewHabit}
                  setCreateNewTag={setCreateNewTag}
                />
                {createNewTag && (
                  <CreateTagForm
                    createNewTag={createNewTag}
                    setCreateNewTag={setCreateNewTag}
                  />
                )}

                {addNewHabit && (
                  <AddHabitForm
                    addNewHabit={addNewHabit}
                    setAddNewHabit={setAddNewHabit}
                    dateValue={dateValue}
                    tags={tags}
                  />
                )}
              </>
            )}
          </Stack>

          <Stack
            direction={smScreenUp ? "row" : "column"}
            spacing={2}
            justifyContent="space-between"
          >
            <Grid>
              <Stack direction="row" spacing={2}>
                <Grid>
                  <SearchBox />
                </Grid>
                <Grid>
                  <FSelect sort={sort} setSort={setSort} />
                </Grid>
              </Stack>
            </Grid>

            <Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Pick date"
                  value={dateValue}
                  onChange={(newDateValue) =>
                    setDateValue(
                      dayjs(newDateValue)
                        .set("hour", 0)
                        .set("minute", 0)
                        .set("second", 0)
                    )
                  }
                />
              </LocalizationProvider>
            </Grid>
          </Stack>

          {tags.length !== 0 && (
            <Stack direction="row" spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {/* {tags.map((tag) => (
                  <Button
                    variant="contained"
                    color="success"
                    key={tag._id}
                    size="small"
                    sx={{ mr: 1, mt: 1 }}
                    // onClick={() =>
                    //   navigate(`/habit/${habitId}/reminder/${reminder._id}`)
                    // }
                    onClick={() => {
                      dispatch(getHabits({ tag: tag.title }));
                    }}
                  >
                    {`#${tag.title}`}
                  </Button>
                ))} */}
                {tags.map((tag) => (
                  <TagButton
                    key={tag._id}
                    tagId={tag._id}
                    title={tag.title}
                    date={dateValue}
                    searchTag={searchTag}
                    color={searchTag.includes(tag) ? "error" : "success"}
                  />
                ))}
              </Box>
            </Stack>
          )}
          <HabitList date={dateValue} />
          {totalPages ? (
            <CenterPagination
              sx={{
                marginTop: "15px",
                // "Button.MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
                //   backgroundColor: "#d74742",
                // },
              }}
              count={totalPages}
              color="primary"
              page={pageNum}
              onChange={handlePageChange}
            />
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}

export default HomePage;
