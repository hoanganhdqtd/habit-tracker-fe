import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { alpha, Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FormProvider,
  FTextField,
  FMultiCheckbox,
  FDatePicker,
  FTimePicker,
} from "./form";

const defaultValues = {
  name: "",
  password: "",
  confirmPassword: "",
  avatarUrl: "",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditProfileForm({
  isProfileEdit,
  setIsProfileEdit,
  handleProfileEdit,
}) {
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, password, avatarUrl } = data;

    handleProfileEdit({ name, password, avatarUrl });
    handleClose();
    // navigate("/");
    // navigate(`/habit/${habitId}`);
  };

  const handleClose = () => setIsProfileEdit(false);

  return (
    <div>
      <Modal
        open={isProfileEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FTextField
                name="name"
                fullWidth
                rows={4}
                placeholder="Name"
                required={true}
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  sx={{ mr: 2 }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="small"
                  loading={
                    isSubmitting
                    // || isLoading
                  }
                >
                  Edit Profile
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}

export default EditProfileForm;