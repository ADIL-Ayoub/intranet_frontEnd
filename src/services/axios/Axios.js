import React from "react";
import { URL } from "@common";
import { LOGOUT } from "@redux/account/types";
import jwt_decode from "jwt-decode";
import { store } from "../../redux/store";
import { toast } from 'react-toastify';

const axios = require("axios").default;

export const backend = axios.create({
  baseURL: URL, //dev local
  headers: { "Content-Type": "application/json" },
});


backend.interceptors.request.use(
  (config) => {
    const access_token = store?.getState()?.account?.user?.token;
    const access_token2 = store?.getState()?.account?.userData?.Token;

    if (!!access_token) {
      const { exp } = jwt_decode(access_token);
      const DateExp = new Date(exp * 1000);
      if (DateExp <= new Date()) {
        store.dispatch({ type: LOGOUT });
        toast.error("Votre compte a expiré, veuillez réessayer de vous connecter");
        // history.pushState('/');
      } else {

        config.headers.Authorization = "Bearer " + access_token;
      }
    } else if (!!access_token2 && !access_token) {
      const { exp } = jwt_decode(access_token2);
      const DateExp = new Date(exp * 1000);
      if (DateExp <= new Date()) {
        toast.error("Votre Token a expiré, veuillez réessayer de vous connecter");
      } else {
        config.headers.Authorization = "Bearer " + access_token2;
      }
    }
    return config;
  },
  (error) => {
    if (error) {
      store.dispatch({ type: LOGOUT });
      toast.error("Votre compte a expiré, veuillez réessayer de vous connecter");
    }
    return error;
  }
);

backend.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error?.response?.status === 403) {
      toast.error("accès refusé ....");
    }
    return error
  }
);
