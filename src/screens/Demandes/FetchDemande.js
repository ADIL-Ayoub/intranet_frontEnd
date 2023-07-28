import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useColors, Fonts, FontSize } from "@common";
import { useState, useEffect } from "react";
import { DEMANDE } from "@services";
import { useSelector } from "react-redux";
import { Button, Modal } from "@components";
import { Key } from "@mui/icons-material";

function FetchDemande() {
	//const HEIGHT = window.innerHeight;
	//const WIDTH = window.innerWidth;
	const Colors = useColors();
	const user = useSelector(({ account }) => account.user);

	const [demandes, setDemandes] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		DEMANDE.getMyDemandes(user.id)
			.then((response) => {
				setDemandes(response.data.content);
				console.log(response.data.content);
			})
			.catch((e) => console.log(e));
	}, []);
	const headerContent = [
		"idLigne",
		"Nom Demande",
		"Date Demande",
		"Type",
		"Etat",
		"Action",
	];
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickAnnuler = (index) => {
		console.log(demandes[index]);
		// DEMANDE.annulerDemande(user.id, item);
		setOpen(false);
	};
	return (
		<TableContainer
			sx={{ backgroundColor: Colors?.tableBg, width: "95%" }}
			component={Paper}
		>
			<Table sx={{ width: "80%" }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{headerContent.map((item, index) => (
							<TableCell
								//align={index === 0 ? "left" : "center"}
								key={index}
								style={
									item == "idLigne"
										? { display: "flex" }
										: {
												color: Colors?.primary,
												fontFamily: Fonts().primaryBold,
												fontSize: 12,
										  }
								}
							>
								{item}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{demandes.map((item, index) => (
						<TableRow key={index}>
							<TableCell>{index}</TableCell>
							<TableCell>{item.nomConge}</TableCell>
							<TableCell>{item.dateDemande}</TableCell>
							<TableCell>{item.typeDemande}</TableCell>
							<TableCell>{item.statutDemande}</TableCell>
							<TableCell>
								<div style={{ display: "flex" }}>
									<Button
										btnText={"Modifier"}
										IconName={"AiOutlineCheck"}
										// handlePressed={}
										//isLoading={false}
										style={{
											color: Colors.blackText,
											backgroundColor: "#105DA6",
											borderRadius: 12,
											padding: "10px 10px",
											fontFamily: Fonts().primaryRegular,
											fontSize: 10,
											marginTop: "22px",
											width: "100%",
										}}
									/>
									<Button
										btnText={"Annuler"}
										IconName={"AiOutlineCheck"}
										handlePressed={handleClickOpen}
										//isLoading={false}
										style={{
											color: Colors.blackText,
											backgroundColor: Colors.error,
											borderRadius: 12,
											padding: "10px 10px",
											fontFamily: Fonts().primaryRegular,
											fontSize: 10,
											marginTop: "22px",
											width: "100%",
										}}
									/>
									<Modal
										open={open}
										title="Confirmer l' action"
										positiveText={"Confirmer"}
										negativeText={"Annuler"}
										handleClose={handleClose}
										handlePositiveEvent={() => handleClickAnnuler(index)}
									></Modal>
									<Button
										btnText={"Details"}
										IconName={"AiOutlineCheck"}
										//handlePressed={() => {}}
										//isLoading={false}
										style={{
											color: Colors.blackText,
											backgroundColor: Colors.primary,
											borderRadius: 12,
											padding: "10px 10px",
											fontFamily: Fonts().primaryRegular,
											fontSize: 10,
											marginTop: "22px",
											width: "100%",
										}}
									/>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default FetchDemande;
