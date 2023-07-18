import { backend } from "../axios/Axios";

export const Privilages = {
    fetchPrivileges: async () => {
      return await backend.get(`/intranet/privilege/privileges?page=0&size=200`);
    },
    updatePrivilages: async (id, data) => {
      return await backend.put(`/intranet/privilege/mod/${id}`, data);
    },
  };