import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import WrappedTheme from "../WrappedTheme";

export default ({ name }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar>{name}</Avatar>
    </Stack>
  );
};
