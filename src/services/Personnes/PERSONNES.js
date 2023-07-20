import { backend } from "../axios/Axios";

export const PERSONNES = {
	fetchPersonnes: async (query) => {
		return await backend.get(`/intranet/personnel/personnels${query}`);
	},
	filterData: async (params) => {
		return await backend.get(
			`/intranet/personnel/personnels/byFilter?${params}`,
		);
	},
	filterDataAll: async (params) => {
		return await backend.get(
			`/intranet/personnel/personnels/byFilterAll?${params}`,
		);
	},
	ImportPersonnesata: async (data) => {
		const conf = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};
		return await backend.post(`/intranet/import/fileImportCSV`, data, conf);
	},
	assignUserToPersonnes: async (id, idP, data) => {
		return await backend.put(
			`intranet/personnel/assignUserToPersonnel/${idP}/${id}?affecte=${data?.affecte}`,
		);
	},

	filterPersonnes: async (params, removePage) => {
		const { services, matrucule, nom, prenom, cin, post, page, size } = params;
		const theService = `services=${services.join("&services=")}`;
		const query = `${theService}&page=${page}&size=${size}&matrucule=${matrucule}&nom=${nom}&prenom=${prenom}&cin=${cin}&post=${post}`;
		return await backend.get(
			`/intranet/personnel/personnels/byFilterAndService?${
				removePage ? theService : query
			}`,
		);
	},

	filterPersonnes2: async (params, removePage) => {
		const { services } = params;
		const theService = `services=${services.join("&services=")}`;
		const query = `${theService}`;
		return await backend.get(
			`/intranet/personnel/GetPersonnelBylistServices?${
				removePage ? theService : query
			}`,
		);
	},
	findPersonnesByPost: async (post) => {
		return await backend.get(
			`/intranet/personnel/personnels/byFilter?poste=${post}`,
		);
	},

	AssignPersonnesToService: async (id, data) => {
		return await backend.put(`/intranet/service/assignResponsable/${id}`, data);
	},
	//mon code
	findPersonneByUser: async (user) => {
		return await backend.get(
			`intranet/personnel/personnels/byUser?user=${user}`,
		);
	},
};
