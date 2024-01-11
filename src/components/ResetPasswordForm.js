import React, { useState } from "react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";

import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormProvider, FTextField, FCheckbox } from "../components/form";
import useAuth from "../hooks/useAuth";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  newPassword: Yup.string()
    .max(255)
    .min(4, "New password length should be at least 4 characters")
    .required("New password is required"),
  confirmNewPassword: Yup.string()
    .max(255)
    .min(4, "New password length should be at least 4 characters")
    .required("ConfirmNewPassword is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

const defaultValues = {
  email: "",
  newPassword: "",
  confirmNewPassword: "",
};

function ResetPasswordForm({ setIsResetPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useAuth();
  const { resetPassword } = auth;

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
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
    let { email, newPassword } = data;
    console.log("newPassword:", newPassword);

    try {
      await resetPassword({ email, newPassword }, () => {
        navigate(from, { replace: true });
        setIsResetPassword(false);
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
          maxWidth: 550,
          px: 3,
          // py: "100px",
          width: "100%",
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Reset password</Typography>
            <Typography color="text.secondary" variant="body2">
              Back to &nbsp;
              <Link
                // to="/Login"
                underline="hover"
                variant="subtitle2"
                component={RouterLink}
                onClick={() => setIsResetPassword(false)}
              >
                Login page
              </Link>
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <FTextField name="email" label="Email address" />
            <FTextField
              name="newPassword"
              label="New password"
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
              name="confirmNewPassword"
              label="Confirm new password"
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
              justifyContent="flex-end"
            >
              <FCheckbox name="remember" label="Remember me" />
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
      </Box>
    </>
  );
}

export default ResetPasswordForm;
