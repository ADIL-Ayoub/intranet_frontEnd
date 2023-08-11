import { backend } from "../axios/Axios";

export const DEMANDE = {
	getTypeDemandeByCodeTypeDemande: async (codeTypeDemande) => {
		return await backend.get(
			`/intranet/demande/typeDemande/${codeTypeDemande}`,
		);
	},
	getMyDemandes: async (id, idTypeDmd, size, page, sort) => {
		const params = {
			idTypeDmd,
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
	getDemandesByCodeSup: async (id, idTypeDmd, size, page, sort) => {
		const params = {
			idTypeDmd,
			size,
			page,
			sort,
		};
		return await backend.get(`intranet/demande/demandes/byCodeSup/${id}`, {
			params: { ...params },
		});
	},
	// validerDemande: async (id, idDemande) => {
	// 	return await backend.put(`intranet/demande/decisionConge/${id}`, {
	// 		idDemande,
	// 		status: "validé",
	// 	});
	// },
	// refuserDemande: async (id, idDemande) => {
	// 	return await backend.put(`intranet/demande/decisionConge/${id}`, {
	// 		idDemande,
	// 		status: "refusé",
	// 	});
	// },
	decisionDemande: async (id, idDemande, status) => {
		return await backend.put(`intranet/demande/decisionConge/${id}`, {
			idDemande,
			status,
		});
	},
	demandeAnnulationDemande: async (id, idDemande) => {
		return await backend.put(`intranet/demande/demandeAnnulation/${id}`, {
			idDemande,
		});
	},
};
