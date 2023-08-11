import React, { useEffect, useRef, useState } from "react";
import { useColors, usePermessions, Fonts } from "@common";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./list.css";
import { FcPlus } from "react-icons/fc";
import {
	FcHome,
	FcUnlock,
	FcConferenceCall,
	FcTreeStructure,
	FcApprove,
	FcServices,
	FcComboChart,
	FcDownload,
	FcSettings,
	FcCalendar,
	FcLeave,
	FcDataConfiguration,
	FcOvertime,
	FcOrgUnit,
	FcInspection,
} from "react-icons/fc";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";

const BarItem = [
	{
		id: 1,
		name: "dashboard",
		label: "Dashboard",
		path: "/",
		Icon: <FcHome />,
		privilege: "dashboard",
		isList: false,
		subList: [],
	},
	{
		id: 2,
		name: "roles",
		label: "Roles",
		path: "/roles",
		Icon: <FcUnlock />,
		isVisble: false,
		privilege: "findAll_roles",
		isList: false,
		subList: [],
	},
	{
		id: 3,
		name: "users",
		label: "Users",
		path: "/users",
		Icon: <FcConferenceCall />,
		isVisble: false,
		privilege: "findAll_users",
		isList: false,
		subList: [],
	},
	{
		id: 6,
		name: "Privileges",
		label: "Privileges",
		path: "/permissions",
		Icon: <FcTreeStructure />,
		isVisble: false,
		privilege: "findAll_privileges",
		isList: false,
		subList: [],
	},
	{
		id: 7,
		name: "Personnes",
		label: "Personnes",
		path: "/personnes",
		Icon: <FcApprove />,
		isVisble: false,
		privilege: "find_personnels",
		isList: false,
		subList: [],
	},
	{
		id: 8,
		name: "Paramètres",
		label: "Paramètres",
		Icon: <FcSettings />,
		isVisble: true,
		isList: true,
		subList: [
			{
				id: 1,
				name: "Paramétrer des congés",
				label: "Paramétrer des congés",
				path: "/conge",
				Icon: <FcLeave />,
				isVisble: false,
				privilege: "find_typeConges",
			},
			{
				id: 2,
				name: "Paramétrage de la génération des TS",
				label: "Paramétrage de la génération des TS",
				path: "/generation_ts",
				Icon: <FcCalendar />,
				isVisble: false,
				privilege: "update_gts_service",
			},
			{
				id: 3,
				name: "Paramétrage des semaines",
				label: "Paramétrage des semaines",
				path: "/semain",
				Icon: <FcOvertime />,
				isVisble: false,
				privilege: "create_semaine",
			},
			{
				id: 4,
				name: "Gestion des affectations",
				label: "Gestion des affectations",
				path: "/affectation",
				Icon: <FcOrgUnit />,
				isVisble: false,
				privilege: "Gestion des affectations",
			},
			{
				id: 5,
				name: "Pays / jours fériés",
				label: "Pays / jours fériés/ Projets",
				path: "/additions",
				Icon: <FcInspection />,
				isVisble: false,
				privilege: "create_country",
			},
		],
	},
	{
		id: 9,
		name: "Gestion",
		label: "Gestion",
		Icon: <FcDataConfiguration />,
		isList: true,
		isVisble: true,
		subList: [
			{
				id: 1,
				name: "Génération des timesheets sans projet",
				label: "Génération des timesheets sans projet",
				path: "/gestion_ts",
				Icon: <FcCalendar />,
				isVisble: false,
				privilege: "generation_ts",
			},
			{
				id: 2,
				name: "Services",
				label: "Services",
				path: "/services",
				Icon: <FcServices />,
				isVisble: false,
				privilege: "find_services",
			},
			{
				id: 3,
				name: "Demander un congé",
				label: "Demander un congé ",
				path: "/demandes",
				Icon: <FcPlus />,
				isVisble: false,
				privilege: "add_demande_conge",
			},
			{
				id: 4,
				name: "Mes demandes des congés",
				label: "Mes demandes des congés",
				path: "/mesConges",
				Icon: <FcPlus />,
				isVisble: false,
				privilege: "find_mes_demandes",
			},
			{
				id: 5,
				name: "Validation des demandes des congés",
				label: "Validation des demandes des congés",
				path: "/validerConges",
				Icon: <FcPlus />,
				isVisble: false,
				privilege: "decision_conge",
			},
			{
				id: 6,
				name: "Demander un congé pour un employé",
				label: "Demander un congé pour un employé",
				path: "/demandeCongePourAutre",
				Icon: <FcPlus />,
				isVisble: false,
				privilege: "demande_conge_by_superieur",
			},
		],
	},
	// {
	//   id: 11,
	//   name: "projects",
	//   label: "Projects",
	//   path: "/projects",
	//   Icon: <FcComboChart />,
	//   isVisble: false,
	//   privilege: "projects",
	//   isList: false,
	//   subList: null,
	// },
	{
		id: 12,
		name: "import",
		label: "Import",
		path: "/import",
		Icon: <FcDownload />,
		isVisble: false,
		privilege: "importcsv_sage",
		isList: false,
		subList: [],
	},
];

export default ({
	open,
	openList,
	handleOpenList,
	id,
	subListItemClicked,
	subId,
}) => {
	const user = useSelector(({ account: { user } }) => user);
	const displayOnce = useRef(true);
	const permissions = usePermessions();
	const navigate = useNavigate();
	const [show, setShow] = useState(true);
	const [barItems, setBarItems] = useState(BarItem);
	const Colors = useColors();
	const location = useLocation();
	const state = !location.state ? location.pathname.slice(1) : location.state;

	useEffect(() => {
		setShow(true);
		setTimeout(() => {
			setShow(false);
		}, 500);
	}, [location]);

	useEffect(() => {
		if (displayOnce.current) {
			setBarItems([]);
			displayOnce.current = false;
			const copyOfBarItem = [...barItems];
			copyOfBarItem.forEach((ele, index) => {
				if (ele.subList.length === 0) {
					const checkIfAutorized = permissions(ele.privilege);
					if (checkIfAutorized) {
						copyOfBarItem[index].isVisble = checkIfAutorized?.access;
					}
				}
				if (ele.subList.length > 0) {
					ele.subList.forEach((item, counter) => {
						const checkIfAutorized = permissions(item.privilege);
						copyOfBarItem[index].subList[counter].isVisble =
							checkIfAutorized?.access;
						setBarItems(copyOfBarItem);
					});
				}
			});
			setBarItems(copyOfBarItem);
		}
	}, [user]);

	const handleNavigate = (path) => {
		navigate(`/${path}`);
	};

	return (
		<React.Fragment>
			{barItems.map(
				(ele, index) =>
					(ele.isVisble || ele.privilege === "dashboard") && (
						<div key={ele.id}>
							<Link
								state={ele.name}
								key={ele.id}
								to={ele.path}
								style={{ textDecoration: "none" }}
							>
								{
									<ListItemButton
										onClick={() => handleOpenList(ele.id)}
										style={
											ele.id === id
												? {
														backgroundColor: Colors.navColor,
														// margin: "0px 9px 0px 5px",
														// borderRadius: "10px",
														transition: "all .3s ease-in-out",
														position: "relative",
												  }
												: !state && ele.name === "dashboard"
												? {
														backgroundColor: Colors.navColor,
														// margin: "0px 9px 0px 5px",
														// borderRadius: "10px",
														transition: "all .3s ease-in-out",
														position: "relative",
												  }
												: {
														transition: "all .3s ease-in-out",
														position: "relative",
												  }
										}
									>
										<ListItemIcon
											style={{
												transition: "all .5s ease-in-out",
											}}
										>
											{ele.Icon}
										</ListItemIcon>
										<ListItemText
											style={{
												color: "rgb(94, 94, 94)",
												transition: "all .5s ease-in-out",
												fontFamily: Fonts().primaryBold,
												position: "relative",
											}}
										>
											{ele.label}
											{ele.isList && (
												<ListItemIcon
													style={{
														transition: "all .5s ease-in-out",
														position: "absolute",
														left: 215,
														top: -2,
													}}
												>
													<KeyboardArrowDownIcon
														style={
															ele.id !== id || !id
																? {
																		transform: "rotate(0deg)",
																		transition: "all .3s ease-in",
																  }
																: {
																		transform: "rotate(180deg)",
																		transition: "all .3s ease-in",
																  }
														}
													/>
													{/* {!openList ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowUpIcon />
                          )} */}
												</ListItemIcon>
											)}
										</ListItemText>
									</ListItemButton>
								}
							</Link>
							<div
								style={
									ele.isList && open
										? ele.id !== id
											? {
													transition: "all .4s ease-in-out",
													height: "auto",
													overflow: "hidden",
													maxHeight: "0px",
													backgroundColor: "rgb(217, 217, 217)",
													border: "0px solid #cecdcd",
											  }
											: {
													transition: "all .4s ease-in-out",
													height: "auto",
													overflow: "auto",
													maxHeight: "400px",
													background: "rgba(227, 142, 22, 0.34)",
													backgroundColor: "rgba(193, 189, 183, 0.34)",
													border: "1px solid #cecdcd",
											  }
										: { position: "absolute", top: -1000, height: "100%" }
								}
							>
								<ul
									style={{
										display: "flex",
										flexDirection: "column",
										marginTop: 4,
										width: "100%",
										justifyContent: "flex-start",
										alignItems: "flex-start",
										listStyle: "none",
									}}
								>
									{!!ele.subList &&
										ele.subList.map(
											(sele) =>
												sele.isVisble === true && (
													<Link
														state={sele.name}
														key={sele.id}
														to={sele.path}
														style={{ textDecoration: "none" }}
													>
														<li
															style={{
																display: "flex",
																justifyContent: "flex-start",
																alignItems: "center",
																marginLeft: 0,
																width: "100%",
																listStyle: "none",
																marginLeft: "-21px",
															}}
															onClick={() => subListItemClicked(sele.id)}
														>
															<ListItemIcon
																style={{
																	transition: "all .5s ease-in-out",
																}}
															>
																{sele.Icon}
															</ListItemIcon>
															<p
																style={{
																	marginLeft: 0,
																	color:
																		sele.id !== subId
																			? "rgb(94, 94, 94)"
																			: "rgb(227, 142, 22)",
																	transition: "all .5s ease-in-out",
																	fontFamily: Fonts().primarySemiBold,
																	position: "relative",
																	fontSize: 12,
																}}
															>
																{" "}
																{sele?.label}
															</p>
														</li>
													</Link>
												),
										)}
								</ul>
							</div>
						</div>
					),
			)}
		</React.Fragment>
	);
};
