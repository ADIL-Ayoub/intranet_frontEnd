import { LOGIN, SET_COLOR_SCHEME, LOGOUT,STOREID,STOREDATA } from "./types";

const initialState = {
  isLogged: false,
  user: null,
  isDarkMode: true,
  userData: null,
  dataTable:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: { ...action.payload },
        isLogged: true,
      };
    case LOGOUT: {
      return { ...state, isLogged: false, user: null };
    }
    case SET_COLOR_SCHEME: {
      return { ...state, isDarkMode: action.payload };
    }
    case STOREID: {
      return { ...state, userData: action.payload };
    }
    case STOREDATA: {
      return { ...state, dataTable: action.payload };
    }
    default:
      return state;
  }
};
