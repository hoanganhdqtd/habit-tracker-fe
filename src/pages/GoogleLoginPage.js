import { useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Box, CircularProgress } from "@mui/material";
import useAuth from "../hooks/useAuth";

function GoogleLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    const googleLogin = async () => {
      console.log("googleLogin");
      const from = location.state?.from?.pathname || "/";
      try {
        await auth.loginWithGoogle(() => {
          navigate(from, { replace: true });
        });
      } catch (err) {
        console.log("err:", err);
      }
    };
    googleLogin();
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default GoogleLoginPage;
