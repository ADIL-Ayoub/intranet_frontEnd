import {
	TablePersonnesForDemandeConge,
	Modal,
	Button,
	TextInput,
	Select,
	DatePicker,
} from "@components";
import { useState, useEffect } from "react";
import { DEMANDE, PERSONNES, CONGE, HOLIDAYS } from "@services";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useToast, Fonts, useColors, FontSize } from "@common";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Divider } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";

export default () => {
	const user = useSelector(({ account }) => account.user);

	const [personnes, setPersonnes] = useState([]);
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [count, setCount] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();
	const [currentPersonnel, setCurrentPersonnel] = useState(null);
	const [openMainModal, setOpenMainModal] = useState(false);
	const Colors = useColors();
	const [TaskName, setTaskName] = useState("");
	const [description, setDescription] = useState("");
	const [demande, setDemande] = useState({});
	const [dateStart, setDateStart] = useState(null);
	const [dateEnd, setDateEnd] = useState(null);
	const [holidays, setHolidays] = useState([]);
	const [holidaysDetails, setHolidaysDetails] = useState([]);
	const [typeConge, setTypeConge] = useState(null);
	const [searchValue, setSearchValue] = useState("");
	const [isLoadingForTable, setIsLoadingForTable] = useState(false);
	useEffect(() => {
		setIsLoadingForTable(true);
		PERSONNES.findPersonneByCodeSup(user.id, rowsPerPage, page, searchValue)
			.then((response) => {
				setPersonnes(response.data.content);
				setCount(response.data.totalElements);
				setPage(response?.data?.pageable?.pageNumber);
				setRowsPerPage(response?.data?.pageable?.pageSize);
				setIsLoadingForTable(false);
			})
			.catch((e) => setIsLoadingForTable(false));
	}, [count, rowsPerPage, page, searchValue]);
	const handleClickOpen = (personnel) => {
		console.log(personnel);
		setCurrentPersonnel(personnel);
		handleCloseMainModal();
	};

	const handleClose = () => {
		setOpen(false);
		setIsLoading(false);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleClickValider = () => {
		handleClose();
		handleCloseMainModal();
		console.log(currentPersonnel);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const handleOpenMainModal = () => {
		setOpenMainModal(true);
	};
	const handleCloseMainModal = () => {
		setOpenMainModal(false);
	};
	const handleAddNewCongeForEmployee = () => {
		setIsLoading(true);
		let data = {
			name: TaskName,
			description,
			typeDemande: demande.id,
			typeConge,
			dateDebut: dateStart,
			dateReprise: dateEnd,
		};
		CONGE.ajouterDemandeCongeParSuperieur(
			user.id,
			currentPersonnel?.id,
			demande.id,
			data,
		)
			.then((response) => {
				handleClose();
				if (response.status === 200 || response.status === 201) {
					toast("success", response?.data?.message);
					setTaskName("");
					setDescription("");
					setDateStart(null);
					setDateEnd(null);
					setTypeConge(null);
				} else if (response.status === 500) {
					toast("error", response?.response?.data);
				} else {
					toast("error", response?.response?.data?.message);
				}
			})
			.catch((error) => (setIsLoading = false));
	};

	useEffect(() => {
		setIsLoading(true);
		DEMANDE.getTypeDemandeByCodeTypeDemande("DC")
			.then((response) => {
				handleClose();
				setDemande(response.data);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
			});
		// Pour obtenir toutes les données de la personne y compris son id d'après l 'id du user
		// PERSONNES.findPersonneByUser(user.id)
		// 	.then((response) => {
		// 		setPersonne(response.data);
		// 	})
		// 	.catch((e) => console.log(e));
		FetchHolidays();
	}, []);
	const handleOnChangeTypeOfConge = (e) => {
		const find = holidays.find((ele) => ele?.id === e.target.value);
		setHolidaysDetails(find?.detaileConges);
		setTypeConge(e.target.value);
	};
	const handleChangeDateStart = (newDatePicked) => {
		const currentDate = new Date();
		let differenceInDays = calculateDifferenceBetweenTwoDates(
			currentDate,
			newDatePicked,
		);
		if (differenceInDays < 2) {
			toast(
				"error",
				"Erreur: Veuillez inserer une date valide et differente de 2 jours de la date actuelle!",
			);
			setDateStart(null);
		} else {
			setDateStart(newDatePicked);
		}
	};
	const calculateDifferenceBetweenTwoDates = (startDate, endDate) => {
		let differenceInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
		return differenceInDays < 0
			? differenceInDays
			: (differenceInDays = Math.ceil(differenceInDays));
	};
	const handleChangeDateEnd = (newDatePicked) => {
		const date = !!dateStart ? dateStart : new Date();
		let differenceInDays = calculateDifferenceBetweenTwoDates(
			date,
			newDatePicked,
		);
		if (differenceInDays < 1) {
			toast(
				"error",
				"Erreur: La date de reprise doit etre de 1 jour de difference  de la date de depart",
			);
			setDateEnd(null);
		} else {
			setDateEnd(new Date(newDatePicked));
		}
	};
	const FetchHolidays = () => {
		setIsLoading(true);
		HOLIDAYS.GetAllHolidays()
			.then((data) => {
				setIsLoading(false);
				if (data.status === 200 || data.status === 201) {
					setHolidays(!!data ? data?.data : []);
				}
			})
			.catch((error) => {
				setIsLoading(false);
				if (error) {
					if (error?.response?.data) {
						toast(
							"error",
							error?.response?.data?.message || "quelque chose s'est mal passé",
						);
					} else {
						toast("error", "quelque chose s'est mal passé");
					}
				} else {
					toast("error", "quelque chose s'est mal passé");
				}
			});
	};
	const handleChangeSearch = (value) => {
		setSearchValue(value);
		console.log(value);
	};
	return (
		<>
			<div style={{ display: "flex" }}>
				<span style={{ marginTop: "5px" }}>Veuillez choisir un employé:</span>
				<Button
					btnText={"Choisir"}
					IconName={"CheckBoxOutlineBlankIcon"}
					handlePressed={handleOpenMainModal}
					style={{
						color: "white",
						backgroundColor: Colors.primary,
						borderRadius: 12,
						padding: "10px 10px",
						fontFamily: Fonts().primaryBold,
						fontSize: 10,
						margin: "0px 10px",
					}}
				></Button>
				{currentPersonnel && (
					<div style={{ display: "flex" }}>
						<TextInput
							disabled
							label="CIN"
							IconName={AddIcon}
							value={currentPersonnel?.cin}
							handleChangeValue={(e) => setTaskName(e.target.value)}
							style={{ width: "100%", marginLeft: 8, borderRadius: 22 }}
							removeBase
							useGray
						/>
						<TextInput
							disabled
							label="Nom"
							IconName={AddIcon}
							value={currentPersonnel?.nom}
							handleChangeValue={(e) => setTaskName(e.target.value)}
							style={{ width: "100%", marginLeft: 8, borderRadius: 22 }}
							removeBase
							useGray
						/>
						<TextInput
							disabled
							label="Prenom"
							IconName={AddIcon}
							value={currentPersonnel?.prenom}
							handleChangeValue={(e) => setTaskName(e.target.value)}
							style={{ width: "100%", marginLeft: 8, borderRadius: 22 }}
							removeBase
							useGray
						/>
					</div>
				)}
				<Modal
					open={openMainModal}
					style={{ width: "100%" }}
					title={""}
					negativeText={"Fermer"}
					handleClose={handleCloseMainModal}
				>
					<TablePersonnesForDemandeConge
						personnes={personnes}
						open={open}
						isLoadingForTable={isLoadingForTable}
						handleClickOpen={handleClickOpen}
						handleClickValider={handleClickValider}
						handleClose={handleClose}
						page={page}
						rowsPerPage={rowsPerPage}
						handleChangeRowsPerPage={handleChangeRowsPerPage}
						handleChangePage={handleChangePage}
						count={count}
						usePagination
						handleChangeSearch={handleChangeSearch}
						searchValue={searchValue}
					/>
				</Modal>
			</div>
			<div>
				{currentPersonnel && (
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-start",
							alignItems: "center",
						}}
					>
						{isLoading && (
							<Backdrop
								sx={{
									color: "#fff",
									zIndex: (theme) => theme.zIndex.drawer + 1,
								}}
								open={isLoading}
								onClick={handleClose}
							>
								<CircularProgress color="inherit" />
							</Backdrop>
						)}
						<div className="title__conge">
							<MiscellaneousServicesIcon style={{ color: "#716f6f" }} />
							<h4
								className="title_parametre"
								style={{
									fontFamily: Fonts().primaryRegular,
									color: "#716f6f",
									marginLeft: 8,
									fontSize: 16,
								}}
							>
								Damande d'autorisation du{" "}
								<span style={{ borderBottom: "3px solid #ec9f36" }}>congé</span>
							</h4>
						</div>
						<div style={{ width: "100%" }}>
							<Divider />
							<br />
						</div>
						<div className="paramertrage__conge_item">
							<div className="signle__items__settings">
								<div className="test_class">
									<TextInput
										label="Nom du congé"
										IconName={AddIcon}
										value={TaskName}
										handleChangeValue={(e) => setTaskName(e.target.value)}
										style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
										removeBase
										useGray
									/>
									<TextInput
										label="Description"
										IconName={AddIcon}
										value={description}
										handleChangeValue={(e) => setDescription(e.target.value)}
										style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
										removeBase
										useGray
									/>
								</div>
								<div className="title__of__conge">
									<Select
										isHolidays
										useId
										label={"Type de Congé"}
										data={holidays}
										style={{
											width: "100%",
											marginTop: 3,
											marginBottom: 3,
										}}
										value={typeConge}
										handleOnChange={handleOnChangeTypeOfConge}
									/>
								</div>
								<div>
									{!!typeConge && (
										<div className="test_class">
											<DatePicker
												label="Date de depart"
												value={dateStart}
												onChangeDate={handleChangeDateStart}
											/>
											<DatePicker
												label="Date de reprise"
												value={dateEnd}
												onChangeDate={handleChangeDateEnd}
											/>
										</div>
									)}
								</div>
							</div>
							<br />
							<Divider />
							<br />
							<div className="conge__actions">
								<Button
									disabled={
										!dateStart ||
										!dateEnd ||
										!TaskName ||
										!description ||
										!typeConge
									}
									btnText={"Sauvegarder"}
									IconName={DoneIcon}
									handlePressed={handleAddNewCongeForEmployee}
									isLoading={isLoading}
									styleDisabled={{
										text: "#FFF",
										background: "#dbdbdb",
										borderRadius: 12,
										padding: "15px 26px",
										fontFamily: Fonts().primaryRegular,
										fontSize: FontSize().smallText,
										marginTop: "22px",
										width: "100%",
									}}
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
						</div>
					</div>
				)}
			</div>
		</>
	);
};
