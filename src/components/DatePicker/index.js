import * as React from "react";
import "./index.css";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { makeStyles } from "@mui/styles";
import { useIsDarkMode } from "@common";

export default ({ label, onChangeDate, value, isDisabled, isTime, style }) => {
	const isDark = useIsDarkMode();
	const classes = useStyle();

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} style={style}>
			{!isTime && (
				<DatePicker
					className="date_picker"
					disabled={isDisabled}
					label={label}
					value={value}
					onChange={(newValue) => onChangeDate(newValue)}
					renderInput={(params) => <TextField {...params} />}
					inputFormat="DD/MM/YYYY"
				/>
			)}
			{isTime && (
				<TimePicker
					label={label}
					value={value}
					onChange={(newValue) => onChangeDate(newValue)}
					renderInput={(params) => <TextField {...params} />}
				/>
			)}
		</LocalizationProvider>
	);
};

const useStyle = makeStyles({});
