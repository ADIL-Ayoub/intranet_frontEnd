import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useColors, Fonts } from "@common";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@components";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LinkIcon from "@mui/icons-material/Link";
import Checkbox from "@mui/material/Checkbox";
import { Paginations } from "@components";
import { Divider } from "@mui/material";

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const HeaderContent = [
	"Éditer",
	"#",
	"CIN",
	"Email",
	"Post",
	"Nom & prénom",
	"Société",
	"actions",
];

export default ({
	personnes,
	handleClickOpen,
	handleOpenModalForUpdateRole,
	isAssign,
	hanleChecked,
	usePagination,
	page,
	rowsPerPage,
	handleChangeRowsPerPage,
	handleChangePage,
	count,
	isAssign2,
	idPersonne,
}) => {
	const classes = useStyle();
	const Colors = useColors();
	return (
		<div>
			<TableContainer
				component={Paper}
				style={{
					backgroundColor: Colors.tableBg,
					height: "100%",
					maxHeight: isAssign
						? `calc(${HEIGHT}px / 2)`
						: `calc(${HEIGHT}px - 170px)`,
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
									{ele === "Éditer"
										? isAssign
											? "Assigner"
											: "Éditer"
										: isAssign
										? ele !== "actions" && ele
										: ele}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{!!personnes &&
							personnes.map((row, index) => (
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
										{!isAssign && !isAssign2 ? (
											<IconButton
												IconName={BorderColorIcon}
												fontSize={18}
												style={{
													color: Colors.primary,
												}}
												pressed={() =>
													handleOpenModalForUpdateRole(row.id, row?.name)
												}
											/>
										) : isAssign2 ? (
											<Checkbox
												disabled={row.faffectation}
												{...label}
												checked={row.id === idPersonne}
												size="small"
												onChange={(e) => hanleChecked(row.id, e)}
												sx={{
													color: "green" || "default",
													"&.Mui-checked": {
														color: Colors.primary || "default",
													},
												}}
											/>
										) : (
											<Checkbox
												disabled={row.faffectation}
												{...label}
												checked={row?.faffectation}
												size="small"
												onChange={(e) => hanleChecked(row.id, e)}
												sx={{
													color: "green" || "default",
													"&.Mui-checked": {
														color: Colors.primary || "default",
													},
												}}
											/>
										)}
									</TableCell>
									<TableCell
										align="center"
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
										{row.cin}
									</TableCell>
									<TableCell
										align="center"
										className={classes.TableCell}
										style={{ color: "gray" }}
									>
										{row.semail}
									</TableCell>
									<TableCell
										align="center"
										className={classes.TableCell}
										style={{ color: "gray" }}
									>
										{row.sposte}
									</TableCell>
									<TableCell
										align="center"
										className={classes.TableCell}
										style={{ color: "gray" }}
									>
										{row.nom + " " + row.prenom}
									</TableCell>
									<TableCell
										align="center"
										className={classes.TableCell}
										style={{ color: "gray" }}
									>
										{row.ssociete}
									</TableCell>

									{!isAssign && (
										<TableCell
											align="left"
											className={classes.TableCell}
											style={{ color: "gray" }}
										>
											<IconButton
												IconName={LinkIcon}
												fontSize={18}
												boxStyle={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
												}}
												style={{
													color: "gray",
													padding: "9px 12px 8px 7px",
													borderRadius: "12px",
												}}
												pressed={() =>
													handleClickOpen(row?.id, row?.privileges)
												}
											/>
										</TableCell>
									)}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<br />
			<Divider />
			<br />
			{usePagination && (
				<Paginations
					page={page}
					rowsPerPage={rowsPerPage}
					handleChangeRowsPerPage={handleChangeRowsPerPage}
					handleChangePage={handleChangePage}
					count={count}
				/>
			)}
		</div>
	);
};

const useStyle = makeStyles({
	TableCell: {
		fontSize: 12,
		fontFamily: Fonts().primaryRegular,
	},
});
