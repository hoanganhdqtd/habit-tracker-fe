import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import GoogleIcon from "@mui/icons-material/Google";

import { FCheckbox, FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  // to make the sliding visible
  const [introSlideIn, setIntroSlideIn] = useState(true);

  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  const handleGoogleLogin = async () => {
    window.open(process.env.REACT_APP_GOOGLE_LOGIN_URL, "_self");
  };

  return (
    <>
      <Slide direction="down" in={introSlideIn} mountOnEnter unmountOnExit>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            mt: { xs: 2, sm: 3, lg: 4, xl: 5 },
            // mb: { xs: 1, sm: 2, lg: 3, xl: 4 },
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            color: "#2196f3",
            fontWeight: "bold",
          }}
        >
          Habit Tracker
        </Typography>
      </Slide>
      <Slide direction="down" in={introSlideIn} mountOnEnter unmountOnExit>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            mt: { xs: 0.5, sm: 1, lg: 1.5, xl: 2 },
            mb: { xs: 2, sm: 3, lg: 4, xl: 5 },
            fontSize: { xs: "1rem", sm: "1.75rem", md: "2rem" },
            color: "#757575",
          }}
        >
          Welcome to Habit Tracker
        </Typography>
      </Slide>

      <Box
        sx={{
          maxWidth: 450,
          // px: 3,
          // py: "100px",
          // py: "50px",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3, md: 4 },
          width: "90%",
          // mx: "auto",
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
            <Typography color="text.secondary" variant="body2">
              Don&apos;t have an account? &nbsp;
              <Link
                to="/register"
                underline="hover"
                variant="subtitle2"
                component={RouterLink}
              >
                Register
              </Link>
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <FTextField name="email" label="Email address" />
            <FTextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {!!errors.responseError && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  sx={{ my: 1 }}
                >
                  <Alert severity="error">{errors.responseError.message}</Alert>
                  <Link
                    component={RouterLink}
                    variant="subtitle2"
                    // onClick={() => setIsResetPassword(true)}
                    // onClick={() => navigate("/forgotPassword")}
                    to="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </Stack>
              )}
              {/* <FCheckbox name="remember" label="Remember me" /> */}
            </Stack>
          </Stack>

          <LoadingButton
            // fullWidth
            size="large"
            sx={{
              mt: 2,
              width: "100%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            type="submit"
            variant="contained"
          >
            Continue
          </LoadingButton>
        </FormProvider>

        <Divider sx={{ mt: 2 }}>or</Divider>
        <Button
          variant="contained"
          // color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          fullWidth
          size="large"
          sx={{
            backgroundColor: "#607d8b",
            color: "white",
            mt: 2,
            // width: "90%",
            // display: "block",
            // marginLeft: "auto",
            marginRight: "auto",

            "&:hover": {
              backgroundColor: "#455a64",
            },
          }}
        >
          Login with Google
        </Button>
      </Box>
    </>
  );
};

export default LoginPage;
