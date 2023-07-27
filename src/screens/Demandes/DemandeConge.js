import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import { Fonts, useColors, FontSize, useToast } from "@common";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Divider } from "@mui/material";
import { TextInput, Select, Button, DatePicker } from "@components";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { HOLIDAYS, CONGE, PERSONNES, DEMANDE } from "@services";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//mon code
import AddIcon from "@mui/icons-material/Add";

export default ({}) => {
	const toast = useToast();
	const [holidays, setHolidays] = useState([]);
	const [holidaysDetails, setHolidaysDetails] = useState([]);
	const Colors = useColors();
	const [typeConge, setTypeConge] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	//Mon code
	const [dateStart, setDateStart] = useState(null);
	const [dateEnd, setDateEnd] = useState(null);
	const user = useSelector(({ account }) => account.user);
	const [personne, setPersonne] = useState({});
	const [TaskName, setTaskName] = useState("");
	const [description, setDescription] = useState("");
	const [demande, setDemande] = useState({});
	const temp_user = { id: "ec1c0412-a8b8-46dc-838e-b2dcdd5abaf2" };
	//mon code
	useEffect(() => {
		DEMANDE.getDemandeByCodeTypeDemande("DC")
			.then((response) => setDemande(response.data))
			.catch((e) => console.log(e));
		//console.log(user.id);
		// Pour obtenir toutes les données de la personne y compris son id d'après l 'id du user
		PERSONNES.findPersonneByUser(user.id)
			.then((response) => {
				setPersonne(response.data);
			})
			.catch((e) => console.log(e));
		FetchHolidays();
	}, []);

	//pour instancier dateEnd par dateStart + 1 j automatiquement
	useEffect(() => {
		const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
		dateStart && dateEnd && handleChangeDateEnd(dateStart + ONE_DAY_IN_MS);
	}, [dateStart]);

	const handleOnChangeTypeOfConge = (e) => {
		const find = holidays.find((ele) => ele?.id === e.target.value);
		setHolidaysDetails(find?.detaileConges);
		setTypeConge(e.target.value);
	};

	const handleAddNewConge = () => {
		let data = {
			name: TaskName,
			description,
			typeDemande: demande.id,
			typeConge,
			dateDebut: dateStart,
			dateReprise: dateEnd,
		};
		CONGE.ajouterDemandeConge(user.id, data)
			.then((response) => {
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
			.catch((error) => {});
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
			toast("error", "Erreur: balabalalalalalal!");
			setDateEnd(null);
		} else {
			setDateEnd(new Date(newDatePicked));
		}
	};
	return (
		<div
			style={{
				flex: 1,
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				alignItems: "center",
			}}
		>
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
							!dateStart || !dateEnd || !TaskName || !description || !typeConge
						}
						btnText={"Sauvegarder"}
						IconName={DoneIcon}
						handlePressed={handleAddNewConge}
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
			</div>
		</div>
	);
};
