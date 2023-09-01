import { backend } from "../axios/Axios";

export const TIMESHEETS = {
	generateTimeSheets: async (id, params) => {
		const {
			services,
			periode,
			DateD,
			DateF,
			page,
			size,
			matrucule,
			nom,
			prenom,
			cin,
			post,
		} = params;
		const theService = `services=${services.join("&services=")}`;
		const query = `${theService}&page=${page}&size=${size}&periode=${periode}&DateD=${DateD}&DateF=${DateF}&matrucule=${matrucule}&nom=${nom}&prenom=${prenom}&cin=${cin}&post=${post}`;
		return await backend.get(
			`/intranet/timesheet/TimesheetByService/${id}?${query}`,
		);
	},
	ValidateTs: async (id, data) => {
		return await backend.put(
			`/intranet/timesheet/ValidationTimesheetByIds/${id}`,
			data,
		);
	},
};
