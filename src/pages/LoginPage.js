import { useCallback, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import GoogleIcon from "@mui/icons-material/Google";

import { FCheckbox, FormProvider, FTextField } from "../components/form";
import ResetPasswordForm from "../components/ResetPasswordForm";
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
  const [isResetPassword, setIsResetPassword] = useState(false);

  const auth = useAuth();

  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //     submit: null,
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string()
  //       .email("Must be a valid email")
  //       .max(255)
  //       .required("Email is required"),
  //     password: Yup.string().max(255).required("Password is required"),
  //   }),
  //   onSubmit: async (values, helpers) => {
  //     try {
  //       await auth.login(values, () => {
  //         navigate("/");
  //       });
  //     } catch (err) {
  //       helpers.setStatus({ success: false });
  //       helpers.setErrors({ submit: err.message });
  //       helpers.setSubmitting(false);
  //     }
  //   },
  // });

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

  const handleGoogleLogin = () => {};

  return (
    <>
      {/* <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      ></Box> */}
      <Box
        sx={{
          maxWidth: 450,
          px: 3,
          py: "100px",
          width: "100%",
        }}
      >
        {!isResetPassword && (
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
                    <Alert severity="error">
                      {errors.responseError.message}
                    </Alert>
                    {/* <Link component={RouterLink} variant="subtitle2" to="/">
                      Forgot password?
                    </Link> */}
                    <Link
                      component={RouterLink}
                      variant="subtitle2"
                      onClick={() => setIsResetPassword(true)}
                    >
                      Forgot password?
                    </Link>
                  </Stack>
                )}
                {/* <FCheckbox name="remember" label="Remember me" /> */}
              </Stack>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              type="submit"
              variant="contained"
            >
              Continue
            </LoadingButton>
          </FormProvider>
        )}

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
            "&:hover": {
              backgroundColor: "#455a64",
            },
          }}
        >
          Login with Google
        </Button>

        {isResetPassword && (
          <ResetPasswordForm
            isResetPassword={isResetPassword}
            setIsResetPassword={setIsResetPassword}
          />
        )}
      </Box>
    </>
  );
};

export default LoginPage;
