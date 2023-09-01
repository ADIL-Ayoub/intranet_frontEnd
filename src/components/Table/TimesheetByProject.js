import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import DoneIcon from "@mui/icons-material/Done";
import { Fonts, useColors, FontSize, useToast } from "@common";
import { TextInput, Button } from "..";

import FlagIcon from "@mui/icons-material/Flag";

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const HeaderContent = ["#", "Projet", "Time", "Description"];

export default ({ projets, handleTotalHeures, value, heureTravail }) => {
	const classes = useStyle();
	const Colors = useColors();

	React.useEffect(() => {
		handleTotalHeures();
	}, [projets]);

	function timeDifferenceInMinutes(time1, time2) {
		const [hours1, minutes1] = time1?.split(":").map(Number);
		const [hours2, minutes2] = time2?.split(":").map(Number);
		const totalMinutes1 = hours1 * 60 + minutes1;
		const totalMinutes2 = hours2 * 60 + minutes2;
		const difference = totalMinutes2 - totalMinutes1;

		return difference;
	}

	return (
		<>
			<TableContainer
				component={Paper}
				style={{
					backgroundColor: Colors.tableBg,
					height: "100%",
					maxHeight: `calc(${HEIGHT}px - 170px)`,
				}}
			>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							{HeaderContent.map((ele, index) => (
								<TableCell
									align={index === 0 ? "left" : "center"}
									key={index}
									style={{
										color: Colors.primary,
										fontFamily: Fonts().primaryBold,
										fontSize: 12,
									}}
								>
									{ele}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{projets?.map((row, index) => (
							<TableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell
									component="th"
									scope="row"
									className={classes.TableCell}
									style={{ color: "gray" }}
								>
									{index + 1}
								</TableCell>
								<TableCell
									align="center"
									className={classes.TableCell}
									style={{ color: "gray" }}
								>
									{row.projet}
								</TableCell>
								<TableCell
									align="left"
									className={classes.TableCell}
									style={{
										color: "gray",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									{row.time}
								</TableCell>
								<TableCell
									align="center"
									className={classes.TableCell}
									style={{ color: "gray" }}
								>
									{row.description}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<div>
				<Button
					disabled={true}
					btnText={value}
					IconName={DoneIcon}
					styleDisabled={
						timeDifferenceInMinutes(value, heureTravail) <= 0
							? {
									color: "#FFF",
									background: "#40b240",
									borderRadius: 12,
									padding: "15px 26px",
									fontFamily: Fonts().primaryRegular,
									fontSize: FontSize().smallText,
									marginTop: "22px",
									width: "100%",
							  }
							: {
									color: "#FFF",
									background: "#e14a4a",
									borderRadius: 12,
									padding: "15px 26px",
									fontFamily: Fonts().primaryRegular,
									fontSize: FontSize().smallText,
									marginTop: "22px",
									width: "100%",
							  }
					}
					style={{
						color: Colors.blackText,
						backgroundColor: Colors.primary,
						borderRadius: 12,
						padding: "15px 26px",
						fontFamily: Fonts().primaryRegular,
						fontSize: FontSize().smallText,
						marginTop: "22px",
						width: "100%",
					}}
				/>
			</div>
		</>
	);
};

const useStyle = makeStyles({
	TableCell: {
		fontSize: 12,
		fontFamily: Fonts().primaryRegular,
	},
});
