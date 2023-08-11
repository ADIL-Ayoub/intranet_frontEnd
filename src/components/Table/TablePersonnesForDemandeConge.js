import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useColors, Fonts } from "@common";
import { Button, Modal, Search } from "@components";
import { Paginations } from "@components";
import { Divider } from "@mui/material";
import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default ({
	personnes,
	isLoadingForTable,
	handleClickOpen,
	handleClose,
	usePagination,
	page,
	rowsPerPage,
	handleChangeRowsPerPage,
	handleChangePage,
	count,
	handleChangeSearch,
	searchValue,
}) => {
	const Colors = useColors();
	useEffect(() => {
		console.log(personnes);
	}, []);
	const headerContent = ["#", "CIN", "Nom", "Prenom", "Selectionner"];

	return (
		<div>
			{isLoadingForTable && (
				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={isLoadingForTable}
					onClick={handleClose}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
			<Search
				value={searchValue}
				onChange={(e) => handleChangeSearch(e.target.value)}
			></Search>
			<TableContainer
				sx={{ backgroundColor: Colors?.tableBg, width: "100%" }}
				component={Paper}
			>
				<Table sx={{ width: "100%" }} aria-label="simple table">
					<TableHead>
						<TableRow>
							{headerContent.map((header, index) => (
								<TableCell
									key={index}
									style={{
										color: Colors?.primary,
										fontFamily: Fonts().primaryBold,
										fontSize: 12,
									}}
								>
									{header}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{personnes.map((row, index) => (
							<TableRow key={index}>
								<TableCell style={{ color: "grey" }}>{index + 1}</TableCell>
								<TableCell style={{ color: "grey" }}>{row?.cin}</TableCell>
								<TableCell style={{ color: "grey" }}>{row?.nom}</TableCell>
								<TableCell style={{ color: "grey" }}>{row?.prenom}</TableCell>
								<TableCell>
									<div style={{ display: "flex" }}>
										{
											<>
												<Button
													btnText={""}
													IconName={"CheckBoxOutlineBlankIcon"}
													handlePressed={() => handleClickOpen(row)}
													styleDisabled={{
														borderRadius: "12px",
														padding: "10px",
														fontFamily: Fonts().primaryRegular,
														fontSize: "10px",
														margin: "10px",
														width: "100%",
														background: "#dbdbdb",
														text: "#FFF",
													}}
													style={{
														color: "rgb(0,0,0)",
														backgroundColor: "white",
														borderRadius: 12,
														padding: "1px 1px",
														fontFamily: Fonts().primaryRegular,
														fontSize: 10,
														margin: "10px",
														//width: "80%",
													}}
													isForPerson
												></Button>
											</>
										}
									</div>
								</TableCell>
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
