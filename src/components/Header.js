import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Tooltip,
  Stack,
  Avatar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

import MoreIcon from "@mui/icons-material/MoreVert";

import ListIcon from "@mui/icons-material/List";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";

import useAuth from "../hooks/useAuth";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const { avatarUrl } = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/account");
        }}
      >
        <Stack direction="row" spacing={1}>
          <AccountCircle />
          <Typography variant="inherit">Account</Typography>
        </Stack>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          logout(() => navigate("/"));
        }}
      >
        <Stack direction="row" spacing={1}>
          <LogoutIcon />
          <Typography variant="inherit">Logout</Typography>
        </Stack>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/overview");
        }}
      >
        <Stack direction="row" spacing={1}>
          <BarChartIcon />
          <Typography variant="inherit">Overview</Typography>
        </Stack>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/");
        }}
      >
        <Stack direction="row" spacing={1}>
          <ListIcon />
          <Typography variant="inherit">Habits</Typography>
        </Stack>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/calendar");
        }}
      >
        <Stack direction="row" spacing={1}>
          <CalendarMonthIcon />
          <Typography variant="inherit">Calendar</Typography>
        </Stack>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/account");
        }}
      >
        <Stack direction="row" spacing={1}>
          <AccountCircle />
          <Typography variant="inherit">Account</Typography>
        </Stack>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          logout(() => navigate("/"));
        }}
      >
        <Stack direction="row" spacing={1}>
          <LogoutIcon />
          <Typography variant="inherit">Logout</Typography>
        </Stack>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            // sx={{ display: { xs: "none", sm: "block" } }}
            sx={{ display: { sm: "block" } }}
          >
            Habit tracker
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", lg: "none", md: "flex" } }}>
            <Tooltip title="Go to Habits page" arrow>
              <IconButton size="large" color="inherit">
                <ListIcon onClick={() => navigate("/")} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Go to Overview page" arrow>
              <IconButton size="large" color="inherit">
                <BarChartIcon onClick={() => navigate("/overview")} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Go to Calendar page" arrow>
              <IconButton size="large" color="inherit">
                <CalendarMonthIcon onClick={() => navigate("/calendar")} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Click to view user's account or logout" arrow>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {/* <AccountCircle /> */}
                <Avatar src={avatarUrl} />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
