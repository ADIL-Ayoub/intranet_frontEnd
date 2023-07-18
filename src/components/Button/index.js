import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ActivityIndicator } from "@components";
import { makeStyles } from "@mui/styles";

export default ({
  btnText,
  iconFirst,
  IconName,
  style,
  handlePressed,
  isLoading,
  iconSize,
  width,
  disabled
}) => {
  const classes = useStyle();
  return (
    <Stack spacing={2} direction="row" style={{width: width}}>
      <Button
        disabled={isLoading || disabled}
        variant="text"
        className = {classes.btnMarginChild}
        style={style}
        onClick={handlePressed}
      >
        {iconFirst &&
          (isLoading ? (
            <ActivityIndicator
              size={12}
              color={"inherit"}
              style={{ margin: "0px 5px 0px 0px" }}
            />
          ) : (
            <IconName style = {{fontSize: iconSize | 14}}/>
          ))}
        {btnText}
        {!iconFirst &&
          (isLoading ? (
            <ActivityIndicator
              size={12}
              color={"inherit"}
              style={{ marginLeft: "3px" }}
            />
          ) : (
            <IconName style = {{fontSize: iconSize | 14}}/>
          ))}
      </Button>
    </Stack>
  );
};
const useStyle = makeStyles({
  btnMarginChild: {
    '& > *': {
      margin: "0 2px"
    }
  }
})
