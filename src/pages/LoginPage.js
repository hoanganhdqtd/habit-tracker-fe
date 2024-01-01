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

import { FCheckbox, FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";

// router => navigate
// Head => removed
// next/link => router link
// MUI link => router link

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

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <RouterLink
                  to="/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </RouterLink>
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
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FCheckbox name="remember" label="Remember me" />
              <Link component={RouterLink} variant="subtitle2" to="/">
                Forgot password?
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Continue
            </LoadingButton>
          </FormProvider>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;

// import React, { useState } from "react";
// import {
//   Link,
//   Stack,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Container,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

// import { FCheckbox, FormProvider, FTextField } from "../components/form";
// import useAuth from "../hooks/useAuth";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// const defaultValues = {
//   email: "",
//   password: "",
//   remember: true,
// };

// function LoginPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const auth = useAuth();
//   const [showPassword, setShowPassword] = useState(false);

//   const methods = useForm({
//     resolver: yupResolver(LoginSchema),
//     defaultValues,
//   });
//   const {
//     handleSubmit,
//     reset,
//     setError,
//     formState: { errors, isSubmitting },
//   } = methods;

//   const onSubmit = async (data) => {
//     const from = location.state?.from?.pathname || "/";
//     let { email, password } = data;

//     try {
//       await auth.login({ email, password }, () => {
//         navigate(from, { replace: true });
//       });
//     } catch (error) {
//       reset();
//       setError("responseError", error);
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//         <Stack spacing={3}>
//           {!!errors.responseError && (
//             <Alert severity="error">{errors.responseError.message}</Alert>
//           )}
//           <Alert severity="info">
//             Don’t have an account?{" "}
//             <Link variant="subtitle2" component={RouterLink} to="/register">
//               Get started
//             </Link>
//           </Alert>

//           <FTextField name="email" label="Email address" />

//           <FTextField
//             name="password"
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Stack>

//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//           sx={{ my: 2 }}
//         >
//           <FCheckbox name="remember" label="Remember me" />
//           <Link component={RouterLink} variant="subtitle2" to="/">
//             Forgot password?
//           </Link>
//         </Stack>

//         <LoadingButton
//           fullWidth
//           size="large"
//           type="submit"
//           variant="contained"
//           loading={isSubmitting}
//         >
//           Login
//         </LoadingButton>
//       </FormProvider>
//     </Container>
//   );
// }

// export default LoginPage;
