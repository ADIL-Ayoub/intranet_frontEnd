import { backend } from "../axios/Axios";

export const CONGE = {
	fetchSolde: async (user) => {
		return await backend.get(`/intranet/demande/soldeConge/${user.id}`);
	},
	ajouterDemandeConge: async (id, data) => {
		return await backend.post(`/intranet/demande/add/${id}`, data);
	},
	ajouterDemandeCongeParSuperieur: async (
		idUser,
		idPersonnel,
		idTypeDmd,
		data,
	) => {
		return await backend.post(
			`/intranet/demande/addBySuperieur/${idUser}/${idPersonnel}`,
			data,
			{ params: { idTypeDmd } },
		);
	},
};
