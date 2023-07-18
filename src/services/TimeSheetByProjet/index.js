import { backend } from "../axios/Axios";

export const TIMESHEETBYPROJECT = {
  TimeSheetByProject: async (id,data) => {
    return await backend.post(`/intranet/timesheet/addTsProjet/${id}`, data);
  },
  
};

