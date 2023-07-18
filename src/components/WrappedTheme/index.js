import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = () =>
  createTheme({
    palette: {
      mode: "dark",
    },
  });

const lightTheme = () =>
  createTheme({
    palette: {
      mode: "light",
    },
  });

export default ({ children }) => {
  const isDark = true;
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
