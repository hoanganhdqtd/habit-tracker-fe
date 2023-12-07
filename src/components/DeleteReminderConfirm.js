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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function DeleteReminderConfirm({ reminderId, setIsReminderDelete }) {
  const handleClose = () => setIsReminderDelete(false);

  const handleReminderDelete = async (reminderId) => {};

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
        <Button color="primary" variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => handleReminderDelete(reminderId)}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteReminderConfirm;
