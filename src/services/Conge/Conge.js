import { backend } from "../axios/Axios";

export const CONGE = {
	fetchSolde: async (user) => {
		return await backend.get(`/intranet/demande/soldeConge/${user.id}`);
	},
};
export default CONGE;
