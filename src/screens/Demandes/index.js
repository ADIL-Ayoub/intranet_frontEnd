import React, { useState, useEffect } from "react";
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
import { HOLIDAYS, CONGE, PERSONNES } from "@services";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//mon code

export default ({}) => {
	const toast = useToast();
	const [holidays, setHolidays] = useState([]);
	const [holidaysDetails, setHolidaysDetails] = useState([]);
	const Colors = useColors();
	const [typeConge, setTypeConge] = useState(null);
	const [detailConge, setDetailConge] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [value, setValue] = React.useState("jour");
	const [affected, setAffected] = useState({ id: null });
	const [service, setService] = useState([]);
	//Mon code
	const [jours, setJours] = useState(0);
	const [solde, setSolde] = useState(0);
	const [tvalue, SetTValue] = useState("");
	const [dateStart, setDateStart] = useState(null);
	const [dateEnd, setDateEnd] = useState(null);
	const [isDateStartValid, setIsDateStartValid] = useState(true);
	const [isDateEndValid, setIsDateEndValid] = useState(true);
	const [isFirstTime, setIsFirstTime] = useState(true);
	const user = useSelector(({ account }) => account.user);
	const [personne, setPersonne] = useState({});
	const [responsable, setResponsable] = useState({});
	const temp_user = { id: "ec1c0412-a8b8-46dc-838e-b2dcdd5abaf2" };
	// useEffect(() => {
	// 	//console.log("useEfffect CAlled");
	// 	console.log(user.id);
	// 	handleChangeJours();
	// }, [maxVal, minVal]);

	const [holidayObject, setHolidayValue] = useState({
		typeConge: null,
		max: 0,
		min: 0,
		heur: false,
		jour: true,
		detaileConges: [],
	});
	const [holidayObjectDetails, setHolidayValueDetails] = useState({
		label: null,
		max: 0,
		min: 0,
	});
	const handleValidate = () => {
		if (!affected?.id) {
			toast("error", "Vous devez d'abord sélectionner une personne");
			return;
		}
		setIsLoading(true);
		HOLIDAYS.AssignTypeConge(affected?.id, service)
			.then((data) => {
				setIsLoading(false);
				if (data.status === 200 || data.status === 201) {
					toast("success", "l'opération s'est terminée avec succès.");
					setAffected({ id: null });
					setService([]);
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

	const handleChange = (event) => {
		setValue(event.target.value);
	};
	//mon code
	useEffect(() => {
		//console.log(user.id);
		// Pour obtenir toutes les données de la personne y compris son id d'après l 'id du user
		PERSONNES.findPersonneByUser(user.id)
			.then((response) => {
				PERSONNES.findPersonneById(response.data.service.codeResponsable)
					.then((response) => setResponsable(response.data))
					.catch((e) => console.log(e));
				//console.log(response.data);
				setPersonne(response.data);
				// obtenir le solde de la personne obtenue par la premiere methode
				CONGE.fetchSolde(response.data)
					.then((response) => setSolde(response.data))
					.catch((error) => console.log(error));
			})
			.catch((e) => console.log(e));
		// PERSONNES.findPersonneById(personne.id)
		// 	.then((response) => setResponsable(response.data))
		// 	.catch((e) => console.log(e));
		FetchHolidays();
	}, []);
	useEffect(() => {
		const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
		dateStart && dateEnd && handleChangeDateEnd(dateStart + ONE_DAY_IN_MS);
	}, [dateStart]);

	const handleOnChangeTypeOfConge = (e) => {
		const find = holidays.find((ele) => ele?.id === e.target.value);
		setHolidaysDetails(find?.detaileConges);
		setTypeConge(e.target.value);
	};
	const handleOnChangeTypeOfDetailConge = (e) => {
		setDetailConge(e.target.value);
	};

	const handleAddNewConge = () => {};

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

	//Mon code
	// const handleChangeJours = () => {
	// 	let total = maxVal - minVal ? maxVal - minVal : 0;
	// 	!!maxVal &&
	// 		!!minVal &&
	// 		maxVal > minVal &&
	// 		solde >= total &&
	// 		setJours(maxVal - minVal);
	// };
	const handleChangeDateStart = (newDatePicked) => {
		const currentDate = new Date();
		console.log(newDatePicked - currentDate);
		setDateStart(newDatePicked);
		let differenceInDays = calculateDifferenceBetweenTwoDates(
			currentDate,
			newDatePicked,
		);
		differenceInDays > 1
			? setIsDateStartValid(true)
			: setIsDateStartValid(false);

		console.log("Difference : ", differenceInDays);
	};
	const calculateDifferenceBetweenTwoDates = (startDate, endDate) => {
		let differenceInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
		return differenceInDays < 0
			? -1
			: (differenceInDays = Math.ceil(differenceInDays));
	};
	const handleChangeDateEnd = (newDatePicked) => {
		const date = !!dateStart ? dateStart : new Date();
		console.log(date);
		let differenceInDays = calculateDifferenceBetweenTwoDates(
			date,
			newDatePicked,
		);
		console.log(differenceInDays);
		differenceInDays > 0 ? setIsDateEndValid(true) : setIsDateEndValid(false);

		setDateEnd(newDatePicked);
	};
	const calculateDateDifference = () => {
		if (!dateStart || !dateEnd) {
			return null; // If either date is not selected, return null or any other appropriate value
		}
		const differenceInMilliseconds = dateEnd - dateStart;
		const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
		return Math.abs(differenceInDays); // Use Math.abs to handle negative differences
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
							label="Nom de l'employé"
							IconName={TrendingDownIcon}
							value={personne.snom + " " + personne.sprenom}
							disabled={true}
							//handleChangeValue={(e) => handleChangeMax(e)}
							style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
							removeBase
							useGray
						/>
						<TextInput
							label="Poste"
							IconName={TrendingDownIcon}
							value={personne.sposte}
							disabled={true}
							//handleChangeValue={(e) => handleChangeMax(e)}
							style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
							removeBase
							useGray
						/>
						<TextInput
							label="Service"
							IconName={TrendingDownIcon}
							value={personne.service?.nameService}
							disabled={true}
							//handleChangeValue={(e) => handleChangeMax(e)}
							style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
							removeBase
							useGray
						/>
						<TextInput
							label="Responsable"
							IconName={TrendingDownIcon}
							value={responsable.snom + " " + responsable.sprenom}
							disabled={true}
							//handleChangeValue={(e) => handleChangeMax(e)}
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
								marginTop: 1,
							}}
							value={typeConge}
							handleOnChange={handleOnChangeTypeOfConge}
						/>
						{holidaysDetails.length > 0 && (
							<Select
								useId
								isLabel
								label={"Details"}
								data={holidaysDetails}
								style={{
									width: "100%",
									marginTop: 1,
								}}
								value={detailConge}
								handleOnChange={handleOnChangeTypeOfDetailConge}
							/>
						)}
					</div>
					{!!typeConge && (
						<div className="gridiT">
							<div className="date_settings">
								<DatePicker
									label="Date de depart"
									defaultValue={"2022-04-17"}
									value={dateStart}
									onChangeDate={handleChangeDateStart}
								/>
								<DatePicker
									label="Date de reprise"
									defaultValue={"2022-04-17"}
									value={dateEnd}
									onChangeDate={handleChangeDateEnd}
								/>
								<br />

								{!isDateStartValid &&
									toast(
										"error",
										"Erreur: Veuillez inserer une date valide et differente de 2 jours de la date actuelle!",
									)}
								{!isDateEndValid &&
									toast(
										"error",
										"Erreur:  Date de reprise doit etre plus grand que la date de depart",
									)}
							</div>

							{holidaysDetails.length > 0 && !!detailConge && (
								<Button
									btnText={"Enregistrer"}
									IconName={DoneIcon}
									// handlePressed={() => console.log("close .............")}
									// handlePressed={handleValidate}
									isLoading={isLoading}
									style={{
										color: Colors.blackText,
										backgroundColor: Colors.primary,
										borderRadius: 12,
										padding: "12px 23px",
										fontFamily: Fonts().primaryRegular,
										fontSize: FontSize().smallText,
										marginTop: "12px",
										width: "100%",
									}}
								/>
							)}
						</div>
					)}
				</div>
				<br />
				Jours :{calculateDateDifference()}
				<br />
				superieur? : {dateEnd > dateStart ? "oui" : "non"}
				<Divider />
				<br />
				<div className="conge__actions">
					<Button
						disabled={!typeConge || isLoading}
						btnText={"Annuler"}
						IconName={CloseIcon}
						handlePressed={() => console.log("close .............")}
						isLoading={isLoading}
						style={{
							color: Colors.blackText,
							backgroundColor: Colors.error,
							borderRadius: 12,
							padding: "15px 26px",
							fontFamily: Fonts().primaryRegular,
							fontSize: FontSize().smallText,
							marginTop: "22px",
							width: "100%",
						}}
					/>
					<Button
						disabled={!typeConge || isLoading}
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
