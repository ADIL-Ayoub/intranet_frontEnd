import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { Fonts, useColors } from "@common";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { LOGOUT } from "@redux/account/types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Colors = useColors();
  const classes = useStyle();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: LOGOUT });
      navigate("/");
    }, 1200);
  }, []);
  return (
    <div className={classes.container}>
      <Box sx={{ display: "flex", color: Colors.primary }}>
        <CircularProgress style={{ color: Colors.primary }} />
      </Box>
      <h1 className={classes.logoutText} style={{ color: Colors.primary }}>
        Lougout ...
      </h1>
    </div>
  );
};

const useStyle = makeStyles({
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    fontFamily: Fonts().primarySemiBold,
    letterSpacing: 2,
    fontSize: "15px",
    marginLeft: "12px",
  },
});
