import axios from "axios";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { updateCurrentUserProfile } from "../features/user/userSlice";

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
  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const checksumString = params.get("checksum");

  const [showPassword, setShowPassword] = useState(false);

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
    const from = location.state?.from?.pathname || "/";
    let { newPassword } = data;

    try {
      // await auth.resetPassword({ email }, () => {});
      await auth.resetPassword(
        { newPassword, checksum: checksumString },
        () => {
          navigate(from, { replace: true });
        }
      );
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
        {checksumString ? (
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
              {/* <Typography>
                Enter your verified email to receive password reset link
              </Typography> */}
            </Stack>

            <Stack spacing={3}>
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
        ) : (
          <>
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Typography variant="h4">Password Reset Error</Typography>
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
            </Stack>
          </>
        )}
      </Box>
    </>
  );
}

export default ResetPasswordPage;
