import { backend } from "../axios/Axios";

export const PAYS = {
  AddPay: async (data) => {
    return await backend.post(`/param/createCountry`, data);
  },
  getAllPays: async () => {
    return await backend.get(`/intranet/pays/all`);
  },
  NewDaysOff: async (data) => {
    return await backend.post(`/param/createCountryHolliday`, data);
  },
  AssignContries: async (data) => {
    return await backend.put(`/intranet/pays/idServicesPays`, data);
  },
  AddProjet: async (data) => {
    return await backend.post(`intranet/projet/add/`, data);
  }
};
