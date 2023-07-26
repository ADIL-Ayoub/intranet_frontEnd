import "./index.css";
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
	Grids,
	TextInput,
	Button,
	Roles,
	Modal,
	Select,
	Semain,
} from "@components";
import { useColors, Fonts, FontSize, useToast, Rejex } from "@common";
import roleImage from "@images/roleImage.png";
import Divider from "@mui/material/Divider";
import { TbLockAccess } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import TodayIcon from "@mui/icons-material/Today";
import { DEPARTEMENT, SEMAINE, CLEINTS, SERVICES } from "@services";
import CheckIcon from "@mui/icons-material/Check";

const weekDays = [
	{ id: 1, name: "lundi" },
	{ id: 2, name: "mardi" },
	{ id: 3, name: "mercredi" },
	{ id: 4, name: "jeudi" },
	{ id: 5, name: "vendredi" },
	{ id: 6, name: "samedi" },
	{ id: 7, name: "dimanche" },
];

export default ({ handleOnChangeRoles }) => {
	const Colors = useColors();
	const [libelleSemaine, setLibelleSemaine] = useState("");
	const [firstPeriodEntrance, setFirstPeriodEntrance] = useState("");
	const [firstPeriodExit, setFirstPeriodExit] = useState("");
	const [secondaryPeriodEntrance, setSecondaryPeriodEntrance] = useState("");
	const [secondaryPeriodExit, setSecondaryPeriodExit] = useState("");
	const [weekDayData, setWeekDayData] = useState([]);
	const [semaine, setSemaine] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setIsError] = useState({ feild: "", error: "" });
	const [open, setOpen] = React.useState(false);
	const [listHour, setListHour] = useState([]);
	const [idWeek, setIdWeek] = useState(null);
	const [serviceData, setServicesData] = useState([]);
	const [serviceValue, setServicesValue] = useState([]);
	const [personnesData, setPersonnes] = useState([]);
	const [departement, setDepartements] = useState([]);
	const [clients, setClients] = useState([]);
	const [depValue, setDepValue] = useState(null);
	const [cliValue, setCliValue] = useState(null);
	const [client_id, setClientId] = useState(null);

	const displayOnce = useRef(true);
	const toast = useToast();

	useEffect(() => {
		// findOneClient();
		fetchDepartements();
	}, []);

	const fetchDepartements = () => {
		setIsLoading(true);
		DEPARTEMENT.fetchDepartement()
			.then((data) => {
				setIsLoading(false);
				if (data.status === 200 || data.status === 201) {
					setDepartements(data.data.content);
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

	const handleOnChangeWeekDay = (e) => {
		const {
			target: { value },
		} = e;

		setWeekDayData(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value,
		);
	};

	const paramHoraire = () => {
		setIsLoading(true);
		const params = {
			libelWeek: libelleSemaine,
			hourlyList: listHour,
		};
		SEMAINE.newSemaine(params)
			.then((data) => {
				setIsLoading(false);
				if (data.status === 201 || data.status === 200) {
					toast("success", "Données sauvegardées avec succès");
					fetchSemaine();
				}
			})
			.catch((error) => {
				setIsLoading(false);
				if (error) {
					if (error?.response) {
						toast(
							"error",
							error?.response?.data?.message || "quelque chose s'est mal passé",
						);
						setIsLoading(false);
					} else {
						toast("error", "quelque chose s'est mal passé");
					}
				} else {
					toast("error", "quelque chose s'est mal passé");
				}
			});
	};

	const addHoraire = () => {
		if (listHour.length === 0) {
			weekDayData.map((ele) => {
				const list = {
					libelDay: ele,
					firstBeginning: firstPeriodEntrance,
					firstEnding: firstPeriodExit,
					secondBeginning: secondaryPeriodEntrance,
					secondEnding: secondaryPeriodExit,
				};
				setListHour((prv) => [...prv, list]);
			});
		} else {
			const updateList = [...listHour];
			weekDayData.map((item) => {
				const findInPdate = updateList.findIndex(
					(ele) => ele.libelDay === item,
				);
				if (findInPdate !== -1) {
					updateList[findInPdate] = {
						libelDay: item,
						firstBeginning: firstPeriodEntrance,
						firstEnding: firstPeriodExit,
						secondBeginning: secondaryPeriodEntrance,
						secondEnding: secondaryPeriodExit,
					};
					setListHour(updateList);
				} else {
					setListHour((prv) => [
						...prv,
						{
							libelDay: item,
							firstBeginning: firstPeriodEntrance,
							firstEnding: firstPeriodExit,
							secondBeginning: secondaryPeriodEntrance,
							secondEnding: secondaryPeriodExit,
						},
					]);
				}
			});
		}
		setFirstPeriodEntrance("");
		setFirstPeriodExit("");
		setSecondaryPeriodEntrance("");
		setSecondaryPeriodExit("");
		setWeekDayData([]);
	};

	useEffect(() => {
		if (displayOnce.current) {
			displayOnce.current = false;
			fetchSemaine();
		}
	}, []);

	const handleClickOpen = (id_r) => {
		setOpen(true);
		setIdWeek(id_r);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeLibelleSemaine = (e) => {
		setLibelleSemaine(e.target.value);
	};

	const handleChangeFirstPeriodEntrance = (e) => {
		let value = e.target.value;
		// Ensure only numbers are entered
		value = value.replace(/[^0-9]/g, "");

		// Add colon after the second digit
		if (value.length > 2) {
			value = `${value.slice(0, 2)}:${value.slice(2)}`;
		}
		setFirstPeriodEntrance(value.slice(0, 5));
	};

	const handleChangeFirstPeriodExit = (e) => {
		let value = e.target.value;

		// Ensure only numbers are entered
		value = value.replace(/[^0-9]/g, "");

		// Add colon after the second digit
		if (value.length > 2) {
			value = `${value.slice(0, 2)}:${value.slice(2)}`;
		}
		setFirstPeriodExit(value.slice(0, 5));
	};

	const handleChangeSecondPeriodEntrance = (e) => {
		let value = e.target.value;

		// Ensure only numbers are entered
		value = value.replace(/[^0-9]/g, "");

		// Add colon after the second digit
		if (value.length > 2) {
			value = `${value.slice(0, 2)}:${value.slice(2)}`;
		}
		setSecondaryPeriodEntrance(value.slice(0, 5));
	};

	const handleChangeSecondePeriodExit = (e) => {
		let value = e.target.value;

		// Ensure only numbers are entered
		value = value.replace(/[^0-9]/g, "");

		// Add colon after the second digit
		if (value.length > 2) {
			value = `${value.slice(0, 2)}:${value.slice(2)}`;
		}
		setSecondaryPeriodExit(value.slice(0, 5));
	};

	const fetchSemaine = () => {
		setIsLoading(true);
		SEMAINE.fetchSemaine()
			.then((data) => {
				setIsLoading(false);
				if (data.status == 200 || data.status === 201) {
					setSemaine(data.data);
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

	const AssignmentEvent = () => {
		const params = {
			idSemaine: idWeek,
			idServies: serviceValue,
		};
		SEMAINE.AssignWeeks(params)
			.then((data) => {
				if (data.status === 200 || data.status === 201) {
					toast("success", "success");
					setOpen(false);
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

	const handleOnChangeDepartement = (e) => {
		setDepValue(e.target.value);
		fetchClients(e.target.value);
	};

	const fetchClients = (id) => {
		CLEINTS.fetchClients(null, id)
			.then((data) => {
				if (data.status === 201 || data.status === 200) {
					setClients(data?.data?.content);
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

	const handleOnChangeClients = (e) => {
		setCliValue(e.target.value);
		setClientId(e.target.value);
		fetchServicesData(e.target.value);
	};

	const fetchServicesData = (id) => {
		SERVICES.fetchServices(id)
			.then((data) => {
				if (data.status === 200 || data?.status === 201) {
					setServicesData(data?.data?.content);
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

	const handleOnChangeServices = (e) => {
		const {
			target: { value },
		} = e;
		setServicesValue(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value,
		);
	};

	return (
		<div className="users__container">
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={3}>
					<Grids xs={6}>
						<div className="title_header">
							<TbLockAccess
								style={{ fontSize: "16px" }}
								className="add_user_icon"
							/>
							<h3 style={{ fontFamily: Fonts().primaryRegular }}>
								Nouveaux Semaine de Travail
							</h3>
						</div>
						<div className="add_user_access">
							<img src={roleImage} alt="role" />
						</div>
						<Divider />
						<div className="user__form">
							<TextInput
								isRequired
								disabled={isLoading}
								label="Libelle de semaine"
								IconName={TodayIcon}
								value={libelleSemaine}
								handleChangeValue={(e) => handleChangeLibelleSemaine(e)}
								style={{
									width: "100%",
									marginTop: 8,
									borderRadius: 22,
								}}
								error={error.feild === "name" && error.error}
								removeBase
								useGray
							/>
							<Select
								label={"joures"}
								data={weekDays}
								style={{
									width: "100%",
									marginTop: 1,
								}}
								isMultible={true}
								value={weekDayData}
								handleOnChange={handleOnChangeWeekDay}
							/>
							<div className="period_container">
								<div className="first_period">
									<TextInput
										disabled={isLoading}
										label="première partie entrée"
										placeholder="08:00"
										IconName={QueryBuilderIcon}
										value={firstPeriodEntrance}
										handleChangeValue={(e) =>
											handleChangeFirstPeriodEntrance(e)
										}
										style={{
											width: "100%",
											marginTop: 8,
											borderRadius: 22,
										}}
										error={error.feild === "name" && error.error}
										removeBase
										useGray
									/>
									<TextInput
										disabled={isLoading}
										label="première partie sortie"
										IconName={QueryBuilderIcon}
										placeholder="12:00"
										value={firstPeriodExit}
										handleChangeValue={(e) => handleChangeFirstPeriodExit(e)}
										style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
										error={error.feild === "name" && error.error}
										removeBase
										useGray
									/>
								</div>
								<div className="first_period">
									<TextInput
										disabled={isLoading}
										label="deuxième partie entrée"
										placeholder="14:00"
										IconName={QueryBuilderIcon}
										value={secondaryPeriodEntrance}
										handleChangeValue={(e) =>
											handleChangeSecondPeriodEntrance(e)
										}
										style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
										error={error.feild === "name" && error.error}
										removeBase
										useGray
									/>
									<TextInput
										disabled={isLoading}
										placeholder="18:00"
										label="deuxième partie sortie"
										IconName={QueryBuilderIcon}
										value={secondaryPeriodExit}
										handleChangeValue={(e) => handleChangeSecondePeriodExit(e)}
										style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
										error={error.feild === "name" && error.error}
										removeBase
										useGray
									/>
								</div>
							</div>
							<Button
								btnText={"Save Horaire"}
								IconName={CheckIcon}
								handlePressed={addHoraire}
								isLoading={isLoading}
								disabled={isLoading}
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
							<Button
								btnText={"Ajout"}
								IconName={CheckIcon}
								handlePressed={paramHoraire}
								isLoading={isLoading}
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
					</Grids>
					<Grids xs={6}>
						<Semain
							semaine={semaine}
							isAssign
							handleClickOpen={handleClickOpen}
						/>
					</Grids>
				</Grid>
			</Box>
			<Modal
				handleClose={handleClose}
				open={open}
				title={"Affectation des semaines !"}
				positiveText={"Affecter"}
				negativeText="Annuler"
				handlePositiveEvent={AssignmentEvent}
			>
				<div style={{ width: "100%", height: "auto", padding: 16 }}>
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
							value={depValue}
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
							value={cliValue}
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
							value={serviceValue}
							useId
							isServices
							handleOnChange={handleOnChangeServices}
						/>
					</div>
				</div>
			</Modal>
		</div>
	);
};
