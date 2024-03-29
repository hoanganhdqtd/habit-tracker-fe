import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";

import { deleteHabitSingleReminder } from "../features/habit/habitSlice";
import { useNavigate } from "react-router-dom";

function DeleteReminderConfirm({ habitId, reminderId, setIsReminderDelete }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const smScreenDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const handleClose = () => setIsReminderDelete(false);

  const handleReminderDelete = async (reminderId, habitId) => {
    setIsReminderDelete(false);
    dispatch(deleteHabitSingleReminder({ habitId, reminderId }));
    navigate(`/habit/${habitId}`, { replace: true });
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm to delete</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton>
          <CloseIcon onClick={handleClose} />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{`Are you sure you want to delete the reminder?`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="outlined"
          size={smScreenDown ? "small" : "medium"}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          size={smScreenDown ? "small" : "medium"}
          onClick={() => handleReminderDelete(reminderId, habitId)}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteReminderConfirm;
