import {URL} from "@common";
const axios = require("axios").default;

export const backend = axios.create({
  baseURL: URL, //dev local
  headers: { "Content-Type": "application/json" },
});


export const AUTH = {
    Login: async (user_cridentials) => {
    return await backend.post("/auth/signin", user_cridentials);
  },
};
