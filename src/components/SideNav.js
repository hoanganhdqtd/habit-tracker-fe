import React, { useContext } from "react";

import { Link, NavLink } from "react-router-dom";
// import { usePathname } from "next/navigation";
import { useLocation, useNavigate } from "react-router-dom";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Logo from "../components/Logo";
import { Scrollbar } from "../components/Scrollbar";
import { SideNavItem } from "./SideNavItem";

import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CharPieIcon from "@heroicons/react/24/solid/ChartPieIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";

import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";

import CalendarIcon from "@heroicons/react/24/solid/CalendarIcon";
import useAuth from "../hooks/useAuth";
// import { SvgIcon } from "@mui/material";

const items = [
  {
    // title: "Overview",
    title: "Habits",
    path: "/",
    authRequired: true,
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Calendar",
    path: "/calendar",
    authRequired: true,
    icon: (
      <SvgIcon fontSize="small">
        <CalendarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Statistics",
    path: "/statistics",
    authRequired: true,
    icon: (
      <SvgIcon fontSize="small">
        <CharPieIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/account",
    authRequired: true,
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Login",
    path: "/login",
    authRequired: false,
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Logout",
    path: "/login",
    authRequired: true,
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    ),
    onclick: function () {},
  },
  {
    title: "Register",
    path: "/register",
    authRequired: false,
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
];

// const SideNav = ({ open = true, onClose = () => {} })
const SideNav = (props) => {
  const { open, onClose } = props;
  const { isAuthenticated, logout } = useAuth();
  // const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const pathname = useLocation().pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  // console.log("pathname:", pathname);

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NavLink}
            href="/"
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="inherit" variant="subtitle1">
                Devias
              </Typography>
              <Typography color="neutral.400" variant="body2">
                Production
              </Typography>
            </div>
            <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
              <ChevronUpDownIcon />
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {items.map((item) => {
              // login or register
              // if (item.)

              const active = item.path ? pathname === item.path : false;

              if (!isAuthenticated && item.authRequired) return null;
              if (isAuthenticated && !item.authRequired) return null;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                  onClick={() => {
                    if (item.title === "Logout") {
                      logout(() => navigate("/"));
                    }
                  }}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            // backgroundColor: "#1C2536",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default SideNav;
