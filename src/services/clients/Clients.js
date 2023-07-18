import { backend } from "../axios/Axios";

export const CLEINTS = {
  fetchClients: async (query, id) => {
    return await backend.get(`/intranet/client/departement/${id}?${query}`);
  },
  findOne: async (id) => {
    return await backend.get(`/intranet/client/${id}`);
  },
  saveGestionTimeS: async (data , id) => {
    return await backend.put(`/intranet/client/generationTs/${id}`, data);
  },
};
