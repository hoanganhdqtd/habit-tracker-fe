import axios from "axios";
import { useCallback, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Link, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .max(255)
    .min(4, "Password length should be at least 4 characters")
    .required("Password is required"),
  confirmNewPassword: Yup.string()
    .max(255)
    .min(4, "Password length should be at least 4 characters")
    .required("ConfirmNewPassword is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

const defaultValues = {
  newPassword: "",
  confirmNewPassword: "",
};

function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  const auth = useAuth();

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
    // const from = location.state?.from?.pathname || "/";
    let { email } = data;

    try {
      await auth.resetPassword({ email }, () => {});
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

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
          width: "90%",
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Typography variant="h4">Reset password</Typography>
            <Typography color="text.secondary" variant="body2">
              Back to the Login page&nbsp;
              <Link
                to="/login"
                underline="hover"
                variant="subtitle2"
                component={RouterLink}
              >
                here
              </Link>
            </Typography>
            <Typography>
              Enter your verified email to receive password reset link
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <FTextField name="email" label="Email address" />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {!!errors.responseError && (
                <Alert severity="error">{errors.responseError.message}</Alert>
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
      </Box>
    </>
  );
}

export default ResetPasswordPage;
