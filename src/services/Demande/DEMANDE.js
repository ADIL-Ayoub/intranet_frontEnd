import { backend } from "../axios/Axios";

export const DEMANDE = {
	getDemandeByCodeTypeDemande: async (codeTypeDemande) => {
		return await backend.get(
			`/intranet/demande/typeDemande/${codeTypeDemande}`,
		);
	},
	getMyDemandes: async (id, size, page, sort) => {
		const params = {
			idTypeDmd: "1f3242ed-db17-4e87-8034-9bfd69464ebd",
			size,
			page,
			sort,
		};
		return await backend.get(`intranet/demande/mesDemandes/${id}`, {
			params: { ...params },
		});
	},
	getDemandeById: async (id) => {
		return await backend.get(`intranet/demande/${id}`);
	},
	annulerDemande: async (id, mesConges) => {
		return await backend.put(`intranet/demande/annule/${id}`, mesConges);
	},
	modifierDemande: async (id, mesConges) => {
		return await backend.put(`intranet/demande/modifier/${id}`, mesConges);
	},
	envoyerDemande: async (id, mesConges) => {
		return await backend.put(`intranet/demande/envoyer/${id}`, mesConges);
	},
};
