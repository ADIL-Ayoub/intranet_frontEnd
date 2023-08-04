import React from "react";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import {
	Home,
	SignIn,
	ChangePassword,
	Roles,
	Users,
	Permissions,
	Logout,
	Personnes,
	Conge,
	Departement,
	Services,
	Projects,
	Import,
	Clients,
	DetailsDeparetement,
	ServiceScreen,
	GenerationTs,
	Semain,
	Affectation,
	SmallAddition,
	DemandeConge,
	FetchDemandesConges,
} from "@screens";
import { Drawer } from "@components";
import { useSelector } from "react-redux";
import ValiderDemandesConges from "../screens/Demandes/ValiderDemandesConges";

const AppLoggedRoutes = () => {
	let routes = useRoutes([
		{ path: "/", element: <Home /> },
		{ path: "/roles", element: <Roles /> },
		{ path: "/users", element: <Users /> },
		{ path: "/permissions", element: <Permissions /> },
		{ path: "/personnes", element: <Personnes /> },
		{ path: "/conge", element: <Conge /> },
		{ path: "/generation_ts", element: <GenerationTs /> },
		{ path: "/affectation", element: <Affectation /> },
		{ path: "/additions", element: <SmallAddition /> },
		{
			path: "/gestion_ts",
			element: <ServiceScreen />,
			// children: [
			//   { element: <Departement />, index: true },
			//   {
			//     path: ":id/services",
			//     children: [
			//       { element: <DetailsDeparetement />, index: true },
			//       { path: ":id_client", element: <ServiceScreen /> },
			//     ],
			//   },
			// ],
		},
		{ path: "/services", element: <Services /> },
		{ path: "/projects", element: <Projects /> },
		{ path: "/import", element: <Import /> },
		{ path: "/clients", element: <Clients /> },
		{ path: "/logout", element: <Logout /> },
		{ path: "/semain", element: <Semain /> },
		{ path: "/demandes", element: <DemandeConge /> },
		{ path: "/demandes/:idDemandeParam", element: <DemandeConge /> },
		{ path: "/test", element: <FetchDemandesConges /> },
		{ path: "/mesConges", element: <FetchDemandesConges /> },
		{ path: "/validerConges", element: <ValiderDemandesConges /> },
	]);
	return routes;
};

const AppGuestLoggedRoutes = () => {
	let routes = useRoutes([
		{ path: "/", element: <SignIn /> },
		{ path: "*", element: <SignIn /> },
		{ path: "/ChangedPassword", element: <ChangePassword /> },
	]);
	return routes;
};

export default ({}) => {
	const isDark = true; //useIsDarkMode();
	// const location = useLocation();
	const { user, isLogged } = useSelector(({ account }) => account);

	return (
		<Router>
			{isLogged ? (
				<Drawer>
					<AppLoggedRoutes />{" "}
				</Drawer>
			) : (
				<AppGuestLoggedRoutes />
			)}
		</Router>
	);
};
