import { backend } from "../axios/Axios";

export const TIMESHEETBYPROJECT = {
	TimeSheetByProject: async (id, data) => {
		return await backend.post(`/intranet/timesheet/addTsProjet/${id}`, data);
	},
	fetchHeureTravail: async (id) => {
		return await backend.get(`/intranet/timesheet/heureTravail/${id}`);
	},
};
