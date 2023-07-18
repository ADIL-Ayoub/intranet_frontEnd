import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useColors } from "@common";
import "./index.css";

export default ({ label, disabled, checked, handleChecked, style }) => {
  const Colors = useColors();
  return (
    <FormGroup style={style}>
      <FormControlLabel
        style={{ fontSize: "12px" }}
        control={
          <Checkbox
            checked={checked}
            onChange={handleChecked}
            sx={{
              color: Colors.primary,
              "&.Mui-checked": {
                color: Colors.primary || "default",
              },
            }}
          />
        }
        label={label}
        disabled={disabled}
      />
    </FormGroup>
  );
};
