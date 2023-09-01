import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useColors, Fonts, FontSize, useIsDarkMode } from "@common";
import "./index.css";
import IconBtn from "../Button/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "@emotion/styled";

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

const WhiteBorderTextField = styled(TextField)`
	& label.Mui-focused {
		color: white;
	}
	& .MuiOutlinedInput-root {
		&.Mui-focused fieldset {
			border-color: white;
		}
		,
		&.MuiOutlinedInput-root {
			border-color: white;
		}
		,
		& fieldset.MuiOutlinedInput-notchedOutline {
			border-color: #fff;
		}
	}
`;

const greyBorderTextField = styled(TextField)`
	& label.Mui-focused {
		color: rgba(0, 0, 0, 0.12);
	}
	& .MuiOutlinedInput-root {
		&.Mui-focused fieldset {
			border-color: rgba(0, 0, 0, 0.12);
		}
		,
		&.MuiOutlinedInput-root {
			border-color: rgba(0, 0, 0, 0.12);
		}
		,
		& fieldset.MuiOutlinedInput-notchedOutline {
			border-color: rgba(0, 0, 0, 0.12);
		}
	}
`;

export default ({
	label,
	placeholder,
	IconName,
	isPassword,
	value,
	handleChangeValue,
	style,
	disabled,
	isRequired,
	error,
	removeBase,
	type,
	useWidth,
	useGray,
	onKeyUp,
	maxLength,
	key,
}) => {
	const isDark = useIsDarkMode();
	const [showPass, setShowPass] = useState({
		showPassword: false,
	});

	const UseTextFieds = useGray ? greyBorderTextField : WhiteBorderTextField;
	const Colors = useColors();

	const OnShowPassEvent = () => {
		setShowPass({
			...showPass,
			showPassword: !showPass.showPassword,
		});
	};

	return (
		<Box sx={{ display: "flex", flexWrap: "wrap", width: useWidth && "100%" }}>
			<div style={{ width: "100%" }}>
				{!removeBase ? (
					<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
						<CssBaseline />

						<TextField
							key={key}
							maxLength={maxLength}
							onKeyUp={onKeyUp}
							error={!!error}
							required={isRequired}
							disabled={disabled}
							value={value}
							onChange={handleChangeValue}
							color="success"
							label={label}
							id="outlined-start-adornment"
							style={style}
							helperText={!!error && error}
							type={
								isPassword
									? showPass.showPassword
										? "text"
										: "password"
									: type
									? type
									: "text"
							}
							placeholder={placeholder || label}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<IconName
											fontSize={FontSize().smallText + ""}
											style={{ color: Colors.blackText }}
										/>
									</InputAdornment>
								),
								endAdornment: isPassword && (
									<InputAdornment position="end">
										<IconBtn
											fontSize={FontSize().LargeText}
											color={Colors.blackText}
											IconName={
												showPass.showPassword
													? RemoveRedEyeIcon
													: VisibilityOffIcon
											}
											label="password"
											pressed={OnShowPassEvent}
										/>
									</InputAdornment>
								),
							}}
						/>
					</ThemeProvider>
				) : (
					<UseTextFieds
						key={key}
						maxLength={maxLength}
						onKeyUp={onKeyUp}
						error={!!error}
						required={isRequired}
						disabled={disabled}
						value={value}
						onChange={handleChangeValue}
						color={"warning"}
						label={label}
						id="outlined-start-adornment"
						style={style}
						helperText={!!error && error}
						type={
							isPassword
								? showPass.showPassword
									? "text"
									: "password"
								: type
								? type
								: "text"
						}
						placeholder={placeholder || label}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<IconName
										fontSize={FontSize().smallText + ""}
										style={{ color: useGray ? "#756754" : Colors.blackText }}
									/>
								</InputAdornment>
							),
							endAdornment: isPassword && (
								<InputAdornment position="end">
									<IconBtn
										fontSize={FontSize().LargeText}
										color={useGray ? "#756754" : Colors.blackText}
										IconName={
											showPass.showPassword
												? RemoveRedEyeIcon
												: VisibilityOffIcon
										}
										label="password"
										pressed={OnShowPassEvent}
									/>
								</InputAdornment>
							),
						}}
					/>
				)}
			</div>
		</Box>
	);
};
