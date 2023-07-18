import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { REMOVE_TOAST } from "@redux/toasts/types";
import { makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fonts } from "@common";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default ({ type, message, toastId }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const removeToast = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: REMOVE_TOAST, payload: toastId });
    setIsOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={isOpen}
        onClose={removeToast}
        TransitionComponent={(props) => (
          <Slide
            {...props}
            direction="up"
            style={{
              backgroundColor:
                type === "error" ? "rgb(255, 51, 51)" : "rgb(103, 206, 74)",
            }}
          />
        )}
        message={message}
        action={
          <React.Fragment>
            <IconButton>
              <CloseIcon style={{ color: "#fff" }} />
            </IconButton>
          </React.Fragment>
        }
      />
      {/* <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={removeToast}
        onClick={removeToast}
        direction="up"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        style={{
          position: "relative",
          marginTop: 4,
          width: "300px",
          cursor: "pointer",
          marginLeft: 44,
        }}
      >
        <Alert onClose={removeToast} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar> */}
    </Stack>
  );
};

const useStyle = makeStyles({});
