import React, { useState, useEffect } from "react";
import { TextInput } from "@components";
import FlagIcon from "@mui/icons-material/Flag";

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
	TimesheetByProject,
} from "@components";
import { Box, Divider, Grid } from "@mui/material";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import { useColors, Fonts, useToast, FontSize } from "@common";
import SegmentIcon from "@mui/icons-material/Segment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
	CLEINTS,
	SERVICES,
	PERSONNES,
	DEPARTEMENT,
	TIMESHEETS,
} from "@services";
import { useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import TuneIcon from "@mui/icons-material/Tune";
import DoneIcon from "@mui/icons-material/Done";
import SettingsIcon from "@mui/icons-material/Settings";
import MAButton from "@mui/material/Button";
import { STOREDATA } from "@redux/account/types";
import { useDispatch } from "react-redux";
import {
	format,
	eachDayOfInterval,
	startOfWeek,
	endOfWeek,
	getISOWeek,
	startOfMonth,
	endOfMonth,
	addDays,
	isSameMonth,
} from "date-fns";
import { fr } from "date-fns/locale";
import "./services.css";
import { useSelector } from "react-redux";
import { TIMESHEETBYPROJECT } from "@services";

const HeaderContent = ["#", "$", "Nom & prénom"];
const hexChars = "0123456789ABCDEF";

const TypesTs = [
	{ id: 1, name: "Pointeuse" },
	{ id: 2, name: "Houraire" },
	{ id: 3, name: "Manuel" },
];

const DaysType = [
	{ id: 1, name: "journalier" },
	{ id: 2, name: "Hebdomadaire" },
	{ id: 3, name: "mensuel" },
];

const TypesOfDays = [
	{ id: 1, name: "Par Journée complète" },
	{ id: 2, name: "Par demi journée" },
];

export default ({}) => {
	const { user, dataTable } = useSelector(({ account }) => account);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const toast = useToast();
	const Colors = useColors();
	const [typeTs, setTypeTs] = useState(null);
	const [isAuto, setIsAuto] = useState(false);
	const [isWithProject, setIsWithProject] = useState(false);
	const [serviceData, setServicesData] = useState([]);
	const [serviceValue, setServicesValue] = useState([]);
	const [personnesData, setPersonnes] = useState(dataTable | []);
	const [typesTsData, setTypesTsData] = useState(TypesTs);
	const [page, setPage] = useState(0);
	const [count, setCount] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [matricule, setMatricule] = useState("");
	const [post, setPoste] = useState("");
	const [nom, setNom] = useState("");
	const [prenom, setPrenom] = useState("");
	const [CIN, setCIN] = useState("");
	const [date, setDate] = useState(new Date());
	const [daysTypeData, setDaysTypeData] = useState(DaysType);
	const [daysTypeValue, setDaysTypeValue] = useState("journalier");
	const [open, setOpen] = useState(false);
	const [selectedPersonnes, setSelectedPesronnes] = useState([]);
	const [hDMorning, setHDMorning] = useState("");
	const [hFMorning, setHFMorning] = useState("");
	const [hDAfternon, setHDAfternon] = useState("");
	const [hFAfternon, setHFAfternon] = useState("");
	const [projet, setProjet] = useState("");
	const [time, setTimer] = useState("");
	const [description, setDescription] = useState("");
	const [tehDay, setTheDay] = useState(
		new Date().toLocaleDateString("ma-MA", { weekday: "long" }),
	); //
	const [Enddate, setEndDate] = useState(new Date());
	const [typeOfDayValue, setTypeOfDayValue] = useState("");
	const [isAbsent, setIsAbsent] = useState(false);
	const [motif, setMotif] = useState("");
	const [houreAdded, setHoureAdded] = useState("");
	const [headerContentField, setHeaderContentField] = useState(HeaderContent);
	const [daysList, setDaysList] = useState([]);
	const [weeks, setWeeks] = useState([]);
	const [selectedWeek, setSelectedWeek] = useState("");
	const [openBack, setOpenBack] = useState(false);
	const [client_id, setClientId] = useState(null);
	const [departement, setDepartements] = useState([]);
	const [clients, setClients] = useState([]);
	const [depValue, setDepValue] = useState(null);
	const [cliValue, setCliValue] = useState(null);
	const [timer, setTime] = useState("");
	const [personId, setPersonId] = useState("");
	const [dayInput, setDayInput] = useState("");
	const [houreId, setHoureId] = useState("");
	const [party, setParty] = useState("");
	const [semaineNane, setSemaineName] = useState("");
	const [party1He, setParty1He] = useState("");
	const [party1Hs, setParty1Hs] = useState("");
	const [party2He, setParty2He] = useState("");
	const [party2Hs, setParty2Hs] = useState("");
	const [checkedPersonnes, setCheckedPersonnes] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [TmpTsByProject, setTmpTsByProject] = useState([]);
	const [IdHoraire, setIdHoraire] = useState(null);

	useEffect(() => {
		// findOneClient();
		fetchDepartements();
	}, []);

	useEffect(() => {
		fitchPersonneByServices();
	}, [page, rowsPerPage]);

	const handleOnChangeDepartement = (e) => {
		setDepValue(e.target.value);
		const find = departement.find((ele) => ele.id === e.target.value);
		setClients(find.clients);
	};

	const handleOnChangeClients = (e) => {
		setCliValue(e.target.value);
		setClientId(e.target.value);
		const find = clients.find((ele) => ele.id === e.target.value);
		setServicesData(find.services);
	};

	const fetchDepartements = () => {
		setIsLoading(true);
		DEPARTEMENT.fetchDepByServiceAndResponsable(user.id)
			.then((data) => {
				setIsLoading(false);
				if (data.status === 200 || data.status === 201) {
					setDepartements(data.data);
				}
			})
			.catch((error) => {
				if (error) {
					if (error?.response) {
						toast(
							"error",
							error?.response?.data?.message || "quelque chose s'est mal passé",
						);
						setIsLoading(false);
					} else {
						toast("error", "quelque chose s'est mal passé");
						setIsLoading(false);
					}
				} else {
					toast("error", "quelque chose s'est mal passé");
					setIsLoading(false);
				}
			});
	};

	const getEndDateOfWeek = (date) => {
		const startWeekday = date.getDay();
		var endDate = null;
		const daysLeft = 8 - startWeekday;
		for (let i = 0; i < daysLeft; i++) {
			const day = new Date(date);
			day.setDate(date.getDate() + i);
			if (i === daysLeft - 1) {
				endDate = day;
			}
		}
		return format(endDate, "dd-MM-yyyy");
	};
	const handelSubmit = () => {
		setTmpTsByProject([]);
		toast("success", "Ajout fait avec succes");
		TIMESHEETBYPROJECT.TimeSheetByProject(user.id, TmpTsByProject)
			.then((response) => {
				console.log(response);
			})
			.catch((exception) => {
				console.log(exception);
			});
	};
	const fitchPersonneByServices = () => {
		setOpenBack(true);
		setIsLoading(true);
		const id = user?.id;
		const params = {
			services: serviceValue,
			matrucule: matricule,
			nom,
			prenom,
			cin: CIN,
			post: post,
			page,
			size: rowsPerPage,
			periode: daysTypeValue,
			DateD: !!date && format(new Date(date), "dd-MM-yyyy"),
			DateF:
				daysTypeValue === "journalier"
					? format(new Date(date), "dd-MM-yyyy")
					: daysTypeValue === "Hebdomadaire"
					? getEndDateOfWeek(new Date(date))
					: format(new Date(Enddate), "dd-MM-yyyy"),
		};
		TIMESHEETS.generateTimeSheets(id, params)
			.then((data) => {
				setIsLoading(false);
				if (data.status === 200 || data.status === 201) {
					const checked = { isChecked: false };
					const copyOfBackendData = [...data.data.content];
					copyOfBackendData.map((ele, index) =>
						!!ele?.isChecked
							? (copyOfBackendData[index].isChecked = false)
							: (copyOfBackendData[index] = { ...ele, ...checked }),
					);
					setPersonnes(copyOfBackendData);
					dispatch({ type: STOREDATA, payload: copyOfBackendData });
					setCount(data.data.totalElements);
					setPage(data?.data?.pageable?.pageNumber);
					setRowsPerPage(data?.data?.pageable?.pageSize);
					setOpenBack(false);
				}
			})
			.catch((error) => {
				setIsLoading(false);
				setOpenBack(false);
				if (error) {
					if (error?.response) {
						toast(
							"error",
							error?.response?.data?.message || "quelque chose s'est mal passé",
						);
						setIsLoading(false);
					} else {
						toast("error", "quelque chose s'est mal passé");
						setIsLoading(false);
					}
				} else {
					toast("error", "quelque chose s'est mal passé");
					setIsLoading(false);
				}
			});
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleOnChangeServices = (e) => {
		const {
			target: { value },
		} = e;
		setServicesValue(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value,
		);
	};

	const handleMatricule = (e) => {
		setMatricule(e.target.value);
	};

	const handleNom = (e) => {
		setNom(e.target.value);
	};

	const handlePrenom = (e) => {
		setPrenom(e.target.value);
	};

	const handlePoste = (e) => {
		setPoste(e.target.value);
	};

	const handleCIN = (e) => {
		setCIN(e.target.value);
	};

	const OnChangeDate = (value, locale) => {
		var date = new Date(value);
		const daySelected = date.toLocaleDateString(locale, { weekday: "long" });
		setTheDay(daySelected);
		setDate(value);
	};

	const handleOnChangeDaysType = (e) => {
		setDaysTypeValue(e.target.value);
	};

	const OnChangeEndDate = (e) => {
		setEndDate(e);
	};

	const getDaysArray = (start, end) => {
		setOpenBack(true);
		setHeaderContentField([...HeaderContent]);
		if (daysTypeValue === "journalier") {
			setHeaderContentField((prv) => [
				...prv,
				new Date(start).toLocaleDateString("fr-FR", { weekday: "long" }),
			]);
			setDaysList([
				new Date(start).toLocaleDateString("fr-FR", { weekday: "long" }),
			]);
		} else if (daysTypeValue === "Hebdomadaire") {
			const leftDays = getWeekdays(new Date(start));
			setDaysList(leftDays);
			setHeaderContentField((prv) => [...prv, ...leftDays]);
		} else {
			if (end > start) {
				// const Weeks = getWeeksBetweenDates("01-03-2023", "31-03-2023");
				const startDate = new Date(start);
				const endDate = new Date(end);

				const Weeks = getWeeksBetweenDates(startDate, endDate);
				setWeeks(Weeks);
				setDaysList(Weeks[0].days);
				setSelectedWeek("semaine" + Weeks[0].weekNumber);
				setIsLoading(false);
				setHeaderContentField([...HeaderContent]);
				setHeaderContentField((prv) => [...prv, ...Weeks[0].days]);
			} else {
				toast(
					"error",
					"La date de fin doit être supérieure à la date de début",
				);
			}
		}
		setTimeout(() => {
			setOpenBack(false);
		}, 500);
	};

	const getWeeksBetweenDates = (startDate, endDate) => {
		const weeks = {};
		const dates = eachDayOfInterval({ start: startDate, end: endDate });

		dates.forEach((date, index) => {
			const weekNumber = getISOWeek(date);
			if (!weeks[weekNumber]) {
				weeks[weekNumber] = { weekNumber: weekNumber, days: [] };
			}
			weeks[weekNumber].days.push(format(date, "EEEE", { locale: fr }));
		});

		return Object.values(weeks);
	};

	// in the Weekly case
	const getWeekdays = (startDate) => {
		// Get the day of the week for the given start date (Sunday = 0, Saturday = 6)
		const startWeekday = startDate.getDay();

		// Calculate the number of days left in the week
		const daysLeft = 8 - startWeekday;

		// Create a list of the weekday names for the remaining days in the week (excluding Saturday and Sunday)
		const weekdays = [];
		for (let i = 0; i < daysLeft; i++) {
			const day = new Date(startDate);
			day.setDate(startDate.getDate() + i);
			const weekdayName = day.toLocaleDateString("fr-FR", { weekday: "long" });
			// if (weekdayName !== "samedi" && weekdayName !== "dimanche") {
			weekdays.push(weekdayName);
			// }
		}
		return weekdays;
	};

	const saveDataTS = () => {
		//
	};

	const handleApplySettings = () => {
		setOpenBack(true);
		getDaysArray(date, Enddate);
		fitchPersonneByServices();
	};

	const handleSelectWeek = (days, week) => {
		setOpenBack(true);
		setSelectedWeek(week);
		setDaysList(days);
		setHeaderContentField([...HeaderContent]);
		setHeaderContentField((prv) => [...prv, ...days]);
		setTimeout(() => {
			setOpenBack(false);
		}, 500);
	};

	const handleTimeChange = (
		e,
		party,
		idP,
		idH,
		jourName,
		semaine,
		timePrty,
	) => {
		const CopyOfPersonnes = [...personnesData];
		const findInPersonnes = CopyOfPersonnes.findIndex(
			(ele) => ele.idPersonnel === idP,
		);
		const findInHoures = CopyOfPersonnes[findInPersonnes].horaires.findIndex(
			(ele) => ele.id === idH,
		);

		let value = e.target.value;
		// Ensure only numbers are entered
		value = value.replace(/[^0-9]/g, "");

		// Add colon after the second digit
		if (value.length > 2) {
			value = `${value.slice(0, 2)}:${value.slice(2)}`;
		}
		if (value.length < 6) {
			if (timePrty === "h1") {
				CopyOfPersonnes[findInPersonnes].horaires[findInHoures].party1He =
					value;
			} else if (timePrty === "h2") {
				CopyOfPersonnes[findInPersonnes].horaires[findInHoures].party1Hs =
					value;
			} else if (timePrty === "s1") {
				CopyOfPersonnes[findInPersonnes].horaires[findInHoures].party2He =
					value;
			} else if (timePrty === "s2") {
				CopyOfPersonnes[findInPersonnes].horaires[findInHoures].party2Hs =
					value;
			}
			setTime(value.slice(0, 5));
			setPersonId(idP);
			setDayInput(jourName);
			setParty(party);
			setHoureId(idH);
			setSemaineName(semaine);
			if (party === "matin1") {
				setParty1He(value);
			} else if (party === "matin2") {
				setParty1Hs(value);
			} else if (party === "soire1") {
				setParty2He(value);
			} else if (party === "soire2") {
				setParty2Hs(value);
			}
		}
		setPersonnes(CopyOfPersonnes);
	};

	const handleChecked = (e, id) => {
		const cpyOfCheckPersonnes = [...checkedPersonnes];
		const findInpersonnes = personnesData.find((ele) => ele.idPersonnel === id);
		const findIsCheck = personnesData.findIndex(
			(ele) => ele.idPersonnel === id,
		);
		if (cpyOfCheckPersonnes.length === 0) {
			setCheckedPersonnes((prv) => [...prv, findInpersonnes]);
			personnesData[findIsCheck].isChecked = true;
			setPersonnes(personnesData);
			return;
		}

		if (e.target.checked === true && cpyOfCheckPersonnes.length > 0) {
			const ifExist = cpyOfCheckPersonnes.findIndex(
				(ele) => ele.idPersonnel === id,
			);
			if (ifExist === -1) {
				setCheckedPersonnes((prv) => [...prv, findInpersonnes]);
				personnesData[findIsCheck].isChecked = true;
				setPersonnes(personnesData);
			}
		} else if (e.target.checked === false && cpyOfCheckPersonnes.length > 0) {
			const ifExist = cpyOfCheckPersonnes.findIndex(
				(ele) => ele.idPersonnel === id,
			);
			if (ifExist !== -1) {
				setCheckedPersonnes(
					cpyOfCheckPersonnes.filter((ele) => ele.idPersonnel !== id),
				);
				personnesData[findIsCheck].isChecked = false;
				setPersonnes(personnesData);
			}
		}
	};

	const Validatets = () => {
		setIsLoading(true);
		setOpenBack(true);
		TIMESHEETS.ValidateTs(user.id, checkedPersonnes)
			.then((data) => {
				setIsLoading(false);
				setOpenBack(false);
				setCheckedPersonnes([]);
				fitchPersonneByServices();
				if (data.status === 200 || data.status === 201) {
					toast("success", "Validation de Timesheets avec succès");
				} else {
					toast("error", "quelque chose s'est mal passé");
				}
			})
			.catch((error) => {
				setIsLoading(false);
				setOpenBack(false);
				if (error) {
					if (error?.response) {
						toast(
							"error",
							error?.response?.data?.message || "quelque chose s'est mal passé",
						);
						setIsLoading(false);
					} else {
						toast("error", "quelque chose s'est mal passé");
						setIsLoading(false);
					}
				} else {
					toast("error", "quelque chose s'est mal passé");
					setIsLoading(false);
				}
			});
	};

	const generateTsPerProjectModal = (id) => {
		// console.log("udududu", id)
		setOpenModal(true);
		setIdHoraire(id);
	};
	const addProject = () => {
		const object = {
			projet,
			time,
			description,
			idTimesheet: IdHoraire,
		};
		if (projet && time.length == 5 && description) {
			setTmpTsByProject((prv) => [...prv, object]);
			setProjet("");
			setTimer("");
			setDescription("");
		} else {
			toast("error", "Veuillez verifier des données.");
		}
	};
	const handleClosegenerateTsPerProjectModal = () => {
		setTmpTsByProject([]);
		setOpenModal(false);
	};

	return (
		<div
			style={{
				flex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={3}>
					<Grids xs={12}>
						<div
							className="list-of-departements"
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
								alignItems: "flex-start",
							}}
						>
							<div
								className="filter"
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "flex-start",
									alignItems: "flex-start",
									width: "100%",
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "flex-start",
										alignItems: "center",
										width: "100%",
									}}
								>
									<TuneIcon
										style={{ fontSize: 18, transform: "rotate(-0.50turn)" }}
									/>
									<h4
										style={{
											fontFamily: Fonts().primaryRegular,
											color: Colors.Gray,
											fontSize: "12px",
											marginLeft: 4,
										}}
									>
										Filters
									</h4>
								</div>
								<Divider />
								<div
									className="filter_fields"
									style={{
										width: "100%",
										display: "flex",
										flexWrap: "wrap",
										justifyContent: "flex-start",
										alignItems: "center",
									}}
								>
									<Select
										label={"Département"}
										data={departement}
										style={{
											width: "30ch",
											marginTop: 1,
										}}
										value={depValue || ""}
										isDepartement
										useId
										handleOnChange={handleOnChangeDepartement}
									/>
									<Select
										label={"Clients"}
										data={clients}
										style={{
											width: "30ch",
											marginTop: 1,
											marginLeft: 1,
										}}
										value={cliValue || ""}
										isClient
										useId
										handleOnChange={handleOnChangeClients}
									/>
									<Select
										label={"Services"}
										data={serviceData}
										style={{
											width: "30ch",
											marginTop: 1,
											marginLeft: 1,
										}}
										isMultible={true}
										value={serviceValue || ""}
										useId
										isServices
										handleOnChange={handleOnChangeServices}
									/>
									<Search
										useFlex
										width="20ch"
										isFilter
										IconName={DoneIcon}
										label="Matricule"
										marginTop="6px"
										style={{
											height: 57,
											marginTop: 6,
											borderRadius: 14,
										}}
										onChange={(e) => handleMatricule(e)}
										value={matricule}
									/>
									<Search
										useFlex
										width="20ch"
										isFilter
										IconName={DoneIcon}
										label="Poste"
										marginTop="6px"
										style={{
											height: 57,
											marginTop: 6,
											borderRadius: 14,
										}}
										onChange={(e) => handlePoste(e)}
										value={post}
									/>
									<Search
										useFlex
										width="20ch"
										isFilter
										IconName={DoneIcon}
										label="Nom"
										marginTop="6px"
										style={{
											height: 57,
											marginTop: 6,
											borderRadius: 14,
										}}
										onChange={(e) => handleNom(e)}
										value={nom}
									/>
									<Search
										useFlex
										width="20ch"
										isFilter
										IconName={DoneIcon}
										label="Prénom"
										marginTop="6px"
										style={{
											height: 57,
											marginTop: 6,
											borderRadius: 14,
										}}
										onChange={(e) => handlePrenom(e)}
										value={prenom}
									/>
									<Search
										useFlex
										width="20ch"
										isFilter
										IconName={DoneIcon}
										label="CIN"
										marginTop="6px"
										style={{
											height: 57,
											marginTop: 6,
											borderRadius: 14,
										}}
										onChange={(e) => handleCIN(e)}
										value={CIN}
									/>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "flex-start",
										alignItems: "center",
										width: "100%",
									}}
								>
									<SettingsIcon
										style={{ fontSize: 18, transform: "rotate(-0.50turn)" }}
									/>
									<h4
										style={{
											fontFamily: Fonts().primaryRegular,
											color: Colors.Gray,
											fontSize: "12px",
											marginLeft: 4,
										}}
									>
										Paramètrage
									</h4>
								</div>
								<Divider />
								<div
									className="parametre_filter"
									style={{
										width: "100%",
										display: "flex",
										flexWrap: "wrap",
										justifyContent: "flex-start",
										alignItems: "center",
									}}
								>
									<Select
										label={"Type d'horaire"}
										data={daysTypeData}
										style={{
											width: "30ch",
											marginTop: "6px",
											marginRight: 1,
										}}
										value={daysTypeValue}
										handleOnChange={handleOnChangeDaysType}
									/>
									{/* {daysTypeValue !== "" && (
                    <Select
                      label={"Journée | Journée / 2"}
                      data={typeOfDayData}
                      style={{
                        width: "30ch",
                        marginTop: "6px",
                        marginRight: 1,
                      }}
                      value={typeOfDayValue}
                      handleOnChange={handleOnChangeTypeOfDays}
                    />
                  )} */}
									<DatePicker
										label={
											daysTypeValue === "journalier" ||
											daysTypeValue === "Hebdomadaire" ||
											daysTypeValue === ""
												? "Date"
												: "Date Début"
										}
										onChangeDate={OnChangeDate}
										value={date}
									/>
									{daysTypeValue === "mensuel" && daysTypeValue !== "" && (
										<DatePicker
											label={"Date Fin"}
											onChangeDate={OnChangeEndDate}
											value={Enddate}
										/>
									)}
								</div>
							</div>
							<div
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: "9px",
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "flex-start",
										alignItems: "center",
									}}
								>
									<SegmentIcon
										style={{ fontSize: 18, transform: "rotate(-0.50turn)" }}
									/>
									<h4
										style={{
											fontFamily: Fonts().primaryRegular,
											color: Colors.Gray,
											fontSize: "12px",
											marginLeft: 4,
										}}
									>
										Liste des employés
									</h4>
								</div>
								<div
									className="actions__ts"
									style={{
										display: "flex",
										justifyContent: "flex-end",
										alignItems: "center",
										width: "30%",
									}}
								>
									<Button
										btnText={"Valider"}
										IconName={DoneIcon}
										handlePressed={handleApplySettings}
										isLoading={isLoading}
										style={{
											color: Colors.blackText,
											backgroundColor: Colors.primary,
											borderRadius: 12,
											padding: "15px 26px",
											fontFamily: Fonts().primaryRegular,
											fontSize: "12px",
											marginTop: "8px",
											width: "100%",
											marginRight: "11px",
										}}
									/>

									{checkedPersonnes.length > 0 && (
										<Button
											btnText={"Validate TS " + `(${checkedPersonnes.length})`}
											IconName={DoneIcon}
											handlePressed={Validatets}
											isLoading={isLoading}
											style={{
												color: Colors.blackText,
												backgroundColor: "#18c823",
												borderRadius: 12,
												padding: "15px 26px",
												fontFamily: Fonts().primaryRegular,
												fontSize: "12px",
												marginTop: "8px",
												marginLef: "12px",
												width: "100%",
											}}
										/>
									)}
								</div>
							</div>
							{daysTypeValue === "mensuel" && (
								<div className="weekly">
									{weeks.map((ele, index) => (
										<MAButton
											onClick={() =>
												handleSelectWeek(ele.days, "semaine" + ele.weekNumber)
											}
											variant="outlined"
											key={ele.days}
											style={{
												color:
													"semaine" + ele.weekNumber === selectedWeek
														? "#fff"
														: "#666",
												border: "1px solid #ec9f36",
												background:
													"semaine" + ele.weekNumber === selectedWeek
														? "#ec9f36"
														: "transparent",
											}}
										>
											{"semaine" + ele.weekNumber}
										</MAButton>
									))}
								</div>
							)}
						</div>
						<Divider />
						<DataTable
							personnes={personnesData}
							page={page}
							rowsPerPage={rowsPerPage}
							handleChangeRowsPerPage={handleChangeRowsPerPage}
							handleChangePage={handleChangePage}
							count={count}
							usePagination
							handleSave={saveDataTS}
							headerContentField={headerContentField}
							periode={daysTypeValue}
							typeOfDayValue={typeOfDayValue}
							daysList={daysList}
							selectedWeek={selectedWeek}
							handleTimeChange={handleTimeChange}
							party1He={party1He}
							party1Hs={party1Hs}
							party2He={party2He}
							party2Hs={party2Hs}
							personId={personId}
							dayInput={dayInput}
							houreId={houreId}
							party={party}
							semaineNane={semaineNane}
							handleChecked={handleChecked}
							generateTsPerProjectModal={generateTsPerProjectModal}
						/>

						<Modal
							// handleClickOpen={handleClickOpen}
							handleClose={handleClosegenerateTsPerProjectModal}
							open={openModal}
							title={`Timesheet par projet  (${TmpTsByProject.length})`}
							positiveText="Valider"
							negativeText="Annuler"
							handlePositiveEvent={() => handelSubmit()}
						>
							<div className="inputsTimesheetProjet">
								<TextInput
									isRequired
									disabled={isLoading}
									label="Nom de projet"
									IconName={FlagIcon}
									value={projet}
									handleChangeValue={(e) => setProjet(e.target.value)}
									style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
									removeBase
									useGray
								/>
								<TextInput
									isRequired
									disabled={isLoading}
									label="Time"
									IconName={FlagIcon}
									value={time}
									placeholder="HH:mm"
									handleChangeValue={(e) => {
										let value = e.target.value;
										value = value.replace(/[^0-9]/g, "");
										if (value.length > 2) {
											value = `${value.slice(0, 2)}:${value.slice(2)}`;
										}
										if (value.length > 5) value = value.substring(0, 5);
										setTimer(value);
									}}
									style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
									removeBase
									useGray
								/>
								<TextInput
									isRequired
									disabled={isLoading}
									label="Description"
									IconName={FlagIcon}
									value={description}
									handleChangeValue={(e) => setDescription(e.target.value)}
									style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
									removeBase
									useGray
								/>
								<Button
									disabled={isLoading}
									IconName={AddCircleOutlineIcon}
									handlePressed={addProject}
									isLoading={isLoading}
									style={{
										color: Colors.blackText,
										backgroundColor: "green",
										borderRadius: 12,
										fontFamily: Fonts().primaryRegular,
										fontSize: FontSize().smallText,
										marginTop: 8,
										width: "30px",
									}}
								/>
							</div>
							<div className="TsProject">
								<TimesheetByProject projets={TmpTsByProject} />
							</div>
						</Modal>
					</Grids>
				</Grid>
			</Box>
			{/* <Modal
        open={open}
        handleClose={handleCloseModal}
        title={"Changement d'horaires"}
        positiveText={"mise à jour"}
        negativeText="Annuler"
        handlePositiveEvent={handleChangeSchedules}
      >
        <div style={{ width: 1000, height: 600 }}>
          <Tabs
            hDMorning={hDMorning}
            hFMorning={hFMorning}
            hDAfternon={hDAfternon}
            hFAfternon={hFAfternon}
            handleHDM={handleHDM}
            handleHFM={handleHFM}
            handleHDS={handleHDS}
            handleHFS={handleHFS}
            day={tehDay}
            typeOfDay={daysTypeValue}
            isAbsent={isAbsent}
            handleCheckIsAbsent={handleCheckIsAbsent}
            houreAdded={houreAdded}
            handleChangeHoureAdded={handleChangeHoureAdded}
            motif={motif}
            handleMotif={handleMotif}
          />
        </div>
      </Modal> */}
			<BackDrop open={openBack} handleClose={() => setOpenBack(false)} />
		</div>
	);
};
