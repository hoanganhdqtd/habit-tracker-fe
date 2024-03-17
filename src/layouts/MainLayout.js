import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import SideNav from "../components/SideNav";
import { styled } from "@mui/material/styles";
import Header from "../components/Header";
import AlertMsg from "../components/AlertMsg";

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

const LayoutContainer = styled("div")({
  width: "100%",
});

// minHeight, Box: in case the content is too short to
// consume all the view height
function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <SideNav inMainLayout={true} />
      <LayoutRoot>
        <LayoutContainer>
          <Header />
          <AlertMsg />
          <Outlet />
          {/* <Box sx={{ flexGrow: 1 }} /> */}
        </LayoutContainer>
      </LayoutRoot>
    </Stack>
  );
}

export default MainLayout;
