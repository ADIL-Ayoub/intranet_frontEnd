import { backend } from "../axios/Axios";

export const USERS = {
    fetchUsers: async () => {
      return await backend.get(`/intranet/user/users`);
    },
    newUser: async (data) => {
      return await backend.post(`/intranet/user/add`, data);
    },
    updateUser: async (id ,data) => {
      return await backend.put(`/intranet/user/mod/${id}`, data);
    },
    findOneUser: async (id) => {
      return await backend.get(`/intranet/user/${id}`);
    },
    ChangePassword: async (user ,data) => {
      return await backend.put(`/intranet/user/modPassword/${user.id}`, data);
    },
    
  };