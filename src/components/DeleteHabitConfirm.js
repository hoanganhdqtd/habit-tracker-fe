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

function DeleteHabitConfirm({ habitId, setIsHabitDelete, handleHabitDelete }) {
  const smScreenDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const handleClose = () => setIsHabitDelete(false);

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm to delete</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton>
          <CloseIcon onClick={handleClose} />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{`Are you sure you want to delete the habit?`}</Typography>
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
          onClick={() => handleHabitDelete(habitId)}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteHabitConfirm;
