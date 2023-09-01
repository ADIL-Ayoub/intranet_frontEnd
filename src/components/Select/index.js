import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useColors, useIsDarkMode } from "@common";
import "./index.css";

export default ({
	label,
	data,
	style,
	isMultible,
	value,
	handleOnChange,
	disabled,
	useId,
	isUsers,
	isServices,
	isDepartement,
	isClient,
	ispersonne,
	isPays,
	useIdPays,
	isHolidays,
	isLabel,
	isProject,
	isTime,
}) => {
	const isDark = useIsDarkMode();
	const Colors = useColors();

	const MenuProps = {
		PaperProps: {
			style: {
				backgroundColor: "#fff",
				color: "rgba(0, 0, 0, 0.6)",
			},
		},
	};

	return (
		<FormControl sx={style ? style : { minWidth: "100%" }} disabled={disabled}>
			<InputLabel id="demo-select-small">{label}</InputLabel>
			<Select
				color="warning"
				labelId="demo-select-small"
				id="demo-select-small"
				value={value || ""}
				style={{ borderRadius: 12 }}
				label={label}
				onChange={(e) => handleOnChange(e)}
				MenuProps={MenuProps}
				multiple={data?.length > 0 && isMultible}
			>
				<MenuItem>
					<em>None</em>
				</MenuItem>
				{!!data &&
					!isProject &&
					!isTime &&
					data.map((ele) => (
						<MenuItem
							key={ele.id}
							value={
								useId
									? isPays
										? useIdPays
											? ele.id
											: ele.codePays
										: ele.id
									: ele.name
									? ele.name
									: ""
								// ele.name
							}
						>
							{isUsers
								? ele.email
								: isServices
								? ele?.nameService
								: isDepartement
								? ele.shortNameDepartement
								: isClient
								? ele.shortNameClient
								: ispersonne
								? ele.nom + " " + ele.prenom
								: isPays
								? ele?.codePays
								: isHolidays
								? ele?.typeConge
								: isLabel
								? ele?.label
								: ele.name}
						</MenuItem>
					))}
				{!!data &&
					isProject &&
					!isTime &&
					data?.length > 0 &&
					data.map((item) => {
						return (
							<MenuItem key={item.id} value={item.shortNameProjet}>
								{`${item.codeProjet} - ${item.shortNameProjet}`}
							</MenuItem>
						);
					})}
				{!!data &&
					isTime &&
					data?.length > 0 &&
					data.map((item, index) => {
						return (
							<MenuItem key={index} value={item}>
								{`${item}`}
							</MenuItem>
						);
					})}
			</Select>
		</FormControl>
	);
};
