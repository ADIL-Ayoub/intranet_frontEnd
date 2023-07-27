import { backend } from "../axios/Axios";

export const DEMANDE = {
	getDemandeByCodeTypeDemande: async (codeTypeDemande) => {
		return await backend.get(
			`/intranet/demande/typeDemande/${codeTypeDemande}`,
		);
	},
};
