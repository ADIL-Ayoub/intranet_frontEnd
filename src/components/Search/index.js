import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { MdFilterList } from "react-icons/md";
import SearchIcon from "@mui/icons-material/Search";
import "./index.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme, width }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: width,
      },
    },
  },
}));

export default ({ width, isFilter, IconName, label, style,  onChange, marginTop, value, useFlex}) => {
  return (
    <Box sx={{ flexGrow: useFlex ? 0.2 : 1 }}>
      {isFilter ? (
        <Search style={{ border: "1px solid #d0cdcd", ...style }}>
          <SearchIconWrapper>
            <IconName />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={label || "Rechercher ..."}
            inputProps={{ "aria-label": "search" }}
            width={width}
            onChange = {(e) => onChange(e)}
            value = {value}
            style =  {{marginTop: marginTop}}
          />
        </Search>
      ) : (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MdFilterList />
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Rechercher ..."
                inputProps={{ "aria-label": "search" }}
                width={width}
                onChange = {(e) => onChange(e)}
                value = {value}
              />
            </Search>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
};
