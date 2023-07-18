import { backend } from "../axios/Axios";

export const HOLIDAYS = {
  GetAllHolidays: async () => {
    return await backend.get(`/intranet/typeConge/typeConges`);
  },
  AssignTypeConge: async (id,data) => {
    return await backend.put(`/intranet/typeConge/mod/${id}`, data);
  },
};
