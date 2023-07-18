import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useColors } from "@common";
import "./index.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  title,
  children,
  positiveText,
  negativeText,
  handleClose,
  open,
  handlePositiveEvent,
}) => {
  const Colors = useColors();

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{ width: "100%" }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "red" }}>
            {negativeText}
          </Button>
          <Button onClick={handlePositiveEvent} style={{ color: "green" }}>
            {positiveText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
