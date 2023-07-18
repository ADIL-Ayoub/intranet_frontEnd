import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

export default ({
  IconName,
  label,
  pressed,
  color,
  fontSize,
  TextBtn,
  iconFirst,
  disabled,
  style,
  boxStyle
}) => {
  return (
    <Stack direction="row" spacing={1} style = {boxStyle}>
      <IconButton
        aria-label={label}
        onClick={pressed}
        style={style ? style : { color: color }}
        disabled={disabled}
      >
        {iconFirst && (
          <IconName style={{ fontSize: fontSize, marginLeft: 4 }} />
        )}
        {TextBtn && <p style={{ fontSize: fontSize }}>{TextBtn}</p>}
        {!iconFirst && (
          <IconName style={{ fontSize: fontSize, marginLeft: 4 }} />
        )}
      </IconButton>
    </Stack>
  );
};
