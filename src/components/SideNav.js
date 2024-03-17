import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Box, Drawer, Stack, SvgIcon, useMediaQuery } from "@mui/material";
import { Scrollbar } from "../components/Scrollbar";
import { SideNavItem } from "./SideNavItem";

import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import CalendarIcon from "@heroicons/react/24/solid/CalendarIcon";

import useAuth from "../hooks/useAuth";

const items = [
  {
    title: "Overview",
    path: "/overview",
    authRequired: true,
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Habits",
    path: "/",
    authRequired: true,
    icon: (
      <SvgIcon fontSize="small">
        <ListBulletIcon />
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

const SideNav = (props) => {
  const { open, onClose } = props;
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const pathname = useLocation().pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

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
          pt: 5,
        }}
      >
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
