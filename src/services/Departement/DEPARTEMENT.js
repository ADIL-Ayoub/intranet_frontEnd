import { backend } from "../axios/Axios";

export const DEPARTEMENT = {
  fetchDepartement: async (query) => {
    return await backend.get(`/intranet/departement/departements?${query}`);
  },
  findOne: async (id) => {
    return await backend.get(`/intranet/departement/${id}`);
  },
  saveGestionTimeS: async (data, id) => {
    return await backend.put(`/intranet/departement/generationTs/${id}`, data);
  },
  fetchDepByServiceAndResponsable: async (id) => {
    return await backend.get(`/intranet/service/services/responsable/${id}`);
  },
};
