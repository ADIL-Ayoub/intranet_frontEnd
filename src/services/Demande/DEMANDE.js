import { backend } from "../axios/Axios";

export const DEMANDE = {
	getDemandeByCodeTypeDemande: async (codeTypeDemande) => {
		return await backend.get(
			`/intranet/demande/typeDemande/${codeTypeDemande}`,
		);
	},
	getMyDemandes: async (id) => {
		const params = {
			idTypeDmd: "1f3242ed-db17-4e87-8034-9bfd69464ebd",
		};
		return await backend.get(`intranet/demande/mesDemandes/${id}`, {
			params: { ...params },
		});
	},
	annulerDemande: async (id, mesConges) => {
		return await backend.put(`intranet/demande/annule/${id}`, mesConges);
	},
};
