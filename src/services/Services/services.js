import { backend } from "../axios/Axios";

export const SERVICES = {
	fetchAll: async (query) => {
		return await backend.get(`/intranet/service/services${query}`);
	},
	fetchServices: async (id) => {
		return await backend.get(`/intranet/service/client/${id}`);
	},
	saveGestionTimeS: async (data, id) => {
		return await backend.put(`/intranet/service/generationTs/${id}`, data);
	},
	fetchOneService: async (id) => {
		return await backend.get(`/intranet/service/${id}`);
	},
};
