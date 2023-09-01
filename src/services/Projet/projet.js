import { backend } from "../axios/Axios";

export const PROJET = {
	fetchProjetsByService: async (id) => {
		return await backend.get(`/intranet/projet/findProjets/${id}`);
	},
};
