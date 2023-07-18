import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import { Fonts, useColors, FontSize, useToast } from "@common";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Divider } from "@mui/material";
import { TextInput, Select, Button } from "@components";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { HOLIDAYS, CONGE } from "@services";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//mon code
import { DatePicker } from "@mui/x-date-pickers";
export default ({}) => {
	const toast = useToast();
	const [holidays, setHolidays] = useState([]);
	const [holidaysDetails, setHolidaysDetails] = useState([]);
	const Colors = useColors();
	const [typeConge, setTypeConge] = useState(null);
	const [detailConge, setDetailConge] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [maxVal, setMaxVal] = useState("");
	const [minVal, setMinVal] = useState("");
	const [value, setValue] = React.useState("jour");
	const [affected, setAffected] = useState({ id: null });
	const [service, setService] = useState([]);
	//Mon code
	const [jours, setJours] = useState(0);
	const [solde, setSolde] = useState(0);
	const [tvalue, SetTValue] = useState("");
	const user = useSelector(({ account }) => account.user);
	const temp_user = { id: "c176638b-9d94-480c-826f-44244334aa5b" };
	useEffect(() => {
		//console.log("useEfffect CAlled");
		console.log(user.id);
		handleChangeJours();
	}, [maxVal, minVal]);

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

	useEffect(() => {
		CONGE.fetchSolde(temp_user)
			.then((response) => setSolde(response.data))
			.catch((error) => console.log(error));
		console.log(solde);
		FetchHolidays();
	}, []);

	const handleOnChangeTypeOfConge = (e) => {
		const find = holidays.find((ele) => ele?.id === e.target.value);
		setHolidaysDetails(find?.detaileConges);
		setTypeConge(e.target.value);
	};
	const handleOnChangeTypeOfDetailConge = (e) => {
		setDetailConge(e.target.value);
	};

	const handleAddNewConge = () => {};

	const handleChangeMax = (e) => {
		setMaxVal(e.target.value);
	};

	const handleChangeMin = (e) => {
		setMinVal(e.target.value);
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

	//Mon code
	const handleChangeJours = () => {
		let total = maxVal - minVal ? maxVal - minVal : 0;
		!!maxVal &&
			!!minVal &&
			maxVal > minVal &&
			solde >= total &&
			setJours(maxVal - minVal);
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
								<TextInput
									label="Valeur maximale"
									IconName={TrendingDownIcon}
									value={maxVal}
									handleChangeValue={(e) => handleChangeMax(e)}
									style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
									removeBase
									useGray
								/>
								<TextInput
									label="Valeur minimale"
									IconName={TrendingUpIcon}
									value={minVal}
									handleChangeValue={(e) => handleChangeMin(e)}
									style={{ width: "100%", marginTop: 8, borderRadius: 22 }}
									removeBase
									useGray
								/>
								<DatePicker
									label="Uncontrolled picker"
									defaultValue={"2022-04-17"}
								/>
							</div>
							<FormControl className="radio__class">
								<FormLabel
									id="demo-controlled-radio-buttons-group"
									style={{ color: Colors.primary }}
								>
									Période
								</FormLabel>
								<RadioGroup
									aria-labelledby="demo-controlled-radio-buttons-group"
									name="controlled-radio-buttons-group"
									value={value}
									onChange={handleChange}
								>
									<FormControlLabel
										value="heur"
										control={<Radio style={{ color: Colors.primary }} />}
										label="Heur"
									/>
									<FormControlLabel
										value="jour"
										control={<Radio style={{ color: Colors.primary }} />}
										label="Jour"
									/>
								</RadioGroup>
							</FormControl>
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
				Jours :{jours}
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
