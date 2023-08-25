import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useColors, Fonts } from "@common";
import { Button, Modal } from "@components";
import { Paginations } from "@components";
import { Divider } from "@mui/material";

const TableValidationConges = ({
	demandes,
	open,
	handleClickOpenValider,
	handleClickOpenRefuser,
	handleClickOpenAccepter,
	handleClickOpenRejeter,
	handleClickValider,
	handleClickRefuser,
	handleClickAccepter,
	handleClickRejeter,
	handleClose,
	usePagination,
	page,
	rowsPerPage,
	handleChangeRowsPerPage,
	handleChangePage,
	count,
	handleSortMethod,
	sort,
	action,
}) => {
	const Colors = useColors();

	const headerContent = [
		"#",
		"Nom Congé",
		"Date Demande",
		"Date Debut",
		"Date Reprise",
		"Nombre des jours",
		"Description",
		"Etat",
		"Action",
	];

	const minimizeString = (str) => {
		return str.length > 20 ? str.substring(0, 20) + "..." : str;
	};

	return (
		<div>
			<TableContainer
				sx={{ backgroundColor: Colors?.tableBg, width: "95%" }}
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
									{header == "Date Demande" ? (
										<Button
											sort={sort}
											isFilter
											btnText={header}
											IconName={"AiOutlineCheck"}
											handlePressed={handleSortMethod}
											//isLoading={false}
											style={{
												color: Colors.primary,
												backgroundColor: "transparent",
												borderRadius: 12,
												padding: "10px 10px",
												fontFamily: Fonts().primaryRegular,
												fontSize: 12,
												margin: "10px",
												width: "100%",
												fontWeight: "bold",
												textTransform: "capitalize",
											}}
										/>
									) : (
										header
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{demandes.map((row, index) => (
							<TableRow key={row?.id}>
								<TableCell style={{ color: "grey" }}>{index + 1}</TableCell>
								<TableCell style={{ color: "grey" }}>
									{minimizeString(row.nomConge)}
								</TableCell>
								<TableCell style={{ color: "grey" }}>
									{row.dateDemande}
								</TableCell>
								<TableCell style={{ color: "grey" }}>{row.dateDebut}</TableCell>
								<TableCell style={{ color: "grey" }}>
									{row.dateReprise}
								</TableCell>
								<TableCell style={{ color: "grey" }}>{row.nbrJours}</TableCell>
								<TableCell style={{ color: "grey" }}>
									{minimizeString(row.description)}
								</TableCell>
								<TableCell style={{ color: "grey" }}>
									{row.statutDemande}
								</TableCell>
								<TableCell>
									<div style={{ display: "flex" }}>
										{row?.statutDemande !== "demande annulation" ? (
											<>
												<Button
													disabled={row?.statutDemande == "validé"}
													btnText={"Valider"}
													IconName={"AiOutlineCheck"}
													handlePressed={() => handleClickOpenValider(row)}
													//isLoading={false}
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
														color: Colors.blackText,
														backgroundColor: "#105DA6",
														borderRadius: 12,
														padding: "10px 10px",
														fontFamily: Fonts().primaryRegular,
														fontSize: 10,
														margin: "10px",
														width: "100%",
													}}
												/>
												<Button
													disabled={row?.statutDemande == "refusé"}
													btnText={"Refuser"}
													IconName={"AiOutlineCheck"}
													handlePressed={() => handleClickOpenRefuser(row)}
													//isLoading={false}
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
														color: Colors.blackText,
														backgroundColor: Colors.error,
														borderRadius: 12,
														padding: "10px 10px",
														fontFamily: Fonts().primaryRegular,
														fontSize: 10,
														margin: "10px",
														width: "100%",
													}}
												/>
											</>
										) : (
											<>
												<Button
													disabled={row?.statutDemande == "validé"}
													btnText={"Accepter"}
													IconName={"AiOutlineCheck"}
													handlePressed={() => handleClickOpenAccepter(row)}
													//isLoading={false}
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
														color: Colors.blackText,
														backgroundColor: "rgb(0 ,176, 7)",
														borderRadius: 12,
														padding: "10px 10px",
														fontFamily: Fonts().primaryRegular,
														fontSize: 10,
														margin: "10px",
														width: "100%",
													}}
												/>
												<Button
													disabled={row?.statutDemande == "refusé"}
													btnText={"Rejeter"}
													IconName={"AiOutlineCheck"}
													handlePressed={() => handleClickOpenRejeter(row)}
													//isLoading={false}
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
														color: Colors.blackText,
														backgroundColor: Colors.error,
														borderRadius: 12,
														padding: "10px 10px",
														fontFamily: Fonts().primaryRegular,
														fontSize: 10,
														margin: "10px",
														width: "100%",
													}}
												/>
											</>
										)}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Modal
					open={open}
					title={
						action == "valider"
							? "Confirmer la validation"
							: action == "refuser"
							? "Confirmer le refus"
							: action == "accepter"
							? "Confirmer l' acceptation"
							: "Confirmer le rejet"
					}
					positiveText={"Confirmer"}
					negativeText={"Annuler"}
					handleClose={handleClose}
					handlePositiveEvent={
						action == "valider"
							? handleClickValider
							: action == "refuser"
							? handleClickRefuser
							: action == "accepter"
							? handleClickAccepter
							: handleClickRejeter
					}
				/>
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

export default TableValidationConges;
