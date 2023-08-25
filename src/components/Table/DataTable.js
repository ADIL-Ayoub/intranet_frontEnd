import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useColors, Fonts } from "@common";
import { makeStyles } from "@mui/styles";
import { IconButton, TextInput, Paginations } from "@components";
import { Checkbox, Divider, FormControlLabel, FormGroup } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import "./datatable.css";
import DoneIcon from "@mui/icons-material/Done";
import AlarmIcon from "@mui/icons-material/Alarm";
import { backend } from "../../services/axios/Axios";
import {
	Accordion,
	Grids,
	CheckBox,
	Select,
	Button,
	Search,
	BackDrop,
	DatePicker,
	Modal,
	Tabs,
	DataTable,
} from "@components";
const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const DaysColors = [
	{ id: "lundi", day: "lundi", colors: "#d7d7d7" },
	{ id: "mardi", day: "mardi", colors: "#eee" },
	{ id: "mercredi", day: "mercredi", colors: "#d7d7d7" },
	{ id: "jeudi", day: "jeudi", colors: "#eee" },
	{ id: "vendredi", day: "vendredi", colors: "#d7d7d7" },
	{ id: "samedi", day: "samedi", colors: "#eee" },
	{ id: "dimanche", day: "dimanche", colors: "#d7d7d7" },
];

export default ({
	headerContentField,
	personnes,
	handleSave,
	usePagination,
	page,
	rowsPerPage,
	handleChangeRowsPerPage,
	handleChangePage,
	count,
	periode,
	typeOfDayValue,
	daysList,
	selectedWeek,
	handleTimeChange,
	party1He,
	party1Hs,
	party2He,
	party2Hs,
	personId,
	dayInput,
	houreId,
	party,
	semaineNane,
	handleChecked,
	Assignment,
	generateTsPerProjectModal,
}) => {
	const classes = useStyle();
	const Colors = useColors();

	const getCode = (day) => {
		if (day !== "ko") {
			const findCode = DaysColors.find((ele) => ele.day === day);
			return findCode.colors;
		}
	};

	return (
		<div>
			<TableContainer
				component={Paper}
				style={{
					backgroundColor: Colors.tableBg,
					height: "100%",
					maxHeight: `calc(${HEIGHT}px - 170px)`,
					width: "100%",
					maxWidth: WIDTH - 140,
					overflowX: "scroll",
				}}
			>
				<Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{headerContentField.map((ele, index) => (
								<TableCell
									align={"center"}
									key={index}
									style={{
										color: Colors.primary,
										fontFamily: Fonts().primaryBold,
										fontSize: 12,
										background: getCode(index > 2 ? ele : "ko"),
									}}
								>
									{ele}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{personnes.length > 0 &&
							personnes.map((row, index) => (
								<React.Fragment key={row?.idPersonnel}>
									{index === 0 && (
										<TableRow
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
											key={row?.idPersonnel}
										>
											<TableCell
												align="center"
												className={classes.TableCell}
												style={{ color: "gray" }}
											/>
											<TableCell
												align="center"
												className={classes.TableCell}
												style={{ color: "gray" }}
											/>
											<TableCell
												align="center"
												className={classes.TableCell}
												style={{ color: "gray" }}
											/>
											{personnes.length > 0 &&
												daysList.map((ele, index) => (
													<TableCell
														align="center"
														className={classes.TableCell}
														style={{ color: "gray", padding: "8px 0px" }}
														key={index}
													>
														<div
															className="parties_class"
															style={{
																background: getCode(ele),
															}}
														>
															<table className="parties_table">
																<tbody>
																	<tr className="parties_content">
																		<td
																			style={{
																				width: "50%",
																				fontFamily: Fonts().primaryBold,
																			}}
																		>
																			{(row.type === "demi") |
																				(row.type === "jour") &&
																			row.projet !== true
																				? "Heure de début"
																				: ""}
																		</td>
																		<td
																			style={{
																				borderLeft: "1px solid",
																				width: 1,
																			}}
																		>
																			<Divider orientation="vertical" />
																		</td>
																		<td
																			style={{
																				width: "50%",
																				fontFamily: Fonts().primaryBold,
																			}}
																		>
																			{(row.type === "demi") |
																				(row.type === "jour") &&
																			row.projet !== true
																				? "Heure de fin"
																				: ""}
																		</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</TableCell>
												))}
											<TableCell
												align="center"
												className={classes.TableCell}
												style={{ color: "gray" }}
											/>
										</TableRow>
									)}
									<TableRow
										key={row.id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell
											align="center"
											className={classes.TableCell}
											style={{ color: "gray" }}
										>
											{index + 1}
										</TableCell>
										<TableCell
											align="left"
											className={classes.TableCell}
											style={{ color: "gray" }}
										>
											{row.projet !== true && (
												<FormGroup>
													<FormControlLabel
														style={{ fontSize: "12px" }}
														control={
															<Checkbox
																checked={row.isChecked}
																onChange={(e) =>
																	handleChecked(e, row.idPersonnel)
																}
																sx={{
																	color: Colors.primary,
																	"&.Mui-checked": {
																		color: Colors.primary || "default",
																	},
																}}
															/>
														}
													/>
												</FormGroup>
											)}
											{/* <IconButton
                        IconName={SaveIcon}
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
                        pressed={() => handleSave(row?.id, row?.privileges)}
                      /> */}
										</TableCell>
										<TableCell
											align="center"
											className={classes.TableCell}
											style={{ color: "gray" }}
										>
											{row.nom + " " + row.prenom}
										</TableCell>
										{row.horaires.length > 0 &&
											row.horaires.map((ele, counter) =>
												periode === "mensuel" ? (
													ele.semaine === selectedWeek && (
														<TableCell
															key={ele.id}
															align="center"
															className={classes.TableCell}
															style={{
																color: "gray",
																background: getCode(ele.jourName),
															}}
														>
															{row.projet === false && (
																<div
																	className="tsInputContainer"
																	style={{ position: "relative" }}
																>
																	<span
																		style={{
																			position: "absolute",
																			padding: "4px 13px",
																			width: "auto",
																			background:
																				ele?.status === "valider"
																					? "#11ad3b"
																					: ele?.status === "nouveau"
																					? "#d1a745"
																					: "#f57542",
																			top: "-29px",
																			borderRadius: "11px",
																			color: "#FFF",
																			fontFamily: Fonts().primarySemiBold,
																			fontSize: "10px",
																		}}
																	>
																		{ele?.status}
																	</span>
																	<div className="tsInput">
																		<TextInput
																			disabled={ele?.jourTravaille === 0}
																			key={`input-${index}`}
																			label="Heure de début"
																			IconName={AlarmIcon}
																			value={
																				row?.idPersonnel === personId &&
																				party === "matin1" &&
																				ele.id === houreId &&
																				ele.jourName === dayInput &&
																				ele.semaine === semaineNane
																					? party1He
																					: ele?.party1He
																			}
																			maxLength={5}
																			placeholder="00:00"
																			handleChangeValue={(e) =>
																				handleTimeChange(
																					e,
																					"matin1",
																					row.idPersonnel,
																					ele.id,
																					ele.jourName,
																					ele.semaine,
																					"h1",
																				)
																			}
																			style={{ width: "90%", borderRadius: 2 }}
																			removeBase
																			useGray
																		/>
																		{row.type === "demi" && (
																			<TextInput
																				disabled={ele?.jourTravaille === 0}
																				label="Heure de fin"
																				IconName={AlarmIcon}
																				value={
																					row?.idPersonnel === personId &&
																					party === "matin2" &&
																					ele.id === houreId &&
																					ele.jourName === dayInput &&
																					ele.semaine === semaineNane
																						? party1Hs
																						: ele?.party1Hs
																				}
																				handleChangeValue={(e) =>
																					handleTimeChange(
																						e,
																						"matin2",
																						row.idPersonnel,
																						ele.id,
																						ele.jourName,
																						ele.semaine,
																						"h2",
																					)
																				}
																				style={{
																					width: "90%",
																					borderRadius: 2,
																				}}
																				removeBase
																				useGray
																			/>
																		)}
																	</div>
																	<span
																		style={{
																			borderLeft: "1px solid",
																			width: 1,
																			height: "18px",
																		}}
																	/>
																	<div className="tsInput">
																		{row.type === "demi" && (
																			<TextInput
																				disabled={ele?.jourTravaille === 0}
																				label={
																					typeOfDayValue === "Par demi journée"
																						? "Heure de début"
																						: "Heure de fin"
																				}
																				IconName={AlarmIcon}
																				value={
																					row?.idPersonnel === personId &&
																					party === "soire1" &&
																					ele.id === houreId &&
																					ele.jourName === dayInput &&
																					ele.semaine === semaineNane
																						? party2He
																						: ele?.party2He
																				}
																				handleChangeValue={(e) =>
																					handleTimeChange(
																						e,
																						"soire1",
																						row.idPersonnel,
																						ele.id,
																						ele.jourName,
																						ele.semaine,
																						"s1",
																					)
																				}
																				style={{
																					width: "90%",
																					borderRadius: 2,
																				}}
																				removeBase
																				useGray
																			/>
																		)}
																		<TextInput
																			disabled={ele?.jourTravaille === 0}
																			label="Heure de fin"
																			IconName={AlarmIcon}
																			value={
																				row?.idPersonnel === personId &&
																				party === "soire2" &&
																				ele.id === houreId &&
																				ele.jourName === dayInput &&
																				ele.semaine === semaineNane
																					? party2Hs
																					: ele?.party2Hs
																			}
																			handleChangeValue={(e) =>
																				handleTimeChange(
																					e,
																					"soire2",
																					row.idPersonnel,
																					ele.id,
																					ele.jourName,
																					ele.semaine,
																					"s2",
																				)
																			}
																			style={{ width: "90%", borderRadius: 2 }}
																			removeBase
																			useGray
																		/>
																	</div>
																</div>
															)}
															{row.projet !== false && <h1>avec projet</h1>}
														</TableCell>
													)
												) : (
													<TableCell
														key={ele.id}
														align="center"
														className={classes.TableCell}
														style={{
															color: "gray",
															background: getCode(ele.jourName),
														}}
													>
														{row.projet === false && (
															<div
																className="tsInputContainer"
																style={{ position: "relative" }}
															>
																<span
																	style={{
																		position: "absolute",
																		padding: "4px 13px",
																		width: "auto",
																		background:
																			ele?.status === "valider"
																				? "#11ad3b"
																				: ele?.status === "nouveau"
																				? "#d1a745"
																				: "#f57542",
																		top: "-29px",
																		borderRadius: "11px",
																		color: "#FFF",
																		fontFamily: Fonts().primarySemiBold,
																		fontSize: "10px",
																	}}
																>
																	{ele?.status}
																</span>
																<div className="tsInput">
																	<TextInput
																		disabled={
																			ele?.status === "off" ||
																			ele?.status === "holiday"
																		}
																		key={`input-${index}`}
																		label="Heure de début"
																		IconName={AlarmIcon}
																		value={
																			row?.idPersonnel === personId &&
																			party === "matin1" &&
																			ele.id === houreId &&
																			ele.jourName === dayInput &&
																			ele.semaine === semaineNane
																				? party1He
																				: ele?.party1He
																		}
																		maxLength={5}
																		placeholder="00:00"
																		handleChangeValue={(e) =>
																			handleTimeChange(
																				e,
																				"matin1",
																				row.idPersonnel,
																				ele.id,
																				ele.jourName,
																				ele.semaine,
																				"h1",
																			)
																		}
																		style={{ width: "90%", borderRadius: 2 }}
																		removeBase
																		useGray
																	/>
																	{row.type === "demi" && (
																		<TextInput
																			disabled={
																				ele?.status === "off" ||
																				ele?.status === "holiday"
																			}
																			label="Heure de fin"
																			IconName={AlarmIcon}
																			value={
																				row?.idPersonnel === personId &&
																				party === "matin2" &&
																				ele.id === houreId &&
																				ele.jourName === dayInput &&
																				ele.semaine === semaineNane
																					? party1Hs
																					: ele?.party1Hs
																			}
																			handleChangeValue={(e) =>
																				handleTimeChange(
																					e,
																					"matin2",
																					row.idPersonnel,
																					ele.id,
																					ele.jourName,
																					ele.semaine,
																					"h2",
																				)
																			}
																			style={{ width: "90%", borderRadius: 2 }}
																			removeBase
																			useGray
																		/>
																	)}
																</div>
																<span
																	style={{
																		borderLeft: "1px solid",
																		width: 1,
																		height: "18px",
																	}}
																/>
																<div className="tsInput">
																	{row.type === "demi" && (
																		<TextInput
																			disabled={
																				ele?.status === "off" ||
																				ele?.status === "holiday"
																			}
																			label={"Heure de début"}
																			IconName={AlarmIcon}
																			value={
																				row?.idPersonnel === personId &&
																				party === "soire1" &&
																				ele.id === houreId &&
																				ele.jourName === dayInput &&
																				ele.semaine === semaineNane
																					? party2He
																					: ele?.party2He
																			}
																			handleChangeValue={(e) =>
																				handleTimeChange(
																					e,
																					"soire1",
																					row.idPersonnel,
																					ele.id,
																					ele.jourName,
																					ele.semaine,
																					"s1",
																				)
																			}
																			style={{ width: "90%", borderRadius: 2 }}
																			removeBase
																			useGray
																		/>
																	)}
																	<TextInput
																		disabled={
																			ele?.status === "off" ||
																			ele?.status === "holiday"
																		}
																		label="Heure de fin"
																		IconName={AlarmIcon}
																		value={
																			row?.idPersonnel === personId &&
																			party === "soire2" &&
																			ele.id === houreId &&
																			ele.jourName === dayInput &&
																			ele.semaine === semaineNane
																				? party2Hs
																				: ele?.party2Hs
																		}
																		handleChangeValue={(e) =>
																			handleTimeChange(
																				e,
																				"soire2",
																				row.idPersonnel,
																				ele.id,
																				ele.jourName,
																				ele.semaine,
																				"s2",
																			)
																		}
																		style={{ width: "90%", borderRadius: 2 }}
																		removeBase
																		useGray
																	/>
																</div>
															</div>
														)}
														{row.projet !== false && (
															<Button
																disabled={
																	ele?.status === "off" ||
																	ele?.status === "holiday"
																}
																btnText={"générer timesheet par un projet"}
																IconName={DoneIcon}
																handlePressed={() =>
																	generateTsPerProjectModal(
																		row?.horaires[0]?.id,
																	)
																}
																// isLoading={isLoading}
																style={{
																	color: Colors.blackText,
																	backgroundColor: Colors.success,
																	borderRadius: 12,
																	padding: "15px 26px",
																	fontFamily: Fonts().primaryRegular,
																	fontSize: "12px",
																	marginTop: "8px",
																	width: "50%",
																	marginRight: "auto",
																	marginLeft: "auto",
																}}
																styleDisabled={{
																	color: Colors.blackText,
																	backgroundColor: "rgb(93, 116 ,114)",
																	borderRadius: 12,
																	padding: "15px 26px",
																	fontFamily: Fonts().primaryRegular,
																	fontSize: "12px",
																	marginTop: "8px",
																	width: "50%",
																	marginRight: "auto",
																	marginLeft: "auto",
																}}
															/>
														)}
													</TableCell>
												),
											)}
									</TableRow>
								</React.Fragment>
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
	TsTime: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		padding: 0,
		margin: "1px 3px",
	},
	h6Typo: {
		fontSize: "13px",
		fontWeight: Fonts().primaryRegular,
	},
});
