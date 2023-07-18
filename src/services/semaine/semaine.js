import { backend } from "../axios/Axios";

export const SEMAINE = {
  fetchSemaine: async () => {
    return await backend.get(`/param/week`);
  },
  newSemaine: async (data) => {
    return await backend.post(`/param/WeekHourly`, data);
  },
  updateSemaine: async (id, data) => {
    return await backend.put(`/intranet/user/mod/${id}`, data);
  },
  AssignWeeks: async (data) => {
    return await backend.put(`/intranet/semaine/idServicesSemaine`, data);
  },
};
