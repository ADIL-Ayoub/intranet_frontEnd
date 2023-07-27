import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useColors, Fonts } from "@common";

function FetchDemande() {
	const Colors = useColors();
	const headerContent = [
		"Nom Demande",
		"Date Demande",
		"Type",
		"Etat",
		"Action",
	];
	return (
		<>
			<div>hello</div>
			<TableContainer component={Paper}>
				<Table sx={{ width: "70%" }} aria-label="simple table">
					<TableHead>
						<TableRow>
							{headerContent.map((item, index) => {
								<TableCell
									align={index === 0 ? "left" : "center"}
									key={index}
									style={{
										color: Colors.primary,
										//fontFamily: Fonts().primaryBold,
										fontSize: 12,
									}}
								>
									{item}
								</TableCell>;
							})}
						</TableRow>
					</TableHead>
					<TableBody></TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default FetchDemande;
