import React from "react";

import { useDispatch } from "react-redux";

import { alpha, Button, Stack, Box, Modal, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FTextField, FormProvider } from "./form";
import { createTag, getTags } from "../features/tag/tagSlice";
import { addHabitTag } from "../features/habit/habitSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  // maxHeight: "600px",
  maxHeight: "90%",
  overflow: "scroll",
  // "@media (max-width: 600px)": {
  //   width: "90%",
  // },
};

const defaultValues = {
  title: "",
};

const addTagSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

function CreateTagForm({ createNewTag, setCreateNewTag, habitId }) {
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(addTagSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    const { title } = data;

    if (habitId) {
      dispatch(addHabitTag({ habitId, title }));
    } else {
      dispatch(createTag({ title }));
    }
    handleClose();
    dispatch(getTags());
  };

  const handleClose = () => setCreateNewTag(false);

  return (
    <Modal
      open={createNewTag}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {habitId ? "Add" : "Create"} new tag
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FTextField
              name="title"
              fullWidth
              rows={4}
              placeholder="Title"
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
                color="success"
                variant="outlined"
                size="small"
                onClick={handleClose}
                sx={{ mr: 2 }}
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
                {habitId ? "Add" : "Create"} Tag
              </LoadingButton>
            </Box>
          </Stack>
        </FormProvider>
      </Box>
    </Modal>
  );
}

export default CreateTagForm;
