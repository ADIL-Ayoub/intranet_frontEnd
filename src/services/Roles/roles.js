import { backend } from "../axios/Axios";

export const ROLES = {
    fetchRoles: async () => {
      return await backend.get(`/intranet/role/roles`);
    },
    addRole: async (data) => {
      return await backend.post(`/intranet/role/add`, data);
    },
    Assignment: async (id, data) => {
      return await backend.put(`/intranet/role/assign/${id}`, data);
    },
    Update: async (id, data) => {
      return await backend.put(`/intranet/role/mod/${id}`, data);
    },

  };