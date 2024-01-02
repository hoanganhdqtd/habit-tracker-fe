import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";

import useAuth from "../hooks/useAuth";

import { FCheckbox, FormProvider, FTextField } from "../components/form";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().max(255).required("Name is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string()
    .max(255)
    .min(4, "Password length should be at least 4 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .max(255)
    .min(4, "Password length should be at least 4 characters")
    .required("ConfirmPassword is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
    let { email, password, name } = data;

    try {
      await auth.register({ name, email, password }, () => {
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
              <Typography variant="h4">Register</Typography>

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
                    <Typography color="text.secondary" variant="body2">
                      Already have an account? &nbsp;
                      <Link
                        component={RouterLink}
                        to="/login"
                        underline="hover"
                        variant="subtitle2"
                      >
                        Login
                      </Link>
                    </Typography>
                  </Stack>
                )}
                {/* <FCheckbox name="remember" label="Remember me" /> */}
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <FTextField name="name" label="Name" />
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
              <FTextField
                name="confirmPassword"
                label="Confirm password"
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
              {/* <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <FCheckbox name="remember" label="Remember me" />
              </Stack> */}
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
        </Box>
      </Box>
    </>
  );
}

export default RegisterPage;

// const Page = () => {
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       name: "",
//       password: "",
//       submit: null,
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email("Must be a valid email")
//         .max(255)
//         .required("Email is required"),
//       name: Yup.string().max(255).required("Name is required"),
//       password: Yup.string().max(255).required("Password is required"),
//     }),
//     onSubmit: async (values, helpers) => {
//       try {
//         await auth.register(values, () => {
//           navigate("/");
//         });
//       } catch (err) {
//         helpers.setStatus({ success: false });
//         helpers.setErrors({ submit: err.message });
//         helpers.setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <>
//       <Box
//         sx={{
//           flex: "1 1 auto",
//           alignItems: "center",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <Box
//           sx={{
//             maxWidth: 550,
//             px: 3,
//             py: "100px",
//             width: "100%",
//           }}
//         >
//           <div>
//             <Stack spacing={1} sx={{ mb: 3 }}>
//               <Typography variant="h4">Register</Typography>
//               <Typography color="text.secondary" variant="body2">
//                 Already have an account? &nbsp;
//                 <Link to="/login" underline="hover" variant="subtitle2">
//                   Log in
//                 </Link>
//               </Typography>
//             </Stack>
//             <form noValidate onSubmit={formik.handleSubmit}>
//               <Stack spacing={3}>
//                 <TextField
//                   error={!!(formik.touched.name && formik.errors.name)}
//                   fullWidth
//                   helperText={formik.touched.name && formik.errors.name}
//                   label="Name"
//                   name="name"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   value={formik.values.name}
//                 />
//                 <TextField
//                   error={!!(formik.touched.email && formik.errors.email)}
//                   fullWidth
//                   helperText={formik.touched.email && formik.errors.email}
//                   label="Email Address"
//                   name="email"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   type="email"
//                   value={formik.values.email}
//                 />
//                 <TextField
//                   error={!!(formik.touched.password && formik.errors.password)}
//                   fullWidth
//                   helperText={formik.touched.password && formik.errors.password}
//                   label="Password"
//                   name="password"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   type="password"
//                   value={formik.values.password}
//                 />
//               </Stack>
//               {formik.errors.submit && (
//                 <Typography color="error" sx={{ mt: 3 }} variant="body2">
//                   {formik.errors.submit}
//                 </Typography>
//               )}
//               <Button
//                 fullWidth
//                 size="large"
//                 sx={{ mt: 3 }}
//                 type="submit"
//                 variant="contained"
//               >
//                 Continue
//               </Button>
//             </form>
//           </div>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Page;
